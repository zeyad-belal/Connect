# Connect — NestJS Backend

A NestJS + Prisma + PostgreSQL re-implementation of the Connect services marketplace API (port of `server-postgre`).

## Stack

- **NestJS 11** (modules, guards, pipes, interceptors, exception filters)
- **Prisma 6** + **PostgreSQL**
- JWT auth (`@nestjs/passport` + passport-jwt, Bearer tokens)
- `class-validator` DTOs, global `ValidationPipe`
- ImageKit (uploads), Stripe (checkout), Socket.IO (chat/notifications)

## Setup

```bash
npm install
cp .env.example .env        # then fill in the values
npm run prisma:generate
npm run prisma:migrate      # creates tables in your DATABASE_URL
npm run dev                 # http://localhost:3000
```

## Project layout

```
src/
  main.ts            bootstrap (global pipe, CORS)
  app.module.ts      module wiring + global guards/filter
  prisma/            PrismaService (DB connection)
  config/            env validation
  common/            guards, decorators, exception filter
  modules/
    auth users categories services orders reviews payments uploads chat
```

## Auth model

Every route is protected by a global `JwtAuthGuard`. Routes opt out with
`@Public()` (signup, login, public reads). Role restrictions use
`@Roles('admin', 'superAdmin')`; order mutations use `OrderOwnershipGuard`.

Send the token as `Authorization: Bearer <token>`.

## Differences from the Express version

These may require small tweaks in the React client:

1. Auth endpoints live under `/auth/*` (`/auth/signup`, `/auth/login`,
   `/auth/admin/login`, `/auth/me`).
2. `Authorization: Bearer <token>` header format (was a raw token).
3. Request bodies are **camelCase** (`firstName`, not `first_name`).
4. `GET /reviews` takes `?serviceId=` as a query param (was a body field).
5. Socket.IO events send a single payload object (`{ message, room }`), and the
   socket must connect authenticated: `io(URL, { auth: { token } })`.
6. Passwords are hashed on signup; Stripe key and all secrets come from env.

### Security hardening (also client-affecting)

- **Signup** no longer accepts `role` — new users are always `user`. Promotion
  happens via the admin-only `PATCH /users/dashboard/:id`.
- **`PATCH /users/:id`** can no longer change `role`, and a user may only edit
  their own profile (admins may edit anyone).
- **Service / review update & delete** require ownership (the seller/author) or
  an admin.
- **`GET /orders`** is admin-only; `GET /orders/buyer/:id` and `seller/:id`
  require the id to be your own (or admin); `GET /orders/:id` admits the buyer,
  seller, or superAdmin.
- **Checkout** (`POST /payments/create-checkout-session`) now takes
  `items: [{ serviceId, quantity }]`; name and price are resolved server-side,
  so prices can't be tampered with client-side.
- **WebSocket** connections require a valid JWT and CORS is restricted to
  `CORS_ORIGINS`. (Room-level membership is not yet order-scoped — see the note
  in `chat.gateway.ts`.)

Resource routes (`/services`, `/categories`, `/orders`, `/reviews`) and
response shapes are otherwise preserved.
