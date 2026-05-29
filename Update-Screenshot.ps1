param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectName,

    [Parameter(Mandatory = $false)]
    [int]$WaitTime = 45,

    [Parameter(Mandatory = $false)]
    [switch]$KeepOpen
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# 1. CONFIGURACIÓN DE RUTAS
$repoRoot = Get-Location
$oneDrivePath = "C:\Users\antoi\OneDrive\MyPortfolio"

# Intentar encontrar el archivo .pbip real (con datos)
$possiblePbipPaths = @(
    (Join-Path $oneDrivePath "$ProjectName\powerbi\$ProjectName.pbip"),
    (Join-Path $oneDrivePath "$ProjectName.pbip")
)

$pbipPath = ""
foreach ($p in $possiblePbipPaths) {
    if (Test-Path $p) {
        $parentDir = Split-Path $p -Parent
        $reportDir = Join-Path $parentDir "$ProjectName.Report"
        $semanticDir = Join-Path $parentDir "$ProjectName.SemanticModel"
        $datasetDir = Join-Path $parentDir "$ProjectName.Dataset"
        
        $hasData = $false
        if (Test-Path $reportDir) { $hasData = $true }
        if (Test-Path $semanticDir) { $hasData = $true }
        if (Test-Path $datasetDir) { $hasData = $true }
        
        if ($hasData) {
            $pbipPath = $p
            break
        }
    }
}

if (-not $pbipPath) {
    foreach ($p in $possiblePbipPaths) {
        if (Test-Path $p) {
            $pbipPath = $p
            break
        }
    }
}

$outputPath = Join-Path $repoRoot "img\$ProjectName.png"

if (-not $pbipPath) {
    Write-Warning "No se encontró el archivo .pbip para el proyecto '$ProjectName'."
    Write-Host "Proyectos disponibles en OneDrive:" -ForegroundColor Cyan
    Get-ChildItem $oneDrivePath -Filter "*.pbip" | Select-Object -ExpandProperty Name | ForEach-Object { Write-Host " - $_" }
    return
}

Write-Host "📸 Iniciando captura automática para: $ProjectName" -ForegroundColor Cyan
Write-Host "📍 Usando archivo: $pbipPath" -ForegroundColor Gray

# 2. LOCALIZAR POWER BI DESKTOP
$pbiPath = ""
$possiblePaths = @(
    "${env:ProgramFiles}\Microsoft Power BI Desktop\bin\PBIDesktop.exe",
    "${env:ProgramFiles(x86)}\Microsoft Power BI Desktop\bin\PBIDesktop.exe"
)

$storeApp = Get-AppxPackage -Name *PowerBIDesktop* | Select-Object -ExpandProperty InstallLocation -First 1
if ($storeApp) {
    $possiblePaths += Join-Path $storeApp "bin\PBIDesktop.exe"
}

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $pbiPath = $path
        break
    }
}

if (-not $pbiPath) {
    Write-Error "No se pudo encontrar el ejecutable de Power BI Desktop."
    return
}

# 3. CARGAR ENSAMBLADOS .NET PARA CAPTURA
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# 4. DEFINIR INTEROP PARA MANEJO DE VENTANAS
$signature = @"
[DllImport("user32.dll")]
public static extern bool SetForegroundWindow(IntPtr hWnd);
[DllImport("user32.dll")]
public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
[DllImport("user32.dll")]
public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
"@
if (-not ([System.Management.Automation.PSTypeName]'Win32.Win32Window').Type) {
    Add-Type -MemberDefinition $signature -Name "Win32Window" -Namespace "Win32"
}

# 5. INICIAR POWER BI DESKTOP
Write-Host "🚀 Abriendo proyecto en Power BI..." -ForegroundColor Yellow
$process = Start-Process $pbiPath -ArgumentList "`"$pbipPath`"" -PassThru

Write-Host "⏳ Esperando $WaitTime segundos a que cargue el reporte..." -ForegroundColor Gray
Start-Sleep -Seconds $WaitTime

# 6. CAPTURAR LA VENTANA
try {
    $handle = $process.MainWindowHandle
    $retryCount = 0
    while ($handle -eq [IntPtr]::Zero -and $retryCount -lt 15) {
        Start-Sleep -Seconds 2
        $process.Refresh()
        $handle = $process.MainWindowHandle
        if ($handle -eq [IntPtr]::Zero) {
            $p = Get-Process -Name "PBIDesktop" | Where-Object { $_.MainWindowTitle -like "*$ProjectName*" } | Select-Object -First 1
            if ($p) { $handle = $p.MainWindowHandle }
        }
        $retryCount++
    }

    if ($handle -ne [IntPtr]::Zero) {
        Write-Host "📷 Capturando ventana..." -ForegroundColor Green
        [Win32.Win32Window]::ShowWindow($handle, 3) # Maximizar
        [Win32.Win32Window]::SetForegroundWindow($handle) | Out-Null
        Start-Sleep -Seconds 5 # Tiempo para estabilizar el renderizado

        $rect = New-Object Win32.Win32Window+RECT
        [Win32.Win32Window]::GetWindowRect($handle, [ref]$rect) | Out-Null

        $width = $rect.Right - $rect.Left
        $height = $rect.Bottom - $rect.Top

        if ($width -gt 0 -and $height -gt 0) {
            $bmp = New-Object System.Drawing.Bitmap($width, $height)
            $graphics = [System.Drawing.Graphics]::FromImage($bmp)
            $graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bmp.Size)
            $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
            Write-Host "✅ Captura guardada con éxito en: $outputPath" -ForegroundColor Green
        }
    } else {
        Write-Warning "No se pudo detectar la ventana de Power BI."
    }
}
catch {
    Write-Error "Error durante la captura: $_"
}
finally {
    if (-not $KeepOpen) {
        Write-Host "🛑 Cerrando Power BI Desktop..." -ForegroundColor Yellow
        Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    }
    if ($graphics) { $graphics.Dispose() }
    if ($bmp) { $bmp.Dispose() }
}
