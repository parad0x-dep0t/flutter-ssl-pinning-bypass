<#
 One-click launcher for Flutter TLS Bypass Toolkit (Android)

 Usage:
   .\run-android.ps1 com.target.app
#>

param (
    [Parameter(Mandatory = $true)]
    [string]$PackageName
)

Write-Host "[*] Flutter TLS Bypass Toolkit"
Write-Host "[*] Target package: $PackageName"
Write-Host "[*] Starting Frida..."

frida -U -f $PackageName `
    -l bypass/flutter_tls_universal.js `
    -l bypass/okhttp_bypass.js `
    -l bypass/trustmanager_bypass.js `
    --no-pause
