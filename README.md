# Flyin — Travel Booking System

A full-stack, bilingual (Arabic RTL / English) travel booking website modeled on
[flyin.com](https://www.flyin.com/): flights, hotels, flight + hotel packages, deals,
user accounts and a complete booking flow.

## Features

- **Flights** — search with a distance-based mock inventory, results with filters
  (stops, airlines, price) and sorting, select → checkout.
- **Hotels** — search by city, filters (price, stars, amenities), detail pages with
  gallery, book → checkout.
- **Packages & Offers** — curated flight+hotel bundles and time-limited deals.
- **Accounts** — register / login (JWT httpOnly-cookie sessions), protected pages,
  “My bookings”.
- **Booking flow** — passenger/guest details, mock payment, confirmation with a
  reference code, saved to the database.
- **Bilingual** — Arabic (RTL) ⇄ English (LTR) with a language toggle, SAR currency,
  fully mirrored layouts via `next-intl`.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| i18n / RTL | next-intl (`[locale]` segment, `dir` switching) |
| Database | Prisma ORM + SQLite (dev) — swap the datasource for MySQL/Postgres in prod |
| Auth | Custom sessions — `bcryptjs` + `jose` JWT in an httpOnly cookie |
| Validation | Zod |
| Icons / dates | lucide-react, date-fns |

## Getting started

```bash
npm install
npx prisma generate          # generate the Prisma client
npm run db:push              # create the SQLite database (prisma/dev.db)
npm run db:seed              # seed hotels, packages, offers and a demo user
npm run dev                  # http://localhost:3000
```

Then open **http://localhost:3000** (it redirects to `/en`; Arabic is at `/ar`).

### Demo account

```
email:    demo@flyin.com
password: password123
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run db:push` | Sync the Prisma schema to the database |
| `npm run db:seed` | Seed reference + demo data |
| `npm run db:reset` | Reset the database and re-seed |
| `npm run db:studio` | Open Prisma Studio |

## Project structure

```
src/
  app/[locale]/        # localized pages (home, flights, hotels, packages, offers,
                       # login, register, account, checkout, booking/confirmation, …)
  app/api/             # route handlers (auth, flights/search, hotels/search, bookings)
  components/          # layout, search widget, cards, flights, hotels, booking, auth
  lib/                 # db, auth/session, pricing, formatting, mock flight generator
  lib/data/            # static reference data (airports, airlines, cities)
  i18n/                # next-intl routing / navigation / request config
messages/              # en.json, ar.json
prisma/                # schema.prisma, seed.ts
```

## Notes

- Flights are generated deterministically from a static airport dataset (a real search
  would call a supplier API); hotels, packages, offers, users and bookings live in the
  database.
- Payment at checkout is **mocked** — no real charge is made.
- **Production DB:** change the `datasource` provider in `prisma/schema.prisma` to
  `mysql`/`postgresql` and set `DATABASE_URL` accordingly, then `prisma migrate deploy`.
- Set a strong `AUTH_SECRET` in `.env` for production.
