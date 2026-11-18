import { PageHero } from "./PageHero";
import { Prose } from "./Prose";

/** Página de texto normativo (Declaración y Principios, Reglamento General). */
export function DocumentPage({ title, heroImage, body }: { title: string; heroImage: string; body: string }) {
  return (
    <>
      <PageHero image={heroImage} title={title} size="lg" />
      <div className="bg-white">
        <article className="mx-auto max-w-4xl px-5 py-10 text-gray-700 sm:px-6 md:py-24">
          <Prose html={body} />
        </article>
      </div>
    </>
  );
}
