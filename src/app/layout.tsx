import type { Metadata } from "next";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WhopPixel from "@/components/WhopPixel";
import TrackingEnhanced from "@/components/TrackingEnhanced";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiscalingco.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Scaling Co — Launch a Business with AI in 7 Days",
  description:
    "The complete step-by-step framework for using an AI operator to go from zero to a launched digital product in 7 days. No team needed.",
  keywords: [
    "AI scaling",
    "AI business launch",
    "AI automation",
    "AI operator",
    "digital product launch",
    "7 day framework",
    "AI business",
  ],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "AI Scaling Co — Launch a Business with AI in 7 Days",
    description:
      "The complete step-by-step framework for using an AI operator to go from zero to a launched digital product in 7 days.",
    url: siteUrl,
    siteName: "AI Scaling Co",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Scaling Co — Launch a Business with AI in 7 Days",
    description:
      "The complete step-by-step framework for using an AI operator to go from zero to a launched digital product in 7 days.",
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
        <GoogleAnalytics />
        <WhopPixel />
        <TrackingEnhanced />
      </body>
    </html>
  );
}
