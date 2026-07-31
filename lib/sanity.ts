import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "syr5q4gg",
  dataset: "production",
  apiVersion: "2026-07-28",
  useCdn: false
});

export type ManagedHome = {
  _updatedAt?: string;
  heroTitle?: string; heroDescription?: string;
  heroImages?: { _key?: string; label?: string; imageUrl?: string }[];
  heroCtaLabel?: string; heroCtaHref?: string;
  stats?: { _key?: string; value?: string; label?: string }[];
  materialBrands?: { _key?: string; name?: string; logoUrl?: string; category?: string; summary?: string; material?: string; benefit?: string }[];
  testimonials?: { _key?: string; name?: string; role?: string; quote?: string }[];
  services?: { title: string; tag?: string; description: string; imageUrl?: string }[];
  anatomy?: { title?: string; description?: string; imageUrl?: string; panelTypes?: { _key?: string; name?: string; description?: string }[] };
  processFeature?: { imageUrl?: string };
  processSteps?: { title: string; description: string; imageUrl?: string }[];
  projects?: { title: string; category?: string; description: string; imageUrl?: string }[];
  faqs?: { question: string; answer: string }[];
  videos?: { _key?: string; title: string; url: string; description?: string; captionUrl?: string }[];
  pricing?: { name: string; price: string; note: string }[];
  footerDescription?: string; seoTitle?: string; seoDescription?: string;
};

export type ManagedSiteSettings = {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  workingHours?: string;
  taxCode?: string;
  zaloUrl?: string;
  messengerUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  mapUrl?: string;
  logoTextUrl?: string;
  logoMarkUrl?: string;
  footerDescription?: string;
};

const siteSettingsQuery = `*[_type == "siteSettings"][0]{name,phone,email,address,workingHours,taxCode,zaloUrl,messengerUrl,facebookUrl,youtubeUrl,tiktokUrl,mapUrl,footerDescription,"logoTextUrl":coalesce(logoText.asset->url,logoTextUrl),"logoMarkUrl":coalesce(logoMark.asset->url,logoMarkUrl)}`;

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
      `*[_type == "homePage"][0]{_updatedAt,heroTitle,heroDescription,heroCtaLabel,heroCtaHref,heroImages[]{_key,label,"imageUrl":coalesce(imageCloudinaryUrl,image.asset->url,imageUrl)},stats[]{_key,value,label},materialBrands[]{_key,name,"logoUrl":coalesce(logo.asset->url,logoUrl),category,summary,material,benefit},testimonials[]{_key,name,role,quote},services[]{_key,title,tag,description,"imageUrl":coalesce(imageCloudinaryUrl,image.asset->url,imageUrl)},anatomy{title,description,"imageUrl":coalesce(imageCloudinaryUrl,image.asset->url,imageUrl),panelTypes[]{_key,name,description}},processFeature{"imageUrl":coalesce(imageCloudinaryUrl,image.asset->url,imageUrl)},processSteps[]{_key,title,description,"imageUrl":coalesce(imageCloudinaryUrl,image.asset->url,imageUrl)},projects[]{_key,title,category,description,"imageUrl":coalesce(imageCloudinaryUrl,image.asset->url,imageUrl)},faqs[]{_key,question,answer},videos[]{_key,title,url,description,captionUrl},pricing[]{_key,name,price,note},footerDescription,seoTitle,seoDescription}`,
      {},
      { next: { revalidate: 3600, tags: ["sanity-home"] } }
    );
  } catch {
    return null;
  }
}
