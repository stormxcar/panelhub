import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "../lib/site";
import { getManagedHome, getManagedSiteSettings } from "../lib/sanity";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const [settings, home] = await Promise.all([getManagedSiteSettings(), getManagedHome()]);
  const logoMark = settings?.logoMarkUrl || site.branding.logoMark;
  const title = home?.seoTitle || site.seo.title;
  const description = home?.seoDescription || site.seo.description;
  const openGraphImage = home?.heroImages?.[0]?.imageUrl || site.images.hero;

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    keywords: site.seo.keywords,
    robots: { index: true, follow: true },
    openGraph: { type: "website", locale: "vi_VN", url: site.url, siteName: site.name, title, description, images: [{ url: openGraphImage }] },
    twitter: { card: "summary_large_image", title, description, images: [openGraphImage] },
    icons: { icon: [{ url: logoMark, type: "image/png" }], apple: [{ url: logoMark, type: "image/png" }] },
    alternates: { canonical: "/" }
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6057292651539065"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={playfair.variable}>{children}</body>
      <GoogleAnalytics gaId="G-5FEQN44JCX" />
    </html>
  );
}
