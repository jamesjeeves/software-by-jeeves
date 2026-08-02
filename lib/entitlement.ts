import { createAdminClient } from "@/lib/supabase/admin";

const AUTHORISED_SUBSCRIPTION_STATUSES = new Set(["active", "trialing"]);

export type UserEntitlement = {
  authorised: boolean;
  subscriptionStatus: string | null;
};

export async function getUserEntitlement(
  userId: string
): Promise<UserEntitlement> {
  if (!userId) {
    throw new Error("A Supabase user ID is required.");
  }

  const admin = createAdminClient();

  const { data: profile, error } = await admin
    .from("profiles")
    .select("subscription_status")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Unable to load user entitlement:", error);
    throw new Error("Unable to verify subscription entitlement.");
  }

  const subscriptionStatus =
    typeof profile?.subscription_status === "string"
      ? profile.subscription_status.trim().toLowerCase()
      : null;

  return {
    authorised:
      subscriptionStatus !== null &&
      AUTHORISED_SUBSCRIPTION_STATUSES.has(subscriptionStatus),
    subscriptionStatus,
  };
}
