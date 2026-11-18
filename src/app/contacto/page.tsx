import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import heroes from "@/content/heroes.json";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contacto",
  description: `Envíe un mensaje a la ${SITE.fullName}.`,
  path: "/contacto/",
});

export default function ContactoPage() {
  return (
    <>
      <PageHero image={heroes.contacto} title="Contacto" />

      <div className="relative z-20 -mt-12 px-4 pb-12 sm:px-6 md:-mt-20 md:py-16">
        <div className="glass-strong mx-auto flex max-w-6xl flex-col overflow-hidden rounded-3xl md:flex-row">
          <div className="w-full p-6 sm:p-8 md:w-3/5 md:p-14">
            <h2 className="mb-6 border-b border-cimas-gold/50 pb-4 text-title text-cimas-ink md:mb-8">
              Envíenos un mensaje
            </h2>
            <ContactForm />
          </div>

          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-cimas-blue-aa p-8 text-center md:w-2/5 md:p-14">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 size-64 rounded-full bg-white opacity-5" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 size-40 rounded-full bg-white opacity-5" />
            <div className="relative z-10 flex flex-col items-center">
              <Photo
                src={heroes.contactoLogo}
                alt="Logo Cimas Masonería"
                sizes="256px"
                className="mb-8 h-auto w-48 drop-shadow-md md:w-64"
              />
              <p className="mb-4 font-display text-section font-normal tracking-[0.2em] text-white">C∴I∴MA∴S∴</p>
              <p className="mx-auto max-w-xs text-lg leading-relaxed font-medium text-white">
                Confederación Interamericana de Masonería Simbólica
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
