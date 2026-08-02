import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireApiAdmin } from "@/lib/admin-api-auth";

export const runtime = "nodejs";

function safeFileName(value: string) {
  return value
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

export async function POST(request: Request) {
  try {
    await requireApiAdmin();

    const body = await request.json();
    const version = String(body.version ?? "").trim();
    const fileName = String(body.fileName ?? "").trim();
    const fileSize = Number(body.fileSize ?? 0);

    if (!version || !fileName.toLowerCase().endsWith(".zip")) {
      return NextResponse.json(
        { error: "A valid version and ZIP filename are required." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(fileSize) || fileSize <= 0) {
      return NextResponse.json(
        { error: "The selected ZIP file is empty or invalid." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    const { data: existing } = await admin
      .from("software_releases")
      .select("id")
      .eq("version", version)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: `Version ${version} already exists.` },
        { status: 409 }
      );
    }

    const path = `${version}/${Date.now()}-${safeFileName(fileName)}`;

    const { data, error } = await admin.storage
      .from("software-downloads")
      .createSignedUploadUrl(path);

    if (error || !data) {
      console.error("Signed upload creation failed:", error);
      return NextResponse.json(
        { error: error?.message || "Unable to prepare the upload." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      path,
      token: data.token,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unauthorised request";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
