import { DownloadDocIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import data from "@/content/ingresos.json";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Ingresos",
  description:
    "Requisitos para que una Potencia Masónica solicite su adhesión a CIMAS y descarga del formulario de solicitud.",
  path: "/ingresos/",
});

export default function IngresosPage() {
  return (
    <>
      <PageHero image={data.heroImage} title="Ingresos" />

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 md:py-20">
        <div className="mb-10">
          <h2 className="mb-2 text-title tracking-[0.04em] text-cimas-blue">{data.heading}</h2>
          <h3 className="mb-6 font-serif text-heading font-normal text-gray-700 italic">{data.subheading}</h3>
          <p className="text-left text-lg leading-relaxed text-gray-700 sm:text-justify">{data.intro}</p>
        </div>

        {/* Es un proceso con orden: seis pasos conectados por una línea, con el numeral alineado a la primera línea. */}
        <ol>
          {data.requirements.map((req, i) => (
            <li key={req.number} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 pb-8 last:pb-0">
              {i < data.requirements.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-10 bottom-1 left-[1.125rem] w-px -translate-x-1/2 bg-linear-to-b from-cimas-gold/70 to-cimas-gold/10"
                />
              )}
              <span
                aria-hidden="true"
                className="numeral relative z-10 size-9 text-lg"
              >
                {req.number.replace(/\D/g, "")}
              </span>
              <div className="pt-1 text-base leading-relaxed text-gray-700 sm:text-lg">
                <span className="sr-only">Paso {req.number.replace(/\D/g, "")}: </span>
                {req.text}
                {"note" in req && (
                  <em className="mt-3 block rounded-lg border-l-4 border-cimas-gold/60 bg-white/70 p-3 text-base text-gray-600">
                    {req.note}
                  </em>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-gray-200 bg-gray-100 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-section text-cimas-ink">
            {data.form.heading}
          </h2>
          <div className="rounded-xl border-t-4 border-cimas-blue bg-white p-8 shadow-md">
            <p className="mb-8 text-lg leading-relaxed text-gray-700">
              {data.form.text}
              <br />
              <br />
              <strong>{data.form.strong}</strong>
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              {data.form.downloads.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-cimas-blue-aa px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-cimas-blue-dark hover:shadow-xl sm:w-auto"
                >
                  <DownloadDocIcon className="size-6 shrink-0" />
                  {d.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
