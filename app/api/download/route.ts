import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be logged in to download this software." },
        { status: 401 }
      );
    }

    const releaseId = request.nextUrl.searchParams.get("release");

    if (!releaseId) {
      return NextResponse.json(
        { error: "No release was selected." },
        { status: 400 }
      );
    }

    const { data: release, error: releaseError } = await supabase
      .from("software_releases")
      .select("id, file_name, file_path")
      .eq("id", releaseId)
      .maybeSingle();

    if (releaseError) {
      console.error("Unable to load release:", releaseError);

      return NextResponse.json(
        { error: "Unable to find the selected release." },
        { status: 500 }
      );
    }

    if (!release?.file_path) {
      return NextResponse.json(
        { error: "This release does not have a stored download file." },
        { status: 404 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const bucket = process.env.SOFTWARE_BUCKET;

    if (!supabaseUrl || !serviceRoleKey || !bucket) {
      console.error("Missing download configuration:", {
        hasSupabaseUrl: Boolean(supabaseUrl),
        hasServiceRoleKey: Boolean(serviceRoleKey),
        hasBucket: Boolean(bucket),
      });

      return NextResponse.json(
        { error: "Download storage has not been configured." },
        { status: 500 }
      );
    }

    const admin = createAdminClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error: signedUrlError } = await admin.storage
      .from(bucket)
      .createSignedUrl(release.file_path, 60, {
        download: release.file_name || true,
      });

    if (signedUrlError || !data?.signedUrl) {
      console.error("Unable to generate signed URL:", signedUrlError);

      return NextResponse.json(
        { error: "Download unavailable." },
        { status: 500 }
      );
    }

    return NextResponse.redirect(data.signedUrl);
  } catch (error) {
    console.error("Unexpected download error:", error);

    return NextResponse.json(
      { error: "An unexpected download error occurred." },
      { status: 500 }
    );
  }
}