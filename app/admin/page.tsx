import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  Download,
  PackageOpen,
  ShieldCheck,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

function isActive(status: string | null) {
  return ["active", "trialing"].includes(status ?? "");
}

export default async function AdminOverviewPage() {
  const admin = createAdminClient();

  const { data: profiles, error: profilesError } = await admin
    .from("profiles")
    .select(
      "id,email,subscription_status,current_period_end,stripe_customer_id,created_at"
    );

  if (profilesError) {
    console.error("Admin profiles query failed:", profilesError);
  }

  const profileRows = profiles ?? [];

  const totalAccounts = profileRows.length;

  const activeCount = profileRows.filter((profile) =>
    isActive(profile.subscription_status)
  ).length;

  const trialCount = profileRows.filter(
    (profile) => profile.subscription_status === "trialing"
  ).length;

  const inactiveCount = profileRows.filter(
    (profile) => !isActive(profile.subscription_status)
  ).length;

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div>
          <span>ADMIN OVERVIEW</span>
          <h1>Business control centre</h1>
          <p>
            Review customer access, membership status and the current software
            release from one secure area.
          </p>
        </div>
      </header>

      <section className="admin-stat-grid">
        <article className="admin-panel admin-stat">
          <span className="admin-stat-icon blue"><Users size={21} /></span>
          <div>
            <small>Total accounts</small>
            <b>{totalAccounts}</b>
            <p>Registered customer profiles</p>
          </div>
        </article>

        <article className="admin-panel admin-stat">
          <span className="admin-stat-icon green"><UserCheck size={21} /></span>
          <div>
            <small>Active access</small>
            <b>{activeCount}</b>
            <p>Active or trialling members</p>
          </div>
        </article>

        <article className="admin-panel admin-stat">
          <span className="admin-stat-icon orange"><ShieldCheck size={21} /></span>
          <div>
            <small>Trials</small>
            <b>{trialCount}</b>
            <p>Customers currently trialling</p>
          </div>
        </article>

        <article className="admin-panel admin-stat">
          <span className="admin-stat-icon red"><UserMinus size={21} /></span>
          <div>
            <small>Inactive</small>
            <b>{inactiveCount}</b>
            <p>No current download access</p>
          </div>
        </article>
      </section>

      <section className="admin-main-grid">
        <article className="admin-panel admin-release-card">
          <div className="admin-panel-heading">
            <div>
              <span>CURRENT SOFTWARE RELEASE</span>
              <h2>Amazon EU Deal Finder Pro 1.3.0</h2>
            </div>
            <span className="admin-badge">STABLE</span>
          </div>

          <p>
            The customer portal currently displays version 1.3.0 as the latest
            stable Windows release.
          </p>

          <div className="admin-release-info">
            <div><small>Version</small><b>1.3.0</b></div>
            <div><small>Platform</small><b>Windows</b></div>
            <div><small>Channel</small><b>Stable</b></div>
            <div><small>Download</small><b>Protected</b></div>
          </div>

          <div className="admin-action-row">
            <Link className="admin-button primary" href="/dashboard/downloads">
              <Download size={16} />
              View customer download
            </Link>
            <button className="admin-button secondary" disabled>
              <PackageOpen size={16} />
              Release manager coming next
            </button>
          </div>
        </article>

        <aside className="admin-panel admin-revenue-card">
          <span className="admin-stat-icon green"><CircleDollarSign size={21} /></span>
          <small>REVENUE ANALYTICS</small>
          <h2>Stripe metrics coming next</h2>
          <p>
            Monthly recurring revenue, trial conversion and cancellation data
            will be added after customer access is verified.
          </p>
        </aside>
      </section>

      <section className="admin-panel admin-shortcut-panel">
        <div>
          <span>CUSTOMER MANAGEMENT</span>
          <h2>Review registered customers</h2>
          <p>
            View account emails, subscription states and renewal information.
          </p>
        </div>

        <Link className="admin-button primary" href="/admin/customers">
          Open customer list
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
