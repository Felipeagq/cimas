import type { NextConfig } from "next";

/**
 * URLs antiguas de archivos del WordPress original -> ubicación nueva en /documentos.
 * Viven aquí (y no en la consola de Amplify) para que el despliegue no requiera configuración manual.
 */
const LEGACY_FILES: Record<string, string> = {
  "/PDF/REGLAMENTO-GENERAL-CIMAS.pdf": "/documentos/reglamento-general-cimas.pdf",
  "/wp-content/uploads/2022/09/DECLARACION-Y-PRINCIPIOS.pdf": "/documentos/declaracion-y-principios.pdf",
  "/wp-content/uploads/2026/09/ARGAMASA-REVISTA-N1.pdf": "/documentos/argamasa-revista-n1.pdf",
  "/wp-content/uploads/2026/09/CONFERENCE-INTERNATIONALE-GODF-CIMAS-17-05-2025-FR-ES-EN.pdf":
    "/documentos/conference-internationale-godf-cimas-17-05-2025-fr-es-en.pdf",
  "/wp-content/uploads/2026/09/PRESENTACION-RUTA-100.pdf": "/documentos/presentacion-ruta-100.pdf",
  "/wp-content/uploads/2026/09/Programa-CIMAS-FASCREAA-CCJEHA-ES.pdf": "/documentos/programa-cimas-fascreaa-ccjeha-es.pdf",
  "/wp-content/uploads/2026/09/SOLICITUD-ADHESION-PDF-CIMAS.zip": "/documentos/solicitud-adhesion-pdf-cimas.zip",
  "/wp-content/uploads/2026/09/SOLICITUD-ADHESION-WORD-CIMAS.zip": "/documentos/solicitud-adhesion-word-cimas.zip",
};

const nextConfig: NextConfig = {
  // Build estándar de Next.js: Amplify Hosting (plataforma WEB_COMPUTE, la que su consola asigna a las apps Next.js)
  // publica `.next`. Todas las páginas se pre-generan en el build, así que no hay renderizado por petición.
  // /miembros se redirige a /miembros/ (mismas URLs que el sitio WordPress original).
  trailingSlash: true,
  // Imágenes: un loader propio elige entre el original y una variante de 1280 px preparada de antemano
  // (ver src/lib/image-loader.ts); no se usa el optimizador de imágenes de Next.
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
  async redirects() {
    return Object.entries(LEGACY_FILES).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  // Solo en `next dev`: permite abrir el sitio desde un túnel (ngrok) o el celular.
  // Sin esto, Next bloquea los recursos de desarrollo de orígenes distintos a localhost.
  // Oculta la burbuja "N" de desarrollo: en el celular tapaba el contenido al previsualizar.
  devIndicators: false,
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app", "*.ngrok.io"],
};

export default nextConfig;
