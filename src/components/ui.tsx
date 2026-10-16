import type { SVGProps } from "react";

/** "01 ——— ABOUT" label that opens every section. */
export function Eyebrow({ num, label }: { num: string; label: string }) {
  return (
    <p className="eyebrow" data-reveal>
      <span className="eyebrow-num">{num}</span>
      <span className="eyebrow-rule" aria-hidden="true" />
      <span>{label}</span>
    </p>
  );
}

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
);

export const ArrowDown = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Icon>
);

export const ArrowUp = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Icon>
);

export const Play = (p: IconProps) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </Icon>
);

export const Pause = (p: IconProps) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <rect x="6.5" y="5" width="3.6" height="14" rx="1.2" />
    <rect x="13.9" y="5" width="3.6" height="14" rx="1.2" />
  </Icon>
);

export const SoundOn = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" fill="currentColor" />
    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
  </Icon>
);

export const SoundOff = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" fill="currentColor" />
    <path d="m16 9.5 5 5M21 9.5l-5 5" />
  </Icon>
);

export const Plus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p} strokeWidth={2.4}>
    <path d="m6 12.5 4 4 8-9" />
  </Icon>
);

export const Trophy = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M16 5.5h2.5a2 2 0 0 1-2 3.5M8 5.5H5.5a2 2 0 0 0 2 3.5M12 13v4M8.5 20h7M10 17h4v3h-4z" />
  </Icon>
);

export const Shield = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5 19 6v5.5c0 4.3-2.9 7.6-7 9-4.1-1.4-7-4.7-7-9V6l7-2.5Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Icon>
);

export const Spark = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5c.6 4.4 2.6 6.9 7.5 8.5-4.9 1.6-6.9 4.1-7.5 8.5-.6-4.4-2.6-6.9-7.5-8.5 4.9-1.6 6.9-4.1 7.5-8.5Z" />
    <path d="M19 3.5v3M17.5 5h3" />
  </Icon>
);

export const Scale = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4v16M7 20h10M5 7h14M12 4l-1 3h2l-1-3Z" />
    <path d="m5 7-2.5 6a2.5 2.5 0 0 0 5 0L5 7ZM19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7Z" />
  </Icon>
);

export const Flow = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="4" width="6" height="5" rx="1.5" />
    <rect x="14.5" y="15" width="6" height="5" rx="1.5" />
    <path d="M9.5 6.5h3a2 2 0 0 1 2 2v6.5M12.5 13l2 2 2-2" />
  </Icon>
);

export const Flag = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 21V4M6 4.5c4-2 6 2 12 0v9c-6 2-8-2-12 0" />
  </Icon>
);

export const Cursor = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 3.5 18.5 9l-6 1.8L10.6 17 5 3.5Z" />
  </Icon>
);

export const Copy = (p: IconProps) => (
  <Icon {...p}>
    <rect x="8.5" y="8.5" width="11" height="11" rx="2.5" />
    <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
  </Icon>
);

export const Rotate = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6" />
  </Icon>
);

export const Layers = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" />
    <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
  </Icon>
);

export const Key = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="8" cy="15.5" r="4" />
    <path d="m11 12.5 8.5-8.5M16 7.5l2.5 2.5M13.5 10l2 2" />
  </Icon>
);

export const Lock = (p: IconProps) => (
  <Icon {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" />
  </Icon>
);

export const Wallet = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 8V6.5A2 2 0 0 1 7 4.5h10.5V8" />
    <rect x="3.5" y="8" width="17" height="11.5" rx="2.5" />
    <path d="M16 13.75h1.5" />
  </Icon>
);

export const FileCheck = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8L14 3.5Z" />
    <path d="M14 3.5V8h4.5M9.25 14l2 2 3.75-3.75" />
  </Icon>
);

export const Pipeline = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="5" cy="12" r="2.2" />
    <circle cx="12" cy="12" r="2.2" />
    <circle cx="19" cy="12" r="2.2" />
    <path d="M7.2 12h2.6M14.2 12h2.6" />
  </Icon>
);

export const Server = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="4.5" width="16" height="6.5" rx="2" />
    <rect x="4" y="13" width="16" height="6.5" rx="2" />
    <path d="M8 7.75h.01M8 16.25h.01" strokeWidth={2.6} />
  </Icon>
);

export const Alert = (p: IconProps) => (
  <Icon {...p}>
    <path d="M10.3 4.9a2 2 0 0 1 3.4 0l7 12.2a2 2 0 0 1-1.7 3H5a2 2 0 0 1-1.7-3l7-12.2Z" />
    <path d="M12 10v4M12 17h.01" />
  </Icon>
);

export const Calendar = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
    <path d="M8 3.5v4M16 3.5v4M4 10h16" />
  </Icon>
);

export const Star = (p: IconProps) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" />
  </Icon>
);
