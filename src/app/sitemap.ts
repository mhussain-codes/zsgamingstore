import { MetadataRoute } from "next";
import { initialProducts, initialPCBuilds, initialCategories, initialBuyingGuides } from "@/data/initialData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zsgaming.pk";

  const staticPages = [
    "",
    "/builds",
    "/pc-builder",
    "/compare",
    "/cart",
    "/checkout",
    "/track",
    "/about",
    "/contact",
    "/quote",
    "/faq",
    "/warranty",
    "/delivery",
    "/returns",
    "/privacy",
    "/guides",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const categoryPages = initialCategories.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const productPages = initialProducts.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const buildPages = initialPCBuilds.map((b) => ({
    url: `${baseUrl}/builds/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.95,
  }));

  const guidePages = initialBuyingGuides.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...buildPages, ...productPages, ...guidePages];
}
