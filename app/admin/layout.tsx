import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { requireAdmin } from "@/lib/admin-access";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "./admin.css";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await requireAdmin();

  return (
    <div className="admin-shell">
      <AdminSidebar />

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>ADMINISTRATION</span>
            <b>Software By Jeeves</b>
          </div>

          <div className="admin-topbar-actions">
            <Link href="/" target="_blank">
              View website <ExternalLink size={14} />
            </Link>

            <div className="admin-user">
              <span><ShieldCheck size={15} /></span>
              <div>
                <b>{user.email}</b>
                <small>Administrator</small>
              </div>
            </div>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
