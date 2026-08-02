import { redirect } from "next/navigation";
import {
  CalendarDays,
  Check,
  CreditCard,
  ExternalLink,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

function formatDate(value: string | null | undefined) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status,current_period_end,stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  const status = profile?.subscription_status ?? "inactive";
  const active = ["active", "trialing"].includes(status);

  return (
    <div className="portal-page">
      <header className="portal-page-header">
        <div>
          <span>BILLING & MEMBERSHIP</span>
          <h1>Manage your subscription</h1>
          <p>
            Review your current plan, renewal information and secure Stripe
            billing options.
          </p>
        </div>
      </header>

      <section className="portal-billing-grid">
        <article className="portal-panel portal-billing-plan">
          <div className="portal-panel-heading compact">
            <div>
              <span className="portal-panel-kicker">CURRENT PLAN</span>
              <h2>Professional</h2>
            </div>
            <span className={`portal-small-status ${active ? "is-active" : "is-inactive"}`}>
              {status.toUpperCase()}
            </span>
          </div>

          <div className="portal-billing-price">
            <span>£</span><b>75</b><small>/month</small>
          </div>

          <ul className="portal-plan-list">
            <li><Check size={15} /> Deal Finder Pro desktop access</li>
            <li><Check size={15} /> Germany, France, Italy and Spain research</li>
            <li><Check size={15} /> Deal Vault, exports and future updates</li>
            <li><Check size={15} /> Secure customer portal</li>
          </ul>

          {active && profile?.stripe_customer_id ? (
            <form action="/api/portal" method="POST">
              <button className="portal-button primary full" type="submit">
                <CreditCard size={17} />
                Open Stripe billing portal
              </button>
            </form>
          ) : (
            <form action="/api/checkout" method="POST">
              <button className="portal-button primary full" type="submit">
                Start three-day trial
              </button>
            </form>
          )}

          <p className="portal-keepa-note">
            Keepa subscriptions and token usage remain separate.
          </p>
        </article>

        <div className="portal-billing-side">
          <article className="portal-panel portal-info-card">
            <span className="portal-info-icon blue"><CalendarDays size={20} /></span>
            <div><small>Next renewal</small><b>{active ? formatDate(profile?.current_period_end) : "—"}</b><p>Your Stripe plan renews automatically unless cancelled.</p></div>
          </article>

          <article className="portal-panel portal-info-card">
            <span className="portal-info-icon green"><ShieldCheck size={20} /></span>
            <div><small>Billing security</small><b>Powered by Stripe</b><p>Payment details are managed securely by Stripe.</p></div>
          </article>

          <article className="portal-panel portal-info-card">
            <span className="portal-info-icon orange"><ReceiptText size={20} /></span>
            <div><small>Invoices</small><b>Available in portal</b><p>Open the billing portal to view and download invoices.</p></div>
          </article>
        </div>
      </section>

      <section className="portal-panel portal-billing-help">
        <div>
          <span className="portal-panel-kicker">NEED HELP?</span>
          <h2>Questions about your membership?</h2>
          <p>Contact support before cancelling if you are experiencing a technical or billing issue.</p>
        </div>
        <a className="portal-button secondary" href="mailto:support@softwarebyjeeves.com">
          Contact support
          <ExternalLink size={15} />
        </a>
      </section>
    </div>
  );
}
