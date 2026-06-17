# NestJS Backend (`server-nest-postgre`) — Design

**Date:** 2026-06-17
**Status:** Approved
**Goal:** Re-implement the existing `server-postgre` Express backend ("Connect" services marketplace) using the latest NestJS framework, PostgreSQL, and Prisma — idiomatic NestJS with the current bugs fixed.

## Context

The existing backend (`server-postgre`) is an Express 5 + Prisma 6 app for a Fiverr-style services marketplace. Domain entities: `User`, `Service`, `Category`, `Order`, `OrderItem`, `CartItem`, `Review`. Three roles: `user`, `admin`, `superAdmin`. It uses raw controller functions with per-route Express middleware for auth (JWT), validation (Joi), and file upload (Multer → ImageKit). It also integrates Stripe checkout and Socket.IO for chat/notifications.

Known issues being fixed in the port:
- Signup stores the password **without hashing** (login uses `bcrypt.compare`, so logins are currently broken).
- JWT is sent as a **raw `authorization` header** (no `Bearer`).
- Stripe secret key is **hardcoded** in source.

## Decisions

- **Fidelity:** Idiomatic NestJS, fix bugs. Small React-client tweaks are acceptable.
- **Integrations:** Keep ImageKit uploads, Stripe checkout, and Socket.IO chat/notifications. Skip Swagger/tests for now.

## Stack

- NestJS 11 + TypeScript, Prisma 6 + PostgreSQL (reuse existing `schema.prisma`).
- `@nestjs/config` for env (Stripe / JWT / ImageKit secrets).
- Auth: `@nestjs/jwt` + `@nestjs/passport` (passport-jwt), **Bearer tokens**.
- Validation: `class-validator` + `class-transformer` DTOs via global `ValidationPipe`.
- `bcrypt` (hash passwords on signup), `@nestjs/platform-socket.io`, `imagekit`, `stripe`.

## Module structure

```
src/
  main.ts                      # bootstrap, global pipe/filter, CORS
  app.module.ts
  prisma/                      # PrismaModule + PrismaService (global)
  config/                      # env schema validation
  common/
    guards/                    # JwtAuthGuard, RolesGuard, OrderOwnershipGuard
    decorators/                # @CurrentUser, @Roles, @Public
    filters/                   # AllExceptionsFilter
  modules/
    auth/                      # signup, login, admin-login, me + JwtStrategy
    users/                     # user CRUD + avatar upload
    categories/                # CRUD + image
    services/                  # CRUD + filtering (by category/seller) + images
    orders/                    # CRUD, status/chat/reviewed updates, ownership guards
    reviews/                   # CRUD, seller reviews
    payments/                  # Stripe checkout
    uploads/                   # shared ImageKitService
    chat/                      # WebSocket gateway (messages + notifications)
```

Each domain module = `controller` + `service` + `dto/`. Controllers stay thin; services hold business logic + Prisma calls.

## Auth & authorization

- `JwtStrategy` verifies the Bearer token and loads the user. Global `JwtAuthGuard` protects all routes; `@Public()` opts out signup/login/public reads.
- `RolesGuard` + `@Roles('admin','superAdmin')` replaces `verfiyAdminToken` / `verifySuperAdmin`.
- Order ownership (`canDeleteOrder` / `canUpdateOrder`) becomes `OrderOwnershipGuard`.
- `rememberMe` controls JWT expiry (1h vs 1y).

## Changes from the original (may need small client tweaks)

1. Auth routes move to `/auth/*` (`/auth/signup`, `/auth/login`, `/auth/admin/login`, `/auth/me`).
2. `Authorization: Bearer <token>` header format.
3. camelCase request bodies (`firstName` not `first_name`).
4. Passwords hashed; Stripe key from env; consistent JSON error shape.

Resource routes (`/services`, `/categories`, `/orders`, `/reviews`) and response shapes are preserved.

## Error handling & uploads

- One `AllExceptionsFilter` returns `{ status, message, errors }` (matching the current shape) and translates Prisma errors (e.g. `P2002` → 409 duplicate) centrally.
- Uploads use Nest's `FileInterceptor` / `FilesInterceptor` (memory storage) → `ImageKitService`.

## Endpoint map (target)

| Area | Method & Path | Auth |
|------|---------------|------|
| Auth | POST `/auth/signup` | public |
| Auth | POST `/auth/login` | public |
| Auth | POST `/auth/admin/login` | public |
| Auth | GET `/auth/me` | user |
| Users | GET `/users` | admin |
| Users | GET `/users/:id` | user |
| Users | PATCH `/users/:id` (avatar) | user |
| Users | PATCH `/users/dashboard/:id` | admin |
| Users | DELETE `/users/:id` | superAdmin |
| Categories | GET `/categories`, GET `/categories/:id` | public |
| Categories | POST/PATCH/DELETE `/categories` | admin |
| Services | GET `/services`, `/services/:id`, `/services/filtered/:id`, `/services/seller/:id`, `/services/filteredFour/:id` | public |
| Services | POST/PUT/DELETE `/services` | user |
| Orders | GET `/orders`, `/orders/:id`, `/orders/buyer/:id`, `/orders/seller/:id` | user |
| Orders | POST `/orders` | user |
| Orders | PATCH `/orders/:id`, `/orders/chat/:id`, `/orders/reviewed/:id` | owner |
| Orders | DELETE `/orders/:id` | owner / superAdmin |
| Reviews | GET `/reviews`, `/reviews/sellerReviews/:id` | user |
| Reviews | POST/PUT/DELETE `/reviews` | user |
| Payments | POST `/payments/create-checkout-session` | user |
| Chat | Socket.IO: `send-message`, `send-noti`, `join-room` | — |
