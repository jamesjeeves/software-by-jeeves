import Link from "next/link";
import { signUp } from "@/app/actions/auth";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;
  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link href="/" className="brand">
          <span className="brand-mark">J</span>
          <span><b>Software By Jeeves</b><small>Amazon EU Deal Finder Pro</small></span>
        </Link>
        <h1>Create your account</h1>
        <p>Your account gives you secure access to billing and software downloads.</p>
        <form action={signUp} className="form">
          {error && <div className="message error">{error}</div>}
          {success && <div className="message">{success}</div>}
          <label>Email address<input name="email" type="email" required /></label>
          <label>Password<input name="password" type="password" minLength={8} required /></label>
          <button className="button primary large full" type="submit">Create account</button>
        </form>
        <div className="auth-foot">Already subscribed? <Link href="/login">Log in</Link></div>
      </section>
    </main>
  );
}
