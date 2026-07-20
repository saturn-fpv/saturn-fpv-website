# Saturn FPV - Direct Mirror Deployment Script (via WinSCP)
# Automatically synchronizes local files to the /saturnfpv.com/ remote subdirectory,
# deleting remote files that no longer exist locally while preserving other sites.

$ErrorActionPreference = "Stop"

# 1. Load Credentials & Connection Info
# We store credentials in a local 'deploy-secrets.ps1' file that is gitignored to prevent leaks.
$SecretsFile = Join-Path $PSScriptRoot "deploy-secrets.ps1"

if (-not (Test-Path $SecretsFile)) {
    # Generate secrets template
    $Template = @"
# Local FTP Credentials (GITIGNORED)
`$FtpHost = "w00c2d37.kasserver.com"
`$FtpUser = "your_username"
`$FtpPass = "your_password"
`$FtpPort = 21
"@
    Set-Content -Path $SecretsFile -Value $Template
    Write-Host "Created connection template: 'deploy-secrets.ps1'" -ForegroundColor Yellow
    Write-Host "Please edit 'deploy-secrets.ps1' with your FTP credentials before running deploy again." -ForegroundColor Yellow
    exit
}

# Load connection variables ($FtpHost, $FtpUser, $FtpPass, $FtpPort)
. $SecretsFile

if ($FtpUser -eq "your_username" -or $FtpPass -eq "your_password") {
    Write-Error "Please update 'deploy-secrets.ps1' with your actual FTP credentials."
}

# 2. Check for WinSCP Installation
# Look for standard installation path or check if 'winscp.com' is available in PATH
$WinSCPPath = "C:\Program Files (x86)\WinSCP\WinSCP.com"
if (-not (Test-Path $WinSCPPath)) {
    $WinSCPPath = "winscp.com"
    # Test if it runs
    try {
        & $WinSCPPath /version > $null
    } catch {
        Write-Error "Could not find WinSCP. Please install WinSCP from https://winscp.net/ or ensure WinSCP.com is added to your environment PATH."
    }
}

Write-Host "Connecting to: $FtpHost..." -ForegroundColor Cyan
Write-Host "Target Folder: /saturnfpv.com/" -ForegroundColor Cyan
Write-Host "Syncing files..." -ForegroundColor Yellow

# 3. Execute Synchronization command
# - We open connection directly into /saturnfpv.com/ to ensure it remains locked to that folder.
# - 'synchronize remote -delete' mirrors the folders (uploads new/changed, deletes removed files).
# - We exclude Git folders, local workspace settings (.agents), developer guides, and connection scripts/secrets.
& $WinSCPPath /command `
  "open ftp://$($FtpUser):$($FtpPass)@$($FtpHost):$($FtpPort)/saturnfpv.com/" `
  "synchronize remote -delete -filemask=""| .git/; temp/; .agents/; .gitignore; sync-tools.ps1; deploy.ps1; deploy-secrets.ps1; DEVELOPER.md; README.md"" ""$PSScriptRoot"" /" `
  "exit"

Write-Host "Deployment completed successfully!" -ForegroundColor Green
