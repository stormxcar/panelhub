import Image from "next/image";
import {
  ArrowRight,
  Buildings,
  Check,
  CheckCircle,
  EnvelopeSimple,
  FacebookLogo,
  Factory,
  Gauge,
  HouseLine,
  MessengerLogo,
  Phone,
  Star,
  ThermometerCold,
  TiktokLogo,
  Wrench,
  X,
  YoutubeLogo
} from "@phosphor-icons/react/dist/ssr";
import { CostEstimator } from "../components/CostEstimator";
import { HeroGallery } from "../components/HeroGallery";
import { LandingMotion, MobileNav, ScrollTop, ThemeToggle } from "../components/LandingMotion";
import { PortfolioFilter, type PortfolioProject } from "../components/PortfolioFilter";
import { VideoGallery } from "../components/VideoGallery";
import { site } from "../lib/site";
import { getManagedHome, getManagedSiteSettings } from "../lib/sanity";

export const dynamic = "force-dynamic";

const services = [
  ["Mẫu nhà paned dân dụng", "Nhiều kiểu dáng mái và phương án mặt tiền để tham khảo trước khi thiết kế.", "Nhà ở · Nhà cấp 4"],
  ["Khung thép tiền chế", "Lắp dựng khung theo mặt bằng, khẩu độ và nhu cầu sử dụng thực tế.", "Kết cấu · Thi công"],
  ["Nhà paned hoàn thiện", "Không gian sạch, gọn và sẵn sàng đưa vào sử dụng sau khi bàn giao.", "Nhà ở · Hoàn thiện"],
  ["Thi công tấm panel", "Lắp đặt vách, mái và xử lý liên kết theo trình tự rõ ràng tại công trình.", "Panel · Lắp dựng"],
  ["Cải tạo, mở rộng", "Bổ sung không gian sử dụng với tiến độ thi công gọn và dễ kiểm soát.", "Mở rộng · Cải tạo"],
  ["Không gian nhà paned", "Tham khảo mặt tiền, nội thất và bố cục phù hợp nhu cầu ở thực tế.", "Nhà ở · Tham khảo"]
];

const processSteps = [
  ["Khảo sát", "Đo mặt bằng, kiểm tra nền móng và điều kiện vận chuyển vật tư."],
  ["Tư vấn", "Xác định nhu cầu sử dụng, mức đầu tư và loại panel phù hợp."],
  ["Thiết kế", "Chốt mặt bằng, khẩu độ khung và giải pháp kỹ thuật."],
  ["Báo giá", "Bóc tách vật tư, tiến độ và phạm vi hoàn thiện minh bạch."],
  ["Thi công", "Gia công khung tại xưởng, lắp dựng và lắp panel tại công trình."],
  ["Bàn giao", "Kiểm tra mối nối, phụ kiện, vệ sinh và nghiệm thu công trình."],
  ["Bảo hành", "Hướng dẫn vận hành và tiếp nhận yêu cầu hỗ trợ sau bàn giao."]
];

const projects: PortfolioProject[] = [
  { title: "Mẫu nhà paned cấp 4", category: "Mẫu thiết kế", description: "Tổng hợp phương án mái và mặt tiền để tham khảo trước khi thiết kế.", image: site.images.projects[0], area: "12 mẫu", duration: "Tham khảo", material: "Đa dạng", location: "PANED" },
  { title: "Lắp dựng khung thép", category: "Thi công", description: "Khung thép được lắp dựng trực tiếp trên nền đã chuẩn bị.", image: site.images.projects[1], area: "Theo mặt bằng", duration: "Đang thi công", material: "Khung thép", location: "Công trình" },
  { title: "Nhà paned hoàn thiện", category: "Hoàn thiện", description: "Mặt tiền nhà ở hoàn thiện, có hiên che và không gian sân vườn.", image: site.images.projects[2], area: "Nhà ở", duration: "Hoàn thiện", material: "Panel", location: "Công trình" },
  { title: "Lắp đặt vách panel", category: "Thi công", description: "Các bước lắp vách và liên kết tấm panel tại công trình thực tế.", image: site.images.projects[3], area: "Theo thiết kế", duration: "Lắp dựng", material: "Panel EPS", location: "Công trình" },
  { title: "Nhà paned mái thái", category: "Nhà ở", description: "Mẫu nhà nhỏ gọn, hoàn thiện mặt tiền và cửa kính lấy sáng.", image: site.images.projects[4], area: "Nhà ở", duration: "Hoàn thiện", material: "Panel", location: "Công trình" },
  { title: "Không gian nhà paned", category: "Hoàn thiện", description: "Tham khảo mặt tiền, bố cục nội thất và phương án hiên che.", image: site.images.projects[5], area: "Nhà ở", duration: "Hoàn thiện", material: "Panel", location: "Công trình" }
];

const faqs = [
  ["Nhà tiền chế panel dùng được bao lâu?", "Tuổi thọ phụ thuộc vào thiết kế khung thép, loại lõi panel, điều kiện sử dụng và việc bảo trì định kỳ. Khi được thi công đúng kỹ thuật, xử lý mối nối tốt và kiểm tra mái/vách theo khuyến nghị, công trình có thể vận hành ổn định trong nhiều năm."],
  ["Giá thi công nhà panel/m2 tính thế nào?", "Đơn giá m² chỉ là mức tham khảo. Báo giá thực tế cần tính diện tích, loại lõi panel và độ dày, khung thép, nền móng, hệ cửa, điện nước, vận chuyển và mức hoàn thiện; vì vậy đội ngũ nên khảo sát hoặc nhận bản vẽ trước khi chốt ngân sách."],
  ["Có tháo dỡ và di dời được không?", "Có, nhiều hạng mục nhà lắp ghép có thể tháo theo module để di chuyển hoặc mở rộng. Khả năng tái sử dụng sẽ phụ thuộc vào thiết kế liên kết ban đầu, tình trạng vật tư và phương án nền móng tại vị trí mới."],
  ["Panel chống nóng và chống ồn ra sao?", "Panel giúp cải thiện khả năng cách nhiệt đáng kể so với mái/vách tôn đơn lớp. EPS là lựa chọn kinh tế, PU phù hợp khi cần giữ nhiệt tốt hơn, còn Rockwool thường được cân nhắc khi công trình ưu tiên chống cháy và cách âm; hiệu quả cuối cùng còn phụ thuộc độ dày và cách xử lý mối nối."],
  ["Thời gian thi công thường mất bao lâu?", "Công trình nhỏ có thể hoàn thành trong vài tuần sau khi chốt thiết kế, vật tư và mặt bằng. Tiến độ sẽ thay đổi theo diện tích, nền móng, thời tiết, điều kiện vận chuyển và các hạng mục hoàn thiện như điện nước, cửa, trần hoặc nội thất."],
  ["Panel có chống cháy không?", "Mức độ đáp ứng yêu cầu cháy phụ thuộc vào loại lõi panel, hệ kết cấu, vật liệu hoàn thiện và quy định áp dụng cho từng công trình. Rockwool thường được lựa chọn cho nhu cầu ưu tiên chống cháy; với dự án có yêu cầu PCCC, cần đối chiếu hồ sơ kỹ thuật và quy chuẩn cụ thể trước khi triển khai."],
  ["Thi công được ở tỉnh xa không?", "Có thể triển khai liên tỉnh sau khi kiểm tra đường vận chuyển, địa điểm tập kết vật tư và điều kiện thi công tại chỗ. Đội ngũ sẽ tư vấn phương án khảo sát, lịch giao hàng và chi phí di chuyển minh bạch theo từng địa điểm."],
  ["Có bảo hành sau khi bàn giao không?", "Có. Phạm vi bảo hành nên được nêu rõ trong báo giá và hợp đồng, bao gồm kết cấu, vật tư và các hạng mục hoàn thiện áp dụng. Khi bàn giao, khách hàng nên lưu lại hồ sơ nghiệm thu, hướng dẫn sử dụng và thông tin liên hệ để được hỗ trợ nhanh khi cần."],
  ["Nền móng cần chuẩn bị như thế nào?", "Mặt bằng cần được khảo sát để xác định cao độ, khả năng chịu tải, thoát nước và vị trí liên kết khung thép. Tùy công trình, nền có thể là bê tông, móng đơn hoặc giải pháp gia cố khác; không nên chốt phương án chỉ dựa trên diện tích mà chưa xem địa hình thực tế."],
  ["Panel EPS và PU khác nhau thế nào?", "EPS thường có chi phí hợp lý, phù hợp nhiều công trình dân dụng và không gian phổ thông. PU có khả năng giữ nhiệt tốt hơn, nên hay được dùng cho khu vực yêu cầu ổn định nhiệt; lựa chọn cuối cùng cần cân đối công năng, độ dày panel và tổng mức đầu tư."],
  ["Có thể tự thiết kế rồi thuê thi công không?", "Có. Đội ngũ có thể tiếp nhận bản vẽ sẵn có, rà soát khẩu độ khung, giải pháp panel, mối nối và phương án thi công trước khi báo giá. Nếu cần điều chỉnh, các thay đổi nên được thống nhất trên bản vẽ để hạn chế phát sinh ở công trường."],
  ["Nhà panel có chịu được bão không?", "Khả năng chịu gió không nằm ở panel đơn lẻ mà phụ thuộc hệ khung, liên kết, neo móng, tải trọng mái và vị trí xây dựng. Với khu vực có gió mạnh hoặc gần biển, cần tính toán giải pháp kết cấu phù hợp thay vì dùng một cấu hình chung cho mọi công trình."],
  ["Có hỗ trợ vay vốn không?", "Hiện chưa có gói vay trực tiếp được công bố trên website. Khi cần, đội ngũ có thể hỗ trợ chuẩn bị báo giá và thông tin hạng mục để khách hàng làm việc với đơn vị tài chính của mình; điều kiện phê duyệt sẽ do đơn vị cho vay quyết định."],
  ["Quy trình thanh toán như thế nào?", "Tiến độ thanh toán thường được chia theo các mốc khảo sát/chốt thiết kế, gia công vật tư, lắp dựng và nghiệm thu. Tỷ lệ, thời điểm thanh toán và điều kiện bàn giao cần được ghi rõ trong hợp đồng để hai bên cùng theo dõi minh bạch."],
  ["Có tư vấn và khảo sát miễn phí không?", "Tư vấn sơ bộ qua điện thoại hoặc Zalo được hỗ trợ miễn phí để xác định nhu cầu và mức đầu tư dự kiến. Việc khảo sát thực tế sẽ được xác nhận theo khu vực, quy mô công trình và lịch triển khai; hãy gửi diện tích, vị trí và mục đích sử dụng để nhận hướng dẫn phù hợp." ]
];

const testimonials = [
  ["Anh Minh", "Chủ xưởng cơ khí, Bình Dương", "Tiến độ rõ ràng, đội thi công phối hợp tốt nên xưởng sớm đi vào hoạt động."],
  ["Chị Hương", "Chủ homestay, Đồng Nai", "Phương án panel giúp rút ngắn phần xây dựng và vẫn đảm bảo không gian sáng, sạch."],
  ["Anh Phúc", "Quản lý kho lạnh, TP.HCM", "Đội ngũ tư vấn kỹ về panel PU và xử lý mối nối trước khi triển khai." ]
];

const stats = [
  { value: "200+", label: "Công trình đã triển khai" },
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "98%", label: "Khách hàng hài lòng" },
  { value: "24h", label: "Phản hồi báo giá sơ bộ" }
];

const panelTypes = [
  { name: "Panel PU", description: "Giữ nhiệt tốt cho kho lạnh và không gian cần ổn định nhiệt." },
  { name: "Panel EPS", description: "Chi phí hợp lý cho nhà ở, văn phòng và công trình phổ thông." },
  { name: "Panel Rockwool", description: "Ưu tiên chống cháy, cách âm cho xưởng và khu kỹ thuật." }
];

function SectionCta({ text }: { text: string }) {
  return <div className="section-cta"><div><p>{text}</p><span className="cta-trust">Tư vấn sơ bộ miễn phí · Báo giá theo mặt bằng thực tế · Không ràng buộc trước khảo sát</span></div><a className="secondary-btn tooltip-top" href="#lien-he" data-tooltip="Chuyển đến form nhận báo giá">Nhận báo giá miễn phí <ArrowRight size={17} weight="bold" /></a></div>;
}

export default async function Home() {
  const [managedHome, managedSettings] = await Promise.all([getManagedHome(), getManagedSiteSettings()]);
  const logoText = managedSettings?.logoTextUrl || site.branding.logoText;
  const logoMark = managedSettings?.logoMarkUrl || site.branding.logoMark;
  const business = {
    name: managedSettings?.name || site.name,
    phone: managedSettings?.phone || site.contact.phone,
    phoneDisplay: managedSettings?.phone || site.contact.phoneDisplay,
    email: managedSettings?.email || site.contact.email,
    address: managedSettings?.address || site.company.address,
    workingHours: managedSettings?.workingHours || site.company.workingHours,
    taxCode: managedSettings?.taxCode || site.company.taxCode,
    zaloUrl: managedSettings?.zaloUrl || site.contact.zaloUrl,
    messengerUrl: managedSettings?.messengerUrl || site.contact.messengerUrl,
    facebookUrl: managedSettings?.facebookUrl || site.social.facebook,
    youtubeUrl: managedSettings?.youtubeUrl || site.social.youtube,
    tiktokUrl: managedSettings?.tiktokUrl || site.social.tiktok,
    mapUrl: managedSettings?.mapUrl || site.location.mapUrl
  };
  const footerDescription = managedSettings?.footerDescription || managedHome?.footerDescription || "Đơn vị tư vấn, thiết kế và thi công nhà tiền chế tấm panel cho nhà ở, nhà xưởng, kho lạnh, văn phòng công trình và mô hình lưu trú lắp ghép.";
  const heroSlides = managedHome?.heroImages?.length ? managedHome.heroImages.map((item, index) => ({ src: item.imageUrl || site.images.heroGallery[index % site.images.heroGallery.length].src, alt: item.label || site.images.heroGallery[index % site.images.heroGallery.length].alt, label: item.label || site.images.heroGallery[index % site.images.heroGallery.length].label })) : site.images.heroGallery;
  const fallbackServices = services.map(([title, description, tag], index) => ({ title, description, tag, imageUrl: site.images.services[index] }));
  const managedServices = managedHome?.services?.length ? managedHome.services.map((item, index) => ({ title: item.title, description: item.description, tag: item.tag || fallbackServices[index % fallbackServices.length].tag, imageUrl: item.imageUrl || fallbackServices[index % fallbackServices.length].imageUrl })) : fallbackServices;
  const fallbackProcessSteps = processSteps.map(([title, description], index) => ({ title, description, imageUrl: site.images.process[index] }));
  const managedProcessSteps = managedHome?.processSteps?.length ? managedHome.processSteps.map((item, index) => ({ title: item.title, description: item.description, imageUrl: item.imageUrl || fallbackProcessSteps[index % fallbackProcessSteps.length].imageUrl })) : fallbackProcessSteps;
  const anatomyImage = managedHome?.anatomy?.imageUrl || site.images.anatomy;
  const processFeatureImage = managedHome?.processFeature?.imageUrl || site.images.processFeature;
  const projectCategories = new Set<PortfolioProject["category"]>(["Thi công", "Mẫu thiết kế", "Nhà ở", "Hoàn thiện"]);
  const managedProjects: PortfolioProject[] = managedHome?.projects?.length ? managedHome.projects.map((item, index) => { const fallbackProject = projects[index % projects.length]; return { ...fallbackProject, title: item.title, category: projectCategories.has(item.category as PortfolioProject["category"]) ? item.category as PortfolioProject["category"] : fallbackProject.category, description: item.description, image: item.imageUrl || fallbackProject.image }; }) : projects;
  const managedFaqs = managedHome?.faqs?.length ? managedHome.faqs.map((item) => [item.question, item.answer]) : faqs;
  const managedVideos = managedHome?.videos?.length ? managedHome.videos.map((item) => ({ ...item, description: item.description ?? "Video công trình PANED" })) : site.videos;
  const managedPricing = managedHome?.pricing?.length ? managedHome.pricing.map((item) => [item.name, item.price, item.note]) : [["Gói cơ bản", "Từ 1.650.000đ/m2", "Khung thép, mái panel EPS, hoàn thiện tiêu chuẩn"], ["Gói cách nhiệt tốt", "Từ 2.150.000đ/m2", "Panel PU dày hơn, xử lý mối nối kỹ hơn"], ["Gói nhà xưởng", "Theo bản vẽ", "Khẩu độ lớn, tải trọng và PCCC theo yêu cầu"]];
  const managedStats = managedHome?.stats?.length ? managedHome.stats.filter((item) => item.value && item.label).map((item) => ({ value: item.value!, label: item.label! })) : stats;
  const managedTestimonials = managedHome?.testimonials?.length ? managedHome.testimonials.filter((item) => item.name && item.role && item.quote).map((item) => ({ name: item.name!, role: item.role!, quote: item.quote! })) : testimonials.map(([name, role, quote]) => ({ name, role, quote }));
  const managedPanelTypes = managedHome?.anatomy?.panelTypes?.length ? managedHome.anatomy.panelTypes.filter((item) => item.name && item.description).map((item) => ({ name: item.name!, description: item.description! })) : panelTypes;
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: managedFaqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  const localBusinessSchema = { "@context": "https://schema.org", "@type": "LocalBusiness", name: business.name, url: site.url, description: managedHome?.seoDescription || site.seo.description, telephone: business.phone, email: business.email, address: { "@type": "PostalAddress", streetAddress: business.address, addressLocality: "Phan Rang", addressRegion: "Khánh Hòa", addressCountry: "VN" }, areaServed: site.location.areas, sameAs: [business.facebookUrl, business.youtubeUrl, business.tiktokUrl].filter(Boolean) };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Trang chủ", item: site.url }, { "@type": "ListItem", position: 2, name: "Nhà tiền chế panel", item: site.url }] };

  return (
    <main>
      <LandingMotion />
      <aside className="contact-rail" aria-label="Liên hệ nhanh">
        <a className="has-tooltip cta-call" href={`tel:${business.phone}`} aria-label="Gọi tư vấn" data-tooltip="Gọi tư vấn"><Phone size={22} weight="fill" /></a>
        <a className="has-tooltip cta-zalo" href={business.zaloUrl} target="_blank" rel="noreferrer" aria-label="Liên hệ qua Zalo" data-tooltip="Liên hệ Zalo"><span className="zalo-icon" aria-hidden="true">Zalo</span></a>
        <a className="has-tooltip cta-messenger" href={business.messengerUrl} target="_blank" rel="noreferrer" aria-label="Liên hệ qua Messenger" data-tooltip="Liên hệ Messenger"><MessengerLogo size={22} weight="fill" /></a>
        <a className="has-tooltip cta-email" href={`mailto:${business.email}`} aria-label="Gửi email báo giá" data-tooltip="Gửi email báo giá"><EnvelopeSimple size={22} weight="fill" /></a>
        <ScrollTop />
      </aside>

      <nav className="site-nav" aria-label="Điều hướng chính">
        <a className="brand brand-logo" href="#hero" aria-label="PANED Ninh Thuận - Về đầu trang"><span className="brand-wordmark"><Image src={logoText} alt={site.branding.logoAlt} width={220} height={60} priority /></span></a>
        <div className="nav-links"><a className="nav-tooltip" href="#cau-tao" data-nav-target="cau-tao" data-tooltip="Xem các loại panel và cấu tạo"><span>Cấu tạo</span></a><a className="nav-tooltip" href="#du-an" data-nav-target="du-an" data-tooltip="Xem công trình đã triển khai"><span>Dự án</span></a><a className="nav-tooltip" href="#bao-gia" data-nav-target="bao-gia" data-tooltip="Xem mức giá tham khảo"><span>Báo giá</span></a><a className="nav-tooltip" href="#faq" data-nav-target="faq" data-tooltip="Xem câu hỏi thường gặp"><span>FAQ</span></a></div>
        <div className="nav-actions"><a className="nav-cta nav-tooltip" href={`tel:${business.phone}`} data-tooltip="Gọi để nhận báo giá sơ bộ">Nhận báo giá</a><ThemeToggle /><MobileNav /></div>
      </nav>

      <HeroGallery slides={heroSlides} phone={business.phone} phoneDisplay={business.phoneDisplay} title={managedHome?.heroTitle} description={managedHome?.heroDescription} ctaLabel={managedHome?.heroCtaLabel} ctaHref={managedHome?.heroCtaHref} />

      <section className="stats-strip" aria-label="Số liệu năng lực">{managedStats.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</section>

      <section className="section trust-section reveal">
        <div className="section-stack"><p className="kicker">Nền tảng tin cậy</p><h2>Vật tư phù hợp, quy trình rõ ràng và cam kết sau bàn giao</h2></div>
        <div className="partners-row" aria-label="Thương hiệu vật tư tham khảo"><strong>Tôn Đông Á</strong><strong>BlueScope</strong><strong>Kingspan</strong><strong>Sika</strong></div>
        <div className="badge-row"><span><CheckCircle size={18} weight="fill" /> Bảo hành kết cấu 5 năm</span><span><CheckCircle size={18} weight="fill" /> Panel theo yêu cầu PCCC</span><span><CheckCircle size={18} weight="fill" /> Nhận thi công liên tỉnh</span></div>
        <div className="testimonials-grid">{managedTestimonials.map((item) => <article className="testimonial-card" key={item.name}><div className="stars" aria-label="5 trên 5 sao">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={16} weight="fill" />)}</div><p>“{item.quote}”</p><strong>{item.name}</strong><span>{item.role}</span></article>)}</div>
      </section>

      <section className="section comparison reveal"><div className="section-stack"><p className="kicker">Giải pháp xây nhanh</p><h2>Nhà tiền chế panel giúp kiểm soát tiến độ và chi phí từ đầu</h2></div><div className="compare-grid">{[["Thời gian", "Gia công khung tại xưởng và lắp panel tại công trình giúp rút ngắn thời gian chờ."], ["Chi phí", "Dễ bóc tách vật tư, minh bạch báo giá theo diện tích và mức hoàn thiện."], ["Độ bền", "Kết cấu khung thép kết hợp lõi panel phù hợp nhu cầu nhiệt, ồn, cháy."]].map(([title, text]) => <article className="compare-item" key={title}><CheckCircle size={28} weight="fill" /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="section services-section"><div className="section-stack reveal"><p className="kicker">Dịch vụ trọn gói</p><h2>Giải pháp panel theo đúng mô hình bạn đang vận hành</h2></div><p className="mobile-swipe-hint" aria-hidden="true">Vuốt để xem thêm <ArrowRight size={16} weight="bold" /></p><div className="services-bento">{managedServices.map((item) => <article className="service-card reveal" key={item.title}><Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 768px) 82vw, 33vw" /><div><span>{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><a href="#lien-he">Tìm hiểu thêm <ArrowRight size={16} weight="bold" /></a></div></article>)}</div><SectionCta text="Chưa chắc loại panel nào phù hợp? Gửi nhu cầu để nhận phương án sơ bộ." /></section>

      <section id="cau-tao" className="section anatomy"><div className="anatomy-visual reveal"><Image src={anatomyImage} alt="Cấu tạo tấm panel cách nhiệt" fill sizes="(max-width: 900px) 100vw, 46vw" /></div><div className="anatomy-copy reveal"><p className="kicker">Tôn, lõi, tôn</p><h2>{managedHome?.anatomy?.title || "Cấu tạo tấm panel cách nhiệt cho công trình chắc và sạch"}</h2><p>{managedHome?.anatomy?.description || "Tấm panel gồm hai lớp tôn mạ màu kẹp lõi cách nhiệt. Lựa chọn lõi panel quyết định mức giữ nhiệt, chống cháy, cách âm và ngân sách."}</p><div className="panel-types">{managedPanelTypes.map((item) => <article key={item.name}><h3>{item.name}</h3><p>{item.description}</p></article>)}</div></div></section>

      <section className="section process reveal"><div className="section-stack narrow"><p className="kicker">Quy trình rõ từng việc</p><h2>7 bước triển khai nhà panel từ khảo sát đến bảo hành</h2></div><p className="mobile-swipe-hint" aria-hidden="true">Vuốt để xem các bước <ArrowRight size={16} weight="bold" /></p><div className="process-board"><div className="process-feature"><Image src={processFeatureImage} alt="Quy trình thi công nhà panel" fill sizes="(max-width: 1080px) 100vw, 38vw" /><div className="process-feature-card"><span>7 bước</span><strong>Từ khảo sát đến bảo hành</strong></div></div><div className="process-masonry">{managedProcessSteps.map((item, index) => <article className="timeline-step" key={item.title}><div className="step-photo"><Image src={item.imageUrl} alt={`${item.title} trong quy trình thi công`} fill sizes="(max-width: 760px) 82vw, 260px" /></div><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div><SectionCta text="Bắt đầu với bước khảo sát miễn phí và phương án phù hợp mặt bằng." /></section>

      <section id="du-an" className="section projects"><div className="section-stack reveal"><p className="kicker">Công trình tham khảo</p><h2>Dự án nhà panel theo nhiều nhu cầu sử dụng</h2></div><PortfolioFilter projects={managedProjects} /></section>

      <section id="video-cong-trinh" className="section video-section"><div className="section-stack reveal"><p className="kicker">Video thực tế</p><h2>Nhìn rõ hơn về nhà tiền chế panel qua từng thước phim</h2><p>Các video ghi lại công trình và không gian nhà panel thực tế để bạn dễ hình dung giải pháp phù hợp.</p></div><VideoGallery videos={managedVideos} /><SectionCta text="Bạn muốn xem giải pháp phù hợp mặt bằng của mình? Gửi nhu cầu để nhận tư vấn sơ bộ." /></section>

      <CostEstimator />

      <section id="bao-gia" className="section pricing reveal"><div><p className="kicker">Ngân sách minh bạch</p><h2>Báo giá nhà tiền chế panel tham khảo theo m2</h2><p>Giá thay đổi theo vật tư, nền móng, chiều cao, loại lõi panel và mức hoàn thiện.</p></div><div className="price-table" role="table" aria-label="Bảng giá tham khảo">{managedPricing.map(([name, price, note]) => <div className="price-row" role="row" key={name}><strong>{name}</strong><span>{price}</span><p>{note}</p></div>)}</div></section>

      <section className="section comparison-table-section reveal"><div className="section-stack"><p className="kicker">So sánh giải pháp</p><h2>Nhà panel và xây dựng truyền thống khác nhau thế nào?</h2></div><div className="comparison-table" role="table"><div className="comparison-row comparison-head" role="row"><strong>Tiêu chí</strong><strong>Nhà panel</strong><strong>Xây truyền thống</strong></div>{[["Thời gian thi công", "7-45 ngày", "3-12 tháng"], ["Chi phí tham khảo", "Từ 1.6tr/m²", "Từ 3.5tr/m²"], ["Mở rộng dễ dàng", "yes", "no"], ["Cách nhiệt", "yes", "Trung bình"], ["Bảo trì", "Thấp", "Cao hơn"]].map(([label, panel, traditional]) => <div className="comparison-row" role="row" key={label}><span>{label}</span><span>{panel === "yes" ? <Check size={20} weight="bold" /> : panel}</span><span>{traditional === "no" ? <X size={20} weight="bold" /> : traditional}</span></div>)}</div><SectionCta text="Cần so sánh theo mặt bằng thực tế? Nhận tư vấn miễn phí từ đội kỹ thuật." /></section>

      <section className="section capability reveal"><div className="capability-copy"><p className="kicker">Năng lực triển khai</p><h2>Đội thi công quen vật tư, quen tiến độ, quen mặt bằng khó</h2><p>Chúng tôi bóc tách khối lượng, tư vấn lõi panel, phối hợp xưởng gia công và đội lắp đặt để giảm phát sinh tại công trình.</p></div><div className="stats">{managedStats.slice(0, 3).map((item) => <div className="stat" key={item.label}><strong data-counter data-target={item.value.replace(/\D/g, "") || "0"}>0</strong><span>{item.label}</span></div>)}</div></section>

      <section className="section faq reveal" id="faq"><div className="section-stack narrow"><p className="kicker">Câu hỏi thường gặp</p><h2>Những điều cần biết trước khi thi công nhà tiền chế panel</h2></div><p className="mobile-swipe-hint" aria-hidden="true">Vuốt để xem thêm câu hỏi <ArrowRight size={16} weight="bold" /></p><div className="faq-list mobile-swipe-list">{managedFaqs.map(([question, answer]) => <article className="faq-item" key={question}><button className="tooltip-top" type="button" aria-expanded="false" data-tooltip="Bấm để xem câu trả lời">{question}</button><p>{answer}</p></article>)}</div><SectionCta text="Còn câu hỏi khác về giải pháp panel? Đội ngũ sẽ phản hồi trong thời gian sớm nhất." /></section>

      <section id="lien-he" className="section final-cta reveal"><div><p className="kicker">Khảo sát và báo giá</p><h2>Gửi diện tích, vị trí và nhu cầu sử dụng để nhận giá sơ bộ</h2><p>Hotline: {business.phoneDisplay}. Email: {business.email}.</p><p className="cta-trust cta-trust-on-dark">Tư vấn sơ bộ miễn phí · Báo giá theo mặt bằng thực tế · Không ràng buộc trước khảo sát</p><div className="contact-links"><a className="primary-btn tooltip-top" href={`tel:${business.phone}`} data-tooltip="Gọi trực tiếp để trao đổi nhu cầu">Gọi tư vấn</a><a className="secondary-btn tooltip-top" href={`mailto:${business.email}`} data-tooltip="Gửi bản vẽ hoặc yêu cầu qua email">Gửi bản vẽ</a></div></div><form className="contact-form" action={`mailto:${business.email}`} method="post" encType="text/plain"><label>Họ tên<input name="name" placeholder="Nguyễn Văn A" required /></label><label>Số điện thoại<input name="phone" placeholder={business.phoneDisplay} required /></label><label>Nhu cầu<textarea name="message" placeholder="Diện tích, địa điểm, loại công trình" rows={4} /></label><button className="primary-btn tooltip-top" type="submit" data-tooltip="Gửi thông tin để đội ngũ liên hệ lại">Nhận tư vấn</button></form></section>

      <footer className="footer"><div className="footer-brand"><div className="footer-brand-lockup"><Image src={logoMark} alt="" width={48} height={48} /><span>{business.name}<small>Ninh Thuận</small></span></div><p>{footerDescription}</p><div className="footer-social"><a className="social-facebook" href={business.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookLogo size={20} weight="fill" /></a><a className="social-youtube" href={business.youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube"><YoutubeLogo size={20} weight="fill" /></a><a className="social-tiktok" href={business.tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok"><TiktokLogo size={20} weight="fill" /></a></div></div><div className="footer-column"><strong>Dịch vụ</strong><a href="#cau-tao">Panel PU, EPS và Rockwool</a><a href="#bao-gia">Báo giá nhà tiền chế panel</a><a href="#du-an">Dự án thi công tham khảo</a></div><div className="footer-column"><strong>Liên hệ</strong><a href={business.mapUrl} target="_blank" rel="noreferrer">{business.address}</a><a href={`tel:${business.phone}`}>Hotline: {business.phoneDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a><span>{business.workingHours}</span></div><div className="footer-column"><strong>Thông tin</strong><a href="/chinh-sach-bao-mat">Chính sách bảo mật</a><a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a><span>Khu vực: {site.location.label}</span></div></footer>
      <div className="footer-legal"><span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span><span>MST: {business.taxCode}</span></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </main>
  );
}
