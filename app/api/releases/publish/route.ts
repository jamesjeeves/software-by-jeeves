import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireApiAdmin } from "@/lib/admin-api-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await requireApiAdmin();
    const body = await request.json();

    const version = String(body.version ?? "").trim();
    const title = String(body.title ?? "").trim();
    const releaseChannel =
      body.releaseChannel === "beta" ? "beta" : "stable";
    const platform = String(body.platform ?? "Windows").trim();
    const releaseNotes = String(body.releaseNotes ?? "").trim();
    const filePath = String(body.filePath ?? "").trim();
    const fileName = String(body.fileName ?? "").trim();
    const fileSize = Number(body.fileSize ?? 0);

    if (
      !version ||
      !title ||
      !releaseNotes ||
      !filePath ||
      !fileName ||
      !fileSize
    ) {
      return NextResponse.json(
        { error: "Release information is incomplete." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    const { data: storedFile, error: fileError } = await admin.storage
      .from("software-downloads")
      .list(filePath.split("/").slice(0, -1).join("/"), {
        search: filePath.split("/").at(-1),
        limit: 1,
      });

    if (fileError || !storedFile?.length) {
      return NextResponse.json(
        { error: "The uploaded ZIP could not be verified." },
        { status: 400 }
      );
    }

    const { data: release, error } = await admin
      .from("software_releases")
      .insert({
        version,
        title,
        release_channel: releaseChannel,
        platform,
        file_path: filePath,
        file_name: fileName,
        file_size: fileSize,
        release_notes: releaseNotes,
        is_current: true,
        is_published: true,
        published_at: new Date().toISOString(),
      })
      .select(
        "id,version,title,release_channel,platform,file_name,file_size,release_notes,is_current,is_published,published_at,created_at"
      )
      .single();

    if (error) {
      console.error("Release insert failed:", error);

      await admin.storage
        .from("software-downloads")
        .remove([filePath]);

      return NextResponse.json(
        { error: error.message || "Unable to publish the release." },
        { status: 500 }
      );
    }

    console.log(`Release ${version} published by ${user.email}`);

    return NextResponse.json({ release });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unauthorised request";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
