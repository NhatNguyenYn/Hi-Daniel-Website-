"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger, DESKTOP, MOTION_OK } from "@/lib/gsap";
import SplitReveal from "../anim/SplitReveal";
import { useLenis } from "../SmoothScroll";
import { ProductScreen } from "../mockups";
import SmartLink from "../SmartLink";
import { lmsProductPath, type Dictionary, type Locale } from "@/content";

const accents = {
  lms: { text: "text-flame-500", bg: "bg-flame-500", glow: "rgb(255 106 19 / .35)" },
  live: { text: "text-sky-brand", bg: "bg-sky-brand", glow: "rgb(61 139 255 / .35)" },
  studio: { text: "text-violet-brand", bg: "bg-violet-brand", glow: "rgb(139 92 246 / .35)" },
  insights: { text: "text-mint-brand", bg: "bg-mint-brand", glow: "rgb(31 200 160 / .35)" },
} as const;

type Key = keyof typeof accents;

function Screen({ p, t, locale }: { p: Dictionary["products"]["items"][number]; t: Dictionary; locale: Locale }) {
  return <ProductScreen k={p.key as Key} m={t.mock} locale={locale} alt={p.name} />;
}

/** Pinned "one product per scroll step" showcase on desktop; a simple stack on mobile. */
export default function Products({ t, locale }: { t: Dictionary; locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const items = t.products.items;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const steps = panels.length - 1;
        gsap.set(panels.slice(1), { opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: "[data-products-pin]",
            start: "top top",
            end: `+=${steps * 90}%`,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: 1 / steps, duration: { min: 0.3, max: 0.8 }, delay: 0.08, ease: "power2.inOut" },
            onUpdate: (self) => setActive(Math.round(self.progress * steps)),
          },
        });
        trigger.current = tl.scrollTrigger ?? null;

        for (let i = 1; i <= steps; i++) {
          tl.to(panels[i - 1], { opacity: 0, scale: 0.9, yPercent: -8, rotateX: 8 })
            .fromTo(panels[i], { opacity: 0, scale: 1.08, yPercent: 10, rotateX: -8 }, { opacity: 1, scale: 1, yPercent: 0, rotateX: 0 }, "<")
            .to(`[data-glow="${items[i - 1].key}"]`, { opacity: 0 }, "<")
            .to(`[data-glow="${items[i].key}"]`, { opacity: 1 }, "<");
        }
        return () => (trigger.current = null);
      });
    },
    { scope: root },
  );

  const goTo = (i: number) => {
    const st = trigger.current;
    if (!st) return setActive(i);
    const y = st.start + ((st.end - st.start) * i) / (items.length - 1);
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  // overflow-x-clip: the glow layers (-inset-16) must not widen the page.
  return (
    <section ref={root} id="products" className="relative overflow-x-clip bg-white">
      <div className="container-x pt-28 text-center sm:pt-36">
        <span data-reveal className="eyebrow">
          {t.products.eyebrow}
        </span>
        <SplitReveal className="heading-lg mx-auto mt-5 max-w-[16ch] text-navy-900">{t.products.title}</SplitReveal>
        <p data-reveal className="mx-auto mt-5 max-w-[540px] text-[17px] text-navy-900/60">
          {t.products.subtitle}
        </p>
      </div>

      <div data-products-pin className="relative lg:flex lg:h-screen lg:items-center">
        <div className="container-x grid gap-16 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-0">
          {/* Product list */}
          <ol className="relative flex flex-col gap-14 lg:gap-2">
            <span className="absolute top-2 bottom-2 left-[15px] hidden w-px bg-navy-900/10 lg:block">
              <span
                className="block w-full bg-navy-900 transition-[height] duration-700 ease-out-expo"
                style={{ height: `${(active / (items.length - 1)) * 100}%` }}
              />
            </span>
            {items.map((p, i) => {
              const a = accents[p.key as Key];
              const on = active === i;
              return (
                <li key={p.key} className="relative lg:pl-12">
                  <button
                    onClick={() => goTo(i)}
                    className={`group hidden w-full text-left transition-opacity duration-500 lg:block ${on ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                  >
                    <span
                      className={`absolute top-[6px] left-[9px] h-3.5 w-3.5 rounded-full ring-4 ring-white transition-all duration-500 ${on ? `${a.bg} scale-125` : "bg-navy-200"}`}
                    />
                    <span className={`text-sm font-bold ${a.text}`}>{p.tagline}</span>
                    <span className="mt-1 block text-[28px] font-extrabold tracking-tight text-navy-900">{p.name}</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-700 ease-out-expo ${on ? "lg:grid-rows-[1fr]" : "lg:grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      {/* Mobile heading */}
                      <div data-reveal className="lg:hidden">
                        <span className={`text-sm font-bold ${a.text}`}>{p.tagline}</span>
                        <h3 className="mt-1 text-[30px] font-extrabold tracking-tight text-navy-900">{p.name}</h3>
                      </div>
                      <p className="mt-3 max-w-[46ch] text-[16px] leading-relaxed text-navy-900/65">{p.description}</p>
                      <ul className="mt-4 flex flex-col gap-2 pb-6">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2.5 text-[15px] font-medium text-navy-900/80">
                            <span className={`grid h-5 w-5 place-items-center rounded-full text-white ${a.bg}`}>
                              <Check size={12} strokeWidth={3} />
                            </span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                      {/* Only the LMS exists today; the other modules are labelled, not linked. */}
                      {p.key === "lms" ? (
                        <SmartLink
                          href={lmsProductPath[locale]}
                          className={`inline-flex items-center gap-1.5 text-[15px] font-semibold ${a.text} group/link`}
                        >
                          {t.products.learnMore}
                          <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                        </SmartLink>
                      ) : (
                        <span className="inline-flex rounded-full bg-navy-900/5 px-3 py-1 text-[13px] font-semibold text-navy-900/55">
                          {t.products.comingSoon}
                        </span>
                      )}
                      <div data-reveal className="mt-8 lg:hidden">
                        <Screen p={p} t={t} locale={locale} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Desktop stage */}
          <div className="relative hidden aspect-[16/12] [perspective:1600px] lg:block">
            {items.map((p, i) => (
              <div
                key={p.key}
                data-glow={p.key}
                className="absolute -inset-16 will-change-[opacity]"
                style={{ opacity: i === 0 ? 1 : 0, background: `radial-gradient(closest-side, ${accents[p.key as Key].glow}, transparent)` }}
              />
            ))}
            {items.map((p) => (
              <div key={p.key} data-panel className="absolute inset-0 flex items-center will-change-transform">
                <div className="w-full">
                  <Screen p={p} t={t} locale={locale} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
