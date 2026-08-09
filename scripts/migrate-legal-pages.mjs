import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN. Add it to .env before running this migration.");

const client = createClient({ projectId: "syr5q4gg", dataset: "production", apiVersion: "2026-07-28", token, useCdn: false });
const pages = await client.fetch(`*[_type == "legalPage"]{_id,title,slug,sections[]{_key,heading,body,richBody}}`);

for (const page of pages) {
  const slug = page.slug?.current;
  const pageKey = slug === "chinh-sach-bao-mat" || page._id === "legal-privacy" ? "privacy" : slug === "dieu-khoan-su-dung" || page._id === "legal-terms" ? "terms" : undefined;
  const sections = (page.sections || []).map((section, index) => ({
    ...section,
    _key: section._key || `legal-${index + 1}`,
    richBody: section.richBody?.length ? section.richBody : section.body ? [{ _key: `body-${index + 1}`, _type: "block", style: "normal", markDefs: [], children: [{ _key: `span-${index + 1}`, _type: "span", marks: [], text: section.body }] }] : []
  }));
  if (!pageKey) {
    console.warn(`Skipped ${page._id}: choose “Loại trang pháp lý” manually in Studio because its slug is not recognised.`);
    continue;
  }
  await client.patch(page._id).set({ pageKey, sections }).commit();
  console.log(`Migrated ${page._id} as ${pageKey}.`);
}
