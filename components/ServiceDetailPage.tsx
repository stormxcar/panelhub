import Image from "next/image";
import Link from "next/link";
import { RichText } from "./RichText";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { getManagedHome, getManagedServicePage } from "../lib/sanity";

export async function ServiceDetailPage({ kind }: { kind: "anatomy" | "process" | "projects" | "pricing" }) {
  const [home, managedServicePage] = await Promise.all([getManagedHome(), getManagedServicePage(kind)]);
  const labels = { anatomy: ["Cấu tạo panel", "Cấu tạo tấm panel cách nhiệt", "Tìm hiểu lớp tôn, lõi cách nhiệt và cấu hình phù hợp công năng."], process: ["Quy trình thi công", "7 bước triển khai nhà panel", "Theo dõi từng công đoạn từ khảo sát đến bảo hành."], projects: ["Dự án", "Dự án nhà panel tham khảo", "Xem thêm hình ảnh và thông tin công trình theo từng nhu cầu."], pricing: ["Báo giá", "Báo giá nhà tiền chế panel", "Các gói giá tham khảo và phạm vi vật tư, thi công."] } as const;
  const [eyebrow, fallbackTitle, fallbackLead] = labels[kind];
  const deep = managedServicePage || home?.detailPages?.[kind];
  const title = deep?.title || fallbackTitle;
  const lead = deep?.lead || fallbackLead;
  return <main className="detail-page"><SiteHeader /><section className="detail-hero"><p className="kicker">{eyebrow}</p><h1>{title}</h1><p>{lead}</p><Link className="secondary-btn" href={deep?.ctaHref || "/#lien-he"}>{deep?.ctaLabel || "Nhận tư vấn theo nhu cầu"}</Link></section><section className="detail-content">{deep?.body?.length ? <RichText value={deep.body} className="rich-text detail-rich-text" /> : null}{kind === "anatomy" ? <div className="detail-anatomy"><div className="detail-image">{home?.anatomy?.imageUrl ? <Image src={home.anatomy.imageUrl} alt={home.anatomy.title || title} fill sizes="(max-width:760px) 100vw,50vw" /> : null}</div><div><h2>{home?.anatomy?.title}</h2><p>{home?.anatomy?.description}</p>{home?.anatomy?.panelTypes?.map((item) => <article className="detail-item" key={item.name}><h3>{item.name}</h3><p>{item.description}</p></article>)}</div></div> : null}{kind === "process" ? <div className="detail-process">{home?.processSteps?.map((step,index) => <article className="detail-process-card" key={step.title}>{step.imageUrl ? <div><Image src={step.imageUrl} alt={step.title} fill sizes="(max-width:760px) 100vw,33vw" /></div>:null}<span>{String(index+1).padStart(2,"0")}</span><h2>{step.title}</h2><p>{step.description}</p></article>)}</div>:null}{kind === "projects" ? <div className="detail-projects">{home?.projects?.map((item) => <article className="detail-project-card" key={item.title}>{item.imageUrl?<div><Image src={item.imageUrl} alt={item.title} fill sizes="(max-width:760px) 100vw,33vw" /></div>:null}<p className="kicker">{item.category}</p><h2>{item.title}</h2><p>{item.description}</p></article>)}</div>:null}{kind === "pricing" ? <div className="detail-pricing">{home?.pricing?.map((item) => <article key={item.name}><h2>{item.name}</h2><strong>{item.price}</strong>{item.details?.length?<RichText value={item.details}/>:<p>{item.note}</p>}</article>)}</div>:null}</section><SiteFooter /></main>;
}
