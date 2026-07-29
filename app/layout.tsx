import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { site } from "../lib/site";
import { getManagedSiteSettings } from "../lib/sanity";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getManagedSiteSettings();
  const logoMark = settings?.logoMarkUrl || site.branding.logoMark;

  return {
    metadataBase: new URL(site.url),
    title: site.seo.title,
    description: site.seo.description,
    keywords: site.seo.keywords,
    robots: { index: true, follow: true },
    openGraph: { type: "website", locale: "vi_VN", title: site.seo.title, description: site.seo.openGraphDescription },
    twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.openGraphDescription },
    icons: { icon: [{ url: logoMark, type: "image/png" }], apple: [{ url: logoMark, type: "image/png" }] },
    alternates: { canonical: "/" }
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={playfair.variable}>{children}</body>
    </html>
  );
}
