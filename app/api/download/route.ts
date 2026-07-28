import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_SITE_URL));

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("subscription_status")
    .eq("id", user.id)
    .single();

  if (!["active", "trialing"].includes(profile?.subscription_status || "")) {
    return NextResponse.redirect(new URL("/dashboard?error=subscription_required", process.env.NEXT_PUBLIC_SITE_URL));
  }

  const bucket = process.env.SOFTWARE_BUCKET!;
  const filePath = process.env.SOFTWARE_FILE_PATH!;
  const { data, error } = await admin.storage.from(bucket).createSignedUrl(filePath, 60);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "Download unavailable." }, { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
