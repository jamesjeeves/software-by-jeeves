import { createAdminClient } from "@/lib/supabase/admin";

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  subscription_status: string | null;
  current_period_end: string | null;
  stripe_customer_id: string | null;
  created_at: string;
};

function formatDate(value: string | null | undefined) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function statusClass(status: string | null | undefined) {
  if (status === "active") return "active";
  if (status === "trialing") return "trialing";
  return "inactive";
}

export default async function AdminCustomersPage() {
  const admin = createAdminClient();

  const { data: profiles, error: profilesError } = await admin
    .from("profiles")
    .select(
      "id,email,full_name,subscription_status,current_period_end,stripe_customer_id,created_at"
    )
    .order("created_at", { ascending: false });

 if (profilesError) {
  console.error("Admin customer profile query failed:", profilesError);

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div>
          <span>CUSTOMERS</span>
          <h1>Unable to load customers</h1>
          <p>
            Something went wrong while loading customer accounts. Please check
            the server logs and try again.
          </p>
        </div>
      </header>
    </div>
  );
}

  let authUsers: Array<{
    id: string;
    last_sign_in_at?: string | null;
  }> = [];

  const { data: authData, error: authError } =
    await admin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

  if (authError) {
    console.error("Supabase auth user lookup failed:", authError);
  } else {
    authUsers = authData?.users ?? [];
  }

  const authUserMap = new Map(
    authUsers.map((user) => [user.id, user])
  );

  const customers = ((profiles ?? []) as ProfileRow[]).map((profile) => ({
    ...profile,
    lastSignInAt: authUserMap.get(profile.id)?.last_sign_in_at ?? null,
  }));

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div>
          <span>CUSTOMERS</span>
          <h1>Customer accounts</h1>
          <p>
            Customer and membership information from the profiles database.
          </p>
        </div>

        <span className="admin-count-badge">
          {customers.length} {customers.length === 1 ? "account" : "accounts"}
        </span>
      </header>

      <section className="admin-panel admin-table-panel">
        <div className="admin-customer-table">
          <div className="admin-customer-row header">
            <span>Customer</span>
            <span>Status</span>
            <span>Renewal</span>
            <span>Joined</span>
            <span>Last sign-in</span>
          </div>

          {customers.length === 0 ? (
            <div className="admin-empty-state">
              No customer profiles were found.
            </div>
          ) : (
            customers.map((customer) => {
              const status = customer.subscription_status ?? "inactive";

              return (
                <div className="admin-customer-row" key={customer.id}>
                  <span className="admin-customer-email">
                    <b>{customer.email ?? "No email"}</b>
                    <small>
                      {customer.full_name || customer.id}
                    </small>
                  </span>

                  <span>
                    <i className={`admin-status ${statusClass(status)}`} />
                    {status}
                  </span>

                  <span>{formatDate(customer.current_period_end)}</span>
                  <span>{formatDate(customer.created_at)}</span>
                  <span>{formatDate(customer.lastSignInAt)}</span>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
