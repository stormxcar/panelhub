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
    defineType({ name: "siteSettings", title: "Thông tin doanh nghiệp", type: "document", fields: [
      defineField({ name: "name", title: "Tên thương hiệu", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "phone", title: "Số điện thoại", type: "string" }),
      defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.email() }),
      defineField({ name: "address", title: "Địa chỉ", type: "string" })
    ] }),
    defineType({ name: "homePage", title: "Trang chủ", type: "document", fields: [
      defineField({ name: "heroTitle", title: "Tiêu đề hero", type: "string" }),
      defineField({ name: "heroDescription", title: "Mô tả hero", type: "text" }),
      defineField({ name: "heroImages", title: "Ảnh hero", type: "array", of: [{ type: "image", options: { hotspot: true } }] })
    ] })
  ] }
});
