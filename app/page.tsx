import Image from "next/image";
import {
  ArrowRight,
  Buildings,
  Check,
  CheckCircle,
  ChatCircleDots,
  EnvelopeSimple,
  FacebookLogo,
  Factory,
  Gauge,
  HouseLine,
  Phone,
  Star,
  ThermometerCold,
  TiktokLogo,
  Wrench,
  X,
  YoutubeLogo
} from "@phosphor-icons/react/dist/ssr";
import { CostEstimator } from "../components/CostEstimator";
import { LandingMotion, MobileNav, ScrollTop, ThemeToggle } from "../components/LandingMotion";
import { PortfolioFilter, type PortfolioProject } from "../components/PortfolioFilter";
import { site } from "../lib/site";

const services = [
  ["Nhà panel dân dụng", "Nhà ở, homestay gọn nhẹ, hoàn thiện nhanh theo nhu cầu sử dụng.", "Nhà ở · Homestay"],
  ["Nhà xưởng tiền chế", "Kết cấu khẩu độ lớn, dễ mở rộng và kiểm soát tiến độ lắp dựng.", "Sản xuất · Kho bãi"],
  ["Văn phòng panel", "Không gian làm việc sạch, linh hoạt cho công trình tạm hoặc cố định.", "Văn phòng · Nhà mẫu"],
  ["Kho lạnh panel PU", "Giải pháp giữ nhiệt và kín khí cho thực phẩm, dược phẩm, logistics.", "Thực phẩm · Dược phẩm"],
  ["Nhà điều hành", "Module thi công nhanh, thuận tiện giám sát và vận hành công trường.", "Công trường · Dự án"],
  ["Cải tạo mở rộng", "Bổ sung không gian sử dụng mà giảm tối đa ảnh hưởng đến vận hành hiện hữu.", "Mở rộng · Cải tạo"]
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
  { title: "Nhà ở panel 120m²", category: "Nhà ở", description: "Khung thép và panel EPS hoàn thiện gọn cho gia đình trẻ.", image: site.images.projects[0], area: "120 m²", duration: "18 ngày", material: "EPS", location: "Bình Dương" },
  { title: "Homestay ven đô", category: "Nhà ở", description: "Module lưu trú mở rộng linh hoạt, tối ưu tiến độ khai thác.", image: site.images.projects[1], area: "180 m²", duration: "25 ngày", material: "EPS", location: "Đồng Nai" },
  { title: "Nhà xưởng 620m²", category: "Nhà xưởng", description: "Khung thép tiền chế, mái panel Rockwool cho xưởng sản xuất.", image: site.images.projects[2], area: "620 m²", duration: "38 ngày", material: "Rockwool", location: "TP.HCM" },
  { title: "Xưởng gia công mở rộng", category: "Nhà xưởng", description: "Không gian sản xuất mở rộng theo nhịp kết cấu hiện hữu.", image: site.images.projects[3], area: "450 m²", duration: "30 ngày", material: "EPS", location: "Long An" },
  { title: "Kho lạnh thực phẩm", category: "Kho lạnh", description: "Panel PU, xử lý kín khít mối nối cho khu lưu trữ nhiệt độ ổn định.", image: site.images.projects[4], area: "240 m²", duration: "21 ngày", material: "PU", location: "Bình Dương" },
  { title: "Văn phòng công trình", category: "Văn phòng", description: "Không gian điều hành lắp nhanh, dễ di dời khi thay đổi mặt bằng.", image: site.images.projects[5], area: "96 m²", duration: "12 ngày", material: "EPS", location: "Đồng Nai" }
];

const faqs = [
  ["Nhà tiền chế panel dùng được bao lâu?", "Tuổi thọ phụ thuộc khung thép, loại panel và bảo trì. Công trình thi công đúng kỹ thuật có thể vận hành bền trong nhiều năm."],
  ["Giá thi công nhà panel/m2 tính thế nào?", "Báo giá dựa trên diện tích, loại lõi panel, chiều dày, kết cấu khung, nền móng và mức hoàn thiện."],
  ["Có tháo dỡ và di dời được không?", "Có. Nhà lắp ghép panel có thể tháo theo module và phù hợp nhu cầu thay đổi mặt bằng."],
  ["Panel chống nóng và chống ồn ra sao?", "Panel PU, EPS và Rockwool đều cải thiện cách nhiệt. Rockwool phù hợp hơn khi ưu tiên chống cháy và cách âm."],
  ["Thời gian thi công thường mất bao lâu?", "Công trình nhỏ có thể hoàn thành trong vài tuần sau khi chốt thiết kế, vật tư và mặt bằng."],
  ["Panel có chống cháy không?", "Mức chống cháy tùy loại lõi. Rockwool thường được lựa chọn cho nhu cầu ưu tiên phòng cháy."],
  ["Thi công được ở tỉnh xa không?", "Có. Đội ngũ tiếp nhận khảo sát và lên phương án vận chuyển cho các tỉnh lân cận hoặc theo từng dự án."],
  ["Có bảo hành sau khi bàn giao không?", "Có. Phạm vi và thời hạn bảo hành được xác nhận trong báo giá và hợp đồng thi công."],
  ["Nền móng cần chuẩn bị như thế nào?", "Mặt bằng cần được khảo sát để xác định cao độ, kết cấu nền và phương án liên kết khung thép phù hợp."],
  ["Panel EPS và PU khác nhau thế nào?", "EPS có chi phí hợp lý, còn PU giữ nhiệt tốt hơn và thường dùng cho kho lạnh hoặc không gian yêu cầu nhiệt ổn định."],
  ["Có thể tự thiết kế rồi thuê thi công không?", "Có. Chúng tôi có thể phối hợp với hồ sơ sẵn có và rà soát lại giải pháp kết cấu, panel, phụ kiện trước khi triển khai."],
  ["Nhà panel có chịu được bão không?", "Khả năng chịu gió phụ thuộc thiết kế khung, liên kết, tải trọng và vị trí công trình. Các yếu tố này cần được tính trong hồ sơ kỹ thuật."],
  ["Có hỗ trợ vay vốn không?", "Hiện chưa có gói vay trực tiếp. Đội ngũ có thể hỗ trợ chuẩn bị thông tin báo giá cho hồ sơ tài chính khi cần."],
  ["Quy trình thanh toán như thế nào?", "Tiến độ thanh toán được chia theo các mốc khảo sát, gia công, lắp dựng và nghiệm thu theo thỏa thuận hợp đồng."],
  ["Có tư vấn và khảo sát miễn phí không?", "Chúng tôi tư vấn sơ bộ miễn phí. Khảo sát thực tế được xác nhận theo khu vực và quy mô công trình." ]
];

const testimonials = [
  ["Anh Minh", "Chủ xưởng cơ khí, Bình Dương", "Tiến độ rõ ràng, đội thi công phối hợp tốt nên xưởng sớm đi vào hoạt động."],
  ["Chị Hương", "Chủ homestay, Đồng Nai", "Phương án panel giúp rút ngắn phần xây dựng và vẫn đảm bảo không gian sáng, sạch."],
  ["Anh Phúc", "Quản lý kho lạnh, TP.HCM", "Đội ngũ tư vấn kỹ về panel PU và xử lý mối nối trước khi triển khai." ]
];

function SectionCta({ text }: { text: string }) {
  return <div className="section-cta"><p>{text}</p><a className="secondary-btn tooltip-top" href="#lien-he" data-tooltip="Chuyển đến form nhận báo giá">Nhận báo giá miễn phí <ArrowRight size={17} weight="bold" /></a></div>;
}

export default function Home() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  const localBusinessSchema = { "@context": "https://schema.org", "@type": "LocalBusiness", name: site.name, url: site.url, description: site.seo.description, telephone: site.contact.phoneDisplay, email: site.contact.email, address: { "@type": "PostalAddress", streetAddress: site.company.address, addressLocality: "Bình Dương", addressCountry: "VN" }, areaServed: site.location.areas };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Trang chủ", item: site.url }, { "@type": "ListItem", position: 2, name: "Nhà tiền chế panel", item: site.url }] };

  return (
    <main>
      <LandingMotion />
      <aside className="contact-rail" aria-label="Liên hệ nhanh">
        <a className="has-tooltip" href={`tel:${site.contact.phone}`} aria-label="Gọi tư vấn" data-tooltip="Gọi tư vấn"><Phone size={22} weight="fill" /></a>
        <a className="has-tooltip" href={site.contact.zaloUrl} target="_blank" rel="noreferrer" aria-label="Liên hệ qua Zalo" data-tooltip="Liên hệ Zalo"><ChatCircleDots size={22} weight="fill" /></a>
        <a className="has-tooltip" href={site.contact.messengerUrl} target="_blank" rel="noreferrer" aria-label="Liên hệ qua Messenger" data-tooltip="Liên hệ Messenger"><ChatCircleDots size={22} weight="duotone" /></a>
        <a className="has-tooltip" href={`mailto:${site.contact.email}`} aria-label="Gửi email báo giá" data-tooltip="Gửi email báo giá"><EnvelopeSimple size={22} weight="fill" /></a>
        <ScrollTop />
      </aside>

      <nav className="site-nav" aria-label="Điều hướng chính">
        <a className="brand" href="#hero">{site.name}</a>
        <div className="nav-links"><a className="nav-tooltip" href="#cau-tao" data-tooltip="Xem các loại panel và cấu tạo"><span>Cấu tạo</span></a><a className="nav-tooltip" href="#du-an" data-tooltip="Xem công trình đã triển khai"><span>Dự án</span></a><a className="nav-tooltip" href="#bao-gia" data-tooltip="Xem mức giá tham khảo"><span>Báo giá</span></a><a className="nav-tooltip" href="#faq" data-tooltip="Xem câu hỏi thường gặp"><span>FAQ</span></a></div>
        <div className="nav-actions"><a className="nav-cta nav-tooltip" href={`tel:${site.contact.phone}`} data-tooltip="Gọi để nhận báo giá sơ bộ">Nhận báo giá</a><ThemeToggle /><MobileNav /></div>
      </nav>

      <section id="hero" className="hero">
        <div className="hero-copy reveal">
          <div className="service-chips" aria-label="Loại công trình"><span>Nhà ở</span><span>Nhà xưởng</span><span>Văn phòng</span><span>Kho lạnh</span></div>
          <h1>Nhà tiền chế panel, <span>thi công nhanh</span> bàn giao đúng tiến độ</h1>
          <p className="hero-sub">Tư vấn, thiết kế và thi công trọn gói cho nhà ở, nhà xưởng, văn phòng công trình và kho lạnh.</p>
          <div className="hero-actions"><a className="primary-btn tooltip-top" href="#lien-he" data-tooltip="Gửi yêu cầu để nhận báo giá miễn phí">Nhận báo giá miễn phí <ArrowRight size={18} weight="bold" /></a><a className="secondary-btn tooltip-top" href="#du-an" data-tooltip="Xem các công trình đã triển khai">Xem công trình</a></div>
          <div className="benefit-chips"><span>Thi công 7-20 ngày</span><span>Báo giá minh bạch</span><span>Panel cách nhiệt</span><span>Bảo hành kết cấu</span></div>
        </div>
        <div className="hero-media reveal">
          <div className="hero-main-photo"><Image src={site.images.hero} alt="Nhà tiền chế panel đang thi công với khung thép" fill sizes="(max-width: 768px) 100vw, 50vw" priority /></div>
          <div className="hero-thumb hero-thumb-one"><Image src={site.images.heroDetailOne} alt="Lắp đặt mái panel cách nhiệt" fill sizes="220px" /></div>
          <div className="hero-thumb hero-thumb-two"><Image src={site.images.heroDetailTwo} alt="Khung thép tiền chế chuẩn bị lắp panel" fill sizes="240px" /></div>
          <div className="hero-plate"><strong>7-45 ngày</strong><span>Tiến độ tham khảo sau khi chốt bản vẽ</span></div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Số liệu năng lực"><div><strong>200+</strong><span>Công trình đã triển khai</span></div><div><strong>10+</strong><span>Năm kinh nghiệm</span></div><div><strong>98%</strong><span>Khách hàng hài lòng</span></div><div><strong>24h</strong><span>Phản hồi báo giá sơ bộ</span></div></section>

      <section className="section trust-section reveal">
        <div className="section-stack"><p className="kicker">Nền tảng tin cậy</p><h2>Vật tư phù hợp, quy trình rõ ràng và cam kết sau bàn giao</h2></div>
        <div className="partners-row" aria-label="Thương hiệu vật tư tham khảo"><strong>Tôn Đông Á</strong><strong>BlueScope</strong><strong>Kingspan</strong><strong>Sika</strong></div>
        <div className="badge-row"><span><CheckCircle size={18} weight="fill" /> Bảo hành kết cấu 5 năm</span><span><CheckCircle size={18} weight="fill" /> Panel theo yêu cầu PCCC</span><span><CheckCircle size={18} weight="fill" /> Nhận thi công liên tỉnh</span></div>
        <div className="testimonials-grid">{testimonials.map(([name, role, quote]) => <article className="testimonial-card" key={name}><div className="stars" aria-label="5 trên 5 sao">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={16} weight="fill" />)}</div><p>“{quote}”</p><strong>{name}</strong><span>{role}</span></article>)}</div>
      </section>

      <section className="section comparison reveal"><div className="section-stack"><p className="kicker">Giải pháp xây nhanh</p><h2>Nhà tiền chế panel giúp kiểm soát tiến độ và chi phí từ đầu</h2></div><div className="compare-grid">{[["Thời gian", "Gia công khung tại xưởng và lắp panel tại công trình giúp rút ngắn thời gian chờ."], ["Chi phí", "Dễ bóc tách vật tư, minh bạch báo giá theo diện tích và mức hoàn thiện."], ["Độ bền", "Kết cấu khung thép kết hợp lõi panel phù hợp nhu cầu nhiệt, ồn, cháy."]].map(([title, text]) => <article className="compare-item" key={title}><CheckCircle size={28} weight="fill" /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="section services-section"><div className="section-stack reveal"><p className="kicker">Dịch vụ trọn gói</p><h2>Giải pháp panel theo đúng mô hình bạn đang vận hành</h2></div><div className="services-bento">{services.map(([title, description, tags], index) => <article className="service-card reveal" key={title}><Image src={site.images.services[index]} alt={title} fill sizes="(max-width: 768px) 82vw, 33vw" /><div><span>{tags}</span><h3>{title}</h3><p>{description}</p><a href="#lien-he">Tìm hiểu thêm <ArrowRight size={16} weight="bold" /></a></div></article>)}</div><SectionCta text="Chưa chắc loại panel nào phù hợp? Gửi nhu cầu để nhận phương án sơ bộ." /></section>

      <section id="cau-tao" className="section anatomy"><div className="anatomy-visual reveal"><Image src={site.images.anatomy} alt="Cấu tạo tấm panel cách nhiệt" fill sizes="(max-width: 900px) 100vw, 46vw" /></div><div className="anatomy-copy reveal"><p className="kicker">Tôn, lõi, tôn</p><h2>Cấu tạo tấm panel cách nhiệt cho công trình chắc và sạch</h2><p>Tấm panel gồm hai lớp tôn mạ màu kẹp lõi cách nhiệt. Lựa chọn lõi panel quyết định mức giữ nhiệt, chống cháy, cách âm và ngân sách.</p><div className="panel-types"><article><h3>Panel PU</h3><p>Giữ nhiệt tốt cho kho lạnh và không gian cần ổn định nhiệt.</p></article><article><h3>Panel EPS</h3><p>Chi phí hợp lý cho nhà ở, văn phòng và công trình phổ thông.</p></article><article><h3>Panel Rockwool</h3><p>Ưu tiên chống cháy, cách âm cho xưởng và khu kỹ thuật.</p></article></div></div></section>

      <section className="section process reveal"><div className="section-stack narrow"><p className="kicker">Quy trình rõ từng việc</p><h2>7 bước triển khai nhà panel từ khảo sát đến bảo hành</h2></div><div className="process-board"><div className="process-feature"><Image src={site.images.processFeature} alt="Quy trình thi công nhà panel" fill sizes="(max-width: 1080px) 100vw, 38vw" /><div className="process-feature-card"><span>7 bước</span><strong>Từ khảo sát đến bảo hành</strong></div></div><div className="process-masonry">{processSteps.map(([step, text], index) => <article className="timeline-step" key={step}><div className="step-photo"><Image src={site.images.process[index]} alt={`${step} trong quy trình thi công`} fill sizes="(max-width: 760px) 82vw, 260px" /></div><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3><p>{text}</p></article>)}</div></div><SectionCta text="Bắt đầu với bước khảo sát miễn phí và phương án phù hợp mặt bằng." /></section>

      <section id="du-an" className="section projects"><div className="section-stack reveal"><p className="kicker">Công trình tham khảo</p><h2>Dự án nhà panel theo nhiều nhu cầu sử dụng</h2></div><PortfolioFilter projects={projects} /></section>

      <CostEstimator />

      <section id="bao-gia" className="section pricing reveal"><div><p className="kicker">Ngân sách minh bạch</p><h2>Báo giá nhà tiền chế panel tham khảo theo m2</h2><p>Giá thay đổi theo vật tư, nền móng, chiều cao, loại lõi panel và mức hoàn thiện.</p></div><div className="price-table" role="table" aria-label="Bảng giá tham khảo">{[["Gói cơ bản", "Từ 1.650.000đ/m2", "Khung thép, mái panel EPS, hoàn thiện tiêu chuẩn"], ["Gói cách nhiệt tốt", "Từ 2.150.000đ/m2", "Panel PU dày hơn, xử lý mối nối kỹ hơn"], ["Gói nhà xưởng", "Theo bản vẽ", "Khẩu độ lớn, tải trọng và PCCC theo yêu cầu"]].map(([name, price, note]) => <div className="price-row" role="row" key={name}><strong>{name}</strong><span>{price}</span><p>{note}</p></div>)}</div></section>

      <section className="section comparison-table-section reveal"><div className="section-stack"><p className="kicker">So sánh giải pháp</p><h2>Nhà panel và xây dựng truyền thống khác nhau thế nào?</h2></div><div className="comparison-table" role="table"><div className="comparison-row comparison-head" role="row"><strong>Tiêu chí</strong><strong>Nhà panel</strong><strong>Xây truyền thống</strong></div>{[["Thời gian thi công", "7-45 ngày", "3-12 tháng"], ["Chi phí tham khảo", "Từ 1.6tr/m²", "Từ 3.5tr/m²"], ["Mở rộng dễ dàng", "yes", "no"], ["Cách nhiệt", "yes", "Trung bình"], ["Bảo trì", "Thấp", "Cao hơn"]].map(([label, panel, traditional]) => <div className="comparison-row" role="row" key={label}><span>{label}</span><span>{panel === "yes" ? <Check size={20} weight="bold" /> : panel}</span><span>{traditional === "no" ? <X size={20} weight="bold" /> : traditional}</span></div>)}</div><SectionCta text="Cần so sánh theo mặt bằng thực tế? Nhận tư vấn miễn phí từ đội kỹ thuật." /></section>

      <section className="section capability reveal"><div className="capability-copy"><p className="kicker">Năng lực triển khai</p><h2>Đội thi công quen vật tư, quen tiến độ, quen mặt bằng khó</h2><p>Chúng tôi bóc tách khối lượng, tư vấn lõi panel, phối hợp xưởng gia công và đội lắp đặt để giảm phát sinh tại công trình.</p></div><div className="stats">{/* Số liệu mẫu, cần thay bằng số liệu đã xác thực trước khi xuất bản. */}{[["200", "Công trình panel đã triển khai"], ["10", "Năm kinh nghiệm"], ["24", "Giờ phản hồi bản giá sơ bộ"]].map(([value, label]) => <div className="stat" key={label}><strong data-counter data-target={value}>0</strong><span>{label}</span></div>)}</div></section>

      <section className="section faq reveal" id="faq"><div className="section-stack narrow"><p className="kicker">Câu hỏi thường gặp</p><h2>Những điều cần biết trước khi thi công nhà tiền chế panel</h2></div><div className="faq-list mobile-swipe-list">{faqs.map(([question, answer]) => <article className="faq-item" key={question}><button className="tooltip-top" type="button" aria-expanded="false" data-tooltip="Bấm để xem câu trả lời">{question}</button><p>{answer}</p></article>)}</div><SectionCta text="Còn câu hỏi khác về giải pháp panel? Đội ngũ sẽ phản hồi trong thời gian sớm nhất." /></section>

      <section id="lien-he" className="section final-cta reveal"><div><p className="kicker">Khảo sát và báo giá</p><h2>Gửi diện tích, vị trí và nhu cầu sử dụng để nhận giá sơ bộ</h2><p>Hotline: {site.contact.phoneDisplay}. Email: {site.contact.email}.</p><div className="contact-links"><a className="primary-btn tooltip-top" href={`tel:${site.contact.phone}`} data-tooltip="Gọi trực tiếp để trao đổi nhu cầu">Gọi tư vấn</a><a className="secondary-btn tooltip-top" href={`mailto:${site.contact.email}`} data-tooltip="Gửi bản vẽ hoặc yêu cầu qua email">Gửi bản vẽ</a></div></div><form className="contact-form" action={`mailto:${site.contact.email}`} method="post" encType="text/plain"><label>Họ tên<input name="name" placeholder="Nguyễn Văn A" required /></label><label>Số điện thoại<input name="phone" placeholder={site.contact.phoneDisplay} required /></label><label>Nhu cầu<textarea name="message" placeholder="Diện tích, địa điểm, loại công trình" rows={4} /></label><button className="primary-btn tooltip-top" type="submit" data-tooltip="Gửi thông tin để đội ngũ liên hệ lại">Nhận tư vấn</button></form></section>

      <footer className="footer"><div className="footer-brand"><span>{site.name}</span><p>Đơn vị tư vấn, thiết kế và thi công nhà tiền chế tấm panel cho nhà ở, nhà xưởng, kho lạnh, văn phòng công trình và mô hình lưu trú lắp ghép.</p><div className="footer-social"><a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookLogo size={20} weight="fill" /></a><a href={site.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><YoutubeLogo size={20} weight="fill" /></a><a href={site.social.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><TiktokLogo size={20} weight="fill" /></a></div></div><div className="footer-column"><strong>Dịch vụ</strong><a href="#cau-tao">Panel PU, EPS và Rockwool</a><a href="#bao-gia">Báo giá nhà tiền chế panel</a><a href="#du-an">Dự án thi công tham khảo</a></div><div className="footer-column"><strong>Liên hệ</strong><a href={site.location.mapUrl} target="_blank" rel="noreferrer">{site.company.address}</a><a href={`tel:${site.contact.phone}`}>Hotline: {site.contact.phoneDisplay}</a><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><span>{site.company.workingHours}</span></div><div className="footer-column"><strong>Thông tin</strong><a href="/chinh-sach-bao-mat">Chính sách bảo mật</a><a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a><span>Khu vực: {site.location.label}</span></div></footer>
      <div className="footer-legal"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span><span>MST: {site.company.taxCode}</span></div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </main>
  );
}
