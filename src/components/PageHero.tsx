import { Cover } from "./Photo";

type PageHeroProps = {
  image: string;
  /** Título de la página. Si `visible` es falso se oculta visualmente (el banner ya trae el texto). */
  title: string;
  subtitle?: string;
  /** Muestra título y subtítulo sobre una placa de vidrio (artículos). */
  visible?: boolean;
  /** Altura en escritorio: `md` 40vh (mín. 400 px) · `lg` 50vh (mín. 350 px). */
  size?: "md" | "lg";
};

// Alto fluido (≈ proporción del banner, 3:1) hasta lg; desde lg, la altura del sitio original.
const BANNER_HEIGHT = {
  md: "h-[clamp(11rem,34vw,25rem)] lg:h-[40vh] lg:min-h-[400px]",
  lg: "h-[clamp(11rem,34vw,25rem)] lg:h-[50vh] lg:min-h-[350px]",
} as const;

export function PageHero({ image, title, subtitle, visible = false, size = "md" }: PageHeroProps) {
  if (visible) {
    return (
      <header className="relative isolate flex min-h-80 items-end justify-center overflow-hidden bg-cimas-navy px-4 pt-16 pb-8 md:min-h-[26rem] md:items-center md:pb-0">
        <Cover src={image} priority />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-cimas-navy/75 via-cimas-navy/15 to-transparent" />
        <div className="glass-dark relative z-10 w-full max-w-3xl animate-rise rounded-3xl px-5 py-5 text-center md:px-10 md:py-8">
          <h1 className="font-display text-display font-normal">
            {title}
          </h1>
          {subtitle && <p className="mt-3 text-lead font-medium text-white/90">{subtitle}</p>}
        </div>
      </header>
    );
  }

  return (
    <header className="relative isolate overflow-hidden bg-cimas-navy">
      {/* En móvil y tablet el banner se ve completo (el texto va dentro de la imagen) sobre una
          copia desenfocada de sí mismo que rellena el espacio sobrante. */}
      <div aria-hidden="true" className="absolute inset-0 lg:hidden">
        <Cover src={image} className="scale-125 blur-2xl brightness-90 saturate-150" />
      </div>
      <div className={`relative ${BANNER_HEIGHT[size]}`}>
        <Cover src={image} priority fit="contain" className="lg:object-cover" />
      </div>
      <h1 className="sr-only">{title}</h1>
    </header>
  );
}
