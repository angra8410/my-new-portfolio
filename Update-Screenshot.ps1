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
$projectPath = Join-Path $oneDrivePath $ProjectName
$pbipPath = Join-Path $projectPath "powerbi\$ProjectName.pbip"
$outputPath = Join-Path $repoRoot "img\$ProjectName.png"

Write-Host "📸 Iniciando captura automática para: $ProjectName" -ForegroundColor Cyan

# 2. LOCALIZAR POWER BI DESKTOP
$pbiPath = ""
$possiblePaths = @(
    "${env:ProgramFiles}\Microsoft Power BI Desktop\bin\PBIDesktop.exe",
    "${env:ProgramFiles(x86)}\Microsoft Power BI Desktop\bin\PBIDesktop.exe"
)

# Intentar buscar versión de la Tienda (Microsoft Store)
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
    Write-Error "No se pudo encontrar el ejecutable de Power BI Desktop. Por favor, verifica la instalación."
    return
}

if (-not (Test-Path $projectPath)) {
    Write-Warning "No se encontró la carpeta del proyecto en OneDrive: $projectPath"
    $available = Get-ChildItem $oneDrivePath -Directory | Select-Object -ExpandProperty Name
    Write-Host "Proyectos disponibles en OneDrive:" -ForegroundColor Cyan
    $available | ForEach-Object { Write-Host " - $_" }
    return
}

if (-not (Test-Path $pbipPath)) {
    Write-Error "No se encontró el archivo .pbip en: $pbipPath"
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

# 6. CAPTURAR LA CAPTURA
try {
    # Intentar obtener el handle de la ventana principal
    $handle = $process.MainWindowHandle
    $retryCount = 0
    while ($handle -eq [IntPtr]::Zero -and $retryCount -lt 10) {
        Start-Sleep -Seconds 2
        $process.Refresh()
        $handle = $process.MainWindowHandle
        
        # Fallback: Buscar por nombre de proceso si el handle sigue siendo Zero
        if ($handle -eq [IntPtr]::Zero) {
            $p = Get-Process -Name "PBIDesktop" | Where-Object { $_.MainWindowTitle -like "*$ProjectName*" } | Select-Object -First 1
            if ($p) { $handle = $p.MainWindowHandle }
        }
        $retryCount++
    }

    if ($handle -ne [IntPtr]::Zero) {
        Write-Host "📷 Capturando ventana..." -ForegroundColor Green
        
        # Maximizar y traer al frente
        [Win32.Win32Window]::ShowWindow($handle, 3) # SW_MAXIMIZE = 3
        [Win32.Win32Window]::SetForegroundWindow($handle) | Out-Null
        Start-Sleep -Seconds 3 # Tiempo para que la UI se estabilice tras maximizar

        # Obtener dimensiones
        $rect = New-Object Win32.Win32Window+RECT
        [Win32.Win32Window]::GetWindowRect($handle, [ref]$rect) | Out-Null

        $width = $rect.Right - $rect.Left
        $height = $rect.Bottom - $rect.Top

        if ($width -le 0 -or $height -le 0) {
            throw "Dimensiones de ventana inválidas ($width x $height)."
        }

        # Capturar el área
        $bmp = New-Object System.Drawing.Bitmap($width, $height)
        $graphics = [System.Drawing.Graphics]::FromImage($bmp)
        $graphics.CopyFromScreen($rect.Left, $rect.Top, 0, 0, $bmp.Size)

        # Guardar archivo
        $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "✅ Captura guardada con éxito en: $outputPath" -ForegroundColor Green
        
        # Mostrar en el explorador (opcional)
        # explorer.exe /select,$outputPath
    } else {
        Write-Warning "No se pudo detectar la ventana de Power BI a tiempo. Intenta aumentar el tiempo de espera (-WaitTime)."
    }
}
catch {
    Write-Error "Error durante la captura: $_"
}
finally {
    if (-not $KeepOpen) {
        Write-Host "🛑 Cerrando Power BI Desktop..." -ForegroundColor Yellow
        Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    } else {
        Write-Host "💡 Power BI Desktop se mantiene abierto." -ForegroundColor Gray
    }
    
    if ($graphics) { $graphics.Dispose() }
    if ($bmp) { $bmp.Dispose() }
}
