type ProseProps = {
  /** HTML semántico generado en src/content (propio del repo, no proviene de usuarios). */
  html: string;
  className?: string;
};

/** Renderiza contenido largo (Declaración, Reglamento, artículos) con los estilos `.prose-cimas`. */
export function Prose({ html, className = "" }: ProseProps) {
  return <div className={`prose-cimas ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
