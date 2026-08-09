import { sanityClient } from "./sanity";
import type { RichTextValue } from "../components/RichText";

export type LegalPageData = { title: string; lead?: string; sections: { _key?: string; heading: string; body?: string; richBody?: RichTextValue }[]; seoTitle?: string; seoDescription?: string; _updatedAt?: string };

export async function getLegalPage(slug: string, pageKey?: "privacy" | "terms"): Promise<LegalPageData | null> {
  try {
    return await sanityClient.fetch<LegalPageData | null>(
      `*[_type == "legalPage" && (slug.current == $slug || pageKey == $pageKey)][0]{_updatedAt,title,lead,sections[]{_key,heading,body,"richBody":richBody[]{...,_type == "contentImage" => {...,"imageUrl":coalesce(imageUrl,image.asset->url)}}},seoTitle,seoDescription}`,
      { slug, pageKey: pageKey ?? "" },
      { next: { revalidate: 3600, tags: ["sanity-legal"] } }
    );
  } catch { return null; }
}
