import manifest from "@/content/image-manifest.json";

export type ImageSize = { width: number; height: number };

const sizes: Record<string, ImageSize> = manifest;

/**
 * Dimensiones intrínsecas de una imagen de /public/images.
 * Falla en build si la imagen no está registrada: preferimos un error claro a una imagen rota en producción.
 */
export function imageSize(src: string): ImageSize {
  const size = sizes[src];
  if (!size) {
    throw new Error(`Imagen sin dimensiones en src/content/image-manifest.json: ${src}`);
  }
  return size;
}
