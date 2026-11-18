import fs from "node:fs";
import path from "node:path";
import coloquios from "./listing-coloquios.json";
import noticias from "./listing-noticias.json";

export type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  heroTitle: string;
  heroSubtitle?: string;
  heroImage: string;
  dateLabel: string | null;
  categories: string[];
  /** HTML semántico (ver .prose-cimas en globals.css). Contenido propio del repo, no entrada de usuarios. */
  body: string;
};

export type ListingCard = {
  /** null cuando la tarjeta no tiene página propia. */
  slug: string | null;
  title: string;
  date: string;
  categories: string[];
  image: string;
  imageAlt: string;
  excerpt: string;
};

export type Listing = {
  heroImage: string;
  heading: string | null;
  cards: ListingCard[];
};

const ARTICLES_DIR = path.join(process.cwd(), "src", "content", "articles");

function readArticles(): Article[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8")) as Article);
}

let cache: Article[] | undefined;

export function getArticles(): Article[] {
  // En producción (build) se lee una sola vez. En desarrollo se relee en cada petición: los JSON se leen con
  // `fs`, así que la recarga en caliente no los ve y sin esto los cambios de contenido no aparecerían.
  if (process.env.NODE_ENV !== "production") return readArticles();
  cache ??= readArticles();
  return cache;
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export const NOTICIAS: Listing = noticias;
export const COLOQUIOS: Listing = coloquios;

/** "10º Encuentro…", "9no Encuentro…", "12° reunión…" -> 10, 9, 12. Solo encuentros/reuniones numerados. */
export function parseOrdinal(title: string): number | null {
  const match = /^(\d+)\s*(?:[º°]|er|do|ro|to|mo|vo|no)(?=\s)/i.exec(title);
  return match && /encuentro|reuni[oó]n/i.test(title) ? Number(match[1]) : null;
}

/** Título para <title>/metadatos: el del listado (más descriptivo) o, en su defecto, el del banner. */
export function metaTitle(article: Article): string {
  const card = [...NOTICIAS.cards, ...COLOQUIOS.cards].find((c) => c.slug === article.slug);
  return card?.title ?? article.heroTitle;
}

/** A qué listado pertenece un artículo (define el enlace "Volver a…"). */
export function listingOf(slug: string): { href: string; label: string } {
  if (COLOQUIOS.cards.some((c) => c.slug === slug)) return { href: "/coloquios/", label: "Encuentros" };
  return { href: "/noticias/", label: "Noticias" };
}
