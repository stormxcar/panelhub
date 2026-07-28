import type { MetadataRoute } from "next";
import { site } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${site.url}/chinh-sach-bao-mat`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${site.url}/dieu-khoan-su-dung`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];
}
