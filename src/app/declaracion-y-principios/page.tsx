import { DocumentPage } from "@/components/DocumentPage";
import doc from "@/content/declaracion-y-principios.json";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Declaración y Principios";

export const metadata = pageMetadata({
  title: TITLE,
  description:
    "Declaración Ad Gloriam Universalis Fraternitatis y tratado fundacional de CIMAS. Versión actualizada a septiembre de 2005, con las modificaciones aprobadas en la 3a. Asamblea General.",
  path: "/declaracion-y-principios/",
});

export default function DeclaracionPage() {
  return <DocumentPage title={TITLE} heroImage={doc.heroImage} body={doc.body} />;
}
