# Monorepo for SPA (Vite + React) & API (Laravel)

- client/: React SPA (Vite). UI, фильтры, форма добавления, пагинация, Redux Toolkit state
- server/: Laravel REST API. Продукты, категории, фавориты, фильтрация и пагинация

## Быстрый старт

### Client

1. cd client
2. npm i
3. npm run dev

### Server (Laravel, скелет позже)

1. cd server
2. Поднять контейнеры:
   `docker-compose up -d --build`
3. Выполнить миграции:
   `docker-compose exec user_preference_dashboard_app php artisan migrate --seed`
4. Проверить API: http://localhost:8080

## Code Style

- ESLint + Prettier настроены в client
- CI запускает lint (client)

### Архитектура проекта

- Используется упрощённый feature-based подход:
  - `features/products` содержит всё для работы с каталогом (страницы, компоненты, Redux).
  - `shared` хранит переиспользуемые хуки, утилиты и UI.
  - `layouts` нужны для расширяемости (например, если появится авторизация).

Такой подход выбран, чтобы код было легко масштабировать в будущем, но структура при этом остаётся максимально простой для чтения.
