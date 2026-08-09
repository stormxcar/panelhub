import type { MetadataRoute } from "next";
import { getLegalPage } from "../lib/legal";
import { getManagedArticles, getManagedHome } from "../lib/sanity";
import { site } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [home, privacy, terms, articles] = await Promise.all([
    getManagedHome(),
    getLegalPage("chinh-sach-bao-mat"),
    getLegalPage("dieu-khoan-su-dung"),
    getManagedArticles()
  ]);

  return [
    {
      url: site.url,
      lastModified: home?._updatedAt,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${site.url}/chinh-sach-bao-mat`,
      lastModified: privacy?._updatedAt,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${site.url}/dieu-khoan-su-dung`,
      lastModified: terms?._updatedAt,
      changeFrequency: "yearly",
      priority: 0.3
    },
    { url: `${site.url}/bai-viet`, changeFrequency: "weekly", priority: 0.7 },
    ...articles.map((article) => ({ url: `${site.url}/bai-viet/${article.slug}`, lastModified: article._updatedAt || article.publishedAt, changeFrequency: "monthly" as const, priority: 0.6 }))
  ];
}
