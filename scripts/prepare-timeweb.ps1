# Статический Next.js -> out/ (HTML/CSS/JS для FTP на shared-хостинг)
param(
  [switch]$Full
)
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Resolve-NpmCmd {
  $g = Get-Command npm -ErrorAction SilentlyContinue
  if ($g -and $g.Source) { return $g.Source }
  $candidates = @()
  if ($env:NVM_SYMLINK) { $candidates += (Join-Path $env:NVM_SYMLINK "npm.cmd") }
  $candidates += @(
    (Join-Path $env:ProgramFiles "nodejs\npm.cmd"),
    (Join-Path ${env:ProgramFiles(x86)} "nodejs\npm.cmd"),
    (Join-Path $env:LOCALAPPDATA "Programs\node\npm.cmd"),
    (Join-Path $env:LOCALAPPDATA "Programs\nodejs\npm.cmd")
  )
  foreach ($p in $candidates) {
    if ($p -and (Test-Path -LiteralPath $p)) { return $p }
  }
  return $null
}

$npmCmd = Resolve-NpmCmd
if (-not $npmCmd) {
  Write-Host @"
npm не найден в PATH и в стандартных папках.

Сделай одно из:
  1) Установи Node.js LTS: https://nodejs.org/
  2) Полностью закрой Cursor и открой снова (чтобы подтянулся PATH после установки)
  3) В PowerShell до установки Node: добавь в PATH папку, где лежит npm.cmd

"@
  exit 1
}

$out = Join-Path $root "out"
if (Test-Path $out) {
  Write-Host ">>> removing old out/ (close local server if using this folder)"
  $removed = $false
  for ($i = 0; $i -lt 8; $i++) {
    try {
      Remove-Item -LiteralPath $out -Recurse -Force -ErrorAction Stop
      $removed = $true
      break
    } catch {
      if ($i -eq 0) { Write-Host "    locked - retrying every 2s..." }
      Start-Sleep -Seconds 2
    }
  }
  if (-not $removed) {
    Write-Host "Could not delete out/. Stop any process using it, then run again."
    exit 1
  }
}

if ($Full) {
  Write-Host ">>> npm run build:full (WebGL / Three.js в out — как в dev, тяжёлая сборка)"
  & $npmCmd run build:full
} else {
  Write-Host ">>> npm run build (lite, без WebGL — быстрее на Windows)"
  & $npmCmd run build
}
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (-not (Test-Path $out)) {
  Write-Error "Missing out/ - check next.config output: export"
  exit 1
}

Write-Host ""
Write-Host "OK: $out"
Write-Host "Upload everything inside out/ to the site root (public_html or the site folder). Contents only, not the out folder name."
Write-Host "FormSubmit: first submission to a new email opens a one-time activation link in that inbox."
Write-Host ""
