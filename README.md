# Татарская кухня

Next.js приложение с рецептами татарской кухни, авторизацией и ролями пользователей.

## Стек

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Prisma + PostgreSQL
- JWT авторизация
- HeroUI

## Предварительные требования

- Node.js 18+
- PostgreSQL
- npm

## Быстрый старт

### 1. Установите зависимости

```bash
npm install
```

### 2. Настройте переменные окружения

Создайте файл `.env` в корне проекта:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kitchen?schema=public"
JWT_SECRET="your-secret-key-here"
```

### 3. Примените миграции и заполните базу данных

```bash
npx prisma migrate dev
npx prisma db seed
```

### 4. Запустите dev-сервер

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Тестовые пользователи

| Email             | Пароль    | Роль   |
| ----------------- | --------- | ------ |
| admin@kitchen.ru  | admin123  | ADMIN  |
| editor@kitchen.ru | editor123 | EDITOR |

## Доступные скрипты

```bash
npm run dev      # Запуск dev-сервера
npm run build    # Сборка для продакшена
npm run lint     # Линтинг
npx prisma studio # Открыть Prisma Studio
```

## Структура проекта

См. [ARCHITECTURE.md](./ARCHITECTURE.md).
