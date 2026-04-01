# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Multi-Discipline Volleyball Coverage

Spike covers the full volleyball universe across 6 disciplines:
- **Men's** — VNL 2026 (8 international teams)
- **Women's** — VNL 2026 (8 international teams, inc. Turkey, Serbia, China)
- **Beach** — FIVB Beach Pro Tour (8 pairs)
- **Sitting** — World Para Volleyball (6 teams, Paralympic-focused)
- **NCAA Women's** — 10 top programs (Nebraska, Texas, Stanford, Kentucky, Pitt, Wisconsin, Penn State, UCLA, Louisville, Ohio State)
- **NCAA Men's** — 8 programs (BYU, Long Beach State, UCLA, Hawaii, Stanford, Pepperdine, Penn State, Grand Canyon)

Data lives in `constants/data.ts`. Each `Team`, `Match`, `Player`, and `NewsItem` has a `discipline` field.

## Planned: Data Warehouse Integration (ETA: end of April 2026)

**Current state:** All data is static dummy data in `constants/data.ts` — structured to match what real warehouse tables will look like.

**When the warehouse is ready, the swap requires:**

1. **Add the warehouse driver** to `artifacts/api-server` (package depends on warehouse type — Snowflake, BigQuery, Databricks, Redshift, Postgres, or REST API — ask user which one).
2. **Store credentials** as Replit secrets (connection string / account URL / API key depending on warehouse type).
3. **Add API routes** to `artifacts/api-server/src/routes/`:
   - `GET /api/matches?discipline=mens` → queries results table
   - `GET /api/standings?discipline=ncaa_womens` → queries standings table
   - `GET /api/players?discipline=womens` → queries player stats table
   - `GET /api/news?discipline=beach` → queries articles/news table
4. **Replace static imports** in the mobile app — swap `import { MATCHES } from "@/constants/data"` with `useQuery` calls against the API server. The `AppContext.tsx` is the right place to centralize these fetches.
5. **Add a cache layer** (optional) — the Replit PostgreSQL can store a synced snapshot so the app stays fast even if the warehouse has latency. Use a background job / cron to refresh every N minutes.

**Dummy data shape to match in warehouse queries:**
- `teams`: id, name, shortName, country, wins, losses, setsWon, setsLost, points, form (array), discipline, conference?
- `matches`: id, homeTeam, awayTeam, homeScore, awayScore, status (live/upcoming/finished), date, time, tournament, discipline, sets?
- `players`: id, name, position, team, country, number, discipline, stats (points, aces, blocks, digs, attacks)
- `news`: id, title, summary, category, date, readTime, discipline

## Onboarding Flow (Mobile)

A multi-step onboarding wizard runs after the user signs in for the first time:

- `app/index.tsx` — root redirect: checks auth + onboarding state and routes to `/login`, `/onboarding`, or `/(tabs)`
- `app/login.tsx` — branded "Spike" login screen with Replit OIDC sign-in
- `app/onboarding.tsx` — 5-step wizard: role → **discipline selection** → experience level (players/coaches only) → team selection (filtered by selected disciplines) → content interests
- `context/AppContext.tsx` — stores `UserPreferences` (role, disciplines, experienceLevel, favoriteTeams, contentInterests) in AsyncStorage; `completeOnboarding()` saves prefs and sets `isOnboarded: true`
- `app/(tabs)/index.tsx` — home screen shows a multi-discipline feed with per-discipline banners, live match badges, favorite team chips, and discipline filter pills
- `app/(tabs)/standings.tsx` — horizontal discipline tab bar (Men's / Women's / Beach / Sitting / NCAA ♀ / NCAA ♂), defaults to user's primary discipline
- `app/(tabs)/players.tsx` — discipline row + stat category row, filters PLAYERS array accordingly

To reset onboarding (for testing): tap the profile avatar on the home screen.

**NOTE: Twilio SMS was proposed but dismissed by the user. Do not re-propose automatically.**

## Authentication

Replit Auth (OpenID Connect with PKCE) is integrated for the mobile app.

- **API server**: Session-based auth using PostgreSQL-backed sessions (`sessionsTable`, `usersTable` in `lib/db/src/schema/auth.ts`).
  - `artifacts/api-server/src/lib/auth.ts` — OIDC config, session CRUD
  - `artifacts/api-server/src/middlewares/authMiddleware.ts` — loads user from session on every request
  - `artifacts/api-server/src/routes/auth.ts` — login/callback/logout (web) + mobile token exchange endpoints
  - `app.ts` uses `cookieParser` and `authMiddleware` before routes
- **Mobile app**: `expo-auth-session` PKCE flow in `artifacts/mobile/lib/auth.tsx` (`AuthProvider`, `useAuth()`).
  - Session token stored in `expo-secure-store`, passed as `Authorization: Bearer` header
  - `_layout.tsx` wraps the app in `AuthProvider` and registers the token getter
- Protected routes use `req.isAuthenticated()` to guard handlers.

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
