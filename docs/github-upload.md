# GitHub Upload Guide

Run these commands from this project folder:

```bash
cd "/Users/se1npark/Documents/New project/side-projects/company-it-service-platform"
git init -b main
git add .
git commit -m "feat: scaffold company IT service platform"
gh repo create company-it-service-platform --public --source=. --remote=origin --push
```

If you want to keep the repo private while polishing:

```bash
gh repo create company-it-service-platform --private --source=. --remote=origin --push
```

## Suggested GitHub Description

Internal IT service platform with React, TypeScript, Node.js, Express, PostgreSQL-ready schema, RAG-style support copilot, and Microsoft 365 onboarding automation lab.

## Suggested Topics

```text
react typescript nodejs express postgresql helpdesk it-support microsoft-365 entra-id rag pgvector portfolio
```

## Before Publishing

- Check the README renders correctly.
- Add screenshots from the dashboard.
- Keep `.env` files out of Git.
- Use the public repo only after mock company data is confirmed safe.

