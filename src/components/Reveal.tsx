"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Revela su contenido una sola vez al entrar en pantalla (fundido + 14 px de ascenso).
 *
 * - Sin JS, o con `prefers-reduced-motion`, el contenido es visible desde el inicio (ver globals.css).
 * - `index` escalona hermanos de una misma fila (se limita a 5 pasos para que nada tarde en aparecer).
 * - No usar en el contenido del primer pliegue: se mostraría recién al hidratar y retrasaría el LCP.
 */
export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.setAttribute("data-revealed", "");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-revealed", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": Math.min(index, 5) } as CSSProperties}
    >
      {children}
    </div>
  );
}
