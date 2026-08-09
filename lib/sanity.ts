import { createClient } from "next-sanity";
import type { ConsultationFormSettings } from "./consultation/types";
import type { RichTextValue } from "../components/RichText";

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
  planningBenefits?: { _key?: string; title?: string; description?: string; checkpoints?: string[] }[];
  services?: { title: string; tag?: string; description: string; imageUrl?: string }[];
  anatomy?: { title?: string; description?: string; imageUrl?: string; panelTypes?: { _key?: string; name?: string; description?: string }[] };
  processFeature?: { imageUrl?: string };
  processSteps?: { title: string; description: string; imageUrl?: string }[];
  projects?: { title: string; category?: string; description: string; imageUrl?: string }[];
  faqs?: { question: string; answer: string }[];
  videos?: { _key?: string; title: string; url: string; description?: string; captionUrl?: string }[];
  pricing?: { name: string; price: string; note?: string; details?: RichTextValue }[];
  detailPages?: { anatomy?: DetailPageContent; process?: DetailPageContent; projects?: DetailPageContent; pricing?: DetailPageContent };
  footerDescription?: string; seoTitle?: string; seoDescription?: string;
};
export type DetailPageContent = { title?: string; lead?: string; body?: RichTextValue; ctaLabel?: string; ctaHref?: string };

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

const siteSettingsQuery = `*[_type == "siteSettings"][0]{name,phone,email,address,workingHours,taxCode,zaloUrl,messengerUrl,facebookUrl,youtubeUrl,tiktokUrl,mapUrl,footerDescription,"logoTextUrl":coalesce(logoTextUrl,logoText.asset->url),"logoMarkUrl":coalesce(logoMarkUrl,logoMark.asset->url)}`;

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
      `*[_type == "homePage"][0]{_updatedAt,heroTitle,heroDescription,heroCtaLabel,heroCtaHref,heroImages[]{_key,label,"imageUrl":coalesce(imageUrl,imageCloudinaryUrl,image.asset->url)},stats[]{_key,value,label},materialBrands[]{_key,name,"logoUrl":coalesce(logoUrl,logo.asset->url),category,summary,material,benefit},testimonials[]{_key,name,role,quote},planningBenefits[]{_key,title,description,checkpoints},services[]{_key,title,tag,description,"imageUrl":coalesce(imageUrl,imageCloudinaryUrl,image.asset->url)},anatomy{title,description,"imageUrl":coalesce(imageUrl,imageCloudinaryUrl,image.asset->url),panelTypes[]{_key,name,description}},processFeature{"imageUrl":coalesce(imageUrl,imageCloudinaryUrl,image.asset->url)},processSteps[]{_key,title,description,"imageUrl":coalesce(imageUrl,imageCloudinaryUrl,image.asset->url)},projects[]{_key,title,category,description,"imageUrl":coalesce(imageUrl,imageCloudinaryUrl,image.asset->url)},faqs[]{_key,question,answer},videos[]{_key,title,url,description,captionUrl},pricing[]{_key,name,price,note,details},detailPages{anatomy{title,lead,body,ctaLabel,ctaHref},process{title,lead,body,ctaLabel,ctaHref},projects{title,lead,body,ctaLabel,ctaHref},pricing{title,lead,body,ctaLabel,ctaHref}},footerDescription,seoTitle,seoDescription}`,
      {},
      { next: { revalidate: 3600, tags: ["sanity-home"] } }
    );
  } catch {
    return null;
  }
}

export type ManagedArticle = {
  _id: string;
  _updatedAt?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl?: string;
  body?: RichTextValue;
  tags?: string[];
  featured?: boolean;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
};

const articleFields = `_id,_updatedAt,title,"slug":slug.current,excerpt,coverImageUrl,body,tags,featured,publishedAt,seoTitle,seoDescription`;

export async function getManagedArticles(): Promise<ManagedArticle[]> {
  try {
    return await sanityClient.fetch<ManagedArticle[]>(`*[_type == "article" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc){${articleFields}}`, {}, { next: { revalidate: 3600, tags: ["sanity-articles"] } });
  } catch {
    return [];
  }
}

export async function getManagedArticle(slug: string): Promise<ManagedArticle | null> {
  try {
    return await sanityClient.fetch<ManagedArticle | null>(`*[_type == "article" && slug.current == $slug][0]{${articleFields}}`, { slug }, { next: { revalidate: 3600, tags: ["sanity-articles"] } });
  } catch {
    return null;
  }
}

export async function getRelatedArticles(slug: string, tags: string[] = []): Promise<ManagedArticle[]> {
  try { return await sanityClient.fetch<ManagedArticle[]>(`*[_type == "article" && slug.current != $slug && defined(slug.current) && count(tags[@ in $tags]) > 0] | order(coalesce(publishedAt,_createdAt) desc)[0...3]{${articleFields}}`, { slug, tags }, { next: { revalidate: 3600, tags: ["sanity-articles"] } }); } catch { return []; }
}

const consultationFormSettingsQuery = `*[_type == "consultationFormSettings"][0]{eyebrow,heading,description,hotline,displayEmail,commitmentText,nameLabel,namePlaceholder,phoneLabel,phonePlaceholder,requirementLabel,requirementPlaceholder,submitButtonText,callButtonText,drawingButtonText,notificationEmail,emailSubjectPrefix,successMessage,errorMessage,validationMessage,isEnabled,enableDrawingUpload,enableGoogleSheets,enableEmailNotification}`;

export async function getConsultationFormSettings(): Promise<ConsultationFormSettings | null> {
  try {
    return await sanityClient.fetch<ConsultationFormSettings | null>(consultationFormSettingsQuery, {}, { next: { revalidate: 3600, tags: ["sanity-consultation-form"] } });
  } catch {
    return null;
  }
}
