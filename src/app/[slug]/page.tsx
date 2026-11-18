import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { getArticle, getArticles, listingOf, metaTitle, type Article } from "@/content/articles";
import { imageSize } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";

// Mismas URLs que WordPress: /<slug>/. Solo se generan los artículos existentes; el resto es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

/** Primer párrafo con texto suficiente, sin etiquetas, recortado para la meta descripción. */
function describe(article: Article): string {
  const paragraphs = [...article.body.matchAll(/<p[^>]*>(.*?)<\/p>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .filter((text) => text.length >= 60);
  const text = paragraphs[0] ?? article.title;
  if (text.length <= 160) return text;
  return text.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const { width, height } = imageSize(article.heroImage);
  const title = metaTitle(article);
  return pageMetadata({
    title,
    description: describe(article),
    path: `/${article.slug}/`,
    image: { url: article.heroImage, width, height, alt: title },
  });
}

export default async function ArticlePage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const back = listingOf(article.slug);
  const meta = [article.dateLabel, article.categories.join(", ")].filter(Boolean).join(" | ");

  return (
    <>
      <PageHero image={article.heroImage} title={article.heroTitle} subtitle={article.heroSubtitle} visible />
      <div className="px-4 py-8 sm:px-6 md:py-16">
        <article className="mx-auto max-w-4xl rounded-3xl border border-gray-200/70 bg-white p-5 shadow-xl sm:p-8 md:p-12">
          <div className="mb-10 border-b border-gray-100 pb-6 text-center">
            {meta && (
              <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-gray-600">
                {article.dateLabel && <time className="font-semibold text-cimas-ink tabular-nums">{article.dateLabel}</time>}
                {article.dateLabel && article.categories.length > 0 && (
                  <span aria-hidden="true" className="h-3.5 w-px bg-cimas-gold/70" />
                )}
                {article.categories.length > 0 && <span>{article.categories.join(", ")}</span>}
              </p>
            )}
            <h2 className="mt-3 mb-3 text-title text-cimas-ink">{article.title}</h2>
            {article.subtitle && (
              <h3 className="font-serif text-lead font-normal text-cimas-blue-aa italic">{article.subtitle}</h3>
            )}
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-cimas-blue" />
          </div>

          <Prose html={article.body} className="text-gray-700" />

          <div className="mt-12 text-center">
            <Link
              href={back.href}
              className="inline-flex items-center gap-2 text-base font-semibold text-cimas-blue-aa hover:underline"
            >
              <ArrowLeftIcon className="size-4" />
              Volver a {back.label}
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
