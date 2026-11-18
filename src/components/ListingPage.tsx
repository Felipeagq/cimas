import { parseOrdinal, type Listing } from "@/content/articles";
import { ArticleCard } from "./ArticleCard";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

/** Listado de tarjetas de artículos (Coloquios, Noticias). */
export function ListingPage({
  title,
  listing,
  accentMeta = false,
  ordinals = false,
}: {
  title: string;
  listing: Listing;
  accentMeta?: boolean;
  /** Muestra el número de orden en los encuentros numerados (Coloquios). */
  ordinals?: boolean;
}) {
  return (
    <>
      <PageHero image={listing.heroImage} title={title} />
      <div className="px-4 py-10 sm:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          {!listing.heading && <h2 className="sr-only">{title}</h2>}
          {listing.heading && (
            <div className="mb-10 text-center md:mb-16">
              <h2 className="mb-4 text-title text-cimas-ink">{listing.heading}</h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-cimas-blue" />
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {listing.cards.map((card, i) => {
              const ordinal = ordinals ? parseOrdinal(card.title) : null;
              return i < 2 ? (
                <ArticleCard key={card.slug ?? card.title} card={card} accentMeta={accentMeta} ordinal={ordinal} />
              ) : (
                <Reveal key={card.slug ?? card.title} index={i % 3} className="h-full">
                  <ArticleCard card={card} accentMeta={accentMeta} ordinal={ordinal} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
