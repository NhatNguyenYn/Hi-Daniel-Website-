import Link from "next/link";
import Logo from "../Logo";
import SmartLink from "../SmartLink";
import { localePath, type Dictionary, type Locale } from "@/content";

const socials = [
  { label: "Facebook", d: "M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v7h4v-7h3l1-4h-4V8.6c0-.4.3-.6.6-.6z" },
  { label: "YouTube", d: "M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8zM10 15V9l5.2 3z" },
  { label: "TikTok", d: "M16.5 3c.4 2.3 1.9 3.8 4.2 4v3.2c-1.6 0-3-.5-4.2-1.3V15a6 6 0 1 1-6-6v3.3a2.8 2.8 0 1 0 2.8 2.8V3z" },
  { label: "LinkedIn", d: "M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm4 6h3.8v1.7c.6-1 1.9-2 3.9-2 4.1 0 4.3 2.7 4.3 6.1V21h-4v-5.4c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V21H10z" },
];

/** `alternate`: the same page in the other language (defaults to the other landing page). */
export default function Footer({ t, locale, alternate }: { t: Dictionary; locale: Locale; alternate?: string }) {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-24 text-white">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-white/55">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-flame-500 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {t.footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold">{col.title}</h4>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <SmartLink href={l.href ?? "#"} className="text-[14.5px] text-white/50 transition-colors hover:text-flame-400">
                        {l.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/45 sm:flex-row sm:items-center">
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-6">
            {t.footer.legal.map((l) => (
              <a key={l} href="#" className="hover:text-white">
                {l}
              </a>
            ))}
            <Link href={alternate ?? localePath[locale === "vi" ? "en" : "vi"]} className="font-semibold text-white/70 hover:text-white">
              {locale === "vi" ? "English" : "Tiếng Việt"}
            </Link>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none -mb-[0.22em] text-center text-[22vw] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap select-none"
        style={{
          background: "linear-gradient(180deg, rgb(255 255 255 / .09), rgb(255 255 255 / 0) 85%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Hi Daniel!
      </div>
    </footer>
  );
}
