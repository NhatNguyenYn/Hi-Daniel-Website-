"use client";

import { useRef } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SplitReveal from "../anim/SplitReveal";
import { LogoMark } from "../Logo";
import type { Dictionary } from "@/content";

/** The card grows from an inset rounded panel to full-bleed as you scroll in. */
export default function FinalCTA({ t }: { t: Dictionary }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-cta-panel]",
          { clipPath: "inset(6% 5% 6% 5% round 48px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 10%", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-cta-mark]",
          { scale: 0.6, rotate: -20 },
          {
            scale: 1.15,
            rotate: 10,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-paper">
      <div
        data-cta-panel
        className="relative overflow-hidden bg-[linear-gradient(135deg,#ff6a13_0%,#ff8236_45%,#ffbf2e_100%)] py-32 text-white sm:py-44"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 -right-[10%] -translate-y-1/2 opacity-20 will-change-transform" data-cta-mark>
            <LogoMark dark className="h-[60vmin] w-[60vmin]" />
          </div>
          <div className="absolute -bottom-1/2 -left-1/4 h-[80vmin] w-[80vmin] rounded-full bg-[radial-gradient(closest-side,rgb(14_36_96/.35),transparent)]" />
        </div>

        <div className="container-x relative">
          <SplitReveal className="heading-xl max-w-[16ch] text-white">{t.cta.title}</SplitReveal>
          <p data-reveal className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-white/85">
            {t.cta.subtitle}
          </p>
          <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#" className="btn group bg-navy-900 text-white shadow-[0_15px_40px_-12px_rgb(10_26_71/.7)] hover:-translate-y-0.5 hover:bg-navy-800">
              {t.cta.primary}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#" className="btn-ghost-dark !bg-white/15 hover:!bg-white/25">
              <Calendar size={17} /> {t.cta.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
