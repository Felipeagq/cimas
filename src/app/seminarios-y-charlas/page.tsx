import { DocumentCard } from "@/components/DocumentCard";
import { GlobeIcon, PlayIcon, UserIcon, YoutubeIcon } from "@/components/icons";
import { Cover } from "@/components/Photo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SEMINARIOS, type SeminarItem } from "@/content/seminarios";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Capacitación",
  description:
    "Seminarios, charlas y transmisiones de los encuentros de CIMAS: Ruta 100, conversatorio CIMAS – Gran Oriente de Francia y seminarios de formación.",
  path: "/seminarios-y-charlas/",
});

const card = "overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-md transition duration-300 ease-out-quint hover:-translate-y-1 hover:shadow-xl";
const cardSizes = "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw";

function Item({ item, centered }: { item: SeminarItem; centered: boolean }) {
  if (item.kind === "conversatorio") {
    return (
      <div className={`flex h-full flex-col ${card}`}>
        <div className="flex flex-col justify-center bg-cimas-ink p-8 text-center text-white">
          <GlobeIcon className="mx-auto mb-3 size-10 text-cimas-blue" />
          <h3 className="text-section">{item.title}</h3>
        </div>
        <div className="flex flex-grow flex-col p-6">
          <p className="mb-6 flex-grow text-justify text-sm leading-relaxed text-gray-700">
            {item.text}
            <br />
            <br />
            <span className="block rounded border border-gray-200 bg-gray-50 p-3 text-center text-xs font-semibold text-cimas-ink">
              {item.quote}
            </span>
          </p>
          <div className="mt-auto flex flex-col gap-2">
            {item.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex w-full items-center justify-center gap-2 rounded px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors ${
                  i === 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                <YoutubeIcon className="size-5" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (item.kind === "event") {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex h-full flex-col ${card} active:scale-[0.99]`}
      >
        <div className="relative h-48 overflow-hidden">
          <Cover
            src={item.image}
            alt={item.imageAlt}
            sizes={cardSizes}
            className="object-top transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-3 right-3 rounded-full bg-cimas-blue-aa px-2.5 py-1 text-xs font-bold text-white shadow">
          {item.year}
        </div>
        <div className="flex flex-grow flex-col justify-between bg-white p-6 text-center">
          <h3 className="mb-3 text-[1.125rem] leading-snug text-cimas-ink">{item.title}</h3>
          <span className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-cimas-blue-aa">
            <YoutubeIcon className="size-6 text-red-600" />
            {item.cta}
          </span>
        </div>
      </a>
    );
  }

  return (
    <div className={`flex h-full flex-col ${card} ${centered ? "mx-auto w-full max-w-md" : ""}`}>
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Cover src={item.image} alt={item.imageAlt} sizes={cardSizes} className="object-top" />
      </div>
      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-1 text-heading text-cimas-ink">{item.title}</h3>
        <h4 className="mb-3 font-serif text-base font-normal text-cimas-blue-aa italic">{item.topic}</h4>
        <p className="mb-4 flex items-start gap-2 text-xs font-medium text-gray-600">
          <UserIcon className="mt-0.5 size-4 shrink-0 text-gray-400" />
          <span>{item.instructor}</span>
        </p>
        <div className="mt-auto rounded-lg border border-orange-100 bg-orange-50 p-4">
          <p className="mb-3 text-center text-xs font-semibold text-gray-700">{item.modulesLabel}</p>
          <div className="grid grid-cols-2 gap-2">
            {item.modules.map((m) => {
              const parts = /^(.*?)\s*(\d+)$/.exec(m.label);
              return (
                <a
                  key={m.href}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-red-600 px-2 py-1.5 text-center text-xs font-bold text-white shadow-sm transition duration-200 hover:bg-red-700 active:scale-95"
                >
                  <PlayIcon className="size-3" />
                  <span className="sr-only">{m.label}</span>
                  {parts ? (
                    <span aria-hidden="true" className="inline-flex items-center gap-1.5">
                      {parts[1]}
                      <span className="inline-flex size-5 items-center justify-center rounded-full bg-white font-serif text-[0.8125rem] leading-none font-bold text-red-700 tabular-nums">
                        {parts[2]}
                      </span>
                    </span>
                  ) : (
                    <span aria-hidden="true">{m.label}</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CapacitacionPage() {
  const { items } = SEMINARIOS;
  return (
    <>
      <PageHero image={SEMINARIOS.heroImage} title="Capacitación" size="lg" />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16">
        <h2 className="sr-only">Documentos destacados</h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {SEMINARIOS.featured.map((doc, i) => (
            <DocumentCard key={doc.href} {...doc} icon="file" titleClassName={i === 0 ? "text-heading" : "text-lg leading-snug"} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-10 sm:px-6 md:py-16">
        <h2 className="sr-only">Encuentros y seminarios</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            // Si la última fila queda con una sola tarjeta, se centra (como en el sitio original).
            const centered = i === items.length - 1 && items.length % 3 === 1;
            return (
              <Reveal key={item.title} index={i % 3} className={centered ? "lg:col-span-3" : "h-full"}>
                <Item item={item} centered={centered} />
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
