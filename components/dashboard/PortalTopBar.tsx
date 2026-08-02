import Link from "next/link";
import { ExternalLink, LogOut, UserRound } from "lucide-react";
import { signOut } from "@/app/actions/auth";

type PortalTopBarProps = {
  email: string;
};

export default function PortalTopBar({ email }: PortalTopBarProps) {
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <header className="portal-topbar">
      <div>
        <span className="portal-topbar-kicker">CUSTOMER CONTROL CENTRE</span>
        <p>Amazon EU Deal Finder Pro</p>
      </div>

      <div className="portal-topbar-actions">
        <Link className="portal-topbar-link" href="/" target="_blank">
          Visit website
          <ExternalLink size={14} />
        </Link>

        <div className="portal-user">
          <span className="portal-avatar">
            {initials || <UserRound size={16} />}
          </span>
          <span className="portal-user-copy">
            <b>{email}</b>
            <small>Customer account</small>
          </span>
        </div>

        <form action={signOut}>
          <button
            className="portal-icon-button"
            type="submit"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut size={17} />
          </button>
        </form>
      </div>
    </header>
  );
}
