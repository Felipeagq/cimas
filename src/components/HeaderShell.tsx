"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Header fijo de vidrio. En escritorio arranca alto (logo grande) y se compacta al hacer scroll;
 * en móvil mantiene 56 px. El `spacer` conserva la altura inicial para que el contenido
 * no salte cuando el header se compacta (el header es `fixed`, no ocupa espacio propio).
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  // Un centinela en el tope de la página evita escuchar `scroll` en cada frame.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-10 w-px" />
      <div aria-hidden="true" className="h-14 lg:h-30" />
      <header
        data-scrolled={scrolled || undefined}
        className="group/header fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)]"
      >
        {/* Capa de vidrio aparte: así el header no crea un contenedor para el scrim `fixed` del menú móvil. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 border-b border-white/60 bg-white/70 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 group-data-[scrolled]/header:border-cimas-gold/30 group-data-[scrolled]/header:bg-white/80 group-data-[scrolled]/header:shadow-[0_10px_30px_-14px_rgb(14_27_51/0.3)]"
        />
        <div className="relative mx-auto flex h-14 max-w-[1100px] items-center px-4 transition-[height] duration-300 ease-out-quint sm:px-6 lg:h-30 lg:group-data-[scrolled]/header:h-16">
          {children}
        </div>
      </header>
    </>
  );
}
