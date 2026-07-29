import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "syr5q4gg",
  dataset: "production",
  apiVersion: "2026-07-28",
  useCdn: true
});

export type ManagedHome = {
  heroTitle?: string; heroDescription?: string;
  heroImages?: { label?: string; imageUrl?: string }[];
  services?: { title: string; tag?: string; description: string; imageUrl?: string }[];
  anatomy?: { title?: string; description?: string; imageUrl?: string };
  processFeature?: { imageUrl?: string };
  processSteps?: { title: string; description: string; imageUrl?: string }[];
  projects?: { title: string; category?: string; description: string; imageUrl?: string }[];
  faqs?: { question: string; answer: string }[];
  videos?: { title: string; url: string; description?: string }[];
  pricing?: { name: string; price: string; note: string }[];
  footerDescription?: string; seoTitle?: string; seoDescription?: string;
};

export type ManagedSiteSettings = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  logoTextUrl?: string;
  logoMarkUrl?: string;
  footerDescription?: string;
};

const siteSettingsQuery = `*[_type == "siteSettings"][0]{name,phone,email,address,footerDescription,"logoTextUrl":coalesce(logoText.asset->url,logoTextUrl),"logoMarkUrl":coalesce(logoMark.asset->url,logoMarkUrl)}`;

export async function getManagedSiteSettings(): Promise<ManagedSiteSettings | null> {
  try {
    return await sanityClient.fetch<ManagedSiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 3600, tags: ["sanity-site-settings"] } }
    );
  } catch {
    return null;
  }
}

export async function getManagedHome(): Promise<ManagedHome | null> {
  try {
    return await sanityClient.fetch<ManagedHome | null>(
      `*[_type == "homePage"][0]{heroTitle,heroDescription,heroImages[]{label,"imageUrl":coalesce(image.asset->url,imageUrl)},services[]{title,tag,description,"imageUrl":coalesce(image.asset->url,imageUrl)},anatomy{title,description,"imageUrl":coalesce(image.asset->url,imageUrl)},processFeature{"imageUrl":coalesce(image.asset->url,imageUrl)},processSteps[]{title,description,"imageUrl":coalesce(image.asset->url,imageUrl)},projects[]{title,category,description,"imageUrl":coalesce(image.asset->url,imageUrl)},faqs[]{question,answer},videos[]{title,url,description},pricing[]{name,price,note},footerDescription,seoTitle,seoDescription}`,
      {},
      { next: { revalidate: 3600, tags: ["sanity-home"] } }
    );
  } catch {
    return null;
  }
}
