# KYD — Keep Your Dear ones safe

## Overview

KYD is an Italian marketplace web app that connects families with verified caregivers for children, pets, and elders (babysitter, pet-sitter, badanti). Italian-language UI with a warm terra cotta + sage palette.

## Stack

- **Monorepo**: pnpm workspaces, Node 24, TypeScript 5.9
- **Frontend**: React + Vite (artifacts/kyd) — wouter routing, TanStack Query, Tailwind, Framer Motion, lucide-react, react-leaflet
- **Backend**: Express 5 (artifacts/api-server), PostgreSQL + Drizzle ORM (lib/db)
- **API contract**: OpenAPI spec at `lib/api-spec/openapi.yaml`, Orval-generated React Query hooks (`@workspace/api-client-react`) and Zod schemas (`@workspace/api-zod`)

## Domain

Tables: `caregivers`, `reviews`, `bookings`, `chat_messages`. Seeded with 12 Italian caregivers across Milano, Roma, Torino, Bologna, Firenze, Napoli, Verona.

API endpoints: caregivers list/detail/reviews, featured reviews, bookings (create/recent), chat messages (list/send), stats overview, top cities.

## Routes

`/`, `/come-funziona`, `/famiglie`, `/caregiver`, `/sicurezza`, `/prezzi`, `/chi-siamo`, `/contatti`, `/ricerca` (with Leaflet map), `/profilo/:id` (with operative-radius map), `/chat/:room` (polling), `/prenota/:id`.

## Key Commands

- `pnpm --filter @workspace/api-spec run codegen` — regen API hooks/Zod
- `pnpm --filter @workspace/db run push` — push DB schema
- `pnpm --filter @workspace/scripts run seed-kyd` — reseed Italian caregivers and reviews
