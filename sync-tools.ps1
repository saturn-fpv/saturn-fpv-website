# Saturn FPV - Tools Synchronization Script
# Copies the unified tools and shared assets (JS, CSS) from the FPV Tools App repository to the Website repository.

$ErrorActionPreference = "Stop"

# Define the path to the FPV Tools repository root
# Assumes both repositories are cloned into the same parent folder (or override with $env:FPV_TOOLS_DIR)
$AppRepoDir = if ($env:FPV_TOOLS_DIR) { $env:FPV_TOOLS_DIR } else { Join-Path $PSScriptRoot "../FPV Tools" }

if (-not (Test-Path $AppRepoDir)) {
    Write-Error "Could not find FPV Tools repository at '$AppRepoDir'. Ensure 'FPV Tools' is cloned alongside this repository or set `$env:FPV_TOOLS_DIR."
}

Write-Host "Syncing from: $AppRepoDir" -ForegroundColor Cyan
Write-Host "Syncing to:   $PSScriptRoot" -ForegroundColor Cyan

# 1. Sync tools folder
$SrcTools = Join-Path $AppRepoDir "tools"
$DstTools = Join-Path $PSScriptRoot "tools"
Write-Host "Syncing tools folder..." -ForegroundColor Yellow
if (Test-Path $DstTools) {
    Remove-Item -Recurse -Force $DstTools
}
Copy-Item -Recurse -Force $SrcTools -Destination $PSScriptRoot

# 2. Sync js folder
$SrcJs = Join-Path $AppRepoDir "js"
$DstJs = Join-Path $PSScriptRoot "js"
Write-Host "Syncing js folder..." -ForegroundColor Yellow
if (Test-Path $DstJs) {
    Remove-Item -Recurse -Force $DstJs
}
Copy-Item -Recurse -Force $SrcJs -Destination $PSScriptRoot

# 3. Sync css folder
$SrcCss = Join-Path $AppRepoDir "css"
$DstCss = Join-Path $PSScriptRoot "css"
Write-Host "Syncing css folder..." -ForegroundColor Yellow
if (Test-Path $DstCss) {
    Remove-Item -Recurse -Force $DstCss
}
Copy-Item -Recurse -Force $SrcCss -Destination $PSScriptRoot

# 4. Sync fonts folder
# css/fonts.css references ../fonts/*.ttf with relative paths. Without this the
# website 404s on every face and silently falls back to the Google Fonts CDN,
# which breaks the offline-first / no-CDN rule the tools are built around.
$SrcFonts = Join-Path $AppRepoDir "fonts"
$DstFonts = Join-Path $PSScriptRoot "fonts"
Write-Host "Syncing fonts folder..." -ForegroundColor Yellow
if (Test-Path $DstFonts) {
    Remove-Item -Recurse -Force $DstFonts
}
Copy-Item -Recurse -Force $SrcFonts -Destination $PSScriptRoot

Write-Host "Synchronization completed successfully!" -ForegroundColor Green
