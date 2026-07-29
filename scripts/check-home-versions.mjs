import { createClient } from "@sanity/client";

if (!process.env.SANITY_API_WRITE_TOKEN) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN.");
}

const client = createClient({
  projectId: "syr5q4gg",
  dataset: "production",
  apiVersion: "2026-07-28",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  perspective: "raw"
});

const documents = await client.fetch(`*[_id in ["homePage", "drafts.homePage"]]{_id,heroImages,services,anatomy,processSteps,projects,videos,faqs}`);
console.log(JSON.stringify(documents.map((document) => ({
  id: document._id,
  hero: document.heroImages?.length || 0,
  services: document.services?.length || 0,
  anatomy: Boolean(document.anatomy?.imageUrl),
  process: document.processSteps?.length || 0,
  projects: document.projects?.length || 0,
  videos: document.videos?.length || 0,
  faqs: document.faqs?.length || 0
})), null, 2));
