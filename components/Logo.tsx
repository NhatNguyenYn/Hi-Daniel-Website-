type Props = { dark?: boolean; className?: string; showWordmark?: boolean };

/** Vector version of the Hi Daniel! logo (bubble + book + sparks). */
export function LogoMark({ className = "h-9 w-9", dark = false }: { className?: string; dark?: boolean }) {
  const bubble = dark ? "#ffffff" : "#0e2460";
  const page = dark ? "#0e2460" : "#ffffff";
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="5" y="13" width="47" height="34" rx="11" fill={bubble} />
      <path d="M14 44 L11.5 57 L28 46 Z" fill={bubble} />
      <path d="M13 22.5c4.5-2.4 10.5-2.2 14.6 1.2v16.6c-4.3-2.6-10.1-2.8-14.6-1z" fill={page} />
      <path d="M29.6 23.7c4.1-3.4 10.1-3.6 14.6-1.2v16.8c-4.5-1.8-10.3-1.6-14.6 1z" fill={page} />
      <path d="M37.4 21.4h4.6v7.6l-2.3-1.9-2.3 1.9z" fill="#ff6a13" />
      <g stroke="#ff6a13" strokeWidth="2.8" strokeLinecap="round">
        <path d="M51 9.5 53 4" />
        <path d="M54.5 13 59 8.6" />
        <path d="M56 17.5 61.5 16.3" />
      </g>
    </svg>
  );
}

export default function Logo({ dark = false, className = "", showWordmark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark dark={dark} />
      {showWordmark && (
        <span className={`text-[19px] font-extrabold tracking-[-0.02em] ${dark ? "text-white" : "text-navy-800"}`}>
          Hi Daniel<span className="text-flame-500">!</span>
        </span>
      )}
    </span>
  );
}
