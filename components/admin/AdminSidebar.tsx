"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Gauge,
  Home,
  PackageOpen,
  Settings,
  Users,
} from "lucide-react";

const navigation = [
  { label: "Overview", href: "/admin", icon: Gauge },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Releases", href: "/admin/releases", icon: PackageOpen, disabled: true },
  { label: "Licences", href: "/admin/licences", icon: Boxes, disabled: true },
  { label: "Settings", href: "/admin/settings", icon: Settings, disabled: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <Link className="admin-brand" href="/admin">
        <span className="admin-brand-mark">SJ</span>
        <span>
          <b>Software By Jeeves</b>
          <small>Admin control centre</small>
        </span>
      </Link>

      <nav className="admin-nav">
        {navigation.map(({ label, href, icon: Icon, disabled }) => {
          const active =
            pathname === href ||
            (href !== "/admin" && pathname.startsWith(`${href}/`));

          if (disabled) {
            return (
              <div className="admin-nav-link disabled" key={label}>
                <Icon size={17} />
                <span>{label}</span>
                <small>Soon</small>
              </div>
            );
          }

          return (
            <Link
              className={`admin-nav-link${active ? " active" : ""}`}
              href={href}
              key={label}
            >
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-bottom">
        <Link href="/dashboard">
          <Home size={16} />
          Customer portal
        </Link>
        <small>Private administrator access</small>
      </div>
    </aside>
  );
}
