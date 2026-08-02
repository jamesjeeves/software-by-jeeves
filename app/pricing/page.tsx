import {
  Check,
  Crown,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const sharedFeatures = [
  "3-day free trial",
  "Unlimited product scans",
  "UK and EU marketplace analysis",
  "All future software updates",
  "Secure customer dashboard",
  "Cancel at any time",
];

export default function PricingPage() {
  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-badge">
          <Sparkles size={15} />
          AMAZON EU DEAL FINDER PRO
        </div>

        <h1>Choose your membership</h1>

        <p>
          Start with a 3-day free trial. Your first payment is taken when the
          trial ends unless you cancel beforehand.
        </p>
      </section>

      <section className="pricing-grid">
        <article className="pricing-card">
          <div className="pricing-card-icon">
            <Zap size={25} />
          </div>

          <div className="pricing-card-heading">
            <span>MONTHLY</span>
            <h2>Professional Monthly</h2>
            <p>Maximum flexibility with monthly billing.</p>
          </div>

          <div className="pricing-price">
            <strong>£75</strong>
            <span>/ month</span>
          </div>

          <div className="pricing-trial">
            <ShieldCheck size={17} />
            3 days free, then £75 per month
          </div>

          <ul className="pricing-feature-list">
            {sharedFeatures.map((feature) => (
              <li key={feature}>
                <Check size={16} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <form action="/api/checkout" method="POST">
            <input type="hidden" name="plan" value="monthly" />

            <button className="pricing-button secondary" type="submit">
              Start monthly trial
            </button>
          </form>

          <small>No charge today. Payment method required.</small>
        </article>

        <article className="pricing-card featured">
          <div className="pricing-popular-badge">
            <Crown size={14} />
            BEST VALUE
          </div>

          <div className="pricing-card-icon">
            <Crown size={25} />
          </div>

          <div className="pricing-card-heading">
            <span>ANNUAL</span>
            <h2>Professional Annual</h2>
            <p>Save £150 compared with twelve monthly payments.</p>
          </div>

          <div className="pricing-price">
            <strong>£750</strong>
            <span>/ year</span>
          </div>

          <div className="pricing-saving">
            Equivalent to £62.50 per month
          </div>

          <div className="pricing-trial">
            <ShieldCheck size={17} />
            3 days free, then £750 per year
          </div>

          <ul className="pricing-feature-list">
            {sharedFeatures.map((feature) => (
              <li key={feature}>
                <Check size={16} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <form action="/api/checkout" method="POST">
            <input type="hidden" name="plan" value="yearly" />

            <button className="pricing-button primary" type="submit">
              Start annual trial
            </button>
          </form>

          <small>No charge today. Payment method required.</small>
        </article>
      </section>

      <section className="pricing-footer-note">
        <ShieldCheck size={18} />

        <p>
          Payments and subscription management are securely handled by Stripe.
        </p>
      </section>
    </main>
  );
}