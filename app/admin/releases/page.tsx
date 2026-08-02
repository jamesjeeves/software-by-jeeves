import ReleaseManager from "./release-manager";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminReleasesPage() {
  const admin = createAdminClient();

  const { data: releases, error } = await admin
    .from("software_releases")
    .select(
      "id,version,title,release_channel,platform,file_name,file_size,release_notes,is_current,is_published,published_at,created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Release list query failed:", error);
  }

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div>
          <span>RELEASES</span>
          <h1>Release manager</h1>
          <p>
            Upload, publish and manage customer software releases without
            redeploying the website.
          </p>
        </div>
      </header>

      <ReleaseManager
        initialReleases={releases ?? []}
        initialError={error ? "Unable to load releases." : null}
      />
    </div>
  );
}
