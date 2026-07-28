import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "syr5q4gg",
  dataset: "production",
  apiVersion: "2026-07-28",
  useCdn: true
});

export type ManagedHome = {
  heroTitle?: string; heroDescription?: string;
  services?: { title: string; description: string }[];
  processSteps?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  videos?: { title: string; url: string; description?: string }[];
  pricing?: { name: string; price: string; note: string }[];
  footerDescription?: string; seoTitle?: string; seoDescription?: string;
};

export async function getManagedHome(): Promise<ManagedHome | null> {
  try {
    return await sanityClient.fetch<ManagedHome | null>(
      `*[_type == "homePage"][0]{heroTitle, heroDescription, services[]{title,description}, processSteps[]{title,description}, faqs[]{question,answer}, videos[]{title,url,description}, pricing[]{name,price,note}, footerDescription, seoTitle, seoDescription}`,
      {},
      { next: { revalidate: 3600, tags: ["sanity-home"] } }
    );
  } catch {
    return null;
  }
}
