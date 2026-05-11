# Microsoft 365 Login Issues

## Symptoms

- Outlook repeatedly asks the user to sign in.
- Microsoft 365 web apps work but desktop apps fail.
- The user recently changed a password.
- MFA approval succeeds but the application loops back to the login screen.

## First-Line Checks

1. Check Microsoft 365 service health.
2. Confirm the user can sign in through Outlook on the web.
3. Confirm the password reset timestamp and whether the user has signed out of old sessions.
4. Clear cached Office credentials from Windows Credential Manager.
5. Remove stale work or school account sessions from Windows settings.
6. Reopen Office apps and complete MFA.

## Escalate When

- The account is repeatedly locked.
- Risky sign-in or impossible travel events are present.
- MFA methods were changed without user confirmation.
- Multiple users report the same Microsoft 365 issue.

