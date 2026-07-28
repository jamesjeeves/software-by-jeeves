import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amazon EU Deal Finder Pro | Software By Jeeves",
  description:
    "Find profitable Amazon EU-to-UK opportunities faster with intelligent product analysis, clean exports and a professional sourcing workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
