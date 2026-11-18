import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Stroke({ d, ...props }: IconProps & { d: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

export const ArrowRightIcon = (p: IconProps) => <Stroke d="M17 8l4 4m0 0l-4 4m4-4H3" {...p} />;
export const ArrowLeftIcon = (p: IconProps) => <Stroke d="M7 16l-4-4m0 0l4-4m-4 4h18" {...p} />;
export const ChevronLeftIcon = (p: IconProps) => <Stroke d="M15 19l-7-7 7-7" {...p} />;
export const ChevronRightIcon = (p: IconProps) => <Stroke d="M9 5l7 7-7 7" {...p} />;
export const ChevronDownIcon = (p: IconProps) => <Stroke d="M19 9l-7 7-7-7" {...p} />;
export const MenuIcon = (p: IconProps) => <Stroke d="M4 6h16M4 12h16M4 18h16" {...p} />;
export const CloseIcon = (p: IconProps) => <Stroke d="M6 18L18 6M6 6l12 12" {...p} />;
export const MailIcon = (p: IconProps) => (
  <Stroke d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" {...p} />
);
export const DownloadDocIcon = (p: IconProps) => (
  <Stroke d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" {...p} />
);
export const FileIcon = (p: IconProps) => (
  <Stroke d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" {...p} />
);
export const GlobeIcon = (p: IconProps) => (
  <Stroke d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" {...p} />
);
export const UserIcon = (p: IconProps) => (
  <Stroke d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" {...p} />
);

export function PlayIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  );
}
