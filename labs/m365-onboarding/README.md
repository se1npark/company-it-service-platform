# Microsoft 365 New Starter Automation Lab

This lab simulates the account onboarding and offboarding workflow used by an internal IT team. It is safe to run without a Microsoft tenant because the scripts default to mock output.

The structure is Microsoft Graph-ready: replace the mock output section with Graph SDK calls once a developer tenant or sandbox is available.

## Workflow

1. HR provides `data/new-starters.csv`.
2. IT maps department and role values to access groups in `data/group-mapping.csv`.
3. `New-StarterOnboarding.ps1` validates required fields and produces an onboarding checklist.
4. Support confirms laptop assignment, Microsoft 365 licence, Teams access, VPN group, and manager approval.
5. `Disable-LeaverAccount.ps1` documents the offboarding flow for account disablement and group removal.

## Run Mock Onboarding

```powershell
pwsh ./scripts/New-StarterOnboarding.ps1 -NewStarterCsv ./data/new-starters.csv -GroupMappingCsv ./data/group-mapping.csv -Mock
```

## Run Mock Offboarding

```powershell
pwsh ./scripts/Disable-LeaverAccount.ps1 -UserPrincipalName sofia.martin@northstar.example -TicketId ticket-1003 -Mock
```

## Portfolio Notes

Mention this lab when applying for IT Support, Desktop Support, or Service Desk roles:

- Demonstrates Microsoft 365 / Microsoft Entra ID workflow awareness.
- Shows practical CSV-driven automation with PowerShell.
- Covers onboarding, group assignment, licence checklist, VPN access, and offboarding documentation.
- Keeps real admin actions mocked until a safe tenant is available.

