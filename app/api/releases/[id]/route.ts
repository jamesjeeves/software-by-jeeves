import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireApiAdmin } from "@/lib/admin-api-auth";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    await requireApiAdmin();

    const { id: releaseId } = await context.params;
    const body = await request.json();
    const action = body.action;

    if (!["make-current", "archive"].includes(action)) {
      return NextResponse.json(
        { error: "Unknown release action." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();

    if (action === "make-current") {
      const { error } = await admin
        .from("software_releases")
        .update({
          is_current: true,
          is_published: true,
          published_at: new Date().toISOString(),
        })
        .eq("id", releaseId);

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }
    } else {
      const { error } = await admin
        .from("software_releases")
        .update({
          is_current: false,
          is_published: false,
        })
        .eq("id", releaseId);

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unauthorised request";

    return NextResponse.json(
      { error: message },
      { status: 401 }
    );
  }
}
