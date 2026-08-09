import Image from "next/image";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { MobileNav, ThemeToggle } from "./LandingMotion";
import { ContactRail } from "./ContactRail";
import { SiteSearch } from "./SiteSearch";
import { site } from "../lib/site";
import { getManagedArticles, getManagedSiteSettings } from "../lib/sanity";

type SiteHeaderProps = { logoText?: string; phone?: string; isHome?: boolean };

export async function SiteHeader({ logoText, phone, isHome = false }: SiteHeaderProps) {
  const [settings, articles] = await Promise.all([getManagedSiteSettings(), getManagedArticles()]);
  const activeLogoText = logoText || settings?.logoTextUrl || site.branding.logoText;
  const activePhone = phone || settings?.phone || site.contact.phone;
  const href = (hash: string) => isHome ? hash : `/${hash}`;
  const mobileLinks: readonly (readonly [string, string])[] = [["Cấu tạo", "/cau-tao"], ["Quy trình", "/quy-trinh"], ["Dự án", "/du-an"], ["Báo giá", "/bao-gia"], ["Video", href("#video-cong-trinh")], ["FAQ", href("#faq")], ["Bài viết", "/bai-viet"], ["Liên hệ", href("#lien-he")]];
  const searchArticles = articles.map((article) => ({ id: `article-${article._id}`, title: article.title, description: article.excerpt, href: `/bai-viet/${article.slug}`, keywords: `${article.title} ${article.excerpt} ${(article.tags || []).join(" ")}` }));
  return <><ContactRail /><nav className="site-nav" aria-label="Điều hướng chính"><Link className="brand brand-logo" href={isHome ? "#hero" : "/"} aria-label="PANED Ninh Thuận - Về trang chủ"><span className="brand-wordmark"><Image src={activeLogoText} alt={site.branding.logoAlt} width={220} height={60} priority /></span></Link><div className="nav-links"><details className="nav-submenu"><summary>Giải pháp <CaretDown size={14} weight="bold" aria-hidden="true" /></summary><div><Link href="/cau-tao">Cấu tạo panel</Link><Link href="/quy-trinh">Quy trình thi công</Link><Link href="/du-an">Dự án thực tế</Link></div></details><Link className="nav-tooltip" href="/bao-gia" data-tooltip="Xem mức giá tham khảo"><span>Báo giá</span></Link><a className="nav-tooltip" href={href("#video-cong-trinh")} data-tooltip="Xem video công trình thực tế"><span>Video</span></a><a className="nav-tooltip" href={href("#faq")} data-nav-target={isHome ? "faq" : undefined} data-tooltip="Xem câu hỏi thường gặp"><span>FAQ</span></a><Link className="nav-tooltip" href="/bai-viet" data-tooltip="Đọc kiến thức và kinh nghiệm về nhà panel"><span>Bài viết</span></Link><a className="nav-tooltip" href={href("#lien-he")} data-tooltip="Gửi nhu cầu để được tư vấn"><span>Liên hệ</span></a></div><div className="nav-actions"><SiteSearch articles={searchArticles} /><a className="nav-cta nav-tooltip" href={`tel:${activePhone}`} data-tooltip="Gọi để nhận báo giá sơ bộ">Nhận báo giá</a><ThemeToggle /><MobileNav links={mobileLinks} /></div></nav></>;
}
