# HiIK-2-ADHAI-JAMSHORO

A full-stack restaurant website for Jamshoro. Customers can explore the menu, add dishes to their cart, place order requests, reserve a table, and contact the restaurant. A protected dashboard helps the owner review restaurant activity.

[Open the live website](https://fullstack-javascript-starter.muhammadhasnainhyder.chatgpt.site)

## Core features

- Responsive home, menu, story, gallery, reservation, and contact pages
- Searchable menu with category filters and a persistent shopping cart
- Database-backed orders, reservations, messages, and reviews
- Server-side validation and verified order totals
- Protected management dashboard with charts and recent activity

## Tech stack

- React, Next.js, Vinext, and Vite
- Cloudflare D1 with Drizzle ORM
- Zod and React Hook Form
- Zustand, Motion, Embla Carousel, Recharts, Sonner, and Lucide React

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` unless the terminal shows a different port.

## Check the project

```bash
npm run lint
npm run db:generate
npm run build
```

## Project map

```text
src/app/         Pages, API routes, and application layout
src/components/  Shared interface components
src/modules/     Menu, reservation, contact, and review features
db/              Database connection and schema
drizzle/         Generated database migrations
public/images/   Local restaurant and food photography
```

No local secrets are required for the default setup. Restaurant photography is sourced from Pexels and stored locally in `public/images`.
