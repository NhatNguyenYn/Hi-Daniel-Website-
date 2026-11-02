"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import type { Dictionary, Locale } from "@/content";

export default function Stats({ t, locale }: { t: Dictionary; locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const fmt = new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US");

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const counter = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(counter, {
              v: target,
              duration: 2.2,
              ease: "power3.out",
              onUpdate: () => (el.textContent = fmt.format(Math.round(counter.v))),
            }),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {t.stats.items.map((s) => (
            <div key={s.label} data-reveal className="border-l-2 border-flame-500/80 pl-5">
              <div className="text-[clamp(2.6rem,5vw,4.2rem)] leading-none font-extrabold tracking-[-0.04em] text-navy-900 tabular-nums">
                <span data-count={s.value}>0</span>
                <span className="text-flame-500">{s.suffix}</span>
              </div>
              <p className="mt-3 max-w-[22ch] text-[15px] leading-snug text-navy-900/60">{s.label}</p>
            </div>
          ))}
        </div>

        <p data-reveal className="mt-24 text-center text-sm font-semibold tracking-wide text-navy-900/45">
          {t.stats.trustedBy}
        </p>
      </div>

      <div data-reveal className="mask-fade-x mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee gap-14 [--marquee-duration:38s] hover:[animation-play-state:paused]">
          {[...t.stats.logos, ...t.stats.logos].map((name, i) => (
            <span key={i} className="flex items-center gap-2.5 text-[22px] font-extrabold whitespace-nowrap text-navy-900/30 transition-colors hover:text-navy-900">
              <span className={`h-6 w-6 ${["rounded-full", "rounded-md", "rotate-45 rounded-sm", "rounded-[40%_10%]"][i % 4]} bg-current`} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
