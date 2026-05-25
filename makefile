.PHONY: json dev back migrate migrations draft

sync:
	pnpm install && cd backend && uv sync 

json:
	pnpm json-server --watch db.json --port 8000

front:
	pnpm dev

# Backend scripts
back:
	cd backend/src && uv run uvicorn main:app --reload --port 8000 --host 0.0.0.0

# make migrations m='name'
migrations:
	cd backend/src && uv run alembic -c setup/db/alembic.ini revision --autogenerate -m '$(m)'

migrate: 
	cd backend/src && uv run alembic -c setup/db/alembic.ini upgrade head 

downgrade: 
	cd backend/src && uv run alembic -c setup/db/alembic.ini downgrade head -1

draft:
	cd backend/src && uv run python draft.py



rsa_keys:
	cd backend && uv run python gen_rsa_keys.py