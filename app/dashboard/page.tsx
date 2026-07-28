import Link from "next/link";
import { redirect } from "next/navigation";
import { CreditCard, Download, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status,current_period_end")
    .eq("id", user.id)
    .maybeSingle();

  const active = ["active", "trialing"].includes(profile?.subscription_status || "");

  return (
    <main className="dashboard">
      <div className="dashboard-nav">
        <div className="shell">
          <Link href="/" className="brand">
            <span className="brand-mark">J</span>
            <span><b>Software By Jeeves</b><small>Customer dashboard</small></span>
          </Link>
          <form action={signOut}>
            <button className="button ghost" type="submit"><LogOut size={16} /> Log out</button>
          </form>
        </div>
      </div>
      <div className="shell">
        <div className="dash-head">
          <div><h1>Your dashboard</h1><p>Manage Deal Finder Pro and your membership.</p></div>
          {active ? <span className="status"><i /> ACTIVE MEMBERSHIP</span> : <span className="status">NO ACTIVE PLAN</span>}
        </div>
        <div className="dashboard-grid">
          <section className="dash-card">
            <h2>Amazon EU Deal Finder Pro</h2>
            <p>Download the latest approved Windows release. Your link is private and expires shortly after it is generated.</p>
            <div className="download-box">
              <div><b>Deal Finder Pro — Latest release</b><small>Windows ZIP package</small></div>
              {active ? (
                <a href="/api/download" className="button primary small"><Download size={16} /> Download</a>
              ) : (
                <form action="/api/checkout" method="POST">
                  <button className="button primary small" type="submit">Subscribe to download</button>
                </form>
              )}
            </div>
          </section>
          <aside className="dash-card">
            <h2>Membership</h2>
            <p>{active ? "Your account currently has access to Pro downloads and updates." : "Choose a plan to unlock the software."}</p>
            <div className="stack">
              {active ? (
                <form action="/api/portal" method="POST">
                  <button className="button secondary large full" type="submit"><CreditCard size={16} /> Manage billing</button>
                </form>
              ) : (
                <form action="/api/checkout" method="POST">
                  <button className="button primary large full" type="submit">Start monthly plan</button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
