import { ListingPage } from "@/components/ListingPage";
import { COLOQUIOS } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Coloquios",
  description:
    "Encuentros de la Confederación Interamericana de Masonería Simbólica: declaraciones y crónicas de cada reunión.",
  path: "/coloquios/",
});

export default function ColoquiosPage() {
  return <ListingPage title="Coloquios" listing={COLOQUIOS} ordinals />;
}
