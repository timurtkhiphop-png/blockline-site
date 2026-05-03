# blockline-upload.tar.gz - often unpacks OK when panel breaks on .zip from Windows.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root "out"
$tgz = Join-Path $root "blockline-upload.tar.gz"

if (-not (Test-Path $out)) {
  Write-Error "Missing out/ - run npm run out first"
  exit 1
}

$tarCmd = Get-Command tar -ErrorAction SilentlyContinue
if (-not $tarCmd) {
  Write-Error "tar.exe not found (need Windows 10+). Use npm run out:zip instead."
  exit 1
}

if (Test-Path $tgz) { Remove-Item -Force $tgz }
& tar.exe -czf $tgz -C $out .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "OK: $tgz"
Write-Host "Timeweb: Files - right-click archive - Extract. Or SSH: tar -xzf blockline-upload.tar.gz"
