param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectName,

    [Parameter(Mandatory = $false)]
    [int]$WaitTime = 45,

    [Parameter(Mandatory = $false)]
    [int]$Page = 1,

    [Parameter(Mandatory = $false)]
    [switch]$KeepOpen
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Get-Location
$oneDrivePath = "C:\Users\antoi\OneDrive\MyPortfolio"

$suffix = if ($Page -gt 1) { "-$Page" } else { "" }
Write-Host "`n🏠 MODO DPI-AWARE (v5.2) - Capturando Página $Page" -ForegroundColor Cyan

# --- INTEROP ---
$signature = @"
[DllImport("user32.dll")]
public static extern bool SetProcessDPIAware();
[DllImport("user32.dll")]
public static extern int GetSystemMetrics(int nIndex);
[DllImport("user32.dll")]
public static extern bool SetForegroundWindow(IntPtr hWnd);
[DllImport("user32.dll")]
public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
"@
if (-not ([System.Management.Automation.PSTypeName]'Win32.DpiUtils').Type) {
    Add-Type -MemberDefinition $signature -Name "DpiUtils" -Namespace "Win32"
}

[Win32.DpiUtils]::SetProcessDPIAware() | Out-Null
$physicalWidth = [Win32.DpiUtils]::GetSystemMetrics(0)
$physicalHeight = [Win32.DpiUtils]::GetSystemMetrics(1)

# LOCALIZAR ARCHIVO
$bestPath = ""
$p1 = Join-Path $oneDrivePath "$ProjectName.pbix"
$p2 = Join-Path $oneDrivePath "$ProjectName.pbip"
if (Test-Path $p1) { $bestPath = $p1 } elseif (Test-Path $p2) { $bestPath = $p2 }

# LOCALIZAR PBI
$pbiPath = "${env:ProgramFiles}\Microsoft Power BI Desktop\bin\PBIDesktop.exe"
$storeApp = Get-AppxPackage -Name *PowerBIDesktop* | Select-Object -ExpandProperty InstallLocation -First 1
if ($storeApp) { $pbiPath = Join-Path $storeApp "bin\PBIDesktop.exe" }

# INICIAR
Write-Host "🚀 Abriendo: $(Split-Path $bestPath -Leaf)" -ForegroundColor Yellow
$process = Start-Process $pbiPath -ArgumentList "`"$bestPath`"" -PassThru
Start-Sleep -Seconds $WaitTime

try {
    $pbiProcess = Get-Process -Name "PBIDesktop" | Where-Object { $_.MainWindowTitle -ne "" } | Select-Object -First 1
    $handle = $pbiProcess.MainWindowHandle

    if ($handle -ne [IntPtr]::Zero) {
        [Win32.DpiUtils]::ShowWindow($handle, 3) | Out-Null
        
        Write-Host "`n⚠️  ¡ACCIÓN REQUERIDA!  ⚠️" -ForegroundColor Red
        Write-Host "1. Asegúrate de estar en la PÁGINA $Page del reporte." -ForegroundColor Yellow
        Write-Host "2. Haz clic dentro del reporte para dar foco." -ForegroundColor Yellow
        for ($c = 5; $c -gt 0; $c--) { Write-Host "Capturando en $c..."; Start-Sleep -Seconds 1 }

        $currentOutput = Join-Path $repoRoot "img\$ProjectName$suffix.png"
        [Win32.DpiUtils]::SetForegroundWindow($handle) | Out-Null
        Start-Sleep -Seconds 2

        Write-Host "📷 Capturando monitor físico ($($physicalWidth)x$($physicalHeight))..." -ForegroundColor Green
        Add-Type -AssemblyName System.Drawing
        $bmp = New-Object System.Drawing.Bitmap($physicalWidth, $physicalHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($bmp)
        $graphics.CopyFromScreen(0, 0, 0, 0, $bmp.Size)
        $bmp.Save($currentOutput, [System.Drawing.Imaging.ImageFormat]::Png)
        
        Write-Host "   ✅ Guardada como: $currentOutput" -ForegroundColor Green
        $graphics.Dispose(); $bmp.Dispose()
    }
} finally {
    if (-not $KeepOpen -and $pbiProcess) { Stop-Process -Id $pbiProcess.Id -Force -ErrorAction SilentlyContinue }
    Write-Host "`n✨ Proceso completado." -ForegroundColor Cyan
}
