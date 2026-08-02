import {
  BookOpen,
  Clock3,
  ExternalLink,
  Headphones,
  Mail,
  MessageCircleQuestion,
} from "lucide-react";

export default function SupportPage() {
  return (
    <div className="portal-page">
      <header className="portal-page-header">
        <div>
          <span>SUPPORT CENTRE</span>
          <h1>How can we help?</h1>
          <p>
            Get help with installation, account access, billing or the Deal
            Finder Pro sourcing workflow.
          </p>
        </div>
      </header>

      <section className="portal-support-grid">
        <article className="portal-panel portal-support-primary">
          <span className="portal-support-icon"><Headphones size={27} /></span>
          <div>
            <span className="portal-panel-kicker">EMAIL SUPPORT</span>
            <h2>Contact Software By Jeeves</h2>
            <p>
              Include your account email, software version and a clear
              description of the issue.
            </p>
          </div>
          <a className="portal-button primary" href="mailto:support@softwarebyjeeves.com">
            <Mail size={16} />
            Email support
          </a>
        </article>

        <article className="portal-panel portal-support-card">
          <BookOpen size={22} />
          <h2>Documentation</h2>
          <p>Installation, Keepa, scanning and Deal Vault guidance.</p>
          <a href="/dashboard/documentation">Open documentation <ExternalLink size={14} /></a>
        </article>

        <article className="portal-panel portal-support-card">
          <MessageCircleQuestion size={22} />
          <h2>Frequently asked questions</h2>
          <p>Answers to common membership and software questions.</p>
          <span>Coming soon</span>
        </article>

        <article className="portal-panel portal-support-card">
          <Clock3 size={22} />
          <h2>Support response</h2>
          <p>Messages are reviewed during normal UK business hours.</p>
          <span>Monday–Friday</span>
        </article>
      </section>

      <section className="portal-panel portal-support-checklist">
        <div>
          <span className="portal-panel-kicker">BEFORE CONTACTING SUPPORT</span>
          <h2>Include these details</h2>
        </div>
        <div className="portal-support-list">
          <span>Account email address</span>
          <span>Deal Finder Pro version</span>
          <span>Windows version</span>
          <span>Screenshot or exact error message</span>
        </div>
      </section>
    </div>
  );
}
