import Link from "next/link";
import type { ListingCard } from "@/content/articles";
import { ArrowRightIcon } from "./icons";
import { Cover } from "./Photo";

/** Toda la tarjeta es el área de toque (enlace "estirado"), no solo el texto "Leer más". */
export function ArticleCard({
  card,
  accentMeta = false,
  ordinal = null,
}: {
  card: ListingCard;
  accentMeta?: boolean;
  /** Número de orden del encuentro (4.º, 10.º…): se muestra como ficha sobre la imagen. */
  ordinal?: number | null;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm transition duration-300 ease-out-quint hover:-translate-y-1 hover:shadow-xl active:scale-[0.99] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cimas-blue-aa">
      <div className="relative h-52 w-full overflow-hidden sm:h-56">
        <Cover
          src={card.image}
          alt={card.imageAlt}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          className="transition duration-700 ease-out-quint group-hover:scale-105"
        />
        {ordinal !== null && (
          <span
            aria-hidden="true"
            className="glass-dark absolute top-3 left-3 z-10 rounded-full px-3.5 py-1.5 font-serif text-lg leading-none font-bold tabular-nums"
          >
            {ordinal}.º
          </span>
        )}
      </div>
      <div className="flex flex-grow flex-col p-5 sm:p-6">
        <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <time className={`font-semibold tabular-nums ${accentMeta ? "text-cimas-blue-aa" : "text-cimas-ink"}`}>{card.date}</time>
          {card.categories.length > 0 && (
            <>
              <span aria-hidden="true" className="h-3.5 w-px bg-cimas-gold/70" />
              <span className="text-gray-500">{card.categories.join(", ")}</span>
            </>
          )}
        </p>
        <h3 className="mb-3 text-heading text-cimas-ink transition-colors duration-300 group-hover:text-cimas-blue-aa">
          {card.title}
        </h3>
        <p className="mb-6 line-clamp-4 flex-grow text-sm leading-relaxed text-gray-600 sm:text-justify">{card.excerpt}</p>
        {card.slug && (
          <Link
            href={`/${card.slug}/`}
            aria-label={`Leer más: ${card.title}`}
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-cimas-blue-aa outline-none after:absolute after:inset-0"
          >
            Leer más
            <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
  );
}
