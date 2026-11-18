import type { Metadata } from "next";
import { SITE } from "@/content/site";

export const baseOpenGraph = {
  type: "website",
  locale: "es_LA",
  siteName: `${SITE.name} – ${SITE.fullName}`,
  images: [{ url: "/images/logo-cimas-masoneria.jpg", width: 900, height: 900, alt: SITE.fullName }],
} satisfies NonNullable<Metadata["openGraph"]>;

type PageMetadataInput = {
  title: string;
  description: string;
  /** Ruta con barra final, p. ej. "/miembros/". */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
};

/**
 * Metadatos de una página. `openGraph` se define completo porque Next.js reemplaza
 * (no fusiona) el objeto del layout cuando una página declara el suyo.
 */
export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...baseOpenGraph,
      title,
      description,
      url: path,
      ...(image ? { images: [image] } : {}),
    },
  };
}
