import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.redirect(new URL("/login", siteUrl), 303);
  }

  const formData = await request.formData();
  const requestedPlan = String(formData.get("plan") ?? "monthly");
  const plan = requestedPlan === "yearly" ? "yearly" : "monthly";

  const priceId =
    plan === "yearly"
      ? process.env.STRIPE_YEARLY_PRICE_ID
      : process.env.STRIPE_MONTHLY_PRICE_ID;

  if (!priceId) {
    return NextResponse.json(
      { error: `Stripe ${plan} pricing has not been configured.` },
      { status: 503 }
    );
  }

  const stripe = getStripe();
  const admin = createAdminClient();

  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select(
      "stripe_customer_id, stripe_subscription_id, subscription_status"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Unable to load customer profile:", profileError);

    return NextResponse.json(
      { error: "Unable to load your subscription details." },
      { status: 500 }
    );
  }

  const currentStatus = profile?.subscription_status ?? "";

  if (
    profile?.stripe_subscription_id &&
    ["trialing", "active", "past_due", "unpaid"].includes(currentStatus)
  ) {
    return NextResponse.redirect(
      new URL("/dashboard?subscription=existing", siteUrl),
      303
    );
  }

  let customerId = profile?.stripe_customer_id;

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        supabase_user_id: user.id,
      },
    });

    customerId = customer.id;

    const { error: profileUpdateError } = await admin
      .from("profiles")
      .upsert({
        id: user.id,
        email: user.email,
        stripe_customer_id: customerId,
      });

    if (profileUpdateError) {
      console.error(
        "Unable to save Stripe customer ID:",
        profileUpdateError
      );

      return NextResponse.json(
        { error: "Unable to prepare your Stripe customer account." },
        { status: 500 }
      );
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,

    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    allow_promotion_codes: true,

    metadata: {
      supabase_user_id: user.id,
      plan,
    },

    subscription_data: {
      trial_period_days: 3,
      metadata: {
        supabase_user_id: user.id,
        plan,
      },
    },

    success_url: `${siteUrl}/dashboard?checkout=success`,
    cancel_url: `${siteUrl}/pricing?checkout=cancelled`,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a checkout URL." },
      { status: 500 }
    );
  }

  return NextResponse.redirect(session.url, 303);
}