import type { Metadata } from "next";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: `Chính sách bảo mật | ${site.name}`,
  description: `Cách ${site.name} thu thập, sử dụng và bảo vệ thông tin khách hàng.`
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <header className="legal-header"><a href="/" className="brand brand-logo" aria-label="PANED Ninh Thuận - Về trang chủ"><span className="brand-wordmark"><img src={site.branding.logoText} alt={site.branding.logoAlt} /></span></a><a href="/" className="secondary-btn">Về trang chủ</a></header>
      <article className="legal-content">
        <p className="kicker">Thông tin pháp lý</p>
        <h1>Chính sách bảo mật</h1>
        <p className="legal-lead">Hiệu lực từ ngày 27/07/2026. Chính sách này giải thích cách {site.name} tiếp nhận, sử dụng và bảo vệ thông tin do khách hàng cung cấp.</p>
        <section><h2>1. Thông tin chúng tôi thu thập</h2><p>Khi bạn liên hệ qua biểu mẫu, điện thoại, email, Zalo hoặc Messenger, chúng tôi có thể tiếp nhận họ tên, số điện thoại, email, địa điểm công trình, diện tích, nhu cầu thi công và tài liệu bạn chủ động gửi.</p></section>
        <section><h2>2. Mục đích sử dụng</h2><p>Thông tin được dùng để phản hồi yêu cầu tư vấn, lập báo giá sơ bộ, khảo sát công trình, thực hiện hợp đồng, chăm sóc sau bàn giao và cải thiện chất lượng dịch vụ.</p></section>
        <section><h2>3. Chia sẻ và lưu trữ thông tin</h2><p>Chúng tôi không bán thông tin cá nhân. Thông tin chỉ được chia sẻ cho nhân sự, đối tác thi công hoặc nhà cung cấp cần thiết để xử lý yêu cầu của bạn, trong phạm vi phù hợp với mục đích đã nêu.</p></section>
        <section><h2>4. Bảo mật</h2><p>Chúng tôi áp dụng biện pháp quản lý hợp lý để hạn chế truy cập trái phép, thất lạc hoặc sử dụng sai mục đích. Tuy vậy, không có phương thức truyền dữ liệu nào trên Internet bảo đảm an toàn tuyệt đối.</p></section>
        <section><h2>5. Quyền của bạn</h2><p>Bạn có thể yêu cầu kiểm tra, điều chỉnh hoặc đề nghị xóa thông tin cá nhân mà chúng tôi đang lưu giữ, trừ trường hợp pháp luật hoặc nghĩa vụ hợp đồng yêu cầu tiếp tục lưu trữ.</p></section>
        <section><h2>6. Liên hệ</h2><p>Để hỏi về chính sách này hoặc yêu cầu xử lý dữ liệu, vui lòng liên hệ {site.name} qua email <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> hoặc hotline <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>.</p></section>
      </article>
    </main>
  );
}
