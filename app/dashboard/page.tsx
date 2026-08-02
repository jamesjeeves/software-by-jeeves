import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  FileClock,
  Gauge,
  Rocket,
  ShieldCheck,
  Sparkles,
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

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status,current_period_end")
    .eq("id", user.id)
    .maybeSingle();

  const status = profile?.subscription_status ?? "inactive";
  const active = ["active", "trialing"].includes(status);

  const emailName =
    user.email?.split("@")[0]?.replace(/[._-]/g, " ") || "member";

  return (
    <div className="portal-page">
      <header className="portal-dashboard-welcome">
        <div>
          <span>CUSTOMER CONTROL CENTRE</span>
          <h1>
            {getGreeting()}, <strong>{emailName}</strong>
          </h1>
          <p>
            Manage your membership, download the latest release and keep up
            with improvements to Amazon EU Deal Finder Pro.
          </p>
        </div>

        <div className={`portal-member-pill ${active ? "is-active" : "is-inactive"}`}>
          <span className="portal-member-pill-dot" />
          <div>
            <small>Membership</small>
            <b>{active ? "Professional" : "Inactive"}</b>
          </div>
        </div>
      </header>

      <section className="portal-dashboard-stat-grid">
        <article className="portal-panel portal-dashboard-stat">
          <span className="portal-dashboard-stat-icon blue">
            <ShieldCheck size={20} />
          </span>
          <div>
            <small>Subscription status</small>
            <b>{status === "trialing" ? "Trial active" : active ? "Active" : "Inactive"}</b>
            <p>
              {active
                ? "Your customer access is enabled."
                : "Start your trial to unlock downloads."}
            </p>
          </div>
        </article>

        <article className="portal-panel portal-dashboard-stat">
          <span className="portal-dashboard-stat-icon green">
            <Rocket size={20} />
          </span>
          <div>
            <small>Latest version</small>
            <b>Deal Finder Pro 1.3.0</b>
            <p>Stable Windows release available now.</p>
          </div>
        </article>

        <article className="portal-panel portal-dashboard-stat">
          <span className="portal-dashboard-stat-icon orange">
            <CalendarDays size={20} />
          </span>
          <div>
            <small>Next renewal</small>
            <b>{active ? formatDate(profile?.current_period_end) : "—"}</b>
            <p>Billing is managed securely through Stripe.</p>
          </div>
        </article>

        <article className="portal-panel portal-dashboard-stat">
          <span className="portal-dashboard-stat-icon purple">
            <Gauge size={20} />
          </span>
          <div>
            <small>Product channel</small>
            <b>Professional</b>
            <p>Includes future stable updates.</p>
          </div>
        </article>
      </section>

      <section className="portal-dashboard-main-grid">
        <article className="portal-panel portal-dashboard-release">
          <div className="portal-dashboard-release-top">
            <div>
              <span className="portal-panel-kicker">LATEST RELEASE</span>
              <h2>Amazon EU Deal Finder Pro 1.3.0</h2>
              <p>
                A stronger sourcing control centre with improved live scanning,
                clearer deal analysis and a better Deal Vault workflow.
              </p>
            </div>

            <span className="portal-version-badge">CURRENT</span>
          </div>

          <div className="portal-dashboard-release-features">
            <span><CheckCircle2 size={15} /> Improved live scan dashboard</span>
            <span><CheckCircle2 size={15} /> Clearer opportunity confidence</span>
            <span><CheckCircle2 size={15} /> Deal Vault reverification</span>
            <span><CheckCircle2 size={15} /> Excel-ready export workflow</span>
          </div>

          <div className="portal-dashboard-release-actions">
            {active ? (
              <a className="portal-button primary" href="/api/download">
                <Download size={16} />
                Download latest
              </a>
            ) : (
              <form action="/api/checkout" method="POST">
                <button className="portal-button primary" type="submit">
                  Start trial to download
                </button>
              </form>
            )}

            <Link className="portal-button secondary" href="/dashboard/releases">
              View release notes
              <ArrowRight size={15} />
            </Link>
          </div>
        </article>

        <aside className="portal-panel portal-dashboard-account">
          <div className="portal-panel-heading compact">
            <div>
              <span className="portal-panel-kicker">YOUR ACCOUNT</span>
              <h2>Membership overview</h2>
            </div>
            <CreditCard size={19} />
          </div>

          <div className="portal-account-summary">
            <div>
              <small>Account email</small>
              <b>{user.email}</b>
            </div>
            <div>
              <small>Plan</small>
              <b>{active ? "Professional" : "No active plan"}</b>
            </div>
            <div>
              <small>Renewal</small>
              <b>{active ? formatDate(profile?.current_period_end) : "—"}</b>
            </div>
          </div>

          <Link className="portal-button secondary full" href="/dashboard/billing">
            Manage billing
            <ArrowRight size={15} />
          </Link>
        </aside>
      </section>

      <section className="portal-dashboard-lower-grid">
        <article className="portal-panel portal-dashboard-whats-new">
          <div className="portal-panel-heading compact">
            <div>
              <span className="portal-panel-kicker">WHAT’S NEW</span>
              <h2>Recent product improvements</h2>
            </div>
            <Sparkles size={19} />
          </div>

          <div className="portal-dashboard-update-list">
            <div>
              <span className="portal-update-dot blue" />
              <div>
                <b>Improved scanner visibility</b>
                <p>Deal results and marketplace activity are easier to review.</p>
              </div>
            </div>

            <div>
              <span className="portal-update-dot green" />
              <div>
                <b>Better Deal Vault workflow</b>
                <p>Saved opportunities can be reviewed and reverified more clearly.</p>
              </div>
            </div>

            <div>
              <span className="portal-update-dot orange" />
              <div>
                <b>Stronger export workflow</b>
                <p>Results are prepared for faster review inside Excel.</p>
              </div>
            </div>
          </div>
        </article>

        <article className="portal-panel portal-dashboard-quick-actions">
          <div className="portal-panel-heading compact">
            <div>
              <span className="portal-panel-kicker">QUICK ACTIONS</span>
              <h2>Jump straight in</h2>
            </div>
            <FileClock size={19} />
          </div>

          <div className="portal-quick-action-grid">
            <Link href="/dashboard/downloads">
              <Download size={18} />
              <span><b>Downloads</b><small>Get the latest release</small></span>
              <ArrowRight size={14} />
            </Link>

            <Link href="/dashboard/billing">
              <CreditCard size={18} />
              <span><b>Billing</b><small>Manage your subscription</small></span>
              <ArrowRight size={14} />
            </Link>

            <Link href="/dashboard/releases">
              <FileClock size={18} />
              <span><b>Release notes</b><small>See what changed</small></span>
              <ArrowRight size={14} />
            </Link>

            <Link href="/dashboard/documentation">
              <Gauge size={18} />
              <span><b>Documentation</b><small>Learn the workflow</small></span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
