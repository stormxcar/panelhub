import { ArrowRight, HouseLine, Phone } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { site } from "../lib/site";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <header className="not-found-header">
        <Link href="/" className="brand brand-logo" aria-label={`Về trang chủ ${site.name}`}><span className="brand-wordmark"><Image src={site.branding.logoText} alt={site.branding.logoAlt} width={220} height={60} /></span></Link>
        <a className="not-found-call" href={`tel:${site.contact.phone}`}>
          <Phone size={18} weight="bold" aria-hidden="true" />
          <span>{site.contact.phoneDisplay}</span>
        </a>
      </header>

      <section className="not-found-content" aria-labelledby="not-found-title">
        <p className="not-found-code" aria-hidden="true">404</p>
        <div className="not-found-copy">
          <p className="kicker">Không tìm thấy trang</p>
          <h1 id="not-found-title">Có vẻ trang này<br /><span>đã đổi địa chỉ.</span></h1>
          <p>
            Liên kết bạn mở có thể đã không còn tồn tại hoặc bị nhập sai. Hãy trở về trang chủ để xem các giải pháp thi công panel của chúng tôi.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="primary-btn">
              <HouseLine size={20} weight="bold" aria-hidden="true" />
              Về trang chủ
            </Link>
            <Link href="/#bao-gia" className="secondary-btn">
              Nhận báo giá
              <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <aside className="not-found-note">
          <span>01</span>
          <p>Cần hỗ trợ nhanh?</p>
          <a href={`tel:${site.contact.phone}`}>Gọi {site.contact.phoneDisplay}</a>
        </aside>
      </section>
    </main>
  );
}
