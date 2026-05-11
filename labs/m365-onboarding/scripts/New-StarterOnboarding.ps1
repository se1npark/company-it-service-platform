param(
  [Parameter(Mandatory = $true)]
  [string]$NewStarterCsv,

  [Parameter(Mandatory = $true)]
  [string]$GroupMappingCsv,

  [switch]$Mock
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $NewStarterCsv)) {
  throw "New starter CSV not found: $NewStarterCsv"
}

if (-not (Test-Path $GroupMappingCsv)) {
  throw "Group mapping CSV not found: $GroupMappingCsv"
}

$newStarters = Import-Csv $NewStarterCsv
$groupMappings = Import-Csv $GroupMappingCsv

foreach ($starter in $newStarters) {
  $requiredFields = @("FirstName", "LastName", "DisplayName", "UserPrincipalName", "Department", "ManagerEmail", "StartDate")

  foreach ($field in $requiredFields) {
    if ([string]::IsNullOrWhiteSpace($starter.$field)) {
      throw "Missing required field '$field' for starter row: $($starter | ConvertTo-Json -Compress)"
    }
  }

  $departmentGroups = $groupMappings | Where-Object { $_.Department -eq $starter.Department }
  $vpnGroups = @()

  if ($starter.RequiresVpn -eq "true") {
    $vpnGroups = $groupMappings | Where-Object { $_.Department -eq "VPN" }
  }

  $targetGroups = @($departmentGroups) + @($vpnGroups)

  Write-Host ""
  Write-Host "Onboarding checklist for $($starter.DisplayName)" -ForegroundColor Cyan
  Write-Host "User principal name: $($starter.UserPrincipalName)"
  Write-Host "Department: $($starter.Department)"
  Write-Host "Manager: $($starter.ManagerEmail)"
  Write-Host "Start date: $($starter.StartDate)"

  if ($Mock) {
    Write-Host "[MOCK] Create Microsoft Entra ID user"
    Write-Host "[MOCK] Assign Microsoft 365 licence"

    foreach ($group in $targetGroups) {
      Write-Host "[MOCK] Add to group: $($group.GroupName) - $($group.AccessPurpose)"
    }

    if ($starter.RequiresLaptop -eq "true") {
      Write-Host "[MOCK] Create asset assignment task for laptop"
    }

    Write-Host "[MOCK] Send first-login instructions"
  }
  else {
    Write-Host "Connect to Microsoft Graph and replace mock actions with New-MgUser, Set-MgUserLicense, and New-MgGroupMember commands."
  }
}

