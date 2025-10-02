# Monorepo for SPA (Vite + React) & API (Laravel)

- client/: React SPA (Vite). UI, filters, add form, pagination, Redux Toolkit state
- server/: Laravel REST API. Products, categories, favorites, filtering and pagination

## Quick start

### Client

1. cd client
2. Run container:
   `docker compose up --build -d`
3. Open app: http://localhost:4173

`or`

1. cd client
2. npm i
3. npm run dev

### Server (Laravel)

1. cd server
2. Run container:
   `docker-compose up -d --build`
3. Run migrations:
   `docker-compose exec user_preference_dashboard_app php artisan migrate --seed`
4. Open API: http://localhost:8080

## Code Style

- ESLint + Prettier configured in client
- CI runs lint (client)

### Project architecture

- Simplified feature-based approach:
  - `features/products` contains everything for catalog (pages, components, Redux).
  - `shared` keeps reusable hooks, utils and UI.
  - `layouts` for extensibility (e.g., if auth appears).

This approach keeps the code scalable and still simple to read.
