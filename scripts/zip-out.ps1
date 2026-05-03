# Pack contents of out/ - prefer tar.exe zip (better for Linux/Timeweb than Compress-Archive).
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$out = Join-Path $root "out"
$zip = Join-Path $root "blockline-upload.zip"

if (-not (Test-Path $out)) {
  Write-Error "Missing out/ - run npm run out first"
  exit 1
}

if (Test-Path $zip) { Remove-Item -Force $zip }

$tarCmd = Get-Command tar -ErrorAction SilentlyContinue
if ($tarCmd) {
  # bsdtar: same zip format many panels expect; avoids PowerShell Compress-Archive quirks
  & tar.exe -a -c -f $zip -C $out .
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
} else {
  Set-Location $out
  try {
    Compress-Archive -Path * -DestinationPath $zip -CompressionLevel Optimal -Force
  } finally {
    Set-Location $root
  }
}

Write-Host "OK: $zip"
Write-Host "Upload via SFTP if web panel fails. If extract still errors, run: npm run out:tar (tar.gz)."
