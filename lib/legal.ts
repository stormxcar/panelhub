import { sanityClient } from "./sanity";

export type LegalPageData = { title: string; lead?: string; sections: { heading: string; body: string }[] };

export async function getLegalPage(slug: string): Promise<LegalPageData | null> {
  try {
    return await sanityClient.fetch<LegalPageData | null>(
      `*[_type == "legalPage" && slug.current == $slug][0]{title,lead,sections[]{heading,body}}`,
      { slug },
      { next: { revalidate: 3600, tags: ["sanity-legal"] } }
    );
  } catch { return null; }
}
