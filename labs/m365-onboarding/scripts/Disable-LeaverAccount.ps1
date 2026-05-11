param(
  [Parameter(Mandatory = $true)]
  [string]$UserPrincipalName,

  [Parameter(Mandatory = $true)]
  [string]$TicketId,

  [switch]$Mock
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "Offboarding checklist for $UserPrincipalName" -ForegroundColor Cyan
Write-Host "Linked service desk ticket: $TicketId"

if ($Mock) {
  Write-Host "[MOCK] Block sign-in"
  Write-Host "[MOCK] Revoke active sessions"
  Write-Host "[MOCK] Remove user from non-default access groups"
  Write-Host "[MOCK] Convert mailbox or assign delegate if approved"
  Write-Host "[MOCK] Mark assigned assets for return"
  Write-Host "[MOCK] Record audit note in ticket $TicketId"
}
else {
  Write-Host "Connect to Microsoft Graph and replace mock actions with Update-MgUser, Revoke-MgUserSignInSession, and group membership removal commands."
}

