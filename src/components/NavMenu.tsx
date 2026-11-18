"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { NavItem } from "@/content/site";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "./icons";

// Enlaces de escritorio: color + filete dorado que crece desde la izquierda (hover y página actual).
const desktopLink =
  "relative inline-flex items-center gap-1.5 px-4 py-2 text-[15px] font-semibold text-cimas-nav transition-colors duration-200 " +
  "after:absolute after:inset-x-4 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-cimas-gold " +
  "after:transition-transform after:duration-300 after:ease-out-quint hover:text-cimas-blue-aa hover:after:scale-x-100 " +
  "data-[active]:text-cimas-blue-aa data-[active]:after:scale-x-100";

// Enlaces del menú móvil: áreas de 48 px de alto.
const mobileLink =
  "flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-cimas-ink transition-colors duration-200 " +
  "active:bg-cimas-blue/10 data-[active]:bg-cimas-blue/10 data-[active]:text-cimas-blue-aa";

// Entrada escalonada de los ítems del menú móvil: solo al abrir (al cerrar desaparecen de inmediato).
const mobileItem =
  "translate-y-1 opacity-0 transition duration-300 ease-out-quint " +
  "group-data-[open]/menu:translate-y-0 group-data-[open]/menu:opacity-100 " +
  "group-data-[open]/menu:[transition-delay:calc(var(--i)*35ms+60ms)]";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export function NavMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const isActive = (href: string) => pathname === href;
  const closeAll = () => {
    setMobileOpen(false);
    setOpenGroup(null);
  };
  const onEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeAll();
  };

  // Menú móvil abierto: bloquea el scroll de la página, cierra con Escape y al pasar a escritorio.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => desktop.matches && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [mobileOpen]);

  let mobileIndex = 0;

  return (
    <>
      {/* ---------- Escritorio ---------- */}
      <nav aria-label="Principal" className="ml-6 hidden lg:block">
        <ul className="flex items-center">
          {items.map((item) =>
            "children" in item ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.label)}
                onMouseLeave={() => setOpenGroup(null)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setOpenGroup(null);
                }}
                onKeyDown={onEscape}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openGroup === item.label}
                  data-active={item.children.some((c) => isActive(c.href)) || undefined}
                  onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                  className={desktopLink}
                >
                  {item.label}
                  <ChevronDownIcon
                    className={`size-3.5 transition-transform duration-300 ease-out-quint ${openGroup === item.label ? "rotate-180" : ""}`}
                  />
                </button>
                {/* Siempre montado para poder animarlo; `invisible` lo saca del árbol de accesibilidad y del tab. */}
                <div
                  data-open={openGroup === item.label || undefined}
                  className="invisible absolute top-full left-0 translate-y-1 pt-2 opacity-0 transition duration-200 ease-out-quint data-[open]:visible data-[open]:translate-y-0 data-[open]:opacity-100"
                >
                  <ul className="glass-strong min-w-60 rounded-xl py-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={closeAll}
                          aria-current={isActive(child.href) ? "page" : undefined}
                          data-active={isActive(child.href) || undefined}
                          className="block px-5 py-2.5 text-[15px] font-semibold text-cimas-nav transition-colors hover:bg-cimas-blue/10 hover:text-cimas-blue-aa data-[active]:text-cimas-blue-aa"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  data-active={isActive(item.href) || undefined}
                  className={desktopLink}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      {/* ---------- Móvil / tablet ---------- */}
      <button
        ref={toggleRef}
        type="button"
        className="ml-auto inline-flex size-11 items-center justify-center rounded-full text-cimas-ink transition-[background-color,transform] duration-200 hover:bg-cimas-blue/10 active:scale-90 lg:hidden"
        aria-expanded={mobileOpen}
        aria-controls={panelId}
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span className="relative size-6">
          <MenuIcon
            className={`absolute inset-0 size-6 transition duration-300 ease-out-quint ${mobileOpen ? "rotate-90 scale-50 opacity-0" : ""}`}
          />
          <CloseIcon
            className={`absolute inset-0 size-6 transition duration-300 ease-out-quint ${mobileOpen ? "" : "-rotate-90 scale-50 opacity-0"}`}
          />
        </span>
      </button>

      <div data-open={mobileOpen || undefined} className="group/menu lg:hidden" onKeyDown={onEscape}>
        {/* Velo: oscurece y desenfoca la página; tocar fuera cierra el menú. */}
        <div
          aria-hidden="true"
          onClick={closeAll}
          className="invisible fixed inset-0 -z-10 bg-cimas-navy/30 opacity-0 backdrop-blur-[3px] transition duration-300 group-data-[open]/menu:visible group-data-[open]/menu:opacity-100"
        />
        <nav
          id={panelId}
          aria-label="Principal (móvil)"
          inert={!mobileOpen}
          className="glass-strong invisible absolute inset-x-2 top-full mt-1 max-h-[calc(100dvh-5rem)] origin-top -translate-y-2 scale-[0.98] overflow-y-auto overscroll-contain rounded-3xl p-2 opacity-0 transition duration-300 ease-out-quint group-data-[open]/menu:visible group-data-[open]/menu:translate-y-0 group-data-[open]/menu:scale-100 group-data-[open]/menu:opacity-100"
        >
          <ul>
            {items.map((item) =>
              "children" in item ? (
                <li key={item.label} className="py-1">
                  <p className={`px-3 pt-2 pb-1 text-[13px] font-semibold text-gray-500 ${mobileItem}`} style={stagger(mobileIndex++)}>
                    {item.label}
                  </p>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href} className={mobileItem} style={stagger(mobileIndex++)}>
                        <Link
                          href={child.href}
                          onClick={closeAll}
                          aria-current={isActive(child.href) ? "page" : undefined}
                          data-active={isActive(child.href) || undefined}
                          className={mobileLink}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href} className={mobileItem} style={stagger(mobileIndex++)}>
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    data-active={isActive(item.href) || undefined}
                    className={mobileLink}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
