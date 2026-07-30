import { readFile } from "node:fs/promises";
import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN. Load .env before running this migration.");
}

const source = await readFile(new URL("../components/MaterialBrands.tsx", import.meta.url), "utf8");
const match = source.match(/export const fallbackMaterialBrands: MaterialBrand\[\] = (\[[\s\S]*?\n\]);/);

if (!match) {
  throw new Error("Could not read fallback material brand data.");
}

const materialBrands = Function(`return ${match[1]}`)().map((brand) => ({
  _key: brand.id,
  name: brand.name,
  logoUrl: brand.logo,
  category: brand.category,
  summary: brand.summary,
  material: brand.material,
  benefit: brand.benefit
}));

if (materialBrands.length !== 14) {
  throw new Error(`Expected 14 material brands, received ${materialBrands.length}.`);
}

const client = createClient({
  projectId: "syr5q4gg",
  dataset: "production",
  apiVersion: "2026-07-28",
  token,
  useCdn: false
});

const query = `*[_id == "homePage" || _id == "drafts.homePage"]{_id,materialBrands}`;
const documents = await client.fetch(query);

if (documents.length === 0) {
  throw new Error("Missing homePage singleton. Create it in Studio before importing material brands.");
}

for (const document of documents) {
  await client.patch(document._id).setIfMissing({ materialBrands }).commit();
}

const verification = await client.fetch(query);

if (verification.some((document) => document.materialBrands?.length !== 14)) {
  throw new Error("Material brand import verification failed.");
}

console.log(`Imported 14 material brands into ${verification.map((document) => `${document._id}:${document.materialBrands.length}`).join(", ")}.`);
