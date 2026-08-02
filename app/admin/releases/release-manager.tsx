"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Archive,
  CheckCircle2,
  Download,
  Loader2,
  PackageOpen,
  RefreshCcw,
  UploadCloud,
} from "lucide-react";
import styles from "./release-manager.module.css";

type Release = {
  id: string;
  version: string;
  title: string;
  release_channel: "stable" | "beta";
  platform: string;
  file_name: string | null;
  file_size: number | null;
  release_notes: string | null;
  is_current: boolean;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
};

type Props = {
  initialReleases: Release[];
  initialError: string | null;
};

function formatBytes(bytes: number | null) {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function ReleaseManager({
  initialReleases,
  initialError,
}: Props) {
  const [releases, setReleases] = useState(initialReleases);
  const [version, setVersion] = useState("");
  const [title, setTitle] = useState("Amazon EU Deal Finder Pro");
  const [channel, setChannel] = useState<"stable" | "beta">("stable");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [busyReleaseId, setBusyReleaseId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(initialError);
  const [messageType, setMessageType] = useState<"success" | "error">(
    initialError ? "error" : "success"
  );

  const currentRelease = useMemo(
    () => releases.find((release) => release.is_current),
    [releases]
  );

  function showMessage(type: "success" | "error", text: string) {
    setMessageType(type);
    setMessage(text);
  }

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;

    if (selected && !selected.name.toLowerCase().endsWith(".zip")) {
      setFile(null);
      showMessage("error", "Please select a ZIP file.");
      event.target.value = "";
      return;
    }

    setFile(selected);
    setMessage(null);
  }

  async function publishRelease(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!version.trim() || !title.trim() || !notes.trim() || !file) {
      showMessage(
        "error",
        "Enter a version, title and release notes, then choose a ZIP file."
      );
      return;
    }

    setIsPublishing(true);
    setMessage(null);

    try {
      const prepareResponse = await fetch("/api/admin/releases/prepare-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: version.trim(),
          fileName: file.name,
          fileSize: file.size,
        }),
      });

      const prepareResult = await prepareResponse.json();

      if (!prepareResponse.ok) {
        throw new Error(prepareResult.error || "Unable to prepare the upload.");
      }

      const browserSupabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { auth: { persistSession: false } }
      );

      const { error: uploadError } = await browserSupabase.storage
        .from("software-downloads")
        .uploadToSignedUrl(
          prepareResult.path,
          prepareResult.token,
          file,
          {
            contentType: file.type || "application/zip",
          }
        );

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const publishResponse = await fetch("/api/admin/releases/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: version.trim(),
          title: title.trim(),
          releaseChannel: channel,
          platform: "Windows",
          releaseNotes: notes.trim(),
          filePath: prepareResult.path,
          fileName: file.name,
          fileSize: file.size,
        }),
      });

      const publishResult = await publishResponse.json();

      if (!publishResponse.ok) {
        throw new Error(publishResult.error || "Unable to publish the release.");
      }

      setReleases((current) => [
        publishResult.release,
        ...current.map((release) => ({
          ...release,
          is_current: false,
        })),
      ]);

      setVersion("");
      setNotes("");
      setFile(null);
      const input = document.getElementById(
        "release-file"
      ) as HTMLInputElement | null;
      if (input) input.value = "";

      showMessage(
        "success",
        `Version ${publishResult.release.version} is now published and current.`
      );
    } catch (error) {
      showMessage(
        "error",
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setIsPublishing(false);
    }
  }

  async function updateRelease(
    releaseId: string,
    action: "make-current" | "archive"
  ) {
    setBusyReleaseId(releaseId);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/releases/${releaseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to update the release.");
      }

      if (action === "make-current") {
        setReleases((current) =>
          current.map((release) => ({
            ...release,
            is_current: release.id === releaseId,
            is_published:
              release.id === releaseId ? true : release.is_published,
          }))
        );
        showMessage("success", "Current release updated.");
      } else {
        setReleases((current) =>
          current.map((release) =>
            release.id === releaseId
              ? { ...release, is_current: false, is_published: false }
              : release
          )
        );
        showMessage("success", "Release archived.");
      }
    } catch (error) {
      showMessage(
        "error",
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setBusyReleaseId(null);
    }
  }

  return (
    <div className={styles.wrapper}>
      {message ? (
        <div
          className={`${styles.message} ${
            messageType === "error" ? styles.error : styles.success
          }`}
        >
          {messageType === "error" ? (
            <PackageOpen size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}
          <span>{message}</span>
        </div>
      ) : null}

      <section className={`admin-panel ${styles.publisher}`}>
        <div className={styles.sectionHeading}>
          <div>
            <span>NEW SOFTWARE RELEASE</span>
            <h2>Publish an update</h2>
            <p>
              The ZIP uploads directly to your private Supabase Storage bucket.
            </p>
          </div>

          {currentRelease ? (
            <div className={styles.currentBadge}>
              Current: v{currentRelease.version}
            </div>
          ) : null}
        </div>

        <form className={styles.form} onSubmit={publishRelease}>
          <label>
            <span>Version number</span>
            <input
              value={version}
              onChange={(event) => setVersion(event.target.value)}
              placeholder="1.4.0"
              required
            />
          </label>

          <label>
            <span>Product title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <label>
            <span>Release channel</span>
            <select
              value={channel}
              onChange={(event) =>
                setChannel(event.target.value as "stable" | "beta")
              }
            >
              <option value="stable">Stable</option>
              <option value="beta">Beta</option>
            </select>
          </label>

          <label className={styles.fullWidth}>
            <span>Release notes</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={"Added:\n- New feature\n\nFixed:\n- Issue description"}
              rows={9}
              required
            />
          </label>

          <label className={`${styles.uploadBox} ${styles.fullWidth}`}>
            <input
              id="release-file"
              type="file"
              accept=".zip,application/zip"
              onChange={selectFile}
            />
            <UploadCloud size={30} />
            <b>{file ? file.name : "Choose your release ZIP"}</b>
            <span>
              {file
                ? `${formatBytes(file.size)} ready to upload`
                : "Private upload to software-downloads"}
            </span>
          </label>

          <div className={`${styles.publishRow} ${styles.fullWidth}`}>
            <div>
              <b>Publishing makes this the current customer release.</b>
              <span>
                Any existing current release will automatically be archived as
                the previous version.
              </span>
            </div>

            <button
              className="admin-button primary"
              disabled={isPublishing}
              type="submit"
            >
              {isPublishing ? (
                <Loader2 className={styles.spin} size={17} />
              ) : (
                <UploadCloud size={17} />
              )}
              {isPublishing ? "Publishing…" : "Publish release"}
            </button>
          </div>
        </form>
      </section>

      <section className={`admin-panel ${styles.history}`}>
        <div className={styles.sectionHeading}>
          <div>
            <span>RELEASE HISTORY</span>
            <h2>Published versions</h2>
            <p>Manage the software versions available to your customers.</p>
          </div>
          <div className={styles.releaseCount}>{releases.length} releases</div>
        </div>

        {releases.length === 0 ? (
          <div className={styles.empty}>
            <PackageOpen size={30} />
            <b>No releases published yet</b>
            <span>Your first published ZIP will appear here.</span>
          </div>
        ) : (
          <div className={styles.table}>
            <div className={`${styles.row} ${styles.header}`}>
              <span>Release</span>
              <span>Status</span>
              <span>File</span>
              <span>Published</span>
              <span>Actions</span>
            </div>

            {releases.map((release) => (
              <div className={styles.row} key={release.id}>
                <span className={styles.releaseName}>
                  <b>{release.title}</b>
                  <small>
                    v{release.version} · {release.release_channel}
                  </small>
                </span>

                <span>
                  <i
                    className={`${styles.statusDot} ${
                      release.is_current
                        ? styles.current
                        : release.is_published
                        ? styles.published
                        : styles.archived
                    }`}
                  />
                  {release.is_current
                    ? "Current"
                    : release.is_published
                    ? "Published"
                    : "Archived"}
                </span>

                <span className={styles.fileInfo}>
                  <b>{release.file_name || "No file"}</b>
                  <small>{formatBytes(release.file_size)}</small>
                </span>

                <span>{formatDate(release.published_at || release.created_at)}</span>

                <span className={styles.actions}>
                  {!release.is_current ? (
                    <button
                      type="button"
                      disabled={busyReleaseId === release.id}
                      onClick={() => updateRelease(release.id, "make-current")}
                      title="Make current"
                    >
                      {busyReleaseId === release.id ? (
                        <Loader2 className={styles.spin} size={16} />
                      ) : (
                        <RefreshCcw size={16} />
                      )}
                    </button>
                  ) : null}

                  {release.is_published && !release.is_current ? (
                    <button
                      type="button"
                      disabled={busyReleaseId === release.id}
                      onClick={() => updateRelease(release.id, "archive")}
                      title="Archive"
                    >
                      <Archive size={16} />
                    </button>
                  ) : null}

                  <span title="Customer download integration comes next">
                    <Download size={16} />
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
