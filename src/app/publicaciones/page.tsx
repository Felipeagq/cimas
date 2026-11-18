import { DocumentCard } from "@/components/DocumentCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import data from "@/content/publicaciones.json";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Publicaciones",
  description: "Documentos y artículos de CIMAS: revista Argamasa y otras publicaciones institucionales.",
  path: "/publicaciones/",
});

export default function PublicacionesPage() {
  return (
    <>
      <PageHero image={data.heroImage} title="Publicaciones" />
      <div className="w-full px-4 py-10 sm:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center md:mb-16">
            <h2 className="mb-4 text-title text-cimas-ink">{data.heading}</h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-cimas-blue" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item, i) => (
              <Reveal key={item.href} index={i % 3} className="h-full">
                <DocumentCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
