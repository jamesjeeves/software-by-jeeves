import Link from "next/link";
import { signIn } from "@/app/actions/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link href="/" className="brand">
          <span className="brand-mark">J</span>
          <span><b>Software By Jeeves</b><small>Amazon EU Deal Finder Pro</small></span>
        </Link>
        <h1>Welcome back</h1>
        <p>Log in to manage your subscription and download the latest software.</p>
        <form action={signIn} className="form">
          {error && <div className="message error">{error}</div>}
          <label>Email address<input name="email" type="email" required /></label>
          <label>Password<input name="password" type="password" minLength={8} required /></label>
          <button className="button primary large full" type="submit">Log in</button>
        </form>
        <div className="auth-foot">New here? <Link href="/signup">Create an account</Link></div>
      </section>
    </main>
  );
}
