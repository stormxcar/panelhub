import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { site } from "../lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: site.seo.keywords,
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: site.seo.title,
    description: site.seo.openGraphDescription
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.openGraphDescription
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={playfair.variable}>{children}</body>
    </html>
  );
}
