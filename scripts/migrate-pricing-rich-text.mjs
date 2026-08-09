import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN. Add it to .env before running this migration.");

const client = createClient({ projectId: "syr5q4gg", dataset: "production", apiVersion: "2026-07-28", token, useCdn: false });
const documents = await client.fetch(`*[_id in ["homePage", "drafts.homePage"]]{_id,pricing[]{_key,note,details}}`);

for (const document of documents) {
  const pricing = (document.pricing || []).map((item, index) => ({
    ...item,
    _key: item._key || `price-${index + 1}`,
    details: item.details?.length ? item.details : item.note ? [{ _key: `price-body-${index + 1}`, _type: "block", style: "normal", markDefs: [], children: [{ _key: `price-span-${index + 1}`, _type: "span", marks: [], text: item.note }] }] : []
  }));
  await client.patch(document._id).set({ pricing }).commit();
}

console.log(`Migrated rich pricing content for ${documents.length} home document(s).`);
