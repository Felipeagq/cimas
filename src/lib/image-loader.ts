import manifest from "../content/image-manifest.json";

const known: Record<string, unknown> = manifest;
const SMALL_MAX_WIDTH = 1280;

/**
 * Loader de next/image para exportación estática (no hay servidor de optimización).
 *
 * Las imágenes de más de 1400 px de ancho (banners, portadas) tienen una variante
 * `<nombre>-1280.webp`, generada al preparar los assets. Para anchos solicitados de hasta 1280 px
 * (celulares y tablets, incluso con pantallas de alta densidad) se sirve esa variante, que pesa
 * ~60 % menos; para el resto, el original. Las demás imágenes se sirven tal cual.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  // En desarrollo next/image llama al loader con width 1 y 2 para comprobar que lo use. Nunca se piden
  // imágenes de ese ancho: el fragmento (#) solo hace distintas las dos URLs de sondeo y no llega al servidor.
  if (width <= 2) return `${src}#w${width}`;
  const small = src.replace(/\.[a-z0-9]+$/i, "-1280.webp");
  return width <= SMALL_MAX_WIDTH && small in known ? small : src;
}
