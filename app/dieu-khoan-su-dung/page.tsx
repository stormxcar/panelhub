import type { Metadata } from "next";
import { getLegalPage, type LegalPageData } from "../../lib/legal";
import { RichText } from "../../components/RichText";
import { SiteHeader } from "../../components/SiteHeader";
import { site } from "../../lib/site";
const fallback: LegalPageData = { title: "Điều khoản sử dụng", lead: "Hiệu lực từ ngày 27/07/2026. Khi truy cập website hoặc gửi yêu cầu tư vấn, bạn đồng ý với các điều khoản dưới đây.", sections: [{ heading: "1. Phạm vi thông tin", body: "Nội dung website là thông tin tham khảo về giải pháp panel, vật liệu, quy trình và giá dự kiến." }, { heading: "2. Báo giá và tiến độ", body: "Các nội dung thực tế phụ thuộc bản vẽ, mặt bằng, vật tư và chỉ ràng buộc khi được xác nhận bằng báo giá hoặc hợp đồng." }, { heading: "3. Liên hệ", body: `Mọi câu hỏi xin gửi về ${site.contact.email} hoặc hotline ${site.contact.phoneDisplay}.` }] };
export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("dieu-khoan-su-dung", "terms");
  return { title: page?.seoTitle || `Điều khoản sử dụng | ${site.name}`, description: page?.seoDescription || `Điều khoản sử dụng website và dịch vụ tư vấn thi công của ${site.name}.`, alternates: { canonical: "/dieu-khoan-su-dung" } };
}
export default async function TermsPage() { const page = await getLegalPage("dieu-khoan-su-dung", "terms") ?? fallback; return <main className="legal-page"><SiteHeader /><article className="legal-content"><p className="kicker">Thông tin pháp lý</p><h1>{page.title}</h1><p className="legal-lead">{page.lead}</p>{page.sections.map((section, index) => <section key={section._key || `${section.heading}-${index}`}><h2>{section.heading}</h2>{section.richBody?.length ? <RichText value={section.richBody} /> : <p className="preserve-lines">{section.body}</p>}</section>)}</article></main>; }
