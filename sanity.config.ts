import { defineConfig, defineField, defineType } from "sanity";
import { structureTool } from "sanity/structure";

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
    defineType({ name: "homePage", title: "Trang chủ", type: "document", initialValue: { heroTitle: "Nhà tiền chế tấm panel", heroDescription: "Giải pháp xây dựng hiện đại, triển khai gọn và phù hợp nhu cầu sử dụng thực tế." }, fields: [
      defineField({ name: "heroTitle", title: "Tiêu đề hero", type: "string" }),
      defineField({ name: "heroDescription", title: "Mô tả hero", type: "text" }),
      defineField({ name: "heroImages", title: "Ảnh hero", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
      defineField({ name: "services", title: "Dịch vụ", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "image", type: "image" })] }] }),
      defineField({ name: "faqs", title: "Câu hỏi thường gặp", type: "array", of: [{ type: "object", fields: [defineField({ name: "question", type: "string" }), defineField({ name: "answer", type: "text" })] }] }),
      defineField({ name: "videos", title: "Video", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "url", type: "url" })] }] }),
      defineField({ name: "processSteps", title: "Quy trình", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", title: "Bước", type: "string" }), defineField({ name: "description", title: "Mô tả", type: "text" }), defineField({ name: "imageUrl", title: "URL ảnh", type: "url" })] }] }),
      defineField({ name: "projects", title: "Dự án", type: "array", of: [{ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "category", type: "string" }), defineField({ name: "description", type: "text" }), defineField({ name: "imageUrl", title: "URL ảnh", type: "url" })] }] }),
      defineField({ name: "pricing", title: "Bảng giá", type: "array", of: [{ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "price", type: "string" }), defineField({ name: "note", type: "text" })] }] }),
      defineField({ name: "footerDescription", title: "Mô tả footer", type: "text" }),
      defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
      defineField({ name: "seoDescription", title: "SEO description", type: "text" })
    ] })
  ] }
});
