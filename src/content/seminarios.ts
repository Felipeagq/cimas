import raw from "./seminarios.json";

type Link = { label: string; href: string };

export type SeminarItem =
  | { kind: "conversatorio"; title: string; text: string; quote: string; links: Link[] }
  | {
      kind: "event";
      title: string;
      year: string;
      image: string;
      imageAlt: string;
      href: string;
      cta: string;
    }
  | {
      kind: "seminar";
      title: string;
      topic: string;
      instructor: string;
      image: string;
      imageAlt: string;
      modulesLabel: string;
      modules: Link[];
    };

export type Seminarios = {
  heroImage: string;
  featured: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    href: string;
    cta: string;
  }[];
  items: SeminarItem[];
};

// El JSON ensancha `kind` a string; esta aserción restituye la unión discriminada.
export const SEMINARIOS = raw as Seminarios;
