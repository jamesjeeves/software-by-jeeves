import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Download,
  FileSpreadsheet,
  KeyRound,
  Radar,
  Vault,
} from "lucide-react";

const guides = [
  {
    icon: Download,
    title: "Installation",
    text: "Download, extract and open Amazon EU Deal Finder Pro on Windows.",
  },
  {
    icon: KeyRound,
    title: "Keepa setup",
    text: "Understand Keepa access, token usage and the required CSV workflow.",
  },
  {
    icon: FileSpreadsheet,
    title: "Preparing your CSV",
    text: "Export and prepare a compatible product list before scanning.",
  },
  {
    icon: Radar,
    title: "Running your first scan",
    text: "Choose marketplaces, set thresholds and follow live scan activity.",
  },
  {
    icon: Vault,
    title: "Using Deal Vault",
    text: "Save, organise and reverify stronger sourcing opportunities.",
  },
  {
    icon: CircleHelp,
    title: "Troubleshooting",
    text: "Resolve common installation, CSV, Keepa and scanning issues.",
  },
];

export default function DocumentationPage() {
  return (
    <div className="portal-page">
      <header className="portal-page-header">
        <div>
          <span>DOCUMENTATION</span>
          <h1>Learn the Deal Finder workflow</h1>
          <p>
            Step-by-step guidance for installing the software, connecting your
            product data and reviewing sourcing opportunities.
          </p>
        </div>
      </header>

      <section className="portal-doc-intro portal-panel">
        <span className="portal-doc-icon"><BookOpen size={25} /></span>
        <div>
          <span className="portal-panel-kicker">GETTING STARTED</span>
          <h2>From download to your first opportunity shortlist</h2>
          <p>
            The full documentation library is being prepared. These sections
            show the structure that will become the customer help centre.
          </p>
        </div>
      </section>

      <section className="portal-doc-grid">
        {guides.map(({ icon: Icon, title, text }) => (
          <article className="portal-panel portal-doc-card" key={title}>
            <span className="portal-doc-card-icon"><Icon size={21} /></span>
            <h2>{title}</h2>
            <p>{text}</p>
            <button type="button" disabled>
              Guide coming soon <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
