import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN. Add it to .env before running this migration.");

const client = createClient({ projectId: "syr5q4gg", dataset: "production", apiVersion: "2026-07-28", token, useCdn: false });
const fallbackPages = {
  anatomy: { title: "Cấu tạo tấm panel cách nhiệt", lead: "Tìm hiểu lớp tôn, lõi cách nhiệt và cấu hình phù hợp công năng." },
  process: { title: "7 bước triển khai nhà panel", lead: "Theo dõi từng công đoạn từ khảo sát đến bảo hành." },
  projects: { title: "Dự án nhà panel tham khảo", lead: "Xem thêm hình ảnh và thông tin công trình theo từng nhu cầu." },
  pricing: { title: "Báo giá nhà tiền chế panel", lead: "Các gói giá tham khảo và phạm vi vật tư, thi công." }
};

const home = await client.fetch(`*[_id == "homePage"][0]{detailPages}`);
for (const [pageKey, fallback] of Object.entries(fallbackPages)) {
  const legacy = home?.detailPages?.[pageKey] || {};
  const id = `servicePage-${pageKey}`;
  await client.createIfNotExists({ _id: id, _type: "servicePage", pageKey, title: legacy.title || fallback.title, lead: legacy.lead || fallback.lead, body: legacy.body || [], ctaLabel: legacy.ctaLabel || "Nhận tư vấn theo nhu cầu", ctaHref: legacy.ctaHref || "/#lien-he" });
  console.log(`Ensured ${id}.`);
}
