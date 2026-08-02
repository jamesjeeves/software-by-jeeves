import { Check, FileClock, Gauge, PackageCheck, Sparkles } from "lucide-react";

const releases = [
  {
    version: "1.3.0",
    label: "Latest release",
    title: "A stronger sourcing control centre",
    summary:
      "Improved dashboard visibility, clearer deal analysis and a more useful Deal Vault workflow.",
    added: [
      "Improved live scan dashboard",
      "Clearer confidence and opportunity ratings",
      "Deal Vault reverification workflow",
    ],
    improved: [
      "EU marketplace result visibility",
      "Profit and ROI presentation",
      "Excel-ready export workflow",
    ],
  },
  {
    version: "1.2.0",
    label: "Previous release",
    title: "Deal Vault and workflow improvements",
    summary:
      "Introduced stronger saved-deal management and made scan results easier to review.",
    added: ["Deal Vault", "Saved opportunity reverification"],
    improved: ["Scanner activity feed", "Result table readability"],
  },
];

export default function ReleasesPage() {
  return (
    <div className="portal-page">
      <header className="portal-page-header">
        <div>
          <span>RELEASE NOTES</span>
          <h1>What’s new in Deal Finder Pro</h1>
          <p>
            Follow product improvements, new features and important changes to
            the professional desktop software.
          </p>
        </div>
      </header>

      <div className="portal-release-timeline">
        {releases.map((release, index) => (
          <article className="portal-panel portal-release-entry" key={release.version}>
            <div className="portal-release-marker">
              {index === 0 ? <Sparkles size={17} /> : <FileClock size={17} />}
            </div>

            <div className="portal-release-entry-main">
              <div className="portal-release-entry-heading">
                <div>
                  <span>{release.label}</span>
                  <h2>Version {release.version}</h2>
                </div>
                {index === 0 && <span className="portal-version-badge">CURRENT</span>}
              </div>

              <h3>{release.title}</h3>
              <p>{release.summary}</p>

              <div className="portal-release-columns">
                <div>
                  <h4><PackageCheck size={15} /> Added</h4>
                  <ul>
                    {release.added.map((item) => (
                      <li key={item}><Check size={14} /> {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4><Gauge size={15} /> Improved</h4>
                  <ul>
                    {release.improved.map((item) => (
                      <li key={item}><Check size={14} /> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
