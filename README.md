# FANVIRA v5

Luxury jewelry storefront starter built for Next.js + PostgreSQL/Prisma + Redis, with payment-provider placeholders for Stripe and PayPal.

## Run
1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Add database credentials.
4. `npx prisma generate`
5. `npx prisma db push`
6. `npm run dev`

## Deploy
Designed to be pushed to GitHub and deployed on Railway. Add the environment variables in Railway; never commit `.env.local`.
