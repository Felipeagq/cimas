import { MailIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import data from "@/content/miembros.json";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Miembros",
  description:
    "Obediencias miembros de CIMAS, Directorio 2024 – 2026, presidentes de la Confederación, miembros de honor y Consejo Supervisor.",
  path: "/miembros/",
});

/** "12) GRAN ORIENTE…" -> número aparte para mostrarlo como insignia. */
function splitNumber(text: string) {
  const match = /^(\d+)\)\s*(.*)$/.exec(text);
  return match ? { num: match[1], name: match[2] } : { num: null, name: text };
}

const sectionHeading = "text-heading text-cimas-ink border-b border-cimas-gold/50 pb-3";

export default function MiembrosPage() {
  return (
    <>
      <PageHero image={data.heroImage} title="Miembros" />

      {/* Obediencias miembros: el resplandor de fondo es lo que las tarjetas de vidrio refractan. */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-32 size-[28rem] bg-[radial-gradient(closest-side,rgb(68_127_211/0.28),transparent)]" />
          <div className="absolute top-[36%] -right-32 size-[30rem] bg-[radial-gradient(closest-side,rgb(184_145_74/0.24),transparent)]" />
          <div className="absolute bottom-[6%] -left-28 size-[28rem] bg-[radial-gradient(closest-side,rgb(68_127_211/0.22),transparent)]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-24">
          <SectionTitle className="tracking-[0.07em] text-cimas-blue uppercase">
            Obediencias Miembros
            <br />
            <span className="mt-1 inline-block font-serif text-heading font-normal tracking-[0.12em] text-gray-700">DE C∴I∴MA∴S∴</span>
          </SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {data.obediencias.map((o, i) => {
              const { num, name } = splitNumber(o.title);
              const card = (
                <div className="glass-card h-full rounded-2xl border-t-4 border-t-cimas-blue p-5 transition duration-300 ease-out-quint hover:-translate-y-1 md:p-6">
                  <div className="mb-4 flex items-start gap-3">
                    {num && <span className="numeral size-8 text-base">{num}</span>}
                    <h3 className="pt-0.5 text-[1.0625rem] leading-snug tracking-[0.01em] text-gray-900 sm:text-lg">{name}</h3>
                  </div>
                  {/* Cargos: lista de definición. El cargo (rombo dorado + etiqueta) y debajo la persona; el primero es la cabeza de la Obediencia. */}
                  <dl className="divide-y divide-gray-200/70">
                    {o.officers.map((officer, k) => (
                      <div key={`${officer.role}-${officer.name}`} className="py-2.5 first:pt-0 last:pb-0">
                        <dt className="flex items-center gap-2 text-[0.8125rem] leading-tight font-semibold text-cimas-blue-aa">
                          <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-cimas-gold" />
                          {officer.role}
                        </dt>
                        <dd
                          className={`mt-1 pl-3.5 font-serif text-[1.0625rem] leading-snug text-gray-900 ${
                            k === 0 ? "font-bold" : ""
                          }`}
                        >
                          {officer.name}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
              return i < 2 ? (
                <div key={o.title}>{card}</div>
              ) : (
                <Reveal key={o.title} index={i % 3}>
                  {card}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Autoridades y Directorio */}
      <section className="border-y border-white bg-white/70 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="mb-8 text-title text-cimas-ink">
            {data.autoridades.heading}
          </h2>
          <div className="rounded-2xl border-l-4 border-cimas-blue bg-white p-5 text-left shadow-md sm:p-8">
            <p className="mb-4 text-base leading-relaxed text-gray-700 sm:text-lg">{data.autoridades.text}</p>
            <p className="mt-6 text-center font-serif text-section font-normal text-cimas-blue-aa italic">
              {data.autoridades.motto.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 md:mt-20">
          <div className="mb-8 text-center md:mb-12">
            <h3 className="text-section text-cimas-ink">
              {data.directorio.title}
            </h3>
            <p className="mt-2 text-gray-600 italic">{data.directorio.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.directorio.members.map((m, i) => (
              <Reveal key={m.email} index={i % 3}>
              <div className="h-full rounded-xl border-t-2 border-cimas-gold/60 bg-white p-5 shadow-md sm:p-6">
                <p className="mb-1 text-sm font-semibold text-gray-500">{m.role}</p>
                <p className="mb-2 font-serif text-lg font-bold text-gray-900">
                  {m.name} <span className="text-sm font-normal text-gray-500">({m.country})</span>
                </p>
                <a
                  href={`mailto:${m.email}`}
                  className="flex items-center text-sm font-medium text-cimas-blue-aa transition-colors hover:text-cimas-blue-dark"
                >
                  <MailIcon className="mr-2 size-4 shrink-0" />
                  {m.email}
                </a>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Presidentes, miembros de honor y Consejo Supervisor */}
      <section className="mx-auto max-w-7xl border-b border-gray-200 px-4 py-12 sm:px-6 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className={`${sectionHeading} mb-8`}>Presidentes de C∴I∴MA∴S∴</h2>
            {/* Cronología: una línea vertical con un punto por período. */}
            <ol className="relative ml-2 space-y-5 border-l border-cimas-gold/50 pl-6">
              {data.presidentes.map((p) => (
                <li key={p.period} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[1.8125rem] size-2.5 rounded-full bg-cimas-gold ring-4 ring-cimas-mist"
                  />
                  <p className="text-sm font-bold text-cimas-blue-aa tabular-nums">{p.period.replace(/\s*-\s*/, " – ")}</p>
                  <p className="font-serif text-lg leading-snug text-gray-900">{p.name}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className={`${sectionHeading} mb-6`}>Miembros de Honor</h2>
            <ul className="mb-12 space-y-2.5 font-serif text-lg text-gray-800">
              {data.miembrosHonor.map((name) => (
                <li
                  key={name}
                  className="relative pl-6 before:absolute before:top-[0.72em] before:left-1 before:size-[0.4375rem] before:rotate-45 before:bg-cimas-gold"
                >
                  {name}
                </li>
              ))}
            </ul>

            <h2 className={`${sectionHeading} mb-6`}>Consejo Supervisor de C∴I∴MA∴S∴</h2>
            <ol className="space-y-5">
              {data.consejoSupervisor.map((c) => {
                const { num, name } = splitNumber(c.name);
                return (
                  <li key={c.name} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3">
                    <span className="numeral size-7 text-sm">{num}</span>
                    <div>
                      <p className="font-serif text-base leading-snug font-bold text-gray-900">{name}</p>
                      <p className="mt-0.5 text-sm text-gray-600">{c.representative}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Galería de ex presidentes */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-24">
        <SectionTitle className="tracking-[0.07em] text-gray-900 uppercase">Galería de Ex Presidentes</SectionTitle>
        {/* Cada expresidente en su propia tarjeta. */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {data.galeria.map((p, i) => (
            <Reveal key={p.name} index={i % 3} className="h-full">
              <article className="group flex h-full flex-col items-center rounded-2xl border border-t-4 border-gray-200/70 border-t-cimas-gold bg-white px-5 pt-8 pb-7 text-center shadow-md transition duration-300 ease-out-quint hover:-translate-y-1 hover:shadow-xl">
                {/* La medalla marca el orden de presidencia (1.º a 8.º); el rol también lo dice con palabras. */}
                <div className="relative mb-5 size-36 shrink-0 transition duration-300 group-hover:scale-105 sm:size-40">
                  <div
                    className={`size-full overflow-hidden rounded-full border-4 border-white shadow-xl ${
                      "zoom" in p ? "bg-gray-200" : ""
                    }`}
                  >
                    <Photo
                      src={p.image}
                      alt={p.alt}
                      sizes="160px"
                      className={`size-full object-cover ${"zoom" in p ? "scale-150 object-top" : ""}`}
                    />
                  </div>
                  <span aria-hidden="true" className="numeral absolute right-0 bottom-1 size-10 text-lg">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-heading text-cimas-blue-aa">{p.name}</h3>
                <p className="mb-2 text-sm font-semibold text-gray-800">
                  {p.role.map((line, j) => (
                    <span key={line}>
                      {j > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-600">{p.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
