import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Public_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/content/site";
import "./globals.css";

// Texto e interfaz: sobria, de x alta (legible en pantallas pequeñas). Fuente variable.
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
  display: "swap",
});

// Títulos y textos largos: Caslon, la tipografía de los documentos fundacionales de las Américas.
// El corte Display (fino, de alto contraste) se reserva para los tamaños más grandes.
const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-caslon",
  display: "swap",
});

const caslonDisplay = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caslon-display",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – ${SITE.fullName}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "es_LA",
    siteName: `${SITE.name} – ${SITE.fullName}`,
    title: `${SITE.name} – ${SITE.fullName}`,
    description: SITE.description,
    images: [{ url: "/images/logo-cimas-masoneria.jpg", width: 900, height: 900, alt: SITE.fullName }],
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  themeColor: "#386fc1",
  // Permite usar env(safe-area-inset-*) bajo la muesca / barra de inicio de los iPhone.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${publicSans.variable} ${caslon.variable} ${caslonDisplay.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cimas-blue-aa focus:shadow-lg"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-grow">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
