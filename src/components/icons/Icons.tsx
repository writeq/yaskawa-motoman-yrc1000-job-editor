import type { ReactNode } from 'react';

interface IconProps {
  size?: number;
}

const STROKE = '#2f5f9e';
const STROKE_DARK = '#1c3a5c';
const AMBER = '#c9820a';
const RED = '#c0392b';
const GREEN = '#2e8b57';

function Svg({ size = 18, children }: { size?: number; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

export function IconDocument({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M5 2.5h7l3 3v12H5V2.5Z" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" fill="#fff" />
      <path d="M12 2.5v3h3" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 10h6M7 12.5h6M7 15h4" stroke={STROKE} strokeWidth="1.3" strokeLinecap="round" />
    </Svg>
  );
}

export function IconDocumentPencil({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M5 2.5h7l3 3v5.5" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M5 2.5v15h5" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 2.5v3h3" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 10h5M7 12.5h3" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="m16.6 11.4 1.3 1.3-5.4 5.4-1.7.4.4-1.7 5.4-5.4Z"
        stroke={AMBER}
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="#fff8ec"
      />
    </Svg>
  );
}

export function IconDocumentGear({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M4.5 2.5h6.5l3 3V17h-9.5V2.5Z" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" fill="#fff" />
      <path d="M11 2.5v3h3" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6.5 9.5h4M6.5 12h3" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14.7" cy="14.7" r="2" stroke={STROKE_DARK} strokeWidth="1.3" fill="#fff" />
      <path
        d="M14.7 11.8v.7M14.7 16.9v.7M11.8 14.7h.7M16.9 14.7h.7M12.6 12.6l.5.5M16.3 16.3l.5.5M12.6 16.8l.5-.5M16.3 13.1l.5-.5"
        stroke={STROKE_DARK}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconGauge({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M3 14.5a7 7 0 1 1 14 0" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 14.5 13.2 8" stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="1.1" fill={STROKE_DARK} />
      <path d="M3 14.5h1M16 14.5h1M5 8.5l.7.7M15 8.5l-.7.7" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconClipboard({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="4.5" y="3.5" width="11" height="14" rx="1.2" stroke={STROKE} strokeWidth="1.4" fill="#fff" />
      <rect x="7.5" y="2" width="5" height="2.8" rx="0.6" stroke={STROKE} strokeWidth="1.3" fill="#fff" />
      <path d="M7 8.5h6M7 11h6M7 13.5h4" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconScissors({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="5.5" cy="5.5" r="2" stroke={RED} strokeWidth="1.4" fill="#fff" />
      <circle cx="5.5" cy="14.5" r="2" stroke={RED} strokeWidth="1.4" fill="#fff" />
      <path d="M7.2 6.8 17 16.5M7.2 13.2 17 3.5" stroke={STROKE_DARK} strokeWidth="1.4" strokeLinecap="round" />
    </Svg>
  );
}

export function IconCopy({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="3.5" y="5.5" width="9" height="11" rx="1" stroke={STROKE} strokeWidth="1.3" fill="#fff" />
      <rect x="7" y="2.5" width="9" height="11" rx="1" stroke={STROKE} strokeWidth="1.3" fill="#fff" />
      <path d="M9.5 6h4M9.5 8.5h4" stroke={STROKE} strokeWidth="1.1" strokeLinecap="round" />
    </Svg>
  );
}

export function IconReverse({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M6 4v12M14 16V4" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.5 6.5 6 4l2.5 2.5M16.5 13.5 14 16l-2.5-2.5" stroke={STROKE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconFind({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="8.5" cy="8.5" r="5" stroke={STROKE} strokeWidth="1.5" fill="#fff" />
      <path d="M12.3 12.3 17 17" stroke={STROKE_DARK} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

export function IconLockClosed({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="4.5" y="9" width="11" height="8" rx="1.2" stroke={AMBER} strokeWidth="1.4" fill="#fff3de" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke={AMBER} strokeWidth="1.4" fill="none" />
      <circle cx="10" cy="12.8" r="1.1" fill={AMBER} />
    </Svg>
  );
}

export function IconLockOpen({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="4.5" y="9" width="11" height="8" rx="1.2" stroke={STROKE} strokeWidth="1.4" fill="#fff" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 6.6-1.6" stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <circle cx="10" cy="12.8" r="1.1" fill={STROKE} />
    </Svg>
  );
}

export function IconComment({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M3.5 4.5h13v9h-6.5L6 16.5V13.5H3.5v-9Z"
        stroke={GREEN}
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="#eefaf1"
      />
      <path d="M6 7.5h8M6 10h5" stroke={GREEN} strokeWidth="1.1" strokeLinecap="round" />
    </Svg>
  );
}

export function IconCommentOff({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M3.5 4.5h13v9h-6.5L6 16.5V13.5H3.5v-9Z"
        stroke={STROKE}
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="#fff"
      />
      <path d="M6 7.5h8M6 10h5" stroke={STROKE} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M2.5 17.5 17.5 2.5" stroke={RED} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  );
}

export function IconInsertPlus({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M4 3h7l3 3v11H4V3Z" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" fill="#fff" />
      <path d="M11 3v3h3" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 13.5h4" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="14.5" cy="14.5" r="3.4" fill="#fff" stroke={GREEN} strokeWidth="1.3" />
      <path d="M14.5 12.7v3.6M12.7 14.5h3.6" stroke={GREEN} strokeWidth="1.3" strokeLinecap="round" />
    </Svg>
  );
}

export function IconCheckCircle({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="10" cy="10" r="7.2" stroke={GREEN} strokeWidth="1.4" fill="#fff" />
      <path d="M6.8 10.2 9 12.4l4.2-5" stroke={GREEN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconGear({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="10" cy="10" r="3" stroke={STROKE} strokeWidth="1.4" fill="#fff" />
      <path
        d="M10 3v2.2M10 14.8V17M17 10h-2.2M5.2 10H3M14.8 5.2l-1.5 1.5M6.7 13.3l-1.5 1.5M14.8 14.8l-1.5-1.5M6.7 6.7 5.2 5.2"
        stroke={STROKE}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconFolderOpen({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M2.5 6.5h5l1.5 2H17v8.5H2.5v-10.5Z" stroke={AMBER} strokeWidth="1.4" strokeLinejoin="round" fill="#ffe6b3" />
      <path d="M2.5 6.5V4.5h4l1.5 2" stroke={AMBER} strokeWidth="1.4" strokeLinejoin="round" fill="#ffe6b3" />
    </Svg>
  );
}

export function IconTag({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M3 3h7l7 7-7 7-7-7V3Z"
        stroke={STROKE}
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="#fff"
      />
      <circle cx="6.3" cy="6.3" r="1.3" fill={STROKE} />
    </Svg>
  );
}

export function IconPin({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M10 2.5c-2.8 0-5 2.2-5 5 0 3.6 5 9.5 5 9.5s5-5.9 5-9.5c0-2.8-2.2-5-5-5Z"
        stroke={RED}
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="#fde4e2"
      />
      <circle cx="10" cy="7.5" r="1.8" fill={RED} />
    </Svg>
  );
}

export function IconLink({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="2.5" y="7.2" width="7" height="5.6" rx="2.8" transform="rotate(-45 6 10)" stroke={STROKE} strokeWidth="1.4" fill="#fff" />
      <rect x="10.5" y="7.2" width="7" height="5.6" rx="2.8" transform="rotate(-45 14 10)" stroke={STROKE} strokeWidth="1.4" fill="#fff" />
      <path d="M8.5 11.5 11.5 8.5" stroke={STROKE} strokeWidth="1.4" strokeLinecap="round" />
    </Svg>
  );
}

export function IconEye({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M2 10s2.8-5 8-5 8 5 8 5-2.8 5-8 5-8-5-8-5Z"
        stroke={STROKE}
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="#fff"
      />
      <circle cx="10" cy="10" r="2.4" stroke={STROKE} strokeWidth="1.3" fill="#fff" />
    </Svg>
  );
}

export function IconGlobe({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="9" cy="10" r="6.2" stroke={STROKE} strokeWidth="1.3" fill="#fff" />
      <path d="M2.8 10h12.4M9 3.8c1.7 1.6 2.6 3.8 2.6 6.2s-.9 4.6-2.6 6.2c-1.7-1.6-2.6-3.8-2.6-6.2S7.3 5.4 9 3.8Z" stroke={STROKE} strokeWidth="1.1" />
      <text x="14.5" y="14.5" fontSize="7.5" fontWeight="700" fill={STROKE_DARK}>
        A
      </text>
    </Svg>
  );
}

export function IconChevronDown({ size = 10 }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconMinus({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M4 10h12" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconEquals({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M4 8h12M4 12h12" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconPlusLarge({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M10 4v12M4 10h12" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconNewFile({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M5 2.5h6l3 3v12H5V2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      <path d="M11 2.5v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 10v4M8 12h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </Svg>
  );
}

export function IconOpenFolderSmall({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M2.5 6.2h4.6l1.3 1.6H17v8.2H2.5V6.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M2.5 6.2V4.3h3.6l1.3 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconSaveDisk({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M3.5 3.5h10l3 3v10h-13V3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      <rect x="6.5" y="10.5" width="7" height="6" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <rect x="6" y="3.5" width="6" height="4" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </Svg>
  );
}

export function IconPrinter({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M5.5 7.5v-4h9v4" stroke={STROKE} strokeWidth="1.4" strokeLinejoin="round" fill="#fff" />
      <rect x="3" y="7.5" width="14" height="6" rx="1" stroke={STROKE} strokeWidth="1.4" fill="#fff" />
      <rect x="5.5" y="12" width="9" height="5.5" stroke={STROKE} strokeWidth="1.3" fill="#fff" />
      <circle cx="14.2" cy="9.7" r="0.7" fill={STROKE} />
    </Svg>
  );
}

export function IconPreview({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M5 2.5h6.5l3 3V15H5V2.5Z" stroke={STROKE} strokeWidth="1.3" strokeLinejoin="round" fill="#fff" />
      <path d="M11.5 2.5v3h3" stroke={STROKE} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.4" stroke={STROKE_DARK} strokeWidth="1.3" fill="#fff" />
      <path d="M14.5 15.5 17 18" stroke={STROKE_DARK} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

export function IconTrash({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M4 5.5h12" stroke={RED} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7.5 5.5V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.5" stroke={RED} strokeWidth="1.4" fill="none" />
      <path d="M5.5 5.5 6.3 17h7.4l.8-11.5" stroke={RED} strokeWidth="1.4" strokeLinejoin="round" fill="#fdecea" />
      <path d="M8.5 8.5v6M11.5 8.5v6" stroke={RED} strokeWidth="1.1" strokeLinecap="round" />
    </Svg>
  );
}

export function IconClose({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M5 5.5h6l3 3V17H5V5.5Z" stroke={STROKE} strokeWidth="1.3" strokeLinejoin="round" fill="#fff" />
      <path d="M11 5.5v3h3" stroke={STROKE} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7.5 10.5l4 4M11.5 10.5l-4 4" stroke={RED} strokeWidth="1.4" strokeLinecap="round" />
    </Svg>
  );
}

export function IconHelp({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="10" cy="10" r="7.2" stroke={STROKE} strokeWidth="1.4" fill="#fff" />
      <path
        d="M7.8 8a2.2 2.2 0 1 1 3.4 1.8c-.7.5-1.2.9-1.2 2"
        stroke={STROKE}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="10" cy="14.2" r="0.9" fill={STROKE} />
    </Svg>
  );
}

export function IconBatchFolder({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M2.5 6.5h4.6l1.3 1.6H15v7.4H2.5V6.5Z" stroke={AMBER} strokeWidth="1.3" strokeLinejoin="round" fill="#ffe6b3" />
      <path d="M6 4.2h4.6l1.3 1.6H17v7.4" stroke={STROKE} strokeWidth="1.2" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconRecentFile({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M5 2.5h7l3 3v12H5V2.5Z" stroke={STROKE} strokeWidth="1.3" strokeLinejoin="round" fill="#fff" />
      <path d="M12 2.5v3h3" stroke={STROKE} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="10" cy="12" r="2.6" stroke={STROKE_DARK} strokeWidth="1.1" fill="none" />
      <path d="M10 10.6V12l1 .8" stroke={STROKE_DARK} strokeWidth="1.1" strokeLinecap="round" />
    </Svg>
  );
}

export function IconOrb({ size = 15 }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="10" cy="10" r="8" fill="url(#orbGrad)" />
      <defs>
        <radialGradient id="orbGrad" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffe1a0" />
          <stop offset="1" stopColor="#e08a1e" />
        </radialGradient>
      </defs>
      <path d="M7 10.2 9 12.4l4-5" stroke="#7a3d00" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
