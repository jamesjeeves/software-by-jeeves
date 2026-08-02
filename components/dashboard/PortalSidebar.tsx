"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeHelp,
  BookOpen,
  CreditCard,
  Download,
  FileClock,
  Gauge,
  Laptop,
  Settings,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Gauge,
  },
  {
    label: "Downloads",
    href: "/dashboard/downloads",
    icon: Download,
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    label: "Devices",
    href: "/dashboard/devices",
    icon: Laptop,
  },
  {
    label: "Release notes",
    href: "/dashboard/releases",
    icon: FileClock,
  },
  {
    label: "Documentation",
    href: "/dashboard/documentation",
    icon: BookOpen,
  },
  {
    label: "Support",
    href: "/dashboard/support",
    icon: BadgeHelp,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    disabled: true,
  },
];

export default function PortalSidebar() {
  const pathname = usePathname();

  return (
    <aside className="portal-sidebar">
      <Link className="portal-brand" href="/">
        <span className="portal-brand-mark">SJ</span>

        <span className="portal-brand-copy">
          <b>Software By Jeeves</b>
          <small>Customer portal</small>
        </span>
      </Link>

      <div className="portal-product-label">
        <span>EU</span>

        <div>
          <b>Deal Finder Pro</b>
          <small>Professional</small>
        </div>
      </div>

      <nav
        className="portal-navigation"
        aria-label="Customer portal"
      >
        {navigation.map(
          ({
            label,
            href,
            icon: Icon,
            disabled,
          }) => {
            const active =
              pathname === href ||
              (
                href !== "/dashboard" &&
                pathname.startsWith(`${href}/`)
              );

            if (disabled) {
              return (
                <div
                  className="portal-nav-link is-disabled"
                  key={label}
                  aria-disabled="true"
                >
                  <Icon size={17} />
                  <span>{label}</span>
                  <small>Soon</small>
                </div>
              );
            }

            return (
              <Link
                className={`portal-nav-link${
                  active ? " is-active" : ""
                }`}
                href={href}
                key={label}
              >
                <Icon size={17} />
                <span>{label}</span>
              </Link>
            );
          }
        )}
      </nav>

      <div className="portal-sidebar-status">
        <span className="portal-status-dot" />

        <div>
          <b>Portal online</b>
          <small>Secure member access</small>
        </div>
      </div>

      <div className="portal-sidebar-footer">
        <small>Software By Jeeves</small>
        <span>softwarebyjeeves.com</span>
      </div>
    </aside>
  );
}