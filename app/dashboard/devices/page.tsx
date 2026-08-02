import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  CheckCircle2,
  CircleSlash2,
  Laptop,
  Monitor,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DeviceActionButton from "@/components/dashboard/DeviceActionButton";

type RegisteredDevice = {
  id: string;
  device_name: string;
  operating_system: string | null;
  app_version: string | null;
  is_active: boolean;
  first_seen_at: string;
  last_seen_at: string;
};

function formatDate(value: string | null | undefined) {
  if (!value) return "Not available";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatLastSeen(value: string | null | undefined) {
  if (!value) return "Not available";

  const date = new Date(value);
  const now = new Date();
  const difference = now.getTime() - date.getTime();
  const minutes = Math.floor(difference / 60_000);
  const hours = Math.floor(difference / 3_600_000);
  const days = Math.floor(difference / 86_400_000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return formatDate(value);
}

function getDeviceIcon(device: RegisteredDevice) {
  const text = `${device.device_name} ${device.operating_system ?? ""}`.toLowerCase();

  if (text.includes("laptop") || text.includes("notebook")) {
    return Laptop;
  }

  if (
    text.includes("phone") ||
    text.includes("android") ||
    text.includes("ios")
  ) {
    return Smartphone;
  }

  return Monitor;
}

async function setDeviceStatus(formData: FormData) {
  "use server";

  const deviceId = String(formData.get("deviceId") ?? "").trim();
  const makeActive =
    String(formData.get("requestedState") ?? "").trim() === "active";

  if (!deviceId) {
    redirect("/dashboard/devices?error=Missing device ID.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error } = await supabase.rpc(
    "set_registered_device_active",
    {
      p_device_id: deviceId,
      p_make_active: makeActive,
    }
  );

  if (error) {
    console.error("Device status update failed:", error);
    redirect(
      `/dashboard/devices?error=${encodeURIComponent(error.message)}`
    );
  }

  const result = Array.isArray(data) ? data[0] : data;

  if (!result?.success) {
    const message =
      result?.reason === "device_limit"
        ? "Your two-device allowance is already full."
        : "This device could not be updated.";

    redirect(
      `/dashboard/devices?error=${encodeURIComponent(message)}`
    );
  }

  revalidatePath("/dashboard/devices");
  redirect(
    `/dashboard/devices?success=${
      makeActive ? "device-reactivated" : "device-removed"
    }`
  );
}

export default async function DevicesPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("registered_devices")
    .select(
      "id,device_name,operating_system,app_version,is_active,first_seen_at,last_seen_at"
    )
    .eq("user_id", user.id)
    .order("is_active", { ascending: false })
    .order("last_seen_at", { ascending: false });

  if (error) {
    console.error("Device list could not be loaded:", error);
  }

  const devices = (data ?? []) as RegisteredDevice[];
  const activeCount = devices.filter((device) => device.is_active).length;
  const maximumDevices = 2;
  const remainingSlots = Math.max(0, maximumDevices - activeCount);

  const successMessage =
    params.success === "device-removed"
      ? "The device was removed. It will be blocked before its next scan."
      : params.success === "device-reactivated"
        ? "The device was reactivated successfully."
        : null;

  const errorMessage = params.error
    ? decodeURIComponent(params.error)
    : null;

  return (
    <div className="portal-page">
      <header className="portal-page-header">
        <div>
          <span>ACCOUNT SECURITY</span>
          <h1>Registered devices</h1>
          <p>
            Manage the computers authorised to use Amazon EU Deal Finder Pro.
            Each subscription includes a maximum of two active devices.
          </p>
        </div>
      </header>

      {successMessage ? (
        <div className="portal-device-alert is-success">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      ) : null}

      {errorMessage ? (
        <div className="portal-device-alert is-error">
          <CircleSlash2 size={18} />
          <span>{errorMessage}</span>
        </div>
      ) : null}

      <section className="portal-device-summary-grid">
        <article className="portal-panel portal-device-summary">
          <span className="portal-info-icon blue">
            <Monitor size={20} />
          </span>
          <div>
            <small>Device slots used</small>
            <b>
              {activeCount} of {maximumDevices}
            </b>
            <p>
              {remainingSlots > 0
                ? `${remainingSlots} device slot${
                    remainingSlots === 1 ? "" : "s"
                  } available.`
                : "Your device allowance is currently full."}
            </p>
          </div>
        </article>

        <article className="portal-panel portal-device-summary">
          <span className="portal-info-icon green">
            <ShieldCheck size={20} />
          </span>
          <div>
            <small>Protection status</small>
            <b>Device checks enabled</b>
            <p>
              Every application launch and scan requires an approved device.
            </p>
          </div>
        </article>
      </section>

      <section className="portal-panel portal-devices-panel">
        <div className="portal-panel-heading compact">
          <div>
            <span className="portal-panel-kicker">YOUR DEVICES</span>
            <h2>Authorised computers</h2>
          </div>

          <span
            className={`portal-small-status ${
              activeCount < maximumDevices ? "is-active" : "is-inactive"
            }`}
          >
            {activeCount}/{maximumDevices} USED
          </span>
        </div>

        {devices.length === 0 ? (
          <div className="portal-device-empty">
            <Monitor size={34} />
            <h3>No registered devices yet</h3>
            <p>
              Your first computer will appear here after you sign in to the
              desktop application.
            </p>
          </div>
        ) : (
          <div className="portal-device-list">
            {devices.map((device) => {
              const DeviceIcon = getDeviceIcon(device);

              return (
                <article
                  className={`portal-device-card ${
                    device.is_active ? "is-active" : "is-removed"
                  }`}
                  key={device.id}
                >
                  <div className="portal-device-card-main">
                    <span className="portal-device-icon">
                      <DeviceIcon size={22} />
                    </span>

                    <div className="portal-device-copy">
                      <div className="portal-device-title-row">
                        <h3>{device.device_name || "Windows PC"}</h3>

                        <span
                          className={`portal-device-status ${
                            device.is_active ? "is-active" : "is-removed"
                          }`}
                        >
                          {device.is_active ? "Active" : "Removed"}
                        </span>
                      </div>

                      <p>
                        {device.operating_system ||
                          "Operating system unavailable"}
                      </p>

                      <div className="portal-device-meta">
                        <span>
                          <small>First registered</small>
                          <b>{formatDate(device.first_seen_at)}</b>
                        </span>

                        <span>
                          <small>Last used</small>
                          <b>{formatLastSeen(device.last_seen_at)}</b>
                        </span>

                        <span>
                          <small>App version</small>
                          <b>{device.app_version || "Not available"}</b>
                        </span>
                      </div>
                    </div>
                  </div>

                  <form action={setDeviceStatus}>
                    <input type="hidden" name="deviceId" value={device.id} />
                    <input
                      type="hidden"
                      name="requestedState"
                      value={device.is_active ? "inactive" : "active"}
                    />

                    <DeviceActionButton
                      active={device.is_active}
                      disabled={
                        !device.is_active &&
                        activeCount >= maximumDevices
                      }
                    />
                  </form>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="portal-panel portal-device-help">
        <div>
          <span className="portal-panel-kicker">HOW IT WORKS</span>
          <h2>Changing to a new computer?</h2>
          <p>
            Remove an old device here, then sign in on the replacement
            computer. The new machine will use the available slot
            automatically.
          </p>
        </div>
      </section>
    </div>
  );
}
