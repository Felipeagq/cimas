import { DownloadDocIcon, FileIcon } from "./icons";
import { Cover } from "./Photo";

type DocumentCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
  /** Icono del botón: documento con flecha (por defecto) o archivo PDF. */
  icon?: "download" | "file";
  titleClassName?: string;
};

/** Tarjeta con portada, descripción y botón de descarga (Publicaciones, Capacitación). */
export function DocumentCard({
  title,
  description,
  image,
  imageAlt,
  href,
  cta,
  icon = "download",
  titleClassName = "text-heading",
}: DocumentCardProps) {
  const Icon = icon === "file" ? FileIcon : DownloadDocIcon;
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-md transition duration-300 ease-out-quint hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <Cover
          src={image}
          alt={imageAlt}
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-top transition duration-700 ease-out-quint group-hover:scale-105"
        />
      </div>
      <div className="flex flex-grow flex-col p-6 sm:p-8">
        <h3
          className={`mb-4 text-cimas-ink transition-colors duration-300 group-hover:text-cimas-blue-aa ${titleClassName}`}
        >
          {title}
        </h3>
        <p className="mb-6 flex-grow text-justify text-sm text-gray-600">{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-cimas-blue-aa px-6 py-3 font-bold text-white shadow-md transition duration-200 hover:bg-cimas-blue-dark active:scale-[0.98]"
        >
          <Icon className="size-5" />
          {cta}
        </a>
      </div>
    </div>
  );
}
