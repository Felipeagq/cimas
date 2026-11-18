import { ViewTransition, type ReactNode } from "react";

/**
 * A diferencia del layout, el template se vuelve a montar en cada navegación: por eso las animaciones
 * de entrada/salida de <ViewTransition> sí se disparan aquí. Efecto: el contenido de la página se desvanece
 * y la nueva aparece con un leve ascenso; header y pie permanecen quietos.
 * Los estilos (.page-in / .page-out) están en globals.css y se anulan con prefers-reduced-motion.
 * En navegadores sin View Transitions la navegación funciona igual, sin animación.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
