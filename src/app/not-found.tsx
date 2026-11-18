import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
      <p className="font-display text-[clamp(4.5rem,18vw,8rem)] leading-none text-cimas-blue">404</p>
      <h1 className="mt-6 text-title text-cimas-ink">Página no encontrada</h1>
      <p className="mt-4 text-lg text-gray-600">
        La dirección que busca no existe o fue movida. Puede volver a la portada o explorar el menú principal.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-cimas-blue-aa px-8 py-3 font-bold text-white shadow-md transition-colors hover:bg-cimas-blue-dark"
      >
        <ArrowLeftIcon className="size-4" />
        Volver al inicio
      </Link>
    </div>
  );
}
