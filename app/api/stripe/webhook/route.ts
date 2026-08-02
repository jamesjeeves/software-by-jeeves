import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 503 }
    );
  }

  const body = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Invalid webhook signature.";

    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription =
      event.data.object as Stripe.Subscription;

    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    const periodEnd =
      subscription.items.data[0]?.current_period_end ?? null;

    const { error } = await admin
      .from("profiles")
      .update({
        subscription_id: subscription.id,
        subscription_status: subscription.status,
        current_period_end:
          periodEnd !== null
            ? new Date(periodEnd * 1000).toISOString()
            : null,
      })
      .eq("stripe_customer_id", customerId);

    if (error) {
      console.error(
        "Failed to update subscription profile:",
        error
      );

      return NextResponse.json(
        { error: "Failed to update subscription profile." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}