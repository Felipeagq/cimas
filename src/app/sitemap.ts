import type { MetadataRoute } from "next";
import { getArticles } from "@/content/articles";
import { SITE, STATIC_ROUTES } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = STATIC_ROUTES.map((path) => ({ url: `${SITE.url}${path}`, priority: path === "/" ? 1 : 0.8 }));
  const articles = getArticles().map((a) => ({ url: `${SITE.url}/${a.slug}/`, priority: 0.5 }));
  return [...pages, ...articles];
}
