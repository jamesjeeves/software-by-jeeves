import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Database,
  ExternalLink,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Software By Jeeves",
  description:
    "Privacy Policy for Software By Jeeves and the Amazon EU Deal Finder Companion browser extension.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <style>{`
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background:
            radial-gradient(circle at 15% 8%, rgba(22,119,255,.18), transparent 29rem),
            radial-gradient(circle at 88% 22%, rgba(6,182,212,.10), transparent 24rem),
            #07111f;
        }
        .privacy-page {
          min-height: 100vh;
          color: #eaf2ff;
          font-family: Arial, Helvetica, sans-serif;
          padding: 28px 20px 64px;
        }
        .privacy-shell { width: min(940px, 100%); margin: 0 auto; }
        .privacy-nav {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; margin-bottom: 42px;
        }
        .privacy-brand {
          display: inline-flex; align-items: center; gap: 12px;
          color: #fff; text-decoration: none; font-weight: 800;
        }
        .privacy-mark {
          width: 40px; height: 40px; display: grid; place-items: center;
          border-radius: 12px; color: white;
          background: linear-gradient(135deg,#1677ff,#06b6d4);
          box-shadow: 0 10px 28px rgba(22,119,255,.28);
        }
        .privacy-back {
          display: inline-flex; align-items: center; gap: 8px;
          color: #a9bad0; text-decoration: none; font-size: 14px;
        }
        .privacy-back:hover { color: #fff; }
        .privacy-hero {
          padding: 42px; border: 1px solid rgba(143,161,184,.18);
          border-radius: 26px;
          background: linear-gradient(145deg,rgba(14,26,44,.96),rgba(9,19,34,.94));
          box-shadow: 0 30px 80px rgba(0,0,0,.28); margin-bottom: 22px;
        }
        .privacy-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          color: #69d7e8; font-size: 13px; font-weight: 800;
          letter-spacing: .12em; text-transform: uppercase; margin-bottom: 18px;
        }
        .privacy-hero h1 {
          margin: 0 0 16px; font-size: clamp(38px,7vw,64px);
          line-height: .98; letter-spacing: -.045em; color: #fff;
        }
        .privacy-hero p {
          max-width: 720px; margin: 0; color: #a9bad0;
          font-size: 17px; line-height: 1.75;
        }
        .privacy-meta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
        .privacy-meta span {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 12px; border: 1px solid rgba(143,161,184,.17);
          border-radius: 999px; background: rgba(7,17,31,.62);
          color: #c8d5e6; font-size: 13px;
        }
        .privacy-notice {
          display: grid; grid-template-columns: auto 1fr; gap: 15px;
          padding: 20px; margin-bottom: 22px;
          border: 1px solid rgba(6,182,212,.22); border-radius: 18px;
          background: rgba(6,182,212,.075);
        }
        .privacy-notice svg { color: #35cde2; margin-top: 2px; }
        .privacy-notice strong { display: block; color: #fff; margin-bottom: 5px; }
        .privacy-notice p { margin: 0; color: #b4c3d5; line-height: 1.65; }
        .privacy-card {
          padding: 30px 34px; border: 1px solid rgba(143,161,184,.14);
          border-radius: 20px; background: rgba(14,26,44,.82); margin-top: 14px;
        }
        .privacy-card h2 {
          margin: 0 0 14px; color: #fff; font-size: 21px; letter-spacing: -.02em;
        }
        .privacy-card p, .privacy-card li {
          color: #adbed1; font-size: 15.5px; line-height: 1.75;
        }
        .privacy-card p { margin: 0 0 12px; }
        .privacy-card p:last-child { margin-bottom: 0; }
        .privacy-card ul { padding-left: 22px; margin: 8px 0 14px; }
        .privacy-card li + li { margin-top: 5px; }
        .privacy-card a { color: #70d8e8; font-weight: 700; }
        .privacy-card code {
          padding: 2px 7px; border-radius: 6px; color: #dce9fa;
          background: #07111f; border: 1px solid rgba(143,161,184,.18);
        }
        .privacy-contact {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; margin-top: 22px; padding: 24px; border-radius: 20px;
          background: linear-gradient(135deg,#126bdf,#079db7); color: white;
        }
        .privacy-contact h2 { margin: 0 0 5px; font-size: 22px; }
        .privacy-contact p { margin: 0; color: rgba(255,255,255,.82); }
        .privacy-contact a {
          display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0;
          padding: 12px 16px; border-radius: 12px; background: white;
          color: #0b4b86; text-decoration: none; font-weight: 800;
        }
        .privacy-footer {
          display: flex; align-items: center; justify-content: space-between;
          gap: 18px; padding-top: 34px; color: #71849c; font-size: 13px;
        }
        .privacy-footer div { display: flex; gap: 16px; }
        .privacy-footer a { color: #91a6bf; text-decoration: none; }
        .privacy-footer a:hover { color: white; }
        @media (max-width: 700px) {
          .privacy-page { padding-inline: 14px; }
          .privacy-nav { margin-bottom: 24px; }
          .privacy-brand span:last-child { display: none; }
          .privacy-hero { padding: 30px 22px; }
          .privacy-card { padding: 24px 21px; }
          .privacy-contact, .privacy-footer { align-items: flex-start; flex-direction: column; }
        }
      `}</style>

      <div className="privacy-shell">
        <nav className="privacy-nav" aria-label="Privacy page navigation">
          <Link className="privacy-brand" href="/">
            <span className="privacy-mark">J</span>
            <span>Software By Jeeves</span>
          </Link>
          <Link className="privacy-back" href="/">
            <ArrowLeft size={16} /> Back to website
          </Link>
        </nav>

        <header className="privacy-hero">
          <div className="privacy-eyebrow">
            <ShieldCheck size={17} /> Privacy and data protection
          </div>
          <h1>Privacy Policy</h1>
          <p>
            This policy explains how Software By Jeeves handles information when
            you use our website, Amazon EU Deal Finder Companion browser extension
            and associated desktop software.
          </p>
          <div className="privacy-meta">
            <span><LockKeyhole size={14} /> Effective 2 August 2026</span>
            <span><Database size={14} /> Extension-specific disclosure</span>
          </div>
        </header>

        <aside className="privacy-notice">
          <ShieldCheck size={25} />
          <div>
            <strong>Our core privacy promise</strong>
            <p>
              We do not sell user data or use extension activity for targeted
              advertising. The extension processes Amazon product information only
              to provide its product-comparison and deal-analysis functionality.
            </p>
          </div>
        </aside>

        <section className="privacy-card">
          <h2>1. Who we are</h2>
          <p>
            Software By Jeeves provides software tools for Amazon sellers,
            including the Amazon EU Deal Finder Companion browser extension and
            associated desktop software.
          </p>
          <p>
            This Privacy Policy explains how information is handled when you use
            our website and software.
          </p>
        </section>

        <section className="privacy-card">
          <h2>2. Information processed by the extension</h2>
          <p>
            The Amazon EU Deal Finder Companion processes information from the
            Amazon product page you are actively viewing so it can provide its core
            functionality. This may include:
          </p>
          <ul>
            <li>Amazon product identifiers, including ASINs;</li>
            <li>product titles, prices and availability;</li>
            <li>seller, fulfilment and product-condition information;</li>
            <li>the supported Amazon marketplace being viewed; and</li>
            <li>technical diagnostic information needed to identify scan errors.</li>
          </ul>
          <p>
            This product information is used only to compare supported Amazon
            marketplaces and calculate deal information such as estimated profit,
            return on investment and break-even price.
          </p>
        </section>

        <section className="privacy-card">
          <h2>3. Information we do not collect</h2>
          <p>
            The extension is not designed to collect passwords, payment-card
            details, private messages, health information, government identifiers
            or browsing activity unrelated to its supported Amazon product-page
            functionality.
          </p>
          <p>
            We do not sell personal information, use extension data for targeted
            advertising or create advertising profiles from your browsing activity.
          </p>
        </section>

        <section className="privacy-card">
          <h2>4. Local desktop communication</h2>
          <p>
            The extension may communicate with the Amazon EU Deal Finder Pro desktop
            application installed on the same computer through a local connection,
            normally at <code>127.0.0.1</code> (localhost).
          </p>
          <p>
            Amazon product and marketplace data required for analysis may be sent to
            that local desktop application. A localhost connection remains on your
            device and is not, by itself, a transmission to a Software By Jeeves web
            server.
          </p>
        </section>

        <section className="privacy-card">
          <h2>5. Local storage, cache and diagnostics</h2>
          <p>
            The extension may store settings, feature preferences and short-lived
            scan results in Chrome&apos;s local extension storage. This improves
            performance and remembers choices such as whether supported affiliate
            links are enabled.
          </p>
          <p>
            Developer diagnostics may contain the current ASIN, marketplace scan
            results, parser evidence, request details and error messages. Diagnostic
            information is not automatically submitted to us. It is shared only when
            a user deliberately copies or sends a diagnostic report for support.
          </p>
        </section>

        <section className="privacy-card">
          <h2>6. Affiliate links</h2>
          <p>
            Links to supported Amazon EU marketplaces may include a Software By
            Jeeves Amazon Associates tag. This does not increase the price paid by
            the user. Affiliate-link support can be disabled in the extension
            settings.
          </p>
          <p>
            When you follow an Amazon link, Amazon may process information in
            accordance with its own privacy and cookie policies.
          </p>
        </section>

        <section className="privacy-card">
          <h2>7. Website, accounts and payments</h2>
          <p>
            If you create a Software By Jeeves account or purchase a subscription,
            we may process the account and contact information needed to provide the
            service, manage access and respond to support requests.
          </p>
          <p>
            Payment information is processed by our payment provider and is subject
            to that provider&apos;s privacy policy. Software By Jeeves does not need
            to store complete payment-card details.
          </p>
        </section>

        <section className="privacy-card">
          <h2>8. How information is used</h2>
          <p>Information is used only where reasonably necessary to:</p>
          <ul>
            <li>provide product comparison and deal-analysis features;</li>
            <li>operate customer accounts and subscriptions;</li>
            <li>maintain, secure and improve the software;</li>
            <li>diagnose errors and answer support requests;</li>
            <li>prevent misuse or unauthorised access; and</li>
            <li>meet legal and regulatory obligations.</li>
          </ul>
        </section>

        <section className="privacy-card">
          <h2>9. Sharing and disclosure</h2>
          <p>
            We do not sell or rent personal information. Information may be shared
            with service providers only where necessary to operate the website,
            subscriptions, authentication, hosting or customer support.
          </p>
          <p>
            We may also disclose information where required by law, to protect users
            or the service, or in connection with a legitimate business
            reorganisation.
          </p>
        </section>

        <section className="privacy-card">
          <h2>10. Data retention and security</h2>
          <p>
            We retain information only for as long as reasonably necessary for the
            purpose for which it was collected, including providing the service,
            resolving support issues, maintaining records and complying with legal
            obligations.
          </p>
          <p>
            We use reasonable technical and organisational safeguards designed to
            protect information. No internet-connected service can guarantee
            absolute security.
          </p>
        </section>

        <section className="privacy-card">
          <h2>11. Your rights</h2>
          <p>
            Depending on your location, you may have rights to request access,
            correction, deletion, restriction or a copy of personal information
            relating to you, and to object to certain processing.
          </p>
          <p>
            You may also remove locally stored extension data by uninstalling the
            extension or clearing its stored data through Chrome.
          </p>
        </section>

        <section className="privacy-card">
          <h2>12. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy when our software, business practices
            or legal obligations change. The latest version will be published on
            this page with a revised effective date.
          </p>
        </section>

        <section className="privacy-card">
          <h2>13. Contact</h2>
          <p>
            For privacy questions, support requests or requests concerning your
            information, contact:
          </p>
          <p>
            <a href="mailto:support@softwarebyjeeves.com">
              support@softwarebyjeeves.com
            </a>
          </p>
        </section>

        <section className="privacy-contact">
          <div>
            <h2>Questions about your privacy?</h2>
            <p>Contact Software By Jeeves and we will be happy to help.</p>
          </div>
          <a href="mailto:support@softwarebyjeeves.com">
            <Mail size={17} /> Email support
          </a>
        </section>

        <footer className="privacy-footer">
          <span>© {new Date().getFullYear()} Software By Jeeves. All rights reserved.</span>
          <div>
            <Link href="/">Home</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:support@softwarebyjeeves.com" rel="noreferrer">
              Support <ExternalLink size={11} style={{ verticalAlign: "-1px" }} />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
