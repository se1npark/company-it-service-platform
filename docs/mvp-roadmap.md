# MVP Roadmap

## Phase 1: Demo-Ready Foundation

- Seeded API data for users, tickets, assets, and knowledge articles
- React dashboard with ticket filters and copilot panel
- Deterministic RAG-style copilot for repeatable demos
- PowerShell onboarding lab with mock CSV data
- Architecture, OpenAPI, and evaluation docs

## Phase 2: Real Persistence

- Add Prisma migrations
- Persist tickets, assets, users, comments, and audit logs
- Add database seed command
- Add Dockerised local API and database

## Phase 3: Authentication and Roles

- Add login
- Add admin, support agent, and employee roles
- Protect API routes with JWT middleware
- Restrict asset and user management to admin/support roles

## Phase 4: Real RAG

- Chunk markdown knowledge docs
- Generate embeddings
- Store embeddings in pgvector
- Add retrieval metrics
- Add optional OpenAI answer generation with citations

## Phase 5: Deployment Polish

- Add screenshots
- Add deployed demo links
- Add CI with tests and type checks
- Add demo video
- Add a short case-study section to the README

