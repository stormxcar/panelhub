import { defineArrayMember, defineConfig, defineField, defineType } from "sanity";
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
    defineType({ name: "homePage", title: "Trang chủ", type: "document", initialValue: { heroTitle: "Nhà tiền chế tấm panel", heroDescription: "Giải pháp xây dựng hiện đại, triển khai gọn và phù hợp nhu cầu sử dụng thực tế." }, fieldsets: [
      { name: "hero", title: "01. Hero — Nhà tiền chế tấm panel", options: { collapsible: true, collapsed: false } },
      { name: "trust", title: "02. Số liệu và nền tảng tin cậy", options: { collapsible: true, collapsed: true } },
      { name: "services", title: "03. Giải pháp panel theo mô hình vận hành", options: { collapsible: true, collapsed: true } },
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
      defineField({ name: "heroImages", title: "4 ảnh công trình", description: "Ảnh đầu tiên là ảnh chính khi website mở. Mỗi ảnh có preview URL hiện tại và trường upload ảnh mới.", type: "array", fieldset: "hero", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", title: "Nhãn ảnh", type: "string" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] })] }),
      defineField({ name: "heroCtaLabel", title: "Nhãn CTA", type: "string", fieldset: "hero", initialValue: "Nhận tư vấn" }),
      defineField({ name: "heroCtaHref", title: "Liên kết CTA", type: "string", fieldset: "hero", initialValue: "#lien-he" }),
      defineField({ name: "stats", title: "Số liệu năng lực", type: "array", fieldset: "trust", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "value", title: "Số liệu", type: "string" }), defineField({ name: "label", title: "Nhãn", type: "string" })] })] }),
      defineField({ name: "testimonials", title: "Đánh giá khách hàng", type: "array", fieldset: "trust", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "name", title: "Tên", type: "string" }), defineField({ name: "role", title: "Vai trò / địa điểm", type: "string" }), defineField({ name: "quote", title: "Nội dung", type: "text" })] })] }),
      defineField({ name: "services", title: "6 card dịch vụ", description: "Mỗi card gồm tiêu đề, nhãn, mô tả và ảnh preview/upload.", type: "array", fieldset: "services", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "Tiêu đề", type: "string" }), defineField({ name: "tag", title: "Nhãn", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] })] }),
      defineField({ name: "anatomy", title: "Nội dung và ảnh cấu tạo", type: "object", fieldset: "anatomy", fields: [defineField({ name: "title", title: "Tiêu đề", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } }), defineField({ name: "panelTypes", title: "Các loại panel", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "name", title: "Tên loại panel", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" })] })] })] }),
      defineField({ name: "processFeature", title: "Ảnh chính quy trình", type: "object", fieldset: "process", fields: [defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] }),
      defineField({ name: "processSteps", title: "7 ảnh và bước triển khai", type: "array", fieldset: "process", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "Tên bước", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] })] }),
      defineField({ name: "projects", title: "6 dự án", type: "array", fieldset: "projects", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "Tiêu đề", type: "string" }), defineField({ name: "category", title: "Danh mục", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), defineField({ name: "image", title: "Ảnh mới tải lên", type: "image", options: { hotspot: true } }), defineField({ name: "imageUrl", title: "Ảnh Cloudinary hiện tại", type: "string", components: { input: CloudinaryImageInput } })] })] }),
      defineField({ name: "videos", title: "6 video", description: "Video hiện có sẽ hiện preview. Chọn file mới để upload trực tiếp lên Cloudinary.", type: "array", fieldset: "videos", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "Tiêu đề", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), defineField({ name: "url", title: "Video Cloudinary", type: "string", components: { input: CloudinaryVideoInput } })] })] }),
      defineField({ name: "pricing", title: "Các gói giá", type: "array", fieldset: "pricing", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "name", title: "Tên gói", type: "string" }), defineField({ name: "price", title: "Mức giá", type: "string" }), defineField({ name: "note", title: "Ghi chú", type: "text" })] })] }),
      defineField({ name: "faqs", title: "Câu hỏi và câu trả lời", type: "array", fieldset: "faq", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "question", title: "Câu hỏi", type: "string" }), defineField({ name: "answer", title: "Câu trả lời", type: "text" })] })] }),
      defineField({ name: "footerDescription", title: "Mô tả footer (dự phòng)", description: "Ưu tiên chỉnh Mô tả footer trong Thông tin doanh nghiệp.", type: "text", fieldset: "footer" }),
      defineField({ name: "seoTitle", title: "SEO title", type: "string", fieldset: "seo" }),
      defineField({ name: "seoDescription", title: "SEO description", type: "text", fieldset: "seo" })
    ] })
  ] }
});
