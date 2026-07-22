import Image from "next/image";
import {
  ArrowRight,
  Buildings,
  CheckCircle,
  ChatCircleDots,
  EnvelopeSimple,
  Factory,
  FireSimple,
  Gauge,
  HouseLine,
  Phone,
  ShieldCheck,
  ThermometerCold,
  Truck,
  Wrench
} from "@phosphor-icons/react/dist/ssr";
import { LandingMotion, ScrollTop, ThemeToggle } from "../components/LandingMotion";

const projects = [
  ["Nhà ở panel 120m2", "Gia công khung thép tiền chế, lắp panel EPS trong 18 ngày", "panel-home"],
  ["Nhà xưởng 620m2", "Thi công nhà xưởng tiền chế panel, mái panel Rockwool", "panel-factory"],
  ["Kho lạnh thực phẩm", "Lắp đặt tấm panel cách nhiệt PU, xử lý kín khít mối nối", "panel-cold"],
  ["Homestay ven đô", "Nhà lắp ghép panel hoàn thiện nhanh, dễ mở rộng module", "panel-homestay"]
];

const applications = [
  ["Nhà ở dân dụng", HouseLine, "Tối ưu thời gian, giảm tải móng, hoàn thiện gọn."],
  ["Nhà xưởng tiền chế panel", Factory, "Mở rộng nhịp, kiểm soát nhiệt, vận hành sớm."],
  ["Kho lạnh", ThermometerCold, "Panel PU dày, khóa camlock, giữ nhiệt ổn định."],
  ["Homestay và resort", Buildings, "Module linh hoạt, mặt dựng sạch, tiến độ nhanh."],
  ["Văn phòng công trình", Wrench, "Lắp nhanh, tháo dỡ được, phù hợp dự án tạm."]
];

const processSteps = [
  ["Khảo sát", "Đo mặt bằng, kiểm tra nền móng, hướng vận chuyển vật tư.", "survey-panel-site"],
  ["Thiết kế", "Chốt mặt bằng, khẩu độ khung thép tiền chế và loại panel.", "panel-design-plan"],
  ["Gia công khung", "Cắt, hàn, sơn khung tại xưởng để giảm thời gian tại công trình.", "steel-frame-workshop"],
  ["Vận chuyển", "Đóng gói panel, khung và phụ kiện theo thứ tự lắp dựng.", "panel-truck-delivery"],
  ["Lắp dựng khung", "Cẩu dựng cột, kèo, giằng và cân chỉnh liên kết.", "frame-install-crane"],
  ["Lắp panel", "Lắp đặt tấm panel cách nhiệt cho tường, vách và mái.", "panel-wall-install"],
  ["Hoàn thiện", "Xử lý mối nối, phụ kiện, cửa, máng xối và nghiệm thu.", "panel-finished-building"]
];

const faqs = [
  ["Nhà tiền chế panel dùng được bao lâu?", "Tuổi thọ phụ thuộc khung thép, loại panel và bảo trì. Công trình đúng kỹ thuật có thể vận hành bền trong nhiều năm."],
  ["Giá thi công nhà panel/m2 tính thế nào?", "Báo giá dựa trên diện tích, loại lõi panel, chiều dày, kết cấu khung thép tiền chế, nền móng và mức hoàn thiện."],
  ["Có tháo dỡ và di dời được không?", "Có. Nhà lắp ghép panel phù hợp nhu cầu mở rộng, tháo dỡ từng module hoặc di dời khi mặt bằng thay đổi."],
  ["Panel chống nóng và chống ồn ra sao?", "Panel PU, panel EPS và panel Rockwool đều cải thiện cách nhiệt. Rockwool nổi bật hơn về chống cháy và cách âm."],
  ["Thời gian thi công thường mất bao lâu?", "Công trình nhỏ có thể hoàn thành trong vài tuần sau khi chốt thiết kế, vật tư và mặt bằng thi công."]
];

export default function Home() {
  return (
    <main>
      <LandingMotion />
      <aside className="contact-rail" aria-label="Liên hệ nhanh">
        <a className="has-tooltip" href="tel:0900000000" aria-label="Gọi tư vấn" data-tooltip="Gọi tư vấn">
          <Phone size={22} weight="fill" />
        </a>
        <a className="has-tooltip" href="https://zalo.me/0900000000" target="_blank" rel="noreferrer" aria-label="Liên hệ qua Zalo" data-tooltip="Liên hệ Zalo">
          <ChatCircleDots size={22} weight="fill" />
        </a>
        <a className="has-tooltip" href="https://m.me/your-page" target="_blank" rel="noreferrer" aria-label="Liên hệ qua Messenger" data-tooltip="Liên hệ Messenger">
          <ChatCircleDots size={22} weight="duotone" />
        </a>
        <a className="has-tooltip" href="mailto:baogia@example.com" aria-label="Gửi email báo giá" data-tooltip="Gửi email báo giá">
          <EnvelopeSimple size={22} weight="fill" />
        </a>
        <ScrollTop />
      </aside>
      <nav className="site-nav" aria-label="Điều hướng chính">
        <a className="brand" href="#hero">PanelBuild</a>
        <div className="nav-links">
          <a href="#cau-tao">Cấu tạo</a>
          <a href="#du-an">Dự án</a>
          <a href="#bao-gia">Báo giá</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-actions">
          <a className="nav-cta tooltip-top" href="tel:0900000000" data-tooltip="Gọi để nhận báo giá sơ bộ">Nhận báo giá</a>
          <ThemeToggle />
        </div>
      </nav>

      <section id="hero" className="hero">
        <div className="hero-copy reveal">
          <p className="kicker">Tư vấn, thiết kế, thi công trọn gói</p>
          <h1>Nhà tiền chế tấm panel <span>thi công nhanh</span>, chi phí rõ</h1>
          <p className="hero-sub">Khung thép chắc, panel cách nhiệt, tiến độ gọn cho nhà ở và xưởng.</p>
          <div className="hero-actions">
            <a className="primary-btn tooltip-top" href="#lien-he" data-tooltip="Gửi yêu cầu để nhận báo giá miễn phí">Nhận báo giá miễn phí <ArrowRight size={18} weight="bold" /></a>
            <a className="secondary-btn tooltip-top" href="tel:0900000000" data-tooltip="Gọi hotline để được tư vấn nhanh"><Phone size={18} weight="bold" /> Tư vấn ngay</a>
          </div>
          <div className="hero-proof" aria-label="Điểm mạnh thi công">
            <strong>PU</strong>
            <strong>EPS</strong>
            <strong>Rockwool</strong>
          </div>
        </div>
        <div className="hero-media reveal">
          <div className="hero-main-photo">
            <Image
              src="https://picsum.photos/seed/panel-industrial-site/1180/900"
              alt="nhà tiền chế tấm panel đang thi công với khung thép tiền chế"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="hero-thumb hero-thumb-one">
            <Image
              src="https://picsum.photos/seed/panel-roof-install/520/420"
              alt="lắp đặt mái panel cách nhiệt cho nhà tiền chế tấm panel"
              fill
              sizes="220px"
            />
          </div>
          <div className="hero-thumb hero-thumb-two">
            <Image
              src="https://picsum.photos/seed/steel-frame-panel/520/420"
              alt="khung thép tiền chế chuẩn bị lắp tấm panel cách nhiệt"
              fill
              sizes="240px"
            />
          </div>
          <div className="hero-plate">
            <strong>18-45 ngày</strong>
            <span>Tiến độ phổ biến sau khi chốt bản vẽ</span>
          </div>
        </div>
      </section>

      <section className="comparison section reveal">
        <div className="section-stack">
          <p className="kicker">Giải pháp xây nhanh</p>
          <h2>Nhà tiền chế tấm panel giúp giảm thời gian chờ và rủi ro chi phí</h2>
        </div>
        <div className="compare-grid">
          {[
            ["Thời gian", "Nhanh hơn nhờ gia công khung tại xưởng và lắp panel tại công trình."],
            ["Chi phí", "Dễ bóc tách vật tư, minh bạch báo giá nhà tiền chế panel theo m2."],
            ["Độ bền", "Khung thép tiền chế kết hợp panel đúng lõi cho nhu cầu nóng, ồn, cháy."]
          ].map(([title, text]) => (
            <article className="compare-item" key={title}>
              <CheckCircle size={28} weight="fill" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section image-ribbon reveal" aria-label="Ảnh vật tư và thi công">
        {[
          ["panel-material-yard", "vật tư panel PU và panel EPS cho nhà tiền chế tấm panel"],
          ["panel-crane-frame", "cẩu lắp khung thép tiền chế tại công trình nhà panel"],
          ["panel-finished-wall", "vách tường hoàn thiện bằng tấm panel cách nhiệt"]
        ].map(([seed, alt]) => (
          <div className="ribbon-photo" key={seed}>
            <Image
              src={`https://picsum.photos/seed/${seed}/760/540`}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </section>

      <section id="cau-tao" className="section anatomy">
        <div className="anatomy-visual reveal">
          <Image
            src="https://picsum.photos/seed/panel-layer-cut/920/760"
            alt="cắt lớp tấm panel cách nhiệt cho nhà tiền chế panel"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
        <div className="anatomy-copy reveal">
          <p className="kicker">Tôn, lõi, tôn</p>
          <h2>Cấu tạo tấm panel cách nhiệt cho công trình chắc và sạch</h2>
          <p>Tấm panel gồm hai lớp tôn mạ màu kẹp lõi cách nhiệt. Việc chọn panel PU, panel EPS hay panel Rockwool quyết định mức giữ nhiệt, chống cháy, cách âm và ngân sách.</p>
          <div className="panel-types">
            <article><h3>Panel PU</h3><p>Giữ nhiệt tốt, hợp kho lạnh và phòng yêu cầu ổn định nhiệt.</p></article>
            <article><h3>Panel EPS</h3><p>Chi phí hợp lý, hợp nhà ở dân dụng và văn phòng công trình.</p></article>
            <article><h3>Panel Rockwool</h3><p>Ưu tiên chống cháy, cách âm, hợp nhà xưởng và khu kỹ thuật.</p></article>
          </div>
        </div>
      </section>

      <section className="section process reveal">
        <div className="section-stack narrow">
          <p className="kicker">Quy trình rõ từng việc</p>
          <h2>Thi công nhà tiền chế panel theo tuyến công việc kiểm soát được</h2>
        </div>
        <div className="process-board">
          <div className="process-feature">
            <Image
              src="https://picsum.photos/seed/panel-process-feature/920/1120"
              alt="quy trình thi công nhà tiền chế panel tại công trình"
              fill
              sizes="(max-width: 1080px) 100vw, 38vw"
            />
            <div className="process-feature-card">
              <span>7 bước</span>
              <strong>Từ khảo sát đến nghiệm thu</strong>
            </div>
          </div>
          <div className="process-masonry">
            {processSteps.map(([step, text, seed], index) => (
              <article className="timeline-step" key={step}>
                <div className="step-photo">
                  <Image
                    src={`https://picsum.photos/seed/${seed}/520/360`}
                    alt={`${step} trong quy trình thi công nhà tiền chế panel`}
                    fill
                    sizes="(max-width: 760px) 100vw, 260px"
                  />
                </div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="du-an" className="section projects">
        <div className="section-stack reveal">
          <p className="kicker">Công trình tham khảo</p>
          <h2>Dự án nhà tiền chế panel theo nhiều nhu cầu sử dụng</h2>
        </div>
        <div className="project-grid mobile-swipe-list">
          {projects.map(([title, desc, seed]) => (
            <article className="project-card reveal" key={title}>
              <Image
                src={`https://picsum.photos/seed/${seed}/900/680`}
                alt={`${title} dùng nhà tiền chế tấm panel`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="project-overlay">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="bao-gia" className="section pricing reveal">
        <div>
          <p className="kicker">Ngân sách minh bạch</p>
          <h2>Báo giá nhà tiền chế panel tham khảo theo m2</h2>
          <p>Giá thay đổi theo thời điểm vật tư, nền móng, chiều cao, loại lõi panel và mức hoàn thiện.</p>
        </div>
        <div className="price-table" role="table" aria-label="Bảng giá tham khảo">
          {[
            ["Gói cơ bản", "Từ 1.650.000đ/m2", "Khung thép, mái panel EPS, hoàn thiện tiêu chuẩn"],
            ["Gói cách nhiệt tốt", "Từ 2.150.000đ/m2", "Panel PU dày hơn, xử lý mối nối kỹ hơn"],
            ["Gói nhà xưởng", "Theo bản vẽ", "Khẩu độ lớn, tải trọng và PCCC theo yêu cầu"]
          ].map(([name, price, note]) => (
            <div className="price-row" role="row" key={name}>
              <strong>{name}</strong>
              <span>{price}</span>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section applications">
        <div className="section-stack reveal">
          <p className="kicker">Ứng dụng thực tế</p>
          <h2>Nhà lắp ghép panel phù hợp nhiều mô hình khai thác</h2>
        </div>
        <div className="app-grid mobile-swipe-list">
          {applications.map(([title, Icon, text]) => (
            <article className="app-card reveal" key={title as string}>
              <Icon size={34} weight="duotone" />
              <h3>{title as string}</h3>
              <p>{text as string}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section capability reveal">
        <div className="capability-copy">
          <p className="kicker">Năng lực triển khai</p>
          <h2>Đội thi công quen vật tư, quen tiến độ, quen mặt bằng khó</h2>
          <p>Chúng tôi bóc tách khối lượng, tư vấn lõi panel, phối hợp xưởng gia công và đội lắp đặt để giảm phát sinh tại công trình.</p>
        </div>
        <div className="stats">
          {[
            ["86", "Công trình panel đã triển khai"],
            ["12", "Tỉnh thành nhận khảo sát"],
            ["24", "Giờ phản hồi bản giá sơ bộ"]
          ].map(([value, label]) => (
            <div className="stat" key={label}>
              <strong data-counter data-target={value}>0</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section case-study reveal">
        <div className="case-panel">
          <Gauge size={42} weight="duotone" />
          <h2>Case study ngắn: kho lạnh cần đưa vào vận hành sớm</h2>
          <p>Dữ liệu khách hàng thật chưa được cung cấp, nên phần này giữ ở dạng placeholder rõ ràng. Khi có ảnh, diện tích và ngành hàng thật, nội dung sẽ thay bằng case study có kiểm chứng.</p>
        </div>
        <div className="case-points">
          <article><h3>Nhu cầu</h3><p>Giữ nhiệt ổn định, giảm thời gian đóng kho.</p></article>
          <article><h3>Giải pháp</h3><p>Lắp đặt tấm panel cách nhiệt PU, kiểm soát kín khí.</p></article>
          <article><h3>Kết quả dự kiến</h3><p>Rút ngắn tiến độ so với xây tường truyền thống.</p></article>
        </div>
      </section>

      <section id="faq" className="section faq reveal">
        <div className="section-stack narrow">
          <p className="kicker">Câu hỏi thường gặp</p>
          <h2>Những điều cần biết trước khi thi công nhà tiền chế panel</h2>
        </div>
        <div className="faq-list mobile-swipe-list">
          {faqs.map(([question, answer]) => (
            <article className="faq-item" key={question}>
              <button className="tooltip-top" type="button" aria-expanded="false" data-tooltip="Bấm để xem câu trả lời">{question}</button>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="lien-he" className="section final-cta reveal">
        <div>
          <p className="kicker">Khảo sát và báo giá</p>
          <h2>Gửi diện tích, vị trí và nhu cầu sử dụng để nhận giá sơ bộ</h2>
          <p>Hotline placeholder: 0900 000 000. Email placeholder: baogia@example.com.</p>
          <div className="contact-links">
            <a className="primary-btn tooltip-top" href="tel:0900000000" data-tooltip="Gọi trực tiếp để trao đổi nhu cầu">Gọi tư vấn</a>
            <a className="secondary-btn tooltip-top" href="mailto:baogia@example.com" data-tooltip="Gửi bản vẽ hoặc yêu cầu qua email">Gửi bản vẽ</a>
          </div>
        </div>
        <form className="contact-form" action="mailto:baogia@example.com" method="post" encType="text/plain">
          <label>Họ tên<input name="name" placeholder="Nguyễn Văn A" required /></label>
          <label>Số điện thoại<input name="phone" placeholder="0900 000 000" required /></label>
          <label>Nhu cầu<textarea name="message" placeholder="Diện tích, địa điểm, loại công trình" rows={4} /></label>
          <button className="primary-btn tooltip-top" type="submit" data-tooltip="Gửi thông tin để đội ngũ liên hệ lại">Nhận tư vấn</button>
        </form>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <span>PanelBuild</span>
          <p>Đơn vị tư vấn, thiết kế và thi công nhà tiền chế tấm panel cho nhà ở, nhà xưởng, kho lạnh, văn phòng công trình và mô hình lưu trú lắp ghép.</p>
        </div>
        <div className="footer-column">
          <strong>Dịch vụ panel</strong>
          <a href="#cau-tao">Panel PU, EPS và Rockwool</a>
          <a href="#bao-gia">Báo giá nhà tiền chế panel</a>
          <a href="#du-an">Dự án thi công tham khảo</a>
        </div>
        <div className="footer-column">
          <strong>Khu vực và liên hệ</strong>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">TP.HCM, Bình Dương, Đồng Nai và lân cận</a>
          <a href="tel:0900000000">Hotline: 0900 000 000</a>
          <a href="mailto:baogia@example.com">baogia@example.com</a>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Thi công nhà tiền chế tấm panel",
            provider: { "@type": "Organization", name: "PanelBuild" },
            serviceType: "Tư vấn, thiết kế và thi công nhà tiền chế tấm panel",
            areaServed: ["TP.HCM", "Bình Dương", "Đồng Nai"],
            description: "Thi công nhà panel cho nhà ở, nhà xưởng, kho lạnh và công trình lắp ghép."
          })
        }}
      />
    </main>
  );
}
