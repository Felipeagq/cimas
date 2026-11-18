import type { Metadata } from "next";
import { HeroCarousel, type Slide } from "@/components/HeroCarousel";
import { DownloadDocIcon } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

const TITLE = `${SITE.name} – ${SITE.fullName}`;

export const metadata: Metadata = {
  ...pageMetadata({
    title: TITLE,
    description:
      "Curitiba reúne a la Masonería de las Américas en el encuentro interamericano CIMAS – FASCREAA – CCJEHA, del 18 al 22 de septiembre de 2026.",
    path: "/",
  }),
  title: { absolute: TITLE },
};

const PROGRAMA_URL = "/documentos/programa-cimas-fascreaa-ccjeha-es.pdf";

const SLIDES: Slide[] = [
  {
    image: "/images/1-cimas-curitiba-evento-super-hd-30000px.webp",
    alt: "Encuentro Curitiba",
    href: PROGRAMA_URL,
    cta: "Ver más",
  },
  {
    image: "/images/cimas-argamasa-banner-boton-super-hd-24000px-scaled.webp",
    alt: "Publicaciones Cimas",
    href: "/publicaciones/",
  },
];

const NOTICIA = {
  titulo: "Curitiba reúne a la Masonería de las Américas en importante encuentro interamericano",
  parrafos: [
    "Del 18 al 22 de septiembre de 2026, la ciudad de Curitiba será sede de un importante encuentro interamericano que reunirá a representantes de la Masonería Simbólica y Escocesa de las Américas, en cinco jornadas dedicadas al diálogo, la reflexión doctrinaria, el fortalecimiento institucional y la integración fraterna.",
    "La agenda iniciará con el 13º Encuentro de la CIMAS, que se desarrollará del 18 al 20 de septiembre. Posteriormente, los días 21 y 22, tendrán lugar la 9ª Asamblea General de la FASCREAA y la 4ª Reunión de la CCJEHA, ambas precedidas por sus respectivos coloquios el 21 de septiembre y con sus asambleas programadas para el día 22.",
    "La realización conjunta de estos encuentros convierte a Curitiba en un importante espacio de convergencia para las Obediencias y Supremos Consejos de las Américas, propiciando el intercambio de experiencias, el análisis de temas de interés común y la construcción de iniciativas orientadas al fortalecimiento de los vínculos institucionales y fraternales.",
    "Más allá de las sesiones formales, este encuentro representa una oportunidad para estrechar los lazos entre la Masonería de distintos países del continente, compartir visiones y continuar construyendo espacios de cooperación sustentados en los principios de libertad de pensamiento, fraternidad y búsqueda permanente del conocimiento.",
    "Durante cinco días, Curitiba se convierte en punto de encuentro de la Masonería de las Américas, reafirmando el valor del diálogo y la fraternidad como puentes para avanzar hacia una institución cada vez más integrada y comprometida con su tiempo.",
  ],
};

const BIENVENIDA = [
  "Para el cuerpo directivo de la Confederación Interamericana de Masonería Simbólica, es un honor y un privilegio darles una cálida bienvenida a este espacio virtual. Aquí se unen nuestros valores y principios masónicos, creando una red de fraternidad que trasciende las fronteras geográficas y culturales.",
  "Este espacio no es solo un lugar de intercambio, sino también de reflexión y fortalecimiento de los lazos que nos unen como hermanos y hermanas en la búsqueda del bien común. A través del diálogo y el respeto, avanzamos juntos en la construcción de una comunidad masónica comprometida con la libertad, la igualdad y la fraternidad.",
];

export default function HomePage() {
  return (
    <div>
      <h1 className="sr-only">{TITLE}</h1>
      <HeroCarousel slides={SLIDES} label="Destacados" />

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-28">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:sticky md:top-10 md:col-span-5">
            <h2 className="text-title text-cimas-blue">{NOTICIA.titulo}</h2>
            <div className="mt-6 h-1 w-20 rounded-full bg-cimas-blue" />
          </div>

          <div className="space-y-5 text-left text-base leading-relaxed text-gray-700 sm:text-justify sm:text-lg md:col-span-7 md:space-y-6">
            {NOTICIA.parrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="pt-4">
              <a
                href={PROGRAMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg font-semibold text-cimas-blue-aa hover:underline"
              >
                <DownloadDocIcon className="size-5" />
                Descarga el programa oficial aquí
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <hr className="border-gray-200" />
      </div>

      <Reveal>
        <section className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-6 md:py-24">
          <h2 className="mb-8 font-serif text-display font-bold text-cimas-blue md:mb-10 md:font-display md:font-normal">¡Bienvenidos!</h2>
          <div className="space-y-5 text-lead text-gray-700 md:space-y-6">
            {BIENVENIDA.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto flex max-w-5xl justify-center px-4 pb-14 sm:px-6 md:pb-24">
          <Photo
            src="/images/whatsapp-image-2024-10-07-at-16-30-16.jpg"
            alt="Cimas - Encuentro Masónico"
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="h-auto w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/70"
          />
        </section>
      </Reveal>
    </div>
  );
}
