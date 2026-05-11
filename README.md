# Company IT Service Platform

Portfolio-ready internal IT operations system for a small company helpdesk. It combines a service desk API, a React admin dashboard, a RAG-style support copilot, and a Microsoft 365 / Entra ID onboarding automation lab.

This repo is designed for entry-level IT Support, Service Desk, Junior Full Stack, and AI-enabled support roles. It is intentionally practical: tickets, users, assets, onboarding, audit-style activity, troubleshooting docs, and AI-assisted resolution suggestions.

## Why This Project

Many junior portfolios show a standalone CRUD app or a simple chatbot. This project is framed as a real internal IT workflow:

- Employees report issues with Microsoft 365, VPN, Wi-Fi, Teams, hardware, software, or accounts.
- The API manages tickets, assets, users, status changes, and operational data.
- The dashboard helps support agents triage requests and view assets, users, and SLA signals.
- The copilot classifies a request, retrieves relevant knowledge articles, and suggests next steps with citations.
- The Microsoft 365 lab documents onboarding and offboarding automation with PowerShell-friendly mock data.

## Tech Stack

- Frontend: React, TypeScript, Vite, CSS, Recharts, lucide-react
- Backend: Node.js, Express, TypeScript, Zod
- Database target: PostgreSQL with pgvector via Docker Compose
- AI workflow: RAG-style retrieval over internal knowledge base docs, confidence scoring, citation display
- IT Support lab: PowerShell, CSV workflows, Microsoft Graph-ready structure
- Quality: Vitest tests, typed shared models, OpenAPI documentation

## Repo Structure

```text
apps/
  api/              Express API and support copilot service
  web/              React IT operations dashboard
packages/
  shared/           Shared TypeScript models and constants
knowledge-base/     Troubleshooting guides used by the copilot
labs/
  m365-onboarding/  Microsoft 365 / Entra ID onboarding automation lab
docs/               Architecture, OpenAPI, roadmap, evaluation plan
```

## Quick Start

```bash
npm install
npm run dev
```

The API starts on `http://localhost:4000` and the dashboard starts on `http://localhost:5173`.

Optional PostgreSQL target:

```bash
docker compose up -d postgres
```

The current MVP runs with seeded in-memory data so the project is easy to demo without a database. The Prisma schema and Docker Compose file show the intended PostgreSQL/pgvector production path.

GitHub upload commands are documented in [`docs/github-upload.md`](docs/github-upload.md).

## Demo Workflows

1. Open the dashboard and review ticket volume, critical issues, category split, and recent activity.
2. Filter tickets by priority, status, category, or text search.
3. Open a ticket and review affected user, assigned asset, SLA, and comments.
4. Use the copilot panel with an issue such as: `I cannot sign in to Outlook after my password reset and MFA keeps looping.`
5. Review classification, confidence score, suggested resolution steps, and cited knowledge articles.
6. Open `labs/m365-onboarding` to review the mock new-starter automation flow.

## Portfolio Talking Points

- Built an IT service platform using React, Node.js, TypeScript, and PostgreSQL-oriented data modelling.
- Implemented helpdesk ticket lifecycle management, asset tracking, user onboarding data, and role-aware operational views.
- Designed a RAG-style assistant that classifies support requests, retrieves troubleshooting documentation, and returns cited resolution steps.
- Added Microsoft 365 / Entra ID onboarding automation scripts and runbooks to connect the software project to real IT Support workflows.
- Documented API contracts, architecture, AI evaluation strategy, and phased delivery plan.

## Next Milestones

- Persist API data with Prisma and PostgreSQL.
- Store knowledge chunks and embeddings in pgvector.
- Add authentication with support agent, admin, and employee roles.
- Add ticket audit log persistence and email/Teams notification hooks.
- Add screenshots and a short demo video after the UI is deployed.
