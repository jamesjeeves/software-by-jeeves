"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock3, Sparkles } from "lucide-react";
import { useState } from "react";

const benefits = [
  "Amazon EU Deal Finder Pro desktop software",
  "Germany, France, Italy and Spain research",
  "Bulk ASIN scanning and live activity",
  "Profit, ROI, margin and confidence analysis",
  "Deal Vault and opportunity reverification",
  "Excel-ready exports",
  "Future software updates",
  "Secure customer dashboard and billing portal",
];

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const annual = billing === "annual";

  return (
    <section className="v3-pricing-section" id="pricing">
      <div className="shell">
        <div className="v2-section-heading">
          <div className="eyebrow">Simple professional pricing</div>
          <h2>Three days to test it. One plan when you are ready.</h2>
          <p>
            Choose monthly flexibility or save £150 with annual billing.
            Both options begin with the same three-day free trial.
          </p>
        </div>

        <div className="v3-billing-toggle" aria-label="Choose billing period">
          <button
            type="button"
            className={!annual ? "active" : ""}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={annual ? "active" : ""}
            onClick={() => setBilling("annual")}
          >
            Annual <span className="v3-save-badge">SAVE £150</span>
          </button>
        </div>

        <div className="v3-pricing-card">
          <div className="v3-trial-ribbon">
            <Sparkles size={14} /> THREE-DAY FREE TRIAL INCLUDED
          </div>

          <div className="v3-pricing-top">
            <div>
              <span className="v3-plan-label">PROFESSIONAL</span>
              <h3>Amazon EU Deal Finder Pro</h3>
              <p>Professional sourcing intelligence for Amazon UK sellers.</p>
            </div>

            <div className="v3-price-wrap" aria-live="polite">
              <div className="v3-price">
                <span>£</span>{annual ? "750" : "75"}
                <small>/{annual ? "year" : "month"}</small>
              </div>
              <span className="v3-price-note">
                {annual ? "Equivalent to £62.50 per month" : "Switch or cancel through the billing portal"}
              </span>
            </div>
          </div>

          <div className="v3-pricing-body">
            <ul className="v3-pricing-list">
              {benefits.map((item) => (
                <li key={item}><Check size={18} />{item}</li>
              ))}
            </ul>

            <div className="v3-pricing-action">
              <Link
                className="button primary large"
                href={`/signup?plan=${annual ? "annual" : "monthly"}`}
              >
                Start three-day trial <ArrowRight size={18} />
              </Link>
              <small>
                Payment method required. Your {annual ? "annual" : "monthly"}
                subscription begins automatically after the trial unless cancelled.
                Keepa is required and billed separately.
              </small>
            </div>
          </div>
        </div>

        <div className="v3-trial-steps">
          <div><span>DAY 1</span><b>Create your account</b><small>Choose a plan and securely add your payment method.</small></div>
          <div><span>DAYS 1–3</span><b>Test the full workflow</b><small>Install the software, connect Keepa and run real scans.</small></div>
          <div><span>AFTER DAY 3</span><b>Continue or cancel</b><small>Your selected plan starts automatically unless cancelled first.</small></div>
        </div>
      </div>
    </section>
  );
}
