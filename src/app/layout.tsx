import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { brand } from "@/content/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// shortcut: placeholder origin until the production domain is decided; update before launch.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const description =
  "Ayurvedic hair and skin care, hand-prepared in small batches by Dr. Syeda Tanzeel Saher, BAMS, MD (Ayurveda), in Bidar.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Elixira Ayurveda — Glow Naturally. Heal Deeply.",
    template: "%s | Elixira Ayurveda",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: "Elixira Ayurveda",
    description,
    locale: "en_IN",
    images: [{ url: "/brand/elixira-badge.png", width: 960, height: 960, alt: "Elixira Ayurveda logo" }],
  },
  twitter: { card: "summary", title: "Elixira Ayurveda", description },
};

export const viewport: Viewport = {
  themeColor: "#263c30",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: brand.name,
  slogan: brand.tagline,
  description,
  url: siteUrl,
  logo: `${siteUrl}/brand/elixira-badge.png`,
  image: `${siteUrl}/brand/elixira-badge.png`,
  telephone: brand.phoneE164,
  founder: { "@type": "Person", name: brand.founder, honorificSuffix: brand.qualifications },
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.address.line,
    addressLocality: brand.address.city,
    addressRegion: brand.address.region,
    addressCountry: brand.address.country,
  },
  sameAs: [brand.instagramUrl],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // JSON-LD from static, trusted data only.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
