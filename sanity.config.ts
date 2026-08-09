import { defineArrayMember, defineConfig, defineField, defineType } from "sanity";
import { structureTool } from "sanity/structure";
import { createElement } from "react";
import { CloudinaryVideoInput } from "./sanity/components/cloudinary-video-input";
import { CloudinaryImageInput } from "./sanity/components/cloudinary-image-input";

const imageItemPreview = {
  select: { title: "title", label: "label", imageUrl: "imageUrl" },
  prepare({ title, label, imageUrl }: { title?: string; label?: string; imageUrl?: string }) {
    const previewUrl = imageUrl;
    return {
      title: title || label || "Ảnh công trình",
      subtitle: previewUrl ? "Có ảnh hiện tại — mở card để xem hoặc thay ảnh" : "Chưa có ảnh",
      media: previewUrl ? createElement("img", { src: previewUrl, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : undefined
    };
  }
};

const materialBrandPreview = {
  select: { title: "name", subtitle: "category", logoUrl: "logoUrl" },
  prepare({ title, subtitle, logoUrl }: { title?: string; subtitle?: string; logoUrl?: string }) {
    return {
      title: title || "Thương hiệu vật tư",
      subtitle: subtitle || "Chưa phân nhóm vật tư",
      media: logoUrl ? createElement("img", { src: logoUrl, alt: "", style: { width: "100%", height: "100%", objectFit: "contain", padding: "4px" } }) : undefined
    };
  }
};

const cloudinaryImageUploadField = () => defineField({ name: "imageUrl", title: "Ảnh hiển thị", description: "Dán URL ảnh hoặc chọn file để upload lên Cloudinary. Đây là ảnh duy nhất dùng để thay đổi giao diện.", type: "string", components: { input: CloudinaryImageInput } });

const richTextField = (name: string, title: string) => defineField({
  name,
  title,
  description: "Soạn như trình soạn thảo: Enter để xuống dòng, dùng danh sách đầu dòng/đánh số, in đậm, in nghiêng và chèn liên kết.",
  type: "array",
  of: [defineArrayMember({ type: "block", styles: [{ title: "Thường", value: "normal" }, { title: "Tiêu đề 2", value: "h2" }, { title: "Tiêu đề 3", value: "h3" }, { title: "Trích dẫn", value: "blockquote" }], lists: [{ title: "Danh sách đầu dòng", value: "bullet" }, { title: "Danh sách đánh số", value: "number" }], marks: { decorators: [{ title: "Đậm", value: "strong" }, { title: "Nghiêng", value: "em" }, { title: "Mã", value: "code" }], annotations: [{ name: "link", type: "object", title: "Liên kết", fields: [defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }) }), defineField({ name: "blank", title: "Mở tab mới", type: "boolean", initialValue: false })] }] } })]
});

export default defineConfig({
  name: "panedninhthuan",
  title: "PANED Ninh Thuận",
  projectId: "syr5q4gg",
  dataset: "production",
  basePath: "/admin",
  plugins: [structureTool({ structure: (S) => S.list().title("PANED Ninh Thuận").items([
    S.listItem().title("Thông tin doanh nghiệp").child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Thông tin doanh nghiệp")),
    S.listItem().title("Trang chủ").child(S.document().schemaType("homePage").documentId("homePage").title("Trang chủ")),
    S.listItem().title("Cấu hình form tư vấn").child(S.document().schemaType("consultationFormSettings").documentId("consultationFormSettings").title("Cấu hình form tư vấn")),
    S.documentTypeListItem("legalPage").title("Trang pháp lý"),
    S.documentTypeListItem("article").title("Bài viết")
  ]) })],
  schema: { types: [
    defineType({ name: "siteSettings", title: "Thông tin doanh nghiệp", type: "document", initialValue: { name: "PANED", phone: "0946657257", email: "phamhoangbaoanh87@gmail.com", address: "Phường Phan Rang, tỉnh Khánh Hòa", workingHours: "Thứ 2 - Thứ 7: 7:30 - 17:30", taxCode: "0123456789", zaloUrl: "https://zalo.me/0946657257", messengerUrl: "https://m.me/your-page", facebookUrl: "https://facebook.com/paned", youtubeUrl: "https://youtube.com/@paned", tiktokUrl: "https://tiktok.com/@paned", mapUrl: "https://maps.google.com", logoTextUrl: "https://res.cloudinary.com/dzwjgfd7t/image/upload/v1785221937/panelhub/logo_text_i7kfp4.png", logoMarkUrl: "https://res.cloudinary.com/dzwjgfd7t/image/upload/v1785221937/panelhub/logo_no_text_oiboay.png", footerDescription: "Đơn vị tư vấn, thiết kế và thi công nhà tiền chế tấm panel cho nhà ở, nhà xưởng, kho lạnh, văn phòng công trình và mô hình lưu trú lắp ghép." }, fields: [
      defineField({ name: "name", title: "Tên thương hiệu", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "phone", title: "Số điện thoại", type: "string" }),
      defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.email() }),
      defineField({ name: "address", title: "Địa chỉ", type: "string" }),
      defineField({ name: "workingHours", title: "Giờ làm việc", type: "string" }),
      defineField({ name: "taxCode", title: "Mã số thuế", type: "string" }),
      defineField({ name: "zaloUrl", title: "Link Zalo", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
      defineField({ name: "messengerUrl", title: "Link Messenger", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
      defineField({ name: "facebookUrl", title: "Link Facebook", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
      defineField({ name: "youtubeUrl", title: "Link YouTube", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
      defineField({ name: "tiktokUrl", title: "Link TikTok", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
      defineField({ name: "mapUrl", title: "Link Google Maps", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
      defineField({ name: "logoText", title: "Logo header tải lên Sanity (cũ)", type: "image", options: { hotspot: true }, hidden: true }),
      defineField({ name: "logoTextUrl", title: "Logo header hiển thị", description: "Dán URL hoặc chọn file để upload lên Cloudinary.", type: "string", components: { input: CloudinaryImageInput } }),
      defineField({ name: "logoMark", title: "Logo icon / favicon tải lên Sanity (cũ)", type: "image", options: { hotspot: true }, hidden: true }),
      defineField({ name: "logoMarkUrl", title: "Logo icon / favicon hiển thị", description: "Dán URL hoặc chọn file để upload lên Cloudinary.", type: "string", components: { input: CloudinaryImageInput } }),
      defineField({ name: "footerDescription", title: "Mô tả footer", type: "text" })
    ] }),
    defineType({ name: "legalPage", title: "Trang pháp lý", type: "document", fields: [
      defineField({ name: "pageKey", title: "Loại trang pháp lý", description: "Chọn đúng loại để nội dung luôn hiển thị đúng trên URL website, kể cả khi bạn đổi tiêu đề hoặc đường dẫn.", type: "string", options: { list: [{ title: "Chính sách bảo mật", value: "privacy" }, { title: "Điều khoản sử dụng", value: "terms" }], layout: "radio" }, validation: (rule) => rule.required() }),
      defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "slug", title: "Slug quản trị", description: "Hai URL pháp lý công khai vẫn cố định để bảo toàn SEO: /chinh-sach-bao-mat và /dieu-khoan-su-dung. Đổi slug sẽ không làm mất nội dung, nhưng không tạo URL mới.", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
      defineField({ name: "lead", title: "Mở đầu", type: "text" }),
      defineField({ name: "sections", title: "Nội dung", type: "array", of: [{ type: "object", fields: [defineField({ name: "heading", title: "Tiêu đề mục", type: "string" }), richTextField("richBody", "Nội dung có định dạng"), defineField({ name: "body", title: "Nội dung cũ", description: "Chỉ để giữ nội dung đã nhập trước đây. Hãy dùng trường Nội dung có định dạng khi chỉnh sửa mới.", type: "text", readOnly: true })] }] }),
      defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
      defineField({ name: "seoDescription", title: "SEO description", type: "text" })
    ] }),
    defineType({ name: "article", title: "Bài viết", type: "document", preview: { select: { title: "title", subtitle: "publishedAt", media: "coverImageUrl" }, prepare({ title, subtitle, media }: { title?: string; subtitle?: string; media?: string }) { return { title: title || "Bài viết chưa có tiêu đề", subtitle: subtitle ? `Xuất bản: ${new Date(subtitle).toLocaleDateString("vi-VN")}` : "Bản nháp", media: media ? createElement("img", { src: media, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : undefined }; } }, fields: [
      defineField({ name: "title", title: "Tiêu đề bài viết", type: "string", validation: (rule) => rule.required().max(140) }),
      defineField({ name: "slug", title: "Đường dẫn bài viết", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
      defineField({ name: "excerpt", title: "Tóm tắt", type: "text", rows: 3, validation: (rule) => rule.required().max(280) }),
      defineField({ name: "tags", title: "Chủ đề", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
      defineField({ name: "featured", title: "Bài viết nổi bật", type: "boolean", initialValue: false }),
      defineField({ name: "coverImageUrl", title: "Ảnh đại diện", description: "Dán URL ảnh hoặc chọn file để upload lên Cloudinary.", type: "string", components: { input: CloudinaryImageInput } }),
      richTextField("body", "Nội dung bài viết"),
      defineField({ name: "publishedAt", title: "Ngày xuất bản", type: "datetime", initialValue: () => new Date().toISOString() }),
      defineField({ name: "seoTitle", title: "SEO title", type: "string", validation: (rule) => rule.max(60) }),
      defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2, validation: (rule) => rule.max(160) })
    ] }),
    defineType({ name: "consultationFormSettings", title: "Cấu hình form tư vấn", type: "document", initialValue: { eyebrow: "Khảo sát và báo giá", heading: "Gửi diện tích, vị trí và nhu cầu sử dụng để nhận giá sơ bộ", description: "Đội ngũ sẽ tiếp nhận thông tin và phản hồi phương án phù hợp.", commitmentText: "Tư vấn sơ bộ miễn phí · Báo giá theo mặt bằng thực tế · Không ràng buộc trước khảo sát", nameLabel: "Họ tên", namePlaceholder: "Nguyễn Văn A", phoneLabel: "Số điện thoại", phonePlaceholder: "0946657257", requirementLabel: "Nhu cầu", requirementPlaceholder: "Diện tích, địa điểm, loại công trình", submitButtonText: "Nhận tư vấn", callButtonText: "Gọi tư vấn", drawingButtonText: "Gửi bản vẽ", successMessage: "Đã gửi yêu cầu tư vấn thành công.", errorMessage: "Không thể gửi yêu cầu. Vui lòng thử lại hoặc gọi trực tiếp.", validationMessage: "Vui lòng kiểm tra lại thông tin đã nhập.", isEnabled: true, enableDrawingUpload: false, enableGoogleSheets: true, enableEmailNotification: true }, preview: { select: { title: "heading", enabled: "isEnabled" }, prepare({ title, enabled }: { title?: string; enabled?: boolean }) { return { title: title || "Cấu hình form tư vấn", subtitle: enabled === false ? "Đang tắt form" : "Đang bật form" }; } }, fields: [
      defineField({ name: "eyebrow", title: "Tiêu đề nhỏ", type: "string", validation: (rule) => rule.required().max(80) }),
      defineField({ name: "heading", title: "Tiêu đề chính", type: "text", rows: 3, validation: (rule) => rule.required().max(180) }),
      defineField({ name: "description", title: "Mô tả", type: "text", rows: 3, validation: (rule) => rule.max(300) }),
      defineField({ name: "hotline", title: "Hotline hiển thị", type: "string", validation: (rule) => rule.max(30) }),
      defineField({ name: "displayEmail", title: "Email hiển thị", type: "string", validation: (rule) => rule.email() }),
      defineField({ name: "commitmentText", title: "Nội dung cam kết", type: "text", rows: 2, validation: (rule) => rule.max(240) }),
      defineField({ name: "nameLabel", title: "Nhãn họ tên", type: "string", validation: (rule) => rule.required().max(60) }),
      defineField({ name: "namePlaceholder", title: "Placeholder họ tên", type: "string", validation: (rule) => rule.max(100) }),
      defineField({ name: "phoneLabel", title: "Nhãn số điện thoại", type: "string", validation: (rule) => rule.required().max(60) }),
      defineField({ name: "phonePlaceholder", title: "Placeholder số điện thoại", type: "string", validation: (rule) => rule.max(30) }),
      defineField({ name: "requirementLabel", title: "Nhãn nhu cầu", type: "string", validation: (rule) => rule.required().max(60) }),
      defineField({ name: "requirementPlaceholder", title: "Placeholder nhu cầu", type: "string", validation: (rule) => rule.max(300) }),
      defineField({ name: "submitButtonText", title: "Nội dung nút gửi", type: "string", validation: (rule) => rule.required().max(60) }),
      defineField({ name: "callButtonText", title: "Nội dung nút gọi", type: "string", validation: (rule) => rule.required().max(60) }),
      defineField({ name: "drawingButtonText", title: "Nội dung nút gửi bản vẽ", type: "string", validation: (rule) => rule.max(60) }),
      defineField({ name: "notificationEmail", title: "Email nhận thông báo", description: "Không phải secret. Nếu bỏ trống, website dùng CONTACT_EMAIL trên Vercel.", type: "string", validation: (rule) => rule.email() }),
      defineField({ name: "emailSubjectPrefix", title: "Tiền tố tiêu đề email", type: "string", validation: (rule) => rule.max(80) }),
      defineField({ name: "successMessage", title: "Thông báo gửi thành công", type: "string", validation: (rule) => rule.required().max(240) }),
      defineField({ name: "errorMessage", title: "Thông báo gửi thất bại", type: "string", validation: (rule) => rule.required().max(240) }),
      defineField({ name: "validationMessage", title: "Thông báo dữ liệu không hợp lệ", type: "string", validation: (rule) => rule.required().max(240) }),
      defineField({ name: "isEnabled", title: "Bật form tư vấn", type: "boolean", initialValue: true }),
      defineField({ name: "enableDrawingUpload", title: "Hiện nút gửi bản vẽ qua email", type: "boolean", initialValue: false }),
      defineField({ name: "enableGoogleSheets", title: "Lưu vào Google Sheets", type: "boolean", initialValue: true }),
      defineField({ name: "enableEmailNotification", title: "Gửi email Resend", type: "boolean", initialValue: true, validation: (rule) => rule.custom((value, context) => value === false && context.document?.enableGoogleSheets === false ? "Cần bật ít nhất Google Sheets hoặc Resend." : true) })
    ] }),
    defineType({ name: "homePage", title: "Trang chủ", type: "document", initialValue: { heroTitle: "Nhà tiền chế tấm panel", heroDescription: "Giải pháp xây dựng hiện đại, triển khai gọn và phù hợp nhu cầu sử dụng thực tế." }, fieldsets: [
      { name: "hero", title: "01. Hero — Nhà tiền chế tấm panel", options: { collapsible: true, collapsed: false } },
      { name: "trust", title: "02. Số liệu và nền tảng tin cậy", options: { collapsible: true, collapsed: true } },
      { name: "planning", title: "03. Lợi ích kiểm soát tiến độ và chi phí", options: { collapsible: true, collapsed: true } },
      { name: "services", title: "04. Giải pháp panel theo mô hình vận hành", options: { collapsible: true, collapsed: true } },
      { name: "anatomy", title: "04. Cấu tạo tấm panel cách nhiệt", options: { collapsible: true, collapsed: true } },
      { name: "process", title: "05. 7 bước triển khai nhà panel", options: { collapsible: true, collapsed: true } },
      { name: "projects", title: "06. Dự án nhà panel", options: { collapsible: true, collapsed: true } },
      { name: "videos", title: "07. Video công trình", options: { collapsible: true, collapsed: true } },
      { name: "pricing", title: "08. Bảng giá tham khảo", options: { collapsible: true, collapsed: true } },
      { name: "faq", title: "09. Câu hỏi thường gặp", options: { collapsible: true, collapsed: true } },
      { name: "footer", title: "10. Footer", options: { collapsible: true, collapsed: true } },
      { name: "seo", title: "11. SEO trang chủ", options: { collapsible: true, collapsed: true } }
    ], fields: [
      defineField({ name: "heroTitle", title: "Tiêu đề", type: "string", fieldset: "hero" }),
      defineField({ name: "heroDescription", title: "Mô tả", type: "text", fieldset: "hero" }),
      defineField({ name: "heroImages", title: "4 ảnh công trình", description: "Ảnh đầu tiên là ảnh chính khi website mở. Mỗi ảnh dùng một field thống nhất để dán URL hoặc upload file.", type: "array", fieldset: "hero", of: [defineArrayMember({ type: "object", preview: imageItemPreview, fields: [defineField({ name: "label", title: "Nhãn ảnh", type: "string" }), cloudinaryImageUploadField(), defineField({ name: "imageCloudinaryUrl", title: "Ảnh upload Cloudinary beta (cũ)", type: "string", hidden: true }), defineField({ name: "image", title: "Ảnh tải lên Sanity (cũ)", type: "image", options: { hotspot: true }, hidden: true })] })] }),
      defineField({ name: "heroCtaLabel", title: "Nhãn CTA", type: "string", fieldset: "hero", initialValue: "Nhận tư vấn" }),
      defineField({ name: "heroCtaHref", title: "Liên kết CTA", type: "string", fieldset: "hero", initialValue: "#lien-he" }),
      defineField({ name: "stats", title: "Số liệu năng lực", type: "array", fieldset: "trust", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "value", title: "Số liệu", type: "string" }), defineField({ name: "label", title: "Nhãn", type: "string" })] })] }),
      defineField({ name: "materialBrands", title: "Thương hiệu vật tư tham khảo", description: "Logo và nội dung hiển thị trong dải vật tư. Dán URL hoặc upload file tại field Logo hiển thị. Danh mục này không tự khẳng định quan hệ đại lý.", type: "array", fieldset: "trust", of: [defineArrayMember({ type: "object", preview: materialBrandPreview, fields: [defineField({ name: "name", title: "Tên thương hiệu", type: "string", validation: (rule) => rule.required() }), defineField({ name: "logo", title: "Logo tải lên Sanity (cũ)", type: "image", options: { hotspot: false }, hidden: true }), defineField({ name: "logoUrl", title: "Logo hiển thị", type: "string", components: { input: CloudinaryImageInput } }), defineField({ name: "category", title: "Nhóm vật tư", type: "string" }), defineField({ name: "summary", title: "Giới thiệu ngắn", type: "text", rows: 2 }), defineField({ name: "material", title: "Loại vật tư sử dụng", type: "text", rows: 2 }), defineField({ name: "benefit", title: "Lợi ích cho công trình", type: "text", rows: 2 })] })], validation: (rule) => rule.max(24).warning("Nên giữ tối đa 24 thương hiệu để dải hiển thị gọn.") }),
      defineField({ name: "testimonials", title: "Đánh giá khách hàng", type: "array", fieldset: "trust", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "name", title: "Tên", type: "string" }), defineField({ name: "role", title: "Vai trò / địa điểm", type: "string" }), defineField({ name: "quote", title: "Nội dung", type: "text" })] })] }),
      defineField({ name: "planningBenefits", title: "Các card lợi ích", description: "Thêm, sửa hoặc kéo để sắp xếp các card hiển thị ở phần kiểm soát tiến độ và chi phí.", type: "array", fieldset: "planning", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (rule) => rule.required() }), defineField({ name: "description", title: "Mô tả", type: "text", validation: (rule) => rule.required() }), defineField({ name: "checkpoints", title: "Các điểm cần kiểm soát", type: "array", of: [defineArrayMember({ type: "string" })] })] })] }),
      defineField({ name: "services", title: "6 card dịch vụ", description: "Mỗi card gồm tiêu đề, nhãn, mô tả và một ảnh hiển thị có thể dán URL hoặc upload.", type: "array", fieldset: "services", of: [defineArrayMember({ type: "object", preview: imageItemPreview, fields: [defineField({ name: "title", title: "Tiêu đề", type: "string" }), defineField({ name: "tag", title: "Nhãn", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), cloudinaryImageUploadField(), defineField({ name: "imageCloudinaryUrl", title: "Ảnh upload Cloudinary beta (cũ)", type: "string", hidden: true }), defineField({ name: "image", title: "Ảnh tải lên Sanity (cũ)", type: "image", options: { hotspot: true }, hidden: true })] })] }),
      defineField({ name: "anatomy", title: "Nội dung và ảnh cấu tạo", type: "object", fieldset: "anatomy", fields: [defineField({ name: "title", title: "Tiêu đề", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), cloudinaryImageUploadField(), defineField({ name: "imageCloudinaryUrl", title: "Ảnh upload Cloudinary beta (cũ)", type: "string", hidden: true }), defineField({ name: "image", title: "Ảnh tải lên Sanity (cũ)", type: "image", options: { hotspot: true }, hidden: true }), defineField({ name: "panelTypes", title: "Các loại panel", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "name", title: "Tên loại panel", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" })] })] })] }),
      defineField({ name: "processFeature", title: "Ảnh chính quy trình", type: "object", fieldset: "process", fields: [cloudinaryImageUploadField(), defineField({ name: "imageCloudinaryUrl", title: "Ảnh upload Cloudinary beta (cũ)", type: "string", hidden: true }), defineField({ name: "image", title: "Ảnh tải lên Sanity (cũ)", type: "image", options: { hotspot: true }, hidden: true })] }),
      defineField({ name: "processSteps", title: "7 ảnh và bước triển khai", type: "array", fieldset: "process", of: [defineArrayMember({ type: "object", preview: imageItemPreview, fields: [defineField({ name: "title", title: "Tên bước", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), cloudinaryImageUploadField(), defineField({ name: "imageCloudinaryUrl", title: "Ảnh upload Cloudinary beta (cũ)", type: "string", hidden: true }), defineField({ name: "image", title: "Ảnh tải lên Sanity (cũ)", type: "image", options: { hotspot: true }, hidden: true })] })] }),
      defineField({ name: "projects", title: "6 dự án", type: "array", fieldset: "projects", of: [defineArrayMember({ type: "object", preview: imageItemPreview, fields: [defineField({ name: "title", title: "Tiêu đề", type: "string" }), defineField({ name: "category", title: "Danh mục", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), cloudinaryImageUploadField(), defineField({ name: "imageCloudinaryUrl", title: "Ảnh upload Cloudinary beta (cũ)", type: "string", hidden: true }), defineField({ name: "image", title: "Ảnh tải lên Sanity (cũ)", type: "image", options: { hotspot: true }, hidden: true })] })] }),
      defineField({ name: "videos", title: "6 video", description: "Video hiện có sẽ hiện preview. Chọn file mới để upload trực tiếp lên Cloudinary.", type: "array", fieldset: "videos", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "Tiêu đề", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), defineField({ name: "url", title: "Video Cloudinary", type: "string", components: { input: CloudinaryVideoInput } }), defineField({ name: "captionUrl", title: "URL phụ đề tiếng Việt (VTT, không bắt buộc)", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) })] })] }),
      defineField({ name: "pricing", title: "Các gói giá", type: "array", fieldset: "pricing", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "name", title: "Tên gói", type: "string" }), defineField({ name: "price", title: "Mức giá", type: "string" }), richTextField("details", "Nội dung gói có định dạng"), defineField({ name: "note", title: "Ghi chú cũ", description: "Chỉ để giữ dữ liệu đã nhập trước đây. Hãy dùng Nội dung gói có định dạng cho các ý mới.", type: "text", readOnly: true })] })] }),
      defineField({ name: "detailPages", title: "12. Nội dung trang chuyên sâu", description: "Nội dung dài cho từng trang Cấu tạo, Quy trình, Dự án, Báo giá. Soạn như bài viết với heading, đoạn văn, danh sách và liên kết CTA.", type: "object", fields: ["anatomy", "process", "projects", "pricing"].map((name) => defineField({ name, title: ({ anatomy: "Cấu tạo", process: "Quy trình", projects: "Dự án", pricing: "Báo giá" } as Record<string, string>)[name], type: "object", fields: [defineField({ name: "title", title: "Tiêu đề", type: "string" }), defineField({ name: "lead", title: "Mở đầu", type: "text" }), richTextField("body", "Nội dung trang chuyên sâu"), defineField({ name: "ctaLabel", title: "Nhãn CTA", type: "string" }), defineField({ name: "ctaHref", title: "Link CTA", type: "string" })] })) }),
      defineField({ name: "faqs", title: "Câu hỏi và câu trả lời", type: "array", fieldset: "faq", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "question", title: "Câu hỏi", type: "string" }), defineField({ name: "answer", title: "Câu trả lời", type: "text" })] })] }),
      defineField({ name: "footerDescription", title: "Mô tả footer (dự phòng)", description: "Ưu tiên chỉnh Mô tả footer trong Thông tin doanh nghiệp.", type: "text", fieldset: "footer" }),
      defineField({ name: "seoTitle", title: "SEO title", type: "string", fieldset: "seo" }),
      defineField({ name: "seoDescription", title: "SEO description", type: "text", fieldset: "seo" })
    ] })
  ] }
});
