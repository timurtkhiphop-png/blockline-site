# Small tarball for Timeweb: no node_modules, no .next, no out - build on server over SSH.
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$dest = Join-Path $root "blockline-source.tar.gz"
$paths = @(
  "app",
  "components",
  "lib",
  "public",
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
  "tailwind.config.ts",
  "next-env.d.ts",
  ".env.example"
)
if (Test-Path (Join-Path $root "scripts")) {
  $paths += "scripts"
}

$missing = @()
foreach ($p in $paths) {
  if (-not (Test-Path (Join-Path $root $p))) { $missing += $p }
}
if ($missing.Count -gt 0) {
  Write-Error ("Missing paths: " + ($missing -join ", "))
  exit 1
}

if (-not (Get-Command tar -ErrorAction SilentlyContinue)) {
  Write-Error "tar.exe not found"
  exit 1
}

if (Test-Path $dest) { Remove-Item -Force $dest }
& tar.exe -czf $dest @paths
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "OK: $dest"
Write-Host "Upload via SFTP. On server: tar -xzf blockline-source.tar.gz && npm ci && npm run build && NODE_ENV=production PORT=3000 npm run start"
Write-Host "See TIMWEB-DEPLOY.txt section 'Source on server'."
