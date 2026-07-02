# Saturn FPV - Tools Synchronization Script
# Copies the unified tools and shared assets (JS, CSS) from the FPV Tools App repository to the Website repository.

$ErrorActionPreference = "Stop"

# Define the path to the FPV Tools repository root
# Since both repositories are typically cloned into the same parent folder, we default to the relative path.
$AppRepoDir = Join-Path $PSScriptRoot "../FPV Tools"

if (-not (Test-Path $AppRepoDir)) {
    # Fallback to absolute path
    $AppRepoDir = "D:\Temp\Antigravity\FPV Tools"
}

if (-not (Test-Path $AppRepoDir)) {
    Write-Error "Could not find FPV Tools App repository at '$AppRepoDir'. Please edit this script to set the correct path."
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

Write-Host "Synchronization completed successfully!" -ForegroundColor Green
