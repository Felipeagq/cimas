import Image from "next/image";
import type { ComponentProps } from "react";
import { imageSize } from "@/lib/images";

type ImageProps = ComponentProps<typeof Image>;

/** Imagen de /public/images con sus dimensiones reales (evita saltos de layout). */
export function Photo({
  src,
  alt,
  ...props
}: Omit<ImageProps, "src" | "width" | "height" | "fill"> & { src: string; alt: string }) {
  const { width, height } = imageSize(src);
  return <Image src={src} alt={alt} width={width} height={height} {...props} />;
}

/** Imagen que rellena a su contenedor (el contenedor debe ser `relative`). */
export function Cover({
  src,
  alt = "",
  sizes = "100vw",
  fit = "cover",
  className = "",
  ...props
}: Omit<ImageProps, "src" | "width" | "height" | "fill" | "alt"> & {
  src: string;
  alt?: string;
  fit?: "cover" | "contain";
}) {
  imageSize(src); // valida que la imagen esté registrada
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  return <Image src={src} alt={alt} fill sizes={sizes} className={`${fitClass} ${className}`} {...props} />;
}
