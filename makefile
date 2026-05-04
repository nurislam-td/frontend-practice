.PHONY: json dev back migrate migrations


json:
	pnpm json-server --watch db.json --port 8000

dev:
	pnpm dev

# Backend scripts
back:
	cd backend/src && uv run uvicorn main:app --reload --port 8000

# make migrations m='name'
migrations:
	cd backend/src && uv run alembic revision --autogenerate -m $(m)

migrate: 
	cd backend/src && uv run alembic upgrade head 

downgrade: 
	cd backend/src && uv run alembic downgrade head -1