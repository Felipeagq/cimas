export const SITE = {
  name: "CIMAS",
  fullName: "Confederación Interamericana de Masonería Simbólica",
  /** URL pública. Se puede sobreescribir con NEXT_PUBLIC_SITE_URL (p. ej. en una rama de preview de Amplify). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cimas-masoneria.com").replace(/\/$/, ""),
  description:
    "Confederación Interamericana de Masonería Simbólica (CIMAS): fraternidad, reflexión doctrinaria y cooperación entre Obediencias de las Américas.",
  credit: "Powered by FEANWARE SAS",
} as const;

export type NavLeaf = { label: string; href: string };
export type NavItem = NavLeaf | { label: string; children: NavLeaf[] };

export const NAV: NavItem[] = [
  {
    label: "Fundamentos",
    children: [
      { label: "Declaración y Principios", href: "/declaracion-y-principios/" },
      { label: "Reglamento General", href: "/reglamento-general/" },
    ],
  },
  {
    label: "Fraternidad",
    children: [
      { label: "Miembros", href: "/miembros/" },
      { label: "Ingresos", href: "/ingresos/" },
    ],
  },
  { label: "Coloquios", href: "/coloquios/" },
  { label: "Noticias", href: "/noticias/" },
  { label: "Capacitación", href: "/seminarios-y-charlas/" },
  { label: "Publicaciones", href: "/publicaciones/" },
  { label: "Contacto", href: "/contacto/" },
];

/** Rutas estáticas del sitio (sin los artículos), usadas por el sitemap. */
export const STATIC_ROUTES = [
  "/",
  ...NAV.flatMap((item) => ("children" in item ? item.children.map((c) => c.href) : [item.href])),
];
