# AI Evaluation Plan

The copilot should be evaluated like an IT Support tool, not like a casual chatbot.

## Evaluation Cases

| Scenario | Expected Category | Expected Citation |
| --- | --- | --- |
| Outlook sign-in loop after password reset | Microsoft 365 / Account | `microsoft-365-login-issues.md`, `password-reset-and-mfa.md` |
| VPN connects but internal apps fail | VPN / Network | `vpn-troubleshooting.md` |
| Teams microphone not detected | Teams / Hardware | `teams-audio-issues.md` |
| New starter needs laptop, M365, VPN | Onboarding | `new-starter-account-setup.md` |
| Printer appears offline after office move | Hardware / Network | `printer-troubleshooting.md` |

## Metrics

- Classification accuracy
- Citation relevance
- Top-3 retrieval accuracy
- Escalation appropriateness
- Hallucination checks against approved knowledge docs
- Time saved for first-line triage

## Guardrails

- Show citations for every generated recommendation.
- Ask the user to escalate if account security, data loss, or repeated MFA failures are involved.
- Avoid claiming admin actions were completed unless the system has actually performed them.
- Keep confidence visible so support agents know when to verify manually.

## Future Test Harness

Add a JSON evaluation dataset with:

- input issue
- expected category
- expected priority
- expected citations
- forbidden claims

Then run it in CI with a deterministic retriever and optional LLM judge.

