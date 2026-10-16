$wshell = New-Object -ComObject wscript.shell

# Try to find window with n8n or workflow in title
$proc = Get-Process | Where-Object { $_.MainWindowTitle -like '*n8n*' -or $_.MainWindowTitle -like '*CyberX*' } | Select-Object -First 1

if ($proc) {
    Write-Output "Found process: $($proc.ProcessName) with title: $($proc.MainWindowTitle)"
    $wshell.AppActivate($proc.Id)
    Start-Sleep -Milliseconds 800
    $wshell.SendKeys("^{ENTER}")
    Write-Output "Triggered Ctrl+Enter on n8n window successfully!"
} else {
    # Try general browser
    $browser = Get-Process | Where-Object { $_.ProcessName -in @('msedge', 'chrome', 'firefox') -and $_.MainWindowTitle -ne '' } | Select-Object -First 1
    if ($browser) {
        Write-Output "Activating browser: $($browser.MainWindowTitle)"
        $wshell.AppActivate($browser.Id)
        Start-Sleep -Milliseconds 800
        $wshell.SendKeys("^{ENTER}")
        Write-Output "Triggered Ctrl+Enter on browser window!"
    } else {
        Write-Output "No browser window found in foreground."
    }
}
