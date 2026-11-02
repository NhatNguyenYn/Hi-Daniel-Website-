"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, DESKTOP, MOTION_OK } from "@/lib/gsap";
import { LogoMark } from "../Logo";
import type { Dictionary } from "@/content";

/** Splits `text` so that each phrase in `highlights` can be styled. */
function segments(text: string, highlights: string[]) {
  const pattern = new RegExp(`(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).filter(Boolean);
}

/** "Scroll to read": each word lights up as you scroll through the section. */
export default function Manifesto({ t }: { t: Dictionary }) {
  const root = useRef<HTMLElement>(null);
  const { eyebrow, text, highlight } = t.manifesto;

  useGSAP(
    () => {
      const el = root.current!.querySelector<HTMLElement>("[data-manifesto]")!;
      const mm = gsap.matchMedia();

      mm.add({ desktop: DESKTOP, motion: MOTION_OK }, (ctx) => {
        const { desktop, motion } = ctx.conditions!;
        if (!motion) return;

        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.12 },
              {
                opacity: 1,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: desktop
                  ? { trigger: root.current, start: "top top", end: "+=160%", scrub: 0.6, pin: true }
                  : { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
              },
            );
          },
        });

        gsap.to("[data-manifesto-mark]", {
          rotate: 18,
          scale: 1.25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="grain relative flex min-h-screen items-center overflow-hidden bg-navy-950 py-28 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 -right-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgb(255_106_19/.22),transparent)]" />
        <div className="absolute -bottom-1/3 -left-1/4 h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(61_139_255/.18),transparent)]" />
        <div data-manifesto-mark className="absolute top-[12%] right-[6%] opacity-[0.07]">
          <LogoMark dark className="h-[38vmin] w-[38vmin]" />
        </div>
      </div>

      <div className="container-x relative">
        <span className="eyebrow !text-flame-400">
          <span className="h-px w-8 bg-flame-400" /> {eyebrow}
        </span>
        <p
          data-manifesto
          className="mt-8 max-w-[22ch] text-[clamp(1.9rem,4.6vw,4.1rem)] leading-[1.12] font-bold tracking-[-0.025em] sm:max-w-[26ch]"
        >
          {segments(text, highlight).map((part, i) =>
            highlight.includes(part) ? (
              <span key={i} className="text-flame-400">
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </p>
      </div>
    </section>
  );
}
