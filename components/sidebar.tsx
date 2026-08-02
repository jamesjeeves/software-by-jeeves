import Link from "next/link";

const links = [
  "Dashboard",
  "Downloads",
  "Billing",
  "Release Notes",
  "Documentation",
  "Support",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">

        <div className="logo-circle">

          SJ

        </div>

        <div>

          <strong>Software By Jeeves</strong>

          <span>Customer Portal</span>

        </div>

      </div>

      <nav>

        {links.map((item) => (
          <Link
            key={item}
            href="#"
            className="sidebar-link"
          >
            {item}
          </Link>
        ))}

      </nav>

    </aside>
  );
}