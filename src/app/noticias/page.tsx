import { ListingPage } from "@/components/ListingPage";
import { NOTICIAS } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Noticias",
  description: "Noticias y boletines informativos de la Confederación Interamericana de Masonería Simbólica.",
  path: "/noticias/",
});

export default function NoticiasPage() {
  return <ListingPage title="Noticias" listing={NOTICIAS} accentMeta />;
}
