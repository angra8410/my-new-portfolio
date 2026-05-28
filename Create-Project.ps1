param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectName,

    [Parameter(Mandatory = $false)]
    [string]$GitHubUrl = "https://github.com/angra8410/my-new-portfolio",

    [Parameter(Mandatory = $false)]
    [switch]$InitGit,

    [Parameter(Mandatory = $false)]
    [switch]$PushGit = $true
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# 1. CONFIGURACIÓN DE RUTAS
# Ajustamos para que funcione desde la raíz de tu repositorio local
$repoRoot = Get-Location
$timestamp = Get-Date -Format "yyyy-MM-dd"

# Carpeta donde Power BI guardará los archivos (OneDrive)
$oneDrivePath = "C:\Users\antoi\OneDrive\MyPortfolio"
$projectPath = Join-Path $oneDrivePath $ProjectName

# Ruta al archivo JS del portafolio
$jsPath = Join-Path $repoRoot "js/main.js"

Write-Host "🚀 Iniciando creación de proyecto: $ProjectName" -ForegroundColor Cyan

# 2. CREAR ESTRUCTURA EN ONEDRIVE
if (-not (Test-Path -LiteralPath $oneDrivePath)) {
    New-Item -ItemType Directory -Path $oneDrivePath -Force | Out-Null
}

if (Test-Path -LiteralPath $projectPath) {
    Write-Warning "La carpeta del proyecto ya existe en OneDrive. Saltando creación de carpetas."
} else {
    $folders = @(
        "docs",
        "powerbi\$ProjectName.Dataset",
        "powerbi\$ProjectName.Report",
        "sql",
        "assets\screenshots",
        "exports"
    )
    foreach ($folder in $folders) {
        New-Item -ItemType Directory -Path (Join-Path $projectPath $folder) -Force | Out-Null
    }
    
    # Crear archivo .pbip base
    $pbipContent = @{ version = "1.0"; settings = @{ enableAutoFullRefresh = $true } } | ConvertTo-Json
    Set-Content -Path (Join-Path $projectPath "powerbi\$ProjectName.pbip") -Value $pbipContent
    
    # Crear metadata.json
    $metadata = @{ projectName = $ProjectName; createdAt = $timestamp; type = "pbip_project" } | ConvertTo-Json
    Set-Content -Path (Join-Path $projectPath "metadata.json") -Value $metadata
}

# 3. AUTO-INYECCIÓN EN JS/MAIN.JS
if (Test-Path $jsPath) {
    Write-Host "📝 Actualizando js/main.js..." -ForegroundColor Yellow
    $newProjectJS = @"
  {
    title: '$ProjectName',
    title_en: '$ProjectName',
    category: 'Caso de estudio',
    category_en: 'Case Study',
    date: '$timestamp',
    image: 'img/placeholder.png',
    excerpt: 'Análisis de datos detallado para $ProjectName.',
    excerpt_en: 'Detailed data analysis for $ProjectName.',
    tech: ['Power BI', 'SQL', 'DAX'],
    metrics: ['Análisis en progreso'],
    metrics_en: ['Analysis in progress'],
    detailUrl: 'projects/$ProjectName.html',
    repoUrl: '$GitHubUrl'
  },
"@
    $jsContent = Get-Content $jsPath -Raw
    # Insertar el nuevo proyecto al principio del array 'projects'
    $jsContent = $jsContent -replace 'const projects = \[', "const projects = [`n$newProjectJS"
    Set-Content $jsPath $jsContent
} else {
    Write-Error "No se encontró js/main.js en $jsPath. Asegúrate de ejecutar el script desde la raíz del repo."
}

# 4. GIT AUTOMÁTICO PARA ACTUALIZAR EL PORTAFOLIO
Write-Host "💾 Sincronizando con GitHub..." -ForegroundColor Magenta
git add .
git commit -m "feat: add new project $ProjectName ($timestamp)"
if ($PushGit) {
    git push origin main
}

Write-Host "`n✨ ¡LISTO! El proyecto ha sido creado y tu portafolio web se está actualizando." -ForegroundColor Green
Write-Host "📍 OneDrive: $projectPath"
Write-Host "🌐 Web: https://angra8410.github.io/my-new-portfolio/"
