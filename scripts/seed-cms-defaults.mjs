import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN. Load .env before running this migration.");
}

const client = createClient({
  projectId: "syr5q4gg",
  dataset: "production",
  apiVersion: "2026-07-28",
  token,
  useCdn: false
});

const homeDefaults = {
  heroCtaLabel: "Nhận tư vấn",
  heroCtaHref: "#lien-he",
  stats: [
    { _key: "stat-projects", value: "200+", label: "Công trình đã triển khai" },
    { _key: "stat-experience", value: "10+", label: "Năm kinh nghiệm" },
    { _key: "stat-satisfaction", value: "98%", label: "Khách hàng hài lòng" },
    { _key: "stat-response", value: "24h", label: "Phản hồi báo giá sơ bộ" }
  ],
  testimonials: [
    { _key: "testimonial-minh", name: "Anh Minh", role: "Chủ xưởng cơ khí, Bình Dương", quote: "Tiến độ rõ ràng, đội thi công phối hợp tốt nên xưởng sớm đi vào hoạt động." },
    { _key: "testimonial-huong", name: "Chị Hương", role: "Chủ homestay, Đồng Nai", quote: "Phương án panel giúp rút ngắn phần xây dựng và vẫn đảm bảo không gian sáng, sạch." },
    { _key: "testimonial-phuc", name: "Anh Phúc", role: "Quản lý kho lạnh, TP.HCM", quote: "Đội ngũ tư vấn kỹ về panel PU và xử lý mối nối trước khi triển khai." }
  ],
  seoTitle: "Nhà tiền chế tấm panel | Thi công nhanh, báo giá minh bạch",
  seoDescription: "Thi công nhà tiền chế tấm panel trọn gói: tư vấn, thiết kế, thi công nhanh 7-45 ngày, báo giá rõ theo m2 cho nhà ở, nhà xưởng, kho lạnh, văn phòng."
};

const settingsDefaults = {
  workingHours: "Thứ 2 - Thứ 7: 7:30 - 17:30",
  taxCode: "0123456789",
  zaloUrl: "https://zalo.me/0946657257",
  messengerUrl: "https://m.me/your-page",
  facebookUrl: "https://facebook.com/paned",
  youtubeUrl: "https://youtube.com/@paned",
  tiktokUrl: "https://tiktok.com/@paned",
  mapUrl: "https://maps.google.com"
};

const homeDocuments = await client.fetch(`*[_id in ["homePage", "drafts.homePage"]]{_id}`);
if (!homeDocuments.some((document) => document._id === "homePage")) {
  throw new Error("Missing homePage singleton. Create it in Studio before running this migration.");
}

for (const document of homeDocuments) {
  await client.patch(document._id).setIfMissing(homeDefaults).commit();
}

const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`);
if (!settings?._id) {
  throw new Error("Missing siteSettings singleton. Create it in Studio before running this migration.");
}
await client.patch(settings._id).setIfMissing(settingsDefaults).commit();

const verification = await client.fetch(`{
  "home": *[_id == "homePage"][0]{heroCtaLabel,heroCtaHref,stats[]{_key,value,label},testimonials[]{_key,name,role,quote},seoTitle,seoDescription},
  "settings": *[_id == $settingsId][0]{workingHours,taxCode,zaloUrl,messengerUrl,facebookUrl,youtubeUrl,tiktokUrl,mapUrl}
}`, { settingsId: settings._id });

if (!verification.home?.heroCtaLabel || verification.home.stats?.length !== 4 || verification.home.testimonials?.length !== 3 || !verification.home.seoTitle || !verification.settings?.zaloUrl) {
  throw new Error("CMS default verification failed.");
}

console.log("Seeded missing CMS defaults without overwriting existing content.");
