# @ecommerce-monorepo/shared

Shared types and utilities for the ecommerce monorepo.

## Contents

- **Types** – `common.ts`, `user.ts` (IDs, pagination, user shapes).
- **Shared functions** – e.g. `elastic.ts` (Elasticsearch log entry builder, index name constant).

## How to share types

1. **Define in `src/`** – Add a `.ts` file and export types (and/or functions).
2. **Re-export from the barrel** – In `src/index.ts`, add `export * from './your-file.js';` (use `.js` for ESM).
3. **Build** – From repo root: `pnpm run build:lib` (emits `dist/`).
4. **Use in other packages** – In `package.json` add `"@ecommerce-monorepo/shared": "workspace:*"`, run `pnpm install`, then import.

## Example: ecommerce user types

Shared types in `src/user.ts`:

- **`UserRole`** – `'customer' | 'seller' | 'admin'`
- **`EcommerceUser`** – `id`, `email`, `displayName`, `role`, `createdAt`, `updatedAt`
- **`EcommerceUserInput`** – shape for create/update

```ts
import type { EcommerceUser, UserRole, EcommerceUserInput } from '@ecommerce-monorepo/shared';
```

## Example: Elasticsearch helpers

Shared in `src/elastic.ts`:

- **`DEFAULT_APP_LOGS_INDEX`** – default index name for app logs.
- **`AppLogEntry`** – type for a log document.
- **`buildAppLogEntry(params)`** – builds a log entry with `timestamp` set.

```ts
import { buildAppLogEntry, DEFAULT_APP_LOGS_INDEX, type AppLogEntry } from '@ecommerce-monorepo/shared';
```

## Usage in another package

In `package.json` (e.g. ecommerce-system):

```json
{
  "dependencies": {
    "@ecommerce-monorepo/shared": "workspace:*"
  }
}
```

Then from repo root: `pnpm install`

```ts
import type { Id, PaginationParams, PaginatedResult } from '@ecommerce-monorepo/shared';
import type { EcommerceUser, UserRole } from '@ecommerce-monorepo/shared';
import { buildAppLogEntry, DEFAULT_APP_LOGS_INDEX } from '@ecommerce-monorepo/shared';
```

## Build

From repo root: `pnpm run build:lib`  
Or from this folder: `pnpm run build`
