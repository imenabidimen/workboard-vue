# SignalDesk

A practical incident-management service for teams that need to turn noisy alerts into trackable incidents.

## What it demonstrates
- Python 3.12 + FastAPI
- SQLAlchemy 2 + PostgreSQL
- Alert ingestion with deduplication windows
- Incident lifecycle and acknowledgement endpoints
- Background notification processing
- Pydantic validation and typed service boundaries
- Pytest unit/integration coverage
- Docker Compose and GitHub Actions CI

## Local setup

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL with `docker compose up -d db`.
3. Install dependencies with `pip install -r requirements.txt`.
4. Start with `uvicorn app.main:app --reload`.
5. Run `pytest`.

The domain model is deliberately small enough to understand in one sitting, while still showing the kind of reliability concerns that appear in real services.
