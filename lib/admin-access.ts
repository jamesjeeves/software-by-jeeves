import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const email = user.email?.toLowerCase() ?? "";
  const adminEmails = getAdminEmails();

  if (!email || !adminEmails.includes(email)) {
    redirect("/dashboard");
  }

  return user;
}
