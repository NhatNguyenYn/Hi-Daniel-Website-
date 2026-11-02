"use client";

import { useRef } from "react";
import { ArrowRight, Play, Sparkles, Trophy, CircleCheck, Bell } from "lucide-react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { ProductScreen } from "../mockups";
import type { Dictionary, Locale } from "@/content";

export default function Hero({ t, locale }: { t: Dictionary; locale: Locale }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const title = root.current!.querySelector<HTMLElement>("[data-hero-title]")!;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        SplitText.create(title, {
          type: "words",
          mask: "words",
          autoSplit: true,
          onSplit(self) {
            // Keep the gradient on words that came from the second line.
            self.words.forEach((w) => w.closest(".text-gradient") && w.classList.add("text-gradient"));
            gsap.set(title, { visibility: "visible" });
            return gsap.from(self.words, { yPercent: 115, rotate: 6, stagger: 0.06, duration: 1.4, delay: 0.35 });
          },
        });

        gsap
          .timeline({ delay: 0.25 })
          .from("[data-hero-badge]", { y: -20, opacity: 0, duration: 1 })
          .from("[data-hero-fade]", { y: 30, opacity: 0, stagger: 0.1, duration: 1.2 }, 0.75)
          .from("[data-hero-rise]", { y: 160, opacity: 0, duration: 1.8 }, 0.85)
          .from("[data-chip]", { scale: 0.6, opacity: 0, stagger: 0.12, duration: 1, ease: "back.out(2)" }, 1.4);

        // Apple-style: the tilted screen flattens and grows as you scroll.
        gsap.fromTo(
          "[data-hero-screen]",
          { rotateX: 26, scale: 0.88, y: 0 },
          {
            rotateX: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-hero-stage]", start: "top 95%", end: "top 20%", scrub: 1 },
          },
        );

        // Floating chips drift at different speeds (parallax).
        gsap.utils.toArray<HTMLElement>("[data-chip]").forEach((chip, i) => {
          gsap.to(chip, {
            y: [-140, -60, -200][i] ?? -100,
            ease: "none",
            scrollTrigger: { trigger: "[data-hero-stage]", start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        gsap.to("[data-hero-glow]", {
          scale: 1.3,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(title, { visibility: "visible" });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-hero-glow
          className="absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full opacity-70 will-change-transform"
          style={{
            background:
              "radial-gradient(closest-side, rgb(255 106 19 / .28), transparent 70%), radial-gradient(closest-side at 20% 60%, rgb(61 139 255 / .22), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(10 26 71 / .05) 1px, transparent 1px), linear-gradient(90deg, rgb(10 26 71 / .05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 55% at 50% 30%, black, transparent)",
          }}
        />
      </div>

      <div className="container-x text-center">
        <a
          data-hero-badge
          href="#products"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 py-1.5 pr-4 pl-1.5 text-[13px] font-medium text-navy-900/80 shadow-sm ring-1 ring-navy-900/10 transition hover:ring-flame-500/40"
        >
          <span className="inline-flex items-center gap-1 rounded-full bg-flame-500 px-2.5 py-1 text-xs font-bold text-white">
            <Sparkles size={12} /> AI
          </span>
          {t.hero.badge}
          <ArrowRight size={14} className="text-flame-500" />
        </a>

        <h1 data-hero-title data-split className="heading-xl mx-auto mt-8 max-w-[14ch] text-navy-900">
          <span className="block">{t.hero.titleLines[0]}</span>
          <span className="text-gradient block">{t.hero.titleLines[1]}</span>
        </h1>

        <p data-hero-fade className="mx-auto mt-7 max-w-[620px] text-[17px] leading-relaxed text-navy-900/65 sm:text-[19px]">
          {t.hero.subtitle}
        </p>

        <div data-hero-fade className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#pricing" className="btn-primary group">
            {t.hero.primary}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="#products" className="btn-ghost group">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-navy-800 text-white transition-transform group-hover:scale-110">
              <Play size={10} className="fill-white" />
            </span>
            {t.hero.secondary}
          </a>
        </div>
        <p data-hero-fade className="mt-4 text-[13px] text-navy-900/45">
          {t.hero.note}
        </p>

        {/* Product stage */}
        <div data-hero-stage className="relative mx-auto mt-16 max-w-[1080px] [perspective:1800px] sm:mt-20">
          <div data-hero-rise className="relative [transform-style:preserve-3d]">
          <div
            className="absolute inset-x-[2%] -bottom-24 h-64 opacity-60"
            style={{
              background:
                "radial-gradient(closest-side at 30% 50%, rgb(255 106 19 / .7), transparent), radial-gradient(closest-side at 55% 50%, rgb(255 191 46 / .55), transparent), radial-gradient(closest-side at 78% 50%, rgb(61 139 255 / .55), transparent)",
            }}
          />
          <div data-hero-screen className="relative origin-[50%_0%] will-change-transform [transform-style:preserve-3d]">
            <ProductScreen k="hero" m={t.mock} locale={locale} alt="Hi Daniel! dashboard" />
          </div>

          <Chip className="top-[18%] -left-3 sm:-left-10" icon={<Trophy size={16} />} color="bg-sun-brand" label={t.mock.chips.xp} />
          <Chip
            className="top-[42%] -right-3 sm:-right-12"
            icon={<CircleCheck size={16} />}
            color="bg-mint-brand"
            label={t.mock.chips.assignment}
          />
          <Chip
            className="bottom-[10%] left-[6%] hidden sm:flex"
            icon={<Bell size={16} />}
            color="bg-flame-500"
            ping
            label={t.mock.chips.live}
          />
          </div>
        </div>
      </div>
    </section>
  );
}

function Chip({
  className,
  icon,
  color,
  label,
  ping = false,
}: {
  className: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  ping?: boolean;
}) {
  return (
    <div data-chip className={`absolute z-10 flex will-change-transform ${className}`}>
      <div className="flex animate-float items-center gap-2.5 rounded-2xl bg-white py-2 pr-4 pl-2 text-left text-[12.5px] font-semibold text-navy-900 shadow-[0_20px_50px_-15px_rgb(10_26_71/0.35)] ring-1 ring-navy-900/5">
        <span className={`relative grid h-8 w-8 place-items-center rounded-xl text-white ${color}`}>
          {ping && <span className="absolute inset-0 animate-ping rounded-xl bg-flame-500/50" />}
          <span className="relative">{icon}</span>
        </span>
        <span className="max-w-[150px] leading-tight sm:max-w-none">{label}</span>
      </div>
    </div>
  );
}
