import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/login`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteConfig.url}/register`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
