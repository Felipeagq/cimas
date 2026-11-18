import Link from "next/link";
import { NAV, SITE } from "@/content/site";
import { HeaderShell } from "./HeaderShell";
import { NavMenu } from "./NavMenu";
import { Photo } from "./Photo";

export function SiteHeader() {
  return (
    <HeaderShell>
      <Link
        href="/"
        className="shrink-0 rounded-full transition-transform duration-300 ease-out-quint active:scale-95"
        aria-label={`${SITE.name} – Inicio`}
      >
        <Photo
          src="/images/logo-cimas-192.webp"
          alt={SITE.fullName}
          priority
          className="size-10 rounded-full transition-[width,height] duration-300 ease-out-quint lg:size-24 lg:group-data-[scrolled]/header:size-12"
        />
      </Link>
      <NavMenu items={NAV} />
    </HeaderShell>
  );
}
