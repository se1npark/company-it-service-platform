param(
  [Parameter(Mandatory = $true)]
  [string]$NewStarterCsv,

  [string]$OutputPath = "./onboarding-checklist.csv"
)

$ErrorActionPreference = "Stop"

$newStarters = Import-Csv $NewStarterCsv

$checklist = foreach ($starter in $newStarters) {
  [PSCustomObject]@{
    DisplayName = $starter.DisplayName
    UserPrincipalName = $starter.UserPrincipalName
    ManagerEmail = $starter.ManagerEmail
    StartDate = $starter.StartDate
    CreateAccount = "Pending"
    AssignLicence = "Pending"
    AddTeamsAccess = "Pending"
    AddVpnAccess = if ($starter.RequiresVpn -eq "true") { "Pending" } else { "Not required" }
    AssignLaptop = if ($starter.RequiresLaptop -eq "true") { "Pending" } else { "Not required" }
    SendFirstLoginInstructions = "Pending"
  }
}

$checklist | Export-Csv -Path $OutputPath -NoTypeInformation
Write-Host "Checklist exported to $OutputPath"

