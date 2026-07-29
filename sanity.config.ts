import { defineConfig, defineField, defineType } from "sanity";
import { structureTool } from "sanity/structure";
import { CloudinaryVideoInput } from "./sanity/components/cloudinary-video-input";

export default defineConfig({
  name: "panedninhthuan",
  title: "PANED Ninh Thuận",
  projectId: "syr5q4gg",
  dataset: "production",
  basePath: "/admin",
  plugins: [structureTool()],
  schema: { types: [
    defineType({ name: "siteSettings", title: "Thông tin doanh nghiệp", type: "document", initialValue: { name: "PANED", phone: "0946657257", email: "phamhoangbaoanh87@gmail.com", address: "Phường Phan Rang, tỉnh Khánh Hòa" }, fields: [
      defineField({ name: "name", title: "Tên thương hiệu", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "phone", title: "Số điện thoại", type: "string" }),
      defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.email() }),
      defineField({ name: "address", title: "Địa chỉ", type: "string" })
    ] }),
    defineType({ name: "legalPage", title: "Trang pháp lý", type: "document", fields: [
      defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "slug", title: "Đường dẫn", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
      defineField({ name: "lead", title: "Mở đầu", type: "text" }),
      defineField({ name: "sections", title: "Nội dung", type: "array", of: [{ type: "object", fields: [defineField({ name: "heading", title: "Tiêu đề mục", type: "string" }), defineField({ name: "body", title: "Nội dung", type: "text" })] }] }),
      defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
      defineField({ name: "seoDescription", title: "SEO description", type: "text" })
    ] }),
    defineType({ name: "homePage", title: "Trang chủ", type: "document", initialValue: { heroTitle: "Nhà tiền chế tấm panel", heroDescription: "Giải pháp xây dựng hiện đại, triển khai gọn và phù hợp nhu cầu sử dụng thực tế." }, fields: [
      defineField({ name: "heroTitle", title: "Tiêu đề hero", type: "string" }),
      defineField({ name: "heroDescription", title: "Mô tả hero", type: "text" }),
      defineField({ name: "heroImages", title: "Ảnh hero", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
      defineField({ name: "heroCtaLabel", title: "Nhãn CTA Hero", type: "string", initialValue: "Nhận tư vấn" }),
      defineField({ name: "heroCtaHref", title: "Liên kết CTA Hero", type: "string", initialValue: "#lien-he" }),
      defineField({ name: "services", title: "Dịch vụ", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "tag", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "image", title: "Tải ảnh", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh hiện tại (Cloudinary)", type: "url" })] }] }),
      defineField({ name: "faqs", title: "Câu hỏi thường gặp", type: "array", of: [{ type: "object", fields: [defineField({ name: "question", type: "string" }), defineField({ name: "answer", type: "text" })] }] }),
      defineField({ name: "videos", title: "Video", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "url", title: "Video Cloudinary", type: "string", components: { input: CloudinaryVideoInput } })] }] }),
      defineField({ name: "processSteps", title: "Quy trình", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", title: "Bước", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), defineField({ name: "imageUrl", title: "URL ảnh", type: "url" })] }] }),
      defineField({ name: "projects", title: "Dự án", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "category", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "imageUrl", title: "URL ảnh", type: "url" })] }] }),
      defineField({ name: "pricing", title: "Bảng giá", type: "array", of: [{ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "price", type: "string" }), defineField({ name: "note", type: "text" })] }] }),
      defineField({ name: "footerDescription", title: "Mô tả footer", type: "text" }),
      defineField({ name: "anatomy", title: "Cấu tạo panel", type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "image", type: "image", options: { hotspot: true } }), defineField({ name: "panelTypes", type: "array", of: [{ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "description", type: "text" })] }] })] }),
      defineField({ name: "stats", title: "Số liệu năng lực", type: "array", of: [{ type: "object", fields: [defineField({ name: "value", type: "string" }), defineField({ name: "label", type: "string" })] }] }),
      defineField({ name: "testimonials", title: "Đánh giá khách hàng", type: "array", of: [{ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "role", type: "string" }), defineField({ name: "quote", type: "text" })] }] }),
      defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
      defineField({ name: "seoDescription", title: "SEO description", type: "text" })
    ] })
  ] }
});
