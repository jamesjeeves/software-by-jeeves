import { redirect } from "next/navigation";
import {
  Check,
  Download,
  FileArchive,
  HardDriveDownload,
  History,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type SoftwareRelease = {
  id: string;
  version: string;
  channel?: string | null;
  platform?: string | null;
  file_name?: string | null;
  storage_path?: string | null;
  release_notes?: string | null;
  is_current?: boolean | null;
  created_at?: string | null;
  published_at?: string | null;
};

function formatChannel(channel?: string | null) {
  if (!channel) return "Stable";

  return channel.charAt(0).toUpperCase() + channel.slice(1);
}

export default async function DownloadsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: releases, error: releasesError } = await supabase
    .from("software_releases")
    .select("*")
    .order("is_current", { ascending: false })
    .order("created_at", { ascending: false });

  if (releasesError) {
    console.error("Unable to load software releases:", releasesError);
  }

  const typedReleases = (releases ?? []) as SoftwareRelease[];

  const currentRelease =
    typedReleases.find((release) => release.is_current) ??
    typedReleases[0] ??
    null;

  const previousReleases = currentRelease
    ? typedReleases.filter((release) => release.id !== currentRelease.id)
    : [];

  return (
    <div className="portal-page">
      <header className="portal-page-header">
        <div>
          <span>DOWNLOAD CENTRE</span>
          <h1>Amazon EU Deal Finder Pro</h1>
          <p>
            Download the latest approved Windows release and review previous
            software versions.
          </p>
        </div>
      </header>

      <section className="portal-page-grid">
        <article className="portal-panel portal-download-hero">
          <div className="portal-download-hero-icon">
            <HardDriveDownload size={30} />
          </div>

          <div className="portal-download-hero-copy">
            <span>LATEST STABLE RELEASE</span>

            {currentRelease ? (
              <>
                <h2>Deal Finder Pro {currentRelease.version}</h2>

                <p>
                  {currentRelease.release_notes ||
                    "The latest approved release of Amazon EU Deal Finder Pro."}
                </p>

                <div className="portal-download-specs">
                  <div>
                    <small>Platform</small>
                    <b>{currentRelease.platform || "Windows 10/11"}</b>
                  </div>

                  <div>
                    <small>Package</small>
                    <b>ZIP archive</b>
                  </div>

                  <div>
                    <small>Version</small>
                    <b>{currentRelease.version}</b>
                  </div>

                  <div>
                    <small>Channel</small>
                    <b>{formatChannel(currentRelease.channel)}</b>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2>No release available</h2>
                <p>
                  There is currently no published software release available.
                </p>
              </>
            )}
          </div>

          <div className="portal-download-hero-action">
            {currentRelease ? (
              <a
                className="portal-button primary"
                href={`/api/download?release=${currentRelease.id}`}
              >
                <Download size={17} />
                Download latest
              </a>
            ) : (
              <button
                className="portal-button primary"
                type="button"
                disabled
              >
                No download available
              </button>
            )}

            <small>
              {currentRelease
                ? "A private download link will be generated."
                : "Publish a release from the admin portal."}
            </small>
          </div>
        </article>

        <aside className="portal-panel portal-requirements-card">
          <span className="portal-panel-kicker">SYSTEM REQUIREMENTS</span>
          <h2>Before installation</h2>

          <ul className="portal-simple-list">
            <li>
              <Monitor size={16} />
              <span>
                <b>Windows computer</b>
                <small>Windows 10 or Windows 11</small>
              </span>
            </li>

            <li>
              <ShieldCheck size={16} />
              <span>
                <b>Secure account</b>
                <small>You must be logged in to download</small>
              </span>
            </li>

            <li>
              <FileArchive size={16} />
              <span>
                <b>ZIP extraction</b>
                <small>Extract the package before running</small>
              </span>
            </li>

            <li>
              <Check size={16} />
              <span>
                <b>Your own Keepa access</b>
                <small>Keepa and token costs are separate</small>
              </span>
            </li>
          </ul>
        </aside>
      </section>

      <section className="portal-panel portal-history-panel">
        <div className="portal-panel-heading compact">
          <div>
            <span className="portal-panel-kicker">VERSION HISTORY</span>
            <h2>Previous releases</h2>
          </div>

          <History size={19} />
        </div>

        <div className="portal-version-table">
          <div className="portal-version-row header">
            <span>Version</span>
            <span>Channel</span>
            <span>Platform</span>
            <span>Status</span>
          </div>

          {currentRelease && (
            <div className="portal-version-row">
              <span>
                <b>{currentRelease.version}</b>
                <small>Current release</small>
              </span>

              <span>{formatChannel(currentRelease.channel)}</span>
              <span>{currentRelease.platform || "Windows"}</span>

              <span>
                <i className="portal-table-status current" />
                Current
              </span>
            </div>
          )}

          {previousReleases.map((release) => (
            <div className="portal-version-row muted" key={release.id}>
              <span>
                <b>{release.version}</b>
                <small>Previous release</small>
              </span>

              <span>{formatChannel(release.channel)}</span>
              <span>{release.platform || "Windows"}</span>

              <span>
                <i className="portal-table-status archived" />
                Previous
              </span>
            </div>
          ))}

          {!currentRelease && (
            <div className="portal-version-row muted">
              <span>
                <b>No releases</b>
                <small>
                  Publish your first release through the admin portal.
                </small>
              </span>

              <span>—</span>
              <span>—</span>
              <span>Unavailable</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}