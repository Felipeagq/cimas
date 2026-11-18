import { DocumentPage } from "@/components/DocumentPage";
import doc from "@/content/reglamento-general.json";
import { pageMetadata } from "@/lib/metadata";

const TITLE = "Reglamento General";

export const metadata = pageMetadata({
  title: TITLE,
  description:
    "Reglamento General de CIMAS: texto ordenado con las modificaciones aprobadas en la Asamblea General del 29 de septiembre de 2017 en Villavicencio, Colombia.",
  path: "/reglamento-general/",
});

export default function ReglamentoPage() {
  return <DocumentPage title={TITLE} heroImage={doc.heroImage} body={doc.body} />;
}
