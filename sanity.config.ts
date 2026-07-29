import { defineConfig, defineField, defineType } from "sanity";
import { structureTool } from "sanity/structure";
import { CloudinaryVideoInput } from "./sanity/components/cloudinary-video-input";
import { CloudinaryImageInput } from "./sanity/components/cloudinary-image-input";

export default defineConfig({
  name: "panedninhthuan",
  title: "PANED Ninh Thuận",
  projectId: "syr5q4gg",
  dataset: "production",
  basePath: "/admin",
  plugins: [structureTool()],
  schema: { types: [
    defineType({ name: "siteSettings", title: "Thông tin doanh nghiệp", type: "document", initialValue: { name: "PANED", phone: "0946657257", email: "phamhoangbaoanh87@gmail.com", address: "Phường Phan Rang, tỉnh Khánh Hòa", logoTextUrl: "https://res.cloudinary.com/dzwjgfd7t/image/upload/v1785221937/panelhub/logo_text_i7kfp4.png", logoMarkUrl: "https://res.cloudinary.com/dzwjgfd7t/image/upload/v1785221937/panelhub/logo_no_text_oiboay.png", footerDescription: "Đơn vị tư vấn, thiết kế và thi công nhà tiền chế tấm panel cho nhà ở, nhà xưởng, kho lạnh, văn phòng công trình và mô hình lưu trú lắp ghép." }, fields: [
      defineField({ name: "name", title: "Tên thương hiệu", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "phone", title: "Số điện thoại", type: "string" }),
      defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.email() }),
      defineField({ name: "address", title: "Địa chỉ", type: "string" }),
      defineField({ name: "logoText", title: "Logo header mới tải lên", type: "image", options: { hotspot: true } }),
      defineField({ name: "logoTextUrl", title: "Logo header hiện tại", type: "string", components: { input: CloudinaryImageInput } }),
      defineField({ name: "logoMark", title: "Logo icon / favicon mới tải lên", type: "image", options: { hotspot: true } }),
      defineField({ name: "logoMarkUrl", title: "Logo icon / favicon hiện tại", type: "string", components: { input: CloudinaryImageInput } }),
      defineField({ name: "footerDescription", title: "Mô tả footer", type: "text" })
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
      defineField({ name: "heroImages", title: "Ảnh hero", type: "array", of: [{ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] }] }),
      defineField({ name: "heroCtaLabel", title: "Nhãn CTA Hero", type: "string", initialValue: "Nhận tư vấn" }),
      defineField({ name: "heroCtaHref", title: "Liên kết CTA Hero", type: "string", initialValue: "#lien-he" }),
      defineField({ name: "services", title: "Dịch vụ", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "tag", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] }] }),
      defineField({ name: "faqs", title: "Câu hỏi thường gặp", type: "array", of: [{ type: "object", fields: [defineField({ name: "question", type: "string" }), defineField({ name: "answer", type: "text" })] }] }),
      defineField({ name: "videos", title: "Video", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "url", title: "Video Cloudinary", type: "string", components: { input: CloudinaryVideoInput } })] }] }),
      defineField({ name: "processSteps", title: "Quy trình", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", title: "Bước", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] }] }),
      defineField({ name: "processFeature", title: "Ảnh chính quy trình", type: "object", fields: [defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] }),
      defineField({ name: "projects", title: "Dự án", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "category", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] }] }),
      defineField({ name: "pricing", title: "Bảng giá", type: "array", of: [{ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "price", type: "string" }), defineField({ name: "note", type: "text" })] }] }),
      defineField({ name: "footerDescription", title: "Mô tả footer", type: "text" }),
      defineField({ name: "anatomy", title: "Cấu tạo panel", type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } }), defineField({ name: "panelTypes", type: "array", of: [{ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "description", type: "text" })] }] })] }),
      defineField({ name: "stats", title: "Số liệu năng lực", type: "array", of: [{ type: "object", fields: [defineField({ name: "value", type: "string" }), defineField({ name: "label", type: "string" })] }] }),
      defineField({ name: "testimonials", title: "Đánh giá khách hàng", type: "array", of: [{ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "role", type: "string" }), defineField({ name: "quote", type: "text" })] }] }),
      defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
      defineField({ name: "seoDescription", title: "SEO description", type: "text" })
    ] })
  ] }
});
