# Password Reset and MFA

## Purpose

Use this runbook when a user cannot access their account after a password reset, temporary access pass, or MFA method change.

## Process

1. Verify the user's identity through the approved support process.
2. Confirm the reset was requested by the user or manager.
3. Check whether the password reset has replicated to cloud services.
4. Revoke old sessions if stale tokens are causing repeated prompts.
5. Ask the user to register or confirm MFA methods.
6. Record whether a temporary access pass was issued.

## Notes

Never mark an account issue as resolved until the user confirms they can sign in from the required device and application.

