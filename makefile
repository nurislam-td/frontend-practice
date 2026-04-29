.PHONY: json


json:
	pnpm json-server --watch db.json --port 8000

dev:
	pnpm dev