# Software By Jeeves — Amazon EU Deal Finder Pro

A premium SaaS-style website starter with:

- Responsive marketing landing page
- Supabase email/password customer accounts
- Stripe Checkout subscriptions
- Stripe customer billing portal
- Stripe webhook subscription syncing
- Subscription-gated customer dashboard
- Private, short-lived Supabase Storage download links
- Vercel-ready Next.js App Router structure

## 1. Install

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2. Supabase setup

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. In Storage, create a **private** bucket named `software-downloads`.
4. Upload the software ZIP to:
   `amazon-eu-deal-finder-pro/latest/Amazon-EU-Deal-Finder-Pro.zip`
5. Add the Supabase URL, anon key and service role key to `.env.local`.

Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.

## 3. Stripe setup

1. Create a Stripe product named `Amazon EU Deal Finder Pro`.
2. Add a recurring monthly GBP price.
3. Copy the Price ID into `STRIPE_PRO_MONTHLY_PRICE_ID`.
4. Enable and configure the Stripe customer portal.
5. Create a webhook endpoint:
   `https://YOUR-DOMAIN/api/stripe/webhook`
6. Subscribe it to:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
7. Add the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

For local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 4. Deploy

Deploy the repository to Vercel and add every `.env.example` value as a project environment variable. Set `NEXT_PUBLIC_SITE_URL` to the production domain.

## 5. Before launch

- Replace the sample £29/month price on the landing page if required.
- Replace `support@example.com`.
- Add final Privacy Policy, Terms, refund/cancellation wording and company details.
- Add product screenshots and final brand assets.
- Test failed payments, cancellations, renewals and download access.
- Confirm VAT/tax configuration in Stripe with an accountant.
- Code-sign the Windows executable to reduce download warnings.
- Add rate limiting, monitoring and transactional emails before significant scale.

## Security model

The browser never receives the Supabase service-role key or Stripe secret key. The `/api/download` route:

1. verifies the signed-in Supabase user;
2. checks the server-side subscription status;
3. creates a private Storage URL valid for 60 seconds;
4. redirects the customer to the temporary link.

Stripe webhooks are the source of truth for membership status.
