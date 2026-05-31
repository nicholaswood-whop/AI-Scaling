import type { Metadata } from "next";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nicholas Wood — AI Scaling for Growth",
  description:
    "I help founders and operators scale revenue with AI-driven growth systems. Strategy, automation, and execution that compounds.",
  keywords: [
    "AI scaling",
    "growth operations",
    "AI automation",
    "growth marketing",
    "Nicholas Wood",
  ],
  openGraph: {
    title: "Nicholas Wood — AI Scaling for Growth",
    description:
      "AI-driven growth systems that scale revenue. Strategy, automation, and execution that compounds.",
    url: siteUrl,
    siteName: "AI Scaling",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicholas Wood — AI Scaling for Growth",
    description:
      "AI-driven growth systems that scale revenue. Strategy, automation, and execution that compounds.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
