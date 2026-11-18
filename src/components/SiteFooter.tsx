import { SITE } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-cimas-blue-aa pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
      <p className="mx-auto max-w-6xl px-6 text-center text-xs font-medium tracking-wide text-white md:text-sm">
        Copyright CIMAS© {new Date().getFullYear()} | {SITE.credit}
      </p>
    </footer>
  );
}
