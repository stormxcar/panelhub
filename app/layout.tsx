import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Nhà tiền chế tấm panel | Thi công nhanh",
  description:
    "Nhà tiền chế tấm panel trọn gói: tư vấn, thiết kế, thi công nhanh, báo giá rõ theo m2 cho nhà ở, xưởng, kho lạnh.",
  keywords: [
    "nhà tiền chế panel",
    "thi công nhà panel",
    "tấm panel cách nhiệt",
    "nhà lắp ghép panel",
    "báo giá nhà panel"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Nhà tiền chế tấm panel | Thi công nhanh",
    description: "Tư vấn, thiết kế và thi công nhà panel cho nhà ở, nhà xưởng và kho lạnh."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={playfair.variable}>{children}</body>
    </html>
  );
}
