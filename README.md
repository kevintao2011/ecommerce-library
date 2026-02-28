# @ecommerce-monorepo/types

Shared TypeScript types for the ecommerce monorepo.

## How to share types

1. **Define types in `lib/src/`** – Add a `.ts` file (e.g. `user.ts`) and export your types.
2. **Re-export from the barrel** – In `lib/src/index.ts`, add `export * from './your-file.js';` (use `.js` for ESM).
3. **Build the lib** – From repo root: `pnpm run build:lib` (emits `lib/dist/`).
4. **Use in other packages** – In `package.json` add `"@ecommerce-monorepo/types": "workspace:*"`, run `pnpm install`, then import.

## Example: ecommerce user

Shared types in `lib/src/user.ts`:

- **`UserRole`** – `'customer' | 'seller' | 'admin'`
- **`EcommerceUser`** – `id`, `email`, `displayName`, `role`, `createdAt`, `updatedAt`
- **`EcommerceUserInput`** – shape for create/update (email, displayName, role, optional id)

Import in any workspace package:

```ts
import type { EcommerceUser, UserRole, EcommerceUserInput } from '@ecommerce-monorepo/types';
```

## Usage

From another workspace package (e.g. `ecommerce-system`), add to `package.json`:

```json
{
  "dependencies": {
    "@ecommerce-monorepo/types": "workspace:*"
  }
}
```

Then run from repo root: `pnpm install`

Import in code:

```ts
import type { Id, PaginationParams, PaginatedResult } from '@ecommerce-monorepo/types';
import type { EcommerceUser, UserRole } from '@ecommerce-monorepo/types';
```

## Build

From repo root:

```bash
pnpm build:lib
```

Or from this folder: `pnpm run build`
