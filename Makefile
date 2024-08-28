d-lint:
	docker compose run --rm app pnpm run lint & pnpm run format
d-install:
	docker compose run --rm app pnpm install
d-build:
	docker compose build
d-up:
	docker compose up -d
d-down:
	docker compose down
d-re-up:
	docker compose down && docker compose up -d
