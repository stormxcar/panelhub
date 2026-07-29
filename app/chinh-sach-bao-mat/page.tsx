import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLegalPage, type LegalPageData } from "../../lib/legal";
import { site } from "../../lib/site";

const fallback: LegalPageData = { title: "Chính sách bảo mật", lead: "Hiệu lực từ ngày 27/07/2026. Chính sách này giải thích cách PANED tiếp nhận, sử dụng và bảo vệ thông tin do khách hàng cung cấp.", sections: [{ heading: "1. Thông tin chúng tôi thu thập", body: "Khi bạn liên hệ, chúng tôi có thể tiếp nhận thông tin cần thiết để tư vấn, báo giá và triển khai công trình." }, { heading: "2. Mục đích sử dụng", body: "Thông tin được dùng để phản hồi yêu cầu, khảo sát, thực hiện hợp đồng và chăm sóc sau bàn giao." }, { heading: "3. Liên hệ", body: `Liên hệ ${site.name} qua email ${site.contact.email} hoặc hotline ${site.contact.phoneDisplay}.` }] };
export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("chinh-sach-bao-mat");
  return { title: page?.seoTitle || `Chính sách bảo mật | ${site.name}`, description: page?.seoDescription || `Cách ${site.name} thu thập, sử dụng và bảo vệ thông tin khách hàng.`, alternates: { canonical: "/chinh-sach-bao-mat" } };
}
export default async function PrivacyPolicyPage() { const page = await getLegalPage("chinh-sach-bao-mat") ?? fallback; return <LegalLayout page={page} />; }
function LegalLayout({ page }: { page: LegalPageData }) { return <main className="legal-page"><header className="legal-header"><Link href="/" className="brand brand-logo"><span className="brand-wordmark"><Image src={site.branding.logoText} alt={site.branding.logoAlt} width={220} height={60} /></span></Link><Link href="/" className="secondary-btn">Về trang chủ</Link></header><article className="legal-content"><p className="kicker">Thông tin pháp lý</p><h1>{page.title}</h1><p className="legal-lead">{page.lead}</p>{page.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}</article></main>; }
