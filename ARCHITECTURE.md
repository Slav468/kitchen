# Kitchen App Architecture

Масштабируемая архитектура Next.js приложения "Татарская кухня".

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── auth/           # API роуты аутентификации
│   │       ├── login/      # POST /api/auth/login
│   │       ├── register/   # POST /api/auth/register
│   │       └── me/         # GET /api/auth/me
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── recipes/            # Recipes route
│   ├── ingredients/        # Ingredients route
│   └── about/              # About route
│
├── api/                    # API клиент для фронтенда
│   └── client.ts           # API клиент с авторизацией
│
├── components/
│   ├── common/             # Общие компоненты (модалки и т.д.)
│   └── UI/                 # Переиспользуемые UI компоненты
│       └── Header/         # Header с навигацией и auth
│
├── config/                 # Конфигурация приложения
│   └── site.config.ts      # Настройки сайта (title, navItems)
│
├── forms/                  # Формы
│   ├── login.form.tsx      # Форма входа
│   ├── registration.form.tsx # Форма регистрации
│   ├── useAuthSubmit.ts    # Хук отправки форм
│   └── validation.ts       # Валидация полей
│
├── hooks/                  # Кастомные хуки
│   ├── useRecipes.ts       # Хук для рецептов
│   └── useAuth.tsx         # AuthProvider + useAuth контекст
│
├── lib/                    # Серверные библиотеки
│   └── prisma.ts           # Prisma клиент (серверный)
│
├── modules/                # Функциональные модули
│   ├── recipes/            # Модуль рецептов
│   │   ├── components/     # Компоненты рецептов (.tsx)
│   │   ├── hooks/          # Хуки рецептов
│   │   ├── services/       # Сервисы рецептов
│   │   └── index.ts        # Barrel export
│   ├── ingredients/        # Модуль ингредиентов
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.ts
│   └── categories/         # Модуль категорий
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── index.ts
│
├── services/               # Глобальные сервисы
│   ├── recipes.ts
│   ├── ingredients.ts
│   └── categories.ts
│
├── utils/                  # Утилиты и хелперы
│   ├── index.ts
│   └── jwt.ts              # JWT sign/verify
│
├── types/                  # TypeScript типы
│   └── index.ts
```

## 🎯 Принципы архитектуры

### 1. Разделение ответственности

- **UI Components** (`components/UI/`) — переиспользуемые компоненты
- **Modules** (`modules/`) — функциональные модули с собственной логикой
- **Services** (`services/`) — работа с данными и API
- **Hooks** (`hooks/`) — кастомная логика состояния
- **Utils** (`utils/`) — вспомогательные функции
- **Forms** (`forms/`) — компоненты и логика форм
- **API** (`api/`) — клиент для HTTP-запросов

### 2. Модульная структура

Каждый модуль (`recipes`, `ingredients`, `categories`) содержит:

- `components/` — компоненты модуля (`.tsx`)
- `hooks/` — хуки модуля
- `services/` — бизнес-логика модуля
- `index.ts` — barrel export

### 3. Клиентские компоненты

- Только компоненты, работающие с состоянием, помечены `'use client'`
- Layout и page компоненты остаются серверными (SSR)
- Максимально используется Server-Side Rendering
- Аутентификация: AuthProvider оборачивает layout, `useAuth()` доступен только в `'use client'`

### 4. Импорты

```tsx
// ✅ Правильно — из barrel export
import { Header } from '@/components/UI';
import { RecipesList } from '@/modules/recipes';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/api/client';

// ❌ Неправильно — прямые импорты из подпапок
import Header from '@/components/UI/Header/Header';
import { prisma } from '@/lib/prisma'; // ✅ только в server components / API routes
```

### 5. Аутентификация

- **JWT токены** — генерируются на сервере при логине/регистрации
- **localStorage** — токен хранится на клиенте
- **AuthProvider** — контекст, восстанавливающий сессию при загрузке
- **API middleware** — `api/client.ts` автоматически добавляет Bearer-токен
- **Protected routes** — проверка токена через `/api/auth/me`

## 🔄 Взаимодействие слоёв

```
App (Routes)
  ↓
Page Components (Server Components)
  ↓
Module Components (Client Components) + Hooks + Forms
  ↓
Services / apiClient (HTTP calls with auth)
  ↓
API Routes (Next.js App Router)
  ↓
Prisma (Database)
```

## 🚀 Добавление новой функции

1. **Создать модуль** в `src/modules/feature-name/`
2. **Определить типы** в `src/types/`
3. **Создать сервис** в `src/services/`
4. **Создать хуки** в `src/hooks/`
5. **Создать компоненты** в `src/modules/feature-name/components/` (`.tsx`)
6. **Создать маршрут** в `src/app/feature-name/page.tsx`
7. **Экспортировать** через `index.ts`

## ✅ Преимущества

- 📦 Модульность и масштабируемость
- 🔄 Минимальные циклические зависимости
- 🧪 Простое тестирование (services, hooks, utils изолированы)
- 📚 Чистая архитектура
- 🎯 Ясная ответственность каждого слоя
- 🚀 Легко добавлять новые функции
- 🔐 Встроенная аутентификация с ролями
