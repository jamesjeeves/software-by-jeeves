import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalSidebar from "@/components/dashboard/PortalSidebar";
import PortalTopBar from "@/components/dashboard/PortalTopBar";
import "./dashboard.css";
import "./portal-pages.css";
import "./dashboard-home-additions.css";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="portal-shell">
      <PortalSidebar />

      <div className="portal-main">
        <PortalTopBar email={user.email ?? "Customer"} />
        <main className="portal-content">{children}</main>
      </div>
    </div>
  );
}
