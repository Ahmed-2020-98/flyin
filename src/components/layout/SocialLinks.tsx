// Brand social glyphs as inline SVG — lucide-react v1 no longer ships brand
// logos, so we render them ourselves to keep the footer recognizable.

const ICONS: { label: string; svg: React.ReactNode }[] = [
  {
    label: "Facebook",
    svg: (
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
    ),
  },
  {
    label: "X",
    svg: (
      <path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5.3-6.9L4.8 22H1.7l7.8-8.9L1 2h6.9l4.8 6.4L18.9 2zm-2.4 18h1.9L7.6 3.9H5.6L16.5 20z" />
    ),
  },
  {
    label: "Instagram",
    svg: (
      <>
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.3" cy="6.7" r="1.2" />
      </>
    ),
  },
  {
    label: "YouTube",
    svg: (
      <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3 26 26 0 0 0 1 12a26 26 0 0 0 .4 4.7 2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.7.4-4.7zM9.8 15.3V8.7l6 3.3-6 3.3z" />
    ),
  },
  {
    label: "LinkedIn",
    svg: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z" />
    ),
  },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-2">
      {ICONS.map((icon) => (
        <a
          key={icon.label}
          href="#"
          aria-label={icon.label}
          className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            {icon.svg}
          </svg>
        </a>
      ))}
    </div>
  );
}
