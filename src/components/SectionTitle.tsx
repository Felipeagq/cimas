import type { ReactNode } from "react";

/** Encabezado centrado con barra decorativa, usado al inicio de las secciones de contenido. */
export function SectionTitle({
  children,
  as: Tag = "h2",
  className = "",
  barWidth = "w-24",
}: {
  children: ReactNode;
  as?: "h2" | "h3";
  className?: string;
  barWidth?: string;
}) {
  return (
    <div className="mb-10 text-center md:mb-16">
      <Tag className={`text-section ${className}`}>{children}</Tag>
      <div className={`${barWidth} mx-auto mt-6 h-1 rounded-full bg-cimas-blue`} />
    </div>
  );
}
