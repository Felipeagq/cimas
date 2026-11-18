"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { Cover } from "./Photo";

export type Slide = {
  image: string;
  alt: string;
  /** Sin `cta`, la imagen completa es el enlace. */
  href?: string;
  /** Con `cta`, se muestra un botón sobre la imagen. */
  cta?: string;
};

const INTERVAL_MS = 5000;
const SWIPE_MIN_PX = 40;
const isExternal = (href: string) => /^https?:\/\//.test(href) || /\.(pdf|zip)$/i.test(href);

export function HeroCarousel({ slides, label }: { slides: Slide[]; label: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Los slides ocultos cargan su imagen solo después de la carga inicial, para no competir con el LCP.
  const [preloadRest, setPreloadRest] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const count = slides.length;

  useEffect(() => {
    const id = window.setTimeout(() => setPreloadRest(true), 2000);
    return () => window.clearTimeout(id);
  }, []);

  // Avance automático; se reinicia con cada cambio manual y se detiene con hover/foco/toque.
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count, index]);

  const go = (to: number) => setIndex((to + count) % count);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    setPaused(true);
  };
  const onTouchEnd = (e: TouchEvent) => {
    setPaused(false);
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Solo gestos claramente horizontales: el scroll vertical de la página no debe cambiar de slide.
    if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy) * 1.5) go(index + (dx < 0 ? 1 : -1));
  };

  const control =
    "glass-dark absolute top-1/2 z-30 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full " +
    "transition duration-300 ease-out-quint hover:bg-white/25 active:scale-90 sm:flex";

  return (
    <section
      aria-roledescription="carrusel"
      aria-label={label}
      className="group relative w-full touch-pan-y overflow-hidden bg-cimas-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => setPaused(false)}
    >
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]" aria-live={paused ? "polite" : "off"}>
        {slides.map((slide, i) => {
          const active = i === index;
          const loaded = preloadRest || i === index || i === 0;
          const image = loaded ? (
            <Cover src={slide.image} alt={slide.alt} fit="contain" priority={i === 0} sizes="100vw" />
          ) : null;
          return (
            <div
              key={slide.image}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${count}`}
              inert={!active}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out-soft ${active ? "opacity-100" : "opacity-0"}`}
            >
              {/* La imagen se ve completa; el sobrante se rellena con una copia desenfocada. */}
              {loaded && (
                <div aria-hidden="true" className="absolute inset-0">
                  <Cover src={slide.image} className="scale-125 blur-2xl brightness-90 saturate-150" />
                </div>
              )}
              {slide.href && !slide.cta ? (
                <Link href={slide.href} className="absolute inset-0 block" aria-label={slide.alt}>
                  {image}
                </Link>
              ) : (
                image
              )}
              {slide.href && slide.cta && (
                <div className="absolute inset-x-0 bottom-10 z-20 px-4 text-center sm:bottom-14">
                  <a
                    href={slide.href}
                    {...(isExternal(slide.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group/btn glass-dark inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition duration-300 ease-out-quint hover:bg-white/25 active:scale-95 sm:px-7 sm:text-base"
                  >
                    {slide.cta}
                    <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out-quint group-hover/btn:translate-x-1 sm:size-5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(index - 1)} aria-label="Diapositiva anterior" className={`${control} left-3 lg:left-5`}>
            <ChevronLeftIcon className="size-5" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Diapositiva siguiente" className={`${control} right-3 lg:right-5`}>
            <ChevronRightIcon className="size-5" />
          </button>

          {/* Paginación: el punto activo se alarga. Los puntos son botones (alternativa accesible al swipe). */}
          <div className="glass-dark absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center rounded-full px-1 sm:bottom-3">
            {slides.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                aria-current={i === index}
                className="p-2"
              >
                <span
                  className={`block h-2 rounded-full transition-[width,background-color] duration-500 ease-out-quint ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
