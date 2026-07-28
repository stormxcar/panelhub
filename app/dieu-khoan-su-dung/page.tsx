import type { Metadata } from "next";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: `Điều khoản sử dụng | ${site.name}`,
  description: `Điều khoản sử dụng website và dịch vụ tư vấn thi công của ${site.name}.`
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <header className="legal-header"><a href="/" className="brand brand-logo" aria-label="PANED Ninh Thuận - Về trang chủ"><span className="brand-wordmark"><img src={site.branding.logoText} alt={site.branding.logoAlt} /></span></a><a href="/" className="secondary-btn">Về trang chủ</a></header>
      <article className="legal-content">
        <p className="kicker">Thông tin pháp lý</p>
        <h1>Điều khoản sử dụng</h1>
        <p className="legal-lead">Hiệu lực từ ngày 27/07/2026. Khi truy cập website hoặc gửi yêu cầu tư vấn, bạn đồng ý với các điều khoản dưới đây.</p>
        <section><h2>1. Phạm vi thông tin</h2><p>Nội dung trên website nhằm cung cấp thông tin tham khảo về giải pháp nhà tiền chế panel, vật liệu, quy trình và mức giá dự kiến. Thông tin không thay thế cho báo giá, hồ sơ kỹ thuật hoặc hợp đồng chính thức.</p></section>
        <section><h2>2. Báo giá và tiến độ</h2><p>Mức giá, thời gian thi công và phạm vi công việc thực tế phụ thuộc bản vẽ, mặt bằng, loại vật tư, điều kiện vận chuyển và yêu cầu pháp lý của từng dự án. Các nội dung này chỉ có giá trị ràng buộc khi được xác nhận bằng báo giá hoặc hợp đồng.</p></section>
        <section><h2>3. Quyền sở hữu nội dung</h2><p>Thiết kế, văn bản, hình ảnh, logo và nội dung thuộc website không được sao chép, khai thác hoặc sử dụng lại cho mục đích thương mại nếu chưa có sự đồng ý phù hợp từ chủ sở hữu quyền.</p></section>
        <section><h2>4. Hành vi không được phép</h2><p>Người dùng không được can thiệp vào hoạt động của website, phát tán mã độc, khai thác dữ liệu trái phép hoặc sử dụng thông tin trên website cho mục đích vi phạm pháp luật.</p></section>
        <section><h2>5. Liên kết bên thứ ba</h2><p>Website có thể dẫn tới các nền tảng liên hệ hoặc mạng xã hội bên thứ ba. {site.name} không kiểm soát và không chịu trách nhiệm cho nội dung, chính sách riêng tư hoặc hoạt động tại các nền tảng đó.</p></section>
        <section><h2>6. Thay đổi điều khoản</h2><p>Chúng tôi có thể cập nhật điều khoản này khi cần thiết. Phiên bản mới sẽ được công bố tại trang này cùng ngày hiệu lực tương ứng.</p></section>
        <section><h2>7. Liên hệ</h2><p>Mọi câu hỏi về điều khoản sử dụng xin gửi về <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> hoặc hotline <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>.</p></section>
      </article>
    </main>
  );
}
