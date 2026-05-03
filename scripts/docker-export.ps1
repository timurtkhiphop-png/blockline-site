# Сборка сайта в Docker (Linux) и копирование out/ на хост Windows — обходит зависания локального webpack.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$img = "blockline-site-export"
Write-Host ">>> docker build (first run downloads Node image, may take a few minutes)"
docker build -t $img $root
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$outHost = Join-Path $root "out"
if (Test-Path $outHost) {
  Write-Host ">>> removing host out/"
  Remove-Item -LiteralPath $outHost -Recurse -Force -ErrorAction Stop
}

Write-Host ">>> copying out/ from container"
docker create --name blockline-out-tmp $img | Out-Null
try {
  docker cp "blockline-out-tmp:/app/out" $outHost
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
} finally {
  docker rm blockline-out-tmp | Out-Null
}

Write-Host ""
Write-Host "OK: $outHost"
Write-Host "Upload contents of out/ to hosting (public_html). See npm run out:zip"
