# Kitchen App Architecture

Масштабируемая архитектура Next.js приложения "Татарская кухня".

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── recipes/           # Recipes route
│   ├── ingredients/       # Ingredients route
│   ├── categories/        # Categories route
│   └── api/               # API routes
│
├── components/
│   └── UI/                # Переиспользуемые UI компоненты
│       └── Header/        # Header компоненты
│
├── modules/               # Функциональные модули
│   ├── recipes/           # Модуль рецептов
│   │   ├── components/    # Компоненты рецептов
│   │   ├── hooks/         # Хуки рецептов
│   │   ├── services/      # Сервисы рецептов
│   │   └── index.ts       # Barrel export
│   ├── ingredients/       # Модуль ингредиентов
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.ts
│   └── categories/        # Модуль категорий
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── index.ts
│
├── services/              # Глобальные сервисы
│   ├── recipes.ts
│   ├── ingredients.ts
│   └── categories.ts
│
├── hooks/                 # Кастомные хуки
│   ├── useRecipes.ts
│   ├── useIngredients.ts
│   └── useCategories.ts
│
├── utils/                 # Утилиты и хелперы
│   └── index.ts
│
├── types/                 # TypeScript типы
│   └── index.ts
│
└── api/                   # API интеграции
    └── client.ts          # API клиент
```

## 🎯 Принципы архитектуры

### 1. Разделение ответственности

- **UI Components** (`components/UI/`) — переиспользуемые компоненты
- **Modules** (`modules/`) — функциональные модули с собственной логикой
- **Services** (`services/`) — работа с данными и API
- **Hooks** (`hooks/`) — кастомная логика состояния
- **Utils** (`utils/`) — вспомогательные функции

### 2. Модульная структура

Каждый модуль (`recipes`, `ingredients`, `categories`) содержит:

- `components/` — компоненты модуля
- `hooks/` — хуки модуля
- `services/` — бизнес-логика модуля
- `index.ts` — barrel export

### 3. Клиентские компоненты

- Только компоненты, работающие с состоянием, помечены `'use client'`
- Layout и page компоненты остаются серверными (SSR)
- Максимально используется Server-Side Rendering

### 4. Импорты

```tsx
// ✅ Правильно — из barrel export
import { Header } from '@/components/UI';
import { RecipesList } from '@/modules/recipes';
import { useRecipes } from '@/hooks/useRecipes';

// ❌ Неправильно — прямые импорты из подпапок
import Header from '@/components/UI/Header/Header';
```

## 🔄 Взаимодействие слоёв

```
App (Routes)
  ↓
Page Components (Server Components)
  ↓
Module Components (Client Components) + Hooks
  ↓
Services (API calls)
  ↓
API Client
  ↓
Backend/External APIs
```

## 🚀 Добавление новой функции

1. **Создать модуль** в `src/modules/feature-name/`
2. **Определить типы** в `src/types/`
3. **Создать сервис** в `src/services/`
4. **Создать хуки** в `src/hooks/`
5. **Создать компоненты** в `src/modules/feature-name/components/`
6. **Создать маршрут** в `src/app/feature-name/page.tsx`
7. **Экспортировать** через `index.ts`

## ✅ Преимущества

- 📦 Модульность и масштабируемость
- 🔄 Минимальные циклические зависимости
- 🧪 Простое тестирование (services, hooks, utils изолированы)
- 📚 Чистая архитектура
- 🎯 Ясная ответственность каждого слоя
- 🚀 Легко добавлять новые функции
