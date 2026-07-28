import Image from "next/image";
import Link from "next/link";
import PricingSection from "@/components/PricingSection";
import {
  ArrowRight,
  BellRing,
  Clock3,
  Code2,
  CreditCard,
  BadgeCheck,
  BarChart3,
  Check,
  Download,
  FileSpreadsheet,
  KeyRound,
  Gauge,
  Globe2,
  History,
  Minus,
  LockKeyhole,
  PackageCheck,
  Radar,
  ReceiptText,
  Search,
  Settings2,
  ShieldCheck,
  Store,
  Sparkles,
  Star,
  Vault,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Radar,
    title: "Bulk ASIN scanning",
    text: "Import a Keepa CSV, set your thresholds and analyse large product lists without checking each ASIN manually.",
  },
  {
    icon: Globe2,
    title: "Four EU marketplaces",
    text: "Research Germany, France, Italy and Spain while comparing opportunities against the UK marketplace.",
  },
  {
    icon: Gauge,
    title: "Profit and ROI filters",
    text: "Set your minimum ROI, minimum profit and maximum EU buy price before the scan begins.",
  },
  {
    icon: BadgeCheck,
    title: "Deal intelligence",
    text: "Use deal scores, confidence levels and clear ratings to prioritise the strongest opportunities.",
  },
  {
    icon: Vault,
    title: "Deal Vault",
    text: "Save promising opportunities, verify them again later and keep your strongest deals organised.",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel-ready exports",
    text: "Export clean results for deeper analysis, purchasing decisions and your existing sourcing workflow.",
  },
];

const workflow = [
  ["01", "Import products", "Choose your Keepa CSV and load the ASINs you want to research."],
  ["02", "Set your targets", "Choose marketplaces and define your required ROI, profit and maximum buy price."],
  ["03", "Run the scan", "Follow live activity while Deal Finder checks products and identifies opportunities."],
  ["04", "Review and save", "Analyse confidence, profit and ROI, then export results or save deals to the Vault."],
];

const faqs = [
  [
    "What marketplaces does it analyse?",
    "The current professional version supports Amazon Germany, France, Italy and Spain, compared against Amazon UK opportunities.",
  ],
  [
    "Do I need Keepa?",
    "Yes. Customers connect and fund their own Keepa account. Keepa subscriptions and token usage are separate from the Deal Finder Pro subscription, so you remain in control of the plan and token allowance that suits your business.",
  ],
  [
    "Does the software guarantee profit?",
    "No. It is a research and decision-support tool. Prices, fees, demand, eligibility and competition can change, so every deal should be verified before purchasing stock.",
  ],
  [
    "How does the three-day trial work?",
    "Choose monthly or annual billing and begin with three days of access. A payment method will be collected at checkout, and the selected subscription will begin automatically after the trial unless it is cancelled beforehand.",
  ],
  [
    "Can I cancel my subscription?",
    "Yes. Customers can manage payment details, invoices and cancellation through the secure Stripe billing portal. Cancelling during the trial prevents the first subscription charge.",
  ],
];

export default function HomePage() {
  return (
    <main className="v2-site">
      <header className="v2-nav-wrap">
        <nav className="v2-nav shell">
          <Link href="/" className="brand" aria-label="Software By Jeeves home">
            <span className="brand-mark">J</span>
            <span>
              <b>Software By Jeeves</b>
              <small>Professional e-commerce software</small>
            </span>
          </Link>

          <div className="v2-nav-links">
            <a href="#product">Product</a>
            <a href="#features">Features</a>
            <a href="#workflow">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="nav-actions">
            <Link className="button ghost" href="/login">
              Log in
            </Link>
            <Link className="button primary small" href="/signup">
              Get started <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
      </header>

      <section className="v2-hero shell">
        <div className="v2-grid-lines" />
        <div className="v2-glow v2-glow-one" />
        <div className="v2-glow v2-glow-two" />

        <div className="v2-hero-copy">
          <div className="eyebrow">
            <Sparkles size={15} />
            Amazon EU sourcing intelligence
          </div>

          <h1>
            Find profitable
            <span>Amazon EU deals.</span>
          </h1>

          <p className="v22-hero-kicker">
            Professional sourcing software for Amazon UK sellers.
          </p>

          <p className="v22-hero-copy">
            Scan product lists across Germany, France, Italy and Spain.
            Filter by profit, ROI and confidence, then review the opportunities
            worth taking further.
          </p>

          <div className="v2-hero-actions">
            <Link className="button primary large" href="/signup">
              Start finding deals <ArrowRight size={18} />
            </Link>
            <a className="button secondary large" href="#product">
              See the software
            </a>
          </div>

          <div className="v2-trust-row">
            <span><Check size={16} /> Built for Amazon UK sellers</span>
            <span><Check size={16} /> Secure subscription billing</span>
            <span><Check size={16} /> Cancel anytime</span>
          </div>
        </div>

        <div className="v2-hero-visual">
          <div className="v2-orbit v2-orbit-one" />
          <div className="v2-orbit v2-orbit-two" />

          <div className="v2-app-window">
            <div className="v2-window-bar">
              <div className="window-dots"><i /><i /><i /></div>
              <span>Amazon EU Deal Finder Pro</span>
              <div className="live-pill"><i /> Scanner online</div>
            </div>

            <Image
              src="/images/eu-deal-finder-dashboard.webp"
              alt="Amazon EU Deal Finder Pro dashboard running a live product scan"
              width={1907}
              height={985}
              priority
            />
          </div>

          <div className="v2-float-card v2-profit-card">
            <div className="v2-float-icon green"><BarChart3 size={19} /></div>
            <div><small>Estimated profit</small><b>£128.48</b></div>
          </div>

          <div className="v2-float-card v2-roi-card">
            <div className="v2-float-icon purple"><Zap size={19} /></div>
            <div><small>Best opportunity</small><b>63.95% ROI</b></div>
          </div>
        </div>
      </section>

      <section className="v2-proof">
        <div className="shell v2-proof-grid">
          <div><Globe2 size={19} /><span><b>Germany, France, Italy and Spain</b><small>EU marketplace research</small></span></div>
          <div><Radar size={19} /><span><b>Bulk product analysis</b><small>Scan large ASIN lists</small></span></div>
          <div><Gauge size={19} /><span><b>Custom deal thresholds</b><small>Control ROI, profit and price</small></span></div>
          <div><Vault size={19} /><span><b>Deal Vault</b><small>Save and reverify opportunities</small></span></div>
        </div>
      </section>

      <section className="v2-section shell" id="product">
        <div className="v2-section-heading">
          <div className="eyebrow">One connected sourcing workflow</div>
          <h2>From thousands of products to the deals worth reviewing</h2>
          <p>
            Every screen is designed to reduce manual checking and make your
            next sourcing decision clearer.
          </p>
        </div>

        <div className="v2-showcase">
          <article className="v2-showcase-main">
            <div className="v2-showcase-copy">
              <span className="v2-number">01</span>
              <h3>Control the scan from one dashboard</h3>
              <p>
                Import your ASIN list, select EU marketplaces, define your targets
                and follow the scan as opportunities are discovered.
              </p>
              <div className="v2-mini-points">
                <span><Check size={15} /> Live scan progress</span>
                <span><Check size={15} /> Keepa token monitoring</span>
                <span><Check size={15} /> Live EUR to GBP rates</span>
              </div>
            </div>
            <div className="v2-showcase-image">
              <Image
                src="/images/eu-deal-finder-dashboard.webp"
                alt="Deal Finder dashboard and scan controls"
                width={1907}
                height={985}
              />
            </div>
          </article>

          <div className="v2-showcase-grid">
            <article className="v2-showcase-card">
              <div className="v2-showcase-card-copy">
                <span className="v2-number">02</span>
                <h3>Save your strongest opportunities</h3>
                <p>
                  Keep promising products inside Deal Vault and reverify them
                  before committing your capital.
                </p>
              </div>
              <div className="v2-shot-frame">
                <Image
                  src="/images/eu-deal-finder-vault.webp"
                  alt="Deal Vault with saved Amazon sourcing opportunities"
                  width={1713}
                  height={982}
                />
              </div>
            </article>

            <article className="v2-showcase-card">
              <div className="v2-showcase-card-copy">
                <span className="v2-number">03</span>
                <h3>See the scanner working live</h3>
                <p>
                  Follow product discoveries, token usage and scan events while
                  the software works through your list.
                </p>
              </div>
              <div className="v2-shot-frame activity">
                <Image
                  src="/images/eu-deal-finder-activity.webp"
                  alt="Live activity feed from an Amazon EU product scan"
                  width={509}
                  height={629}
                />
              </div>
            </article>
          </div>

          <article className="v2-results-showcase">
            <div>
              <span className="v2-number">04</span>
              <h3>Rank opportunities by strength, confidence, ROI and profit</h3>
              <p>
                Move from a raw product list to a focused table of opportunities
                that can be reviewed, verified and exported.
              </p>
            </div>
            <div className="v2-results-shot">
              <Image
                src="/images/eu-deal-finder-results.webp"
                alt="Amazon EU Deal Finder results ranked by deal score and ROI"
                width={1656}
                height={158}
              />
            </div>
          </article>
        </div>
      </section>

      <PricingSection />

      <section className="v2-section v2-feature-section" id="features">
        <div className="shell">
          <div className="v2-section-heading">
            <div className="eyebrow">Professional research tools</div>
            <h2>Everything needed to turn product data into decisions</h2>
          </div>

          <div className="v2-feature-grid">
            {features.map(({ icon: Icon, title, text }) => (
              <article className="v2-feature-card" key={title}>
                <div className="v2-feature-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section shell" id="workflow">
        <div className="v2-section-heading left">
          <div className="eyebrow">A repeatable process</div>
          <h2>Go from CSV to shortlist in four clear steps</h2>
        </div>

        <div className="v2-workflow-grid">
          {workflow.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>


      <section className="v3-keepa-section shell">
        <div className="v3-keepa-card">
          <div className="v3-keepa-copy">
            <div className="eyebrow">Transparent Keepa usage</div>
            <h2>Your Keepa account. Your tokens. Your control.</h2>
            <p>
              Deal Finder Pro uses your own Keepa account and token allowance.
              Keepa is not bundled into the subscription, so there are no hidden
              token markups and you can choose the Keepa setup that suits your business.
            </p>

            <div className="v3-keepa-points">
              <div><KeyRound size={18} /><span><b>Connect your own account</b><small>Your Keepa access stays under your control.</small></span></div>
              <div><Gauge size={18} /><span><b>Monitor token usage</b><small>See available tokens directly inside the software.</small></span></div>
              <div><Settings2 size={18} /><span><b>Choose your own allowance</b><small>Increase or manage Keepa usage however you see fit.</small></span></div>
            </div>
          </div>

          <div className="v3-keepa-notice">
            <span>IMPORTANT</span>
            <h3>Keepa is required and billed separately.</h3>
            <p>
              The £75 monthly or £750 annual Deal Finder Pro subscription does
              not include a Keepa subscription or Keepa token charges.
            </p>
          </div>
        </div>
      </section>

      <section className="v21-comparison-section">
        <div className="shell">
          <div className="v2-section-heading">
            <div className="eyebrow">Why sellers use Deal Finder Pro</div>
            <h2>Replace repetitive manual research with one focused workflow</h2>
            <p>
              The software does not replace your judgement. It removes the
              repetitive checking that slows your judgement down.
            </p>
          </div>

          <div className="v21-comparison-grid">
            <article className="v21-comparison-card manual">
              <div className="v21-card-heading">
                <div className="v21-heading-icon"><Clock3 size={22} /></div>
                <div>
                  <span>THE MANUAL WAY</span>
                  <h3>Researching every product yourself</h3>
                </div>
              </div>

              <div className="v21-comparison-list">
                {[
                  "Open each Amazon listing individually",
                  "Compare UK and EU prices by hand",
                  "Calculate profit, margin and ROI separately",
                  "Track promising products in spreadsheets",
                  "Repeat the same checks before purchasing",
                ].map((item) => (
                  <div key={item}>
                    <span className="v21-list-icon negative"><Minus size={15} /></span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="v21-comparison-arrow">
              <ArrowRight size={24} />
            </div>

            <article className="v21-comparison-card pro">
              <div className="v21-card-heading">
                <div className="v21-heading-icon"><Zap size={22} /></div>
                <div>
                  <span>WITH DEAL FINDER PRO</span>
                  <h3>Reviewing a prioritised shortlist</h3>
                </div>
              </div>

              <div className="v21-comparison-list">
                {[
                  "Import your product list once",
                  "Scan supported EU marketplaces together",
                  "Apply your own profit and ROI targets",
                  "Rank opportunities by score and confidence",
                  "Save, reverify and export stronger deals",
                ].map((item) => (
                  <div key={item}>
                    <span className="v21-list-icon positive"><Check size={15} /></span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="v2-section shell">
        <div className="v21-founder-card">
          <div className="v21-founder-copy">
            <div className="eyebrow">Built from real sourcing experience</div>
            <h2>Created by an Amazon seller—not a team guessing what sellers need</h2>
            <p>
              Amazon EU Deal Finder Pro was built to solve a real sourcing
              problem: too much time spent comparing products manually and too
              little time spent acting on the strongest opportunities.
            </p>

            <div className="v21-founder-points">
              <div>
                <Store size={19} />
                <span>
                  <b>Designed around real workflows</b>
                  <small>Built for the way online arbitrage sellers actually research stock.</small>
                </span>
              </div>

              <div>
                <Code2 size={19} />
                <span>
                  <b>Improved through everyday use</b>
                  <small>Features are shaped by genuine sourcing problems rather than generic software ideas.</small>
                </span>
              </div>

              <div>
                <ShieldCheck size={19} />
                <span>
                  <b>Decision support, not empty promises</b>
                  <small>The software helps you research faster while keeping the final buying decision in your hands.</small>
                </span>
              </div>
            </div>
          </div>

          <div className="v21-founder-visual">
            <div className="v21-founder-logo">J</div>
            <span>SOFTWARE BY JEEVES</span>
            <h3>Professional tools for smarter Amazon sourcing.</h3>
            <div className="v21-founder-domain">softwarebyjeeves.com</div>
          </div>
        </div>
      </section>

      <section className="v2-section shell">
        <div className="v2-section-heading">
          <div className="eyebrow">Everything after checkout</div>
          <h2>A professional customer area from day one</h2>
          <p>
            Subscribers will have one secure place to download the software,
            manage billing and stay current with future releases.
          </p>
        </div>

        <div className="v3-portal-preview">
          <aside className="v3-portal-sidebar">
            <div className="v3-portal-brand"><span>J</span><b>Software By Jeeves</b></div>
            <nav>
              <div className="active"><PackageCheck size={17} />Overview</div>
              <div><Download size={17} />Downloads</div>
              <div><KeyRound size={17} />Licence</div>
              <div><ReceiptText size={17} />Invoices</div>
              <div><BellRing size={17} />Updates</div>
              <div><CreditCard size={17} />Billing</div>
            </nav>
          </aside>

          <div className="v3-portal-main">
            <div className="v3-portal-heading">
              <div><small>CUSTOMER DASHBOARD</small><h3>Welcome back, James</h3></div>
              <span className="status"><i /> ACTIVE MEMBERSHIP</span>
            </div>

            <div className="v3-portal-cards">
              <article>
                <small>CURRENT PLAN</small>
                <b>Deal Finder Pro</b>
                <span>Professional subscription</span>
              </article>
              <article>
                <small>LATEST VERSION</small>
                <b>Ready to download</b>
                <span>Secure member access</span>
              </article>
              <article>
                <small>BILLING</small>
                <b>Self-service portal</b>
                <span>Invoices, cards and cancellation</span>
              </article>
            </div>

            <div className="v3-download-preview">
              <div className="v3-download-icon"><Download size={22} /></div>
              <div><b>Amazon EU Deal Finder Pro</b><small>Latest Windows release</small></div>
              <button type="button">Download software</button>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-section shell" id="faq">
        <div className="v2-section-heading">
          <div className="eyebrow">Before you subscribe</div>
          <h2>Frequently asked questions</h2>
        </div>

        <div className="v2-faq-grid">
          {faqs.map(([question, answer]) => (
            <article key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="v2-final-cta shell">
        <div>
          <div className="eyebrow light">
            <LockKeyhole size={15} />
            Secure member access
          </div>
          <h2>Spend less time checking products. More time acting on opportunities.</h2>
          <p>
            Bring your EU product research into one focused professional workflow.
          </p>
        </div>
        <Link className="button white large" href="/signup">
          Get Deal Finder Pro <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="v2-footer shell">
        <div className="brand">
          <span className="brand-mark">J</span>
          <span>
            <b>Software By Jeeves</b>
            <small>softwarebyjeeves.com</small>
          </span>
        </div>

        <p>© {new Date().getFullYear()} Software By Jeeves. All rights reserved.</p>

        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:support@softwarebyjeeves.com">Support</a>
        </div>
      </footer>
    </main>
  );
}
