import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getUserEntitlement } from "@/lib/entitlement";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DeviceRequestBody = {
  fingerprint?: unknown;
  deviceName?: unknown;
  operatingSystem?: unknown;
  appVersion?: unknown;
};

type DeviceRpcRow = {
  approved: boolean;
  reason: string | null;
  device_count: number | null;
  device_id: string | null;
};

function getBearerToken(request: NextRequest): string | null {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return null;
  }

  const [scheme, token] = authorization.trim().split(/\s+/, 2);

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
}

function normaliseText(
  value: unknown,
  maximumLength: number
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maximumLength);
}

export async function POST(request: NextRequest) {
  const accessToken = getBearerToken(request);

  if (!accessToken) {
    return NextResponse.json(
      {
        authorised: false,
        deviceApproved: false,
        reason: "invalid_token",
        error: "A valid Bearer access token is required.",
      },
      {
        status: 401,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    console.error("Desktop device registration is not configured.");

    return NextResponse.json(
      {
        authorised: false,
        deviceApproved: false,
        reason: "server_not_configured",
        error: "Device registration service is not configured.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  let body: DeviceRequestBody;

  try {
    body = (await request.json()) as DeviceRequestBody;
  } catch {
    return NextResponse.json(
      {
        authorised: false,
        deviceApproved: false,
        reason: "invalid_request",
        error: "The device request body is invalid.",
      },
      {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  const fingerprint = normaliseText(body.fingerprint, 128);
  const deviceName = normaliseText(body.deviceName, 120);
  const operatingSystem = normaliseText(body.operatingSystem, 120);
  const appVersion = normaliseText(body.appVersion, 40);

  if (fingerprint.length < 32) {
    return NextResponse.json(
      {
        authorised: false,
        deviceApproved: false,
        reason: "invalid_fingerprint",
        error: "A valid device fingerprint is required.",
      },
      {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  if (!deviceName) {
    return NextResponse.json(
      {
        authorised: false,
        deviceApproved: false,
        reason: "invalid_device_name",
        error: "A device name is required.",
      },
      {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  const authClient = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser(accessToken);

  if (userError || !user) {
    return NextResponse.json(
      {
        authorised: false,
        deviceApproved: false,
        reason: "invalid_session",
        error: "The Supabase session is invalid or has expired.",
      },
      {
        status: 401,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }

  try {
    const entitlement = await getUserEntitlement(user.id);

    if (!entitlement.authorised) {
      return NextResponse.json(
        {
          authorised: false,
          deviceApproved: false,
          reason: "subscription_required",
          subscriptionStatus: entitlement.subscriptionStatus,
          error:
            "An active subscription or trial is required before registering a device.",
        },
        {
          status: 403,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const adminClient = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      }
    );

    const { data, error } = await adminClient.rpc(
      "register_or_touch_device",
      {
        p_user_id: user.id,
        p_device_fingerprint: fingerprint,
        p_device_name: deviceName,
        p_operating_system: operatingSystem || null,
        p_app_version: appVersion || null,
      }
    );

    if (error) {
      console.error("Device registration RPC failed:", error);

      return NextResponse.json(
        {
          authorised: false,
          deviceApproved: false,
          reason: "device_check_failed",
          error: "The device could not be verified right now.",
        },
        {
          status: 500,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const row = Array.isArray(data)
      ? (data[0] as DeviceRpcRow | undefined)
      : undefined;

    if (!row) {
      console.error("Device registration returned no result.");

      return NextResponse.json(
        {
          authorised: false,
          deviceApproved: false,
          reason: "device_check_failed",
          error: "The device service returned an invalid response.",
        },
        {
          status: 500,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    if (!row.approved) {
      return NextResponse.json(
        {
          authorised: false,
          deviceApproved: false,
          reason: row.reason || "device_limit",
          deviceCount: row.device_count ?? 2,
          maximumDevices: 2,
          error:
            "This subscription has reached its two-device limit. Remove a device from your account before continuing.",
        },
        {
          status: 403,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    return NextResponse.json(
      {
        authorised: true,
        deviceApproved: true,
        reason: row.reason || "device_approved",
        deviceId: row.device_id,
        deviceCount: row.device_count ?? 1,
        maximumDevices: 2,
        subscriptionStatus: entitlement.subscriptionStatus,
        user: {
          id: user.id,
          email: user.email ?? null,
        },
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("Desktop device check failed:", error);

    return NextResponse.json(
      {
        authorised: false,
        deviceApproved: false,
        reason: "device_check_failed",
        error: "Unable to verify this device right now.",
      },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
