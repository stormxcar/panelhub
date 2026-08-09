import Link from "next/link";
import { RichText } from "./RichText";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { getManagedServicePage } from "../lib/sanity";

export async function ServiceDetailPage({ kind }: { kind: "anatomy" | "process" | "projects" | "pricing" }) {
  const managedServicePage = await getManagedServicePage(kind);
  const labels = { anatomy: ["Cấu tạo panel", "Cấu tạo tấm panel cách nhiệt", "Tìm hiểu lớp tôn, lõi cách nhiệt và cấu hình phù hợp công năng."], process: ["Quy trình thi công", "7 bước triển khai nhà panel", "Theo dõi từng công đoạn từ khảo sát đến bảo hành."], projects: ["Dự án", "Dự án nhà panel tham khảo", "Xem thêm hình ảnh và thông tin công trình theo từng nhu cầu."], pricing: ["Báo giá", "Báo giá nhà tiền chế panel", "Các gói giá tham khảo và phạm vi vật tư, thi công."] } as const;
  const [eyebrow, fallbackTitle, fallbackLead] = labels[kind];
  const deep = managedServicePage;
  const title = deep?.title || fallbackTitle;
  const lead = deep?.lead || fallbackLead;
  return <main className="detail-page"><SiteHeader /><section className="detail-hero"><p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{lead}</p><Link className="secondary-btn" href={deep?.ctaHref || "/#lien-he"}>{deep?.ctaLabel || "Nhận tư vấn theo nhu cầu"}</Link></section><section className="detail-content">{deep?.body?.length ? <RichText value={deep.body} className="rich-text detail-rich-text" /> : <p className="detail-empty">Nội dung chuyên sâu đang được cập nhật. Vui lòng liên hệ để nhận tư vấn phù hợp công trình của bạn.</p>}</section><SiteFooter /></main>;
}
