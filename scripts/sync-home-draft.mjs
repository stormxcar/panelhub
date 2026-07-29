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

const published = await client.getDocument("homePage");
if (!published) {
  throw new Error("Published homePage does not exist.");
}

const { _rev, _createdAt, _updatedAt, ...content } = published;
await client.createOrReplace({ ...content, _id: "drafts.homePage" });

const draft = await client.fetch(`*[_id == "drafts.homePage"][0]{heroImages,services,anatomy,processSteps,projects,videos,faqs}`);
if (draft.heroImages?.length !== 4 || draft.services?.length !== 6 || !draft.anatomy?.imageUrl || draft.processSteps?.length !== 7 || draft.projects?.length !== 6 || draft.videos?.length !== 6 || draft.faqs?.length !== 15) {
  throw new Error("Draft verification failed.");
}

console.log("Draft homePage created and verified with all current editable content.");
