"use client";

import { useRef } from "react";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";
import { gsap, useGSAP, DESKTOP, MOTION_OK } from "@/lib/gsap";
import SplitReveal from "../anim/SplitReveal";
import { cover } from "../mockups";
import SmartLink from "../SmartLink";
import { resolveHref } from "@/lib/lms";
import type { Dictionary, Locale } from "@/content";

/** Horizontal gallery: vertical scroll moves the cards sideways on desktop. */
export default function Courses({ t, locale }: { t: Dictionary; locale: Locale }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth + 48;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-courses-pin]",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        gsap.to("[data-courses-bar]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-courses-pin]", start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
        });

        // Cards tilt slightly as they travel across the screen.
        gsap.utils.toArray<HTMLElement>("[data-course]").forEach((card) => {
          gsap.fromTo(
            card,
            { rotate: 3, y: 40 },
            {
              rotate: -2,
              y: -20,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="courses" className="grain relative overflow-hidden bg-navy-900 text-white">
      <div data-courses-pin className="flex flex-col justify-center py-28 lg:h-screen lg:py-0">
        <div className="container-x flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span data-reveal className="eyebrow !text-flame-400">
              {t.courses.eyebrow}
            </span>
            <SplitReveal className="heading-lg mt-5 max-w-[15ch]">{t.courses.title}</SplitReveal>
          </div>
          <SmartLink data-reveal href={resolveHref("lms:/courses", locale)} className="btn-ghost-dark group shrink-0">
            {t.courses.viewAll}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </SmartLink>
        </div>

        <div className="mt-14 overflow-x-auto pb-4 [scrollbar-width:none] lg:overflow-visible lg:pb-0">
          <div data-track className="flex w-max gap-6 will-change-transform px-5 sm:px-8 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))]">
            {t.courses.items.map((c) => (
              <article
                key={c.title}
                data-course
                className="group w-[300px] shrink-0 overflow-hidden rounded-[26px] bg-[#16255a] ring-1 ring-white/10 transition-colors duration-500 hover:bg-[#1c2d68] sm:w-[360px]"
              >
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${cover(c.hue)}`}>
                  <div className="absolute -right-10 -bottom-16 h-52 w-52 rounded-full border-[28px] border-white/20 transition-transform duration-700 ease-out-expo group-hover:scale-125" />
                  <div className="absolute top-8 left-24 h-16 w-16 rotate-12 rounded-2xl bg-white/20 transition-transform duration-700 ease-out-expo group-hover:rotate-45" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy-900">{c.tag}</span>
                  <span className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-navy-950/60 px-2.5 py-1 text-xs font-bold">
                    <Star size={12} className="fill-sun-brand text-sun-brand" /> {c.rating}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-[20px] leading-snug font-bold">{c.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{c.teacher}</p>
                  <div className="mt-5 flex items-center gap-4 text-[13px] text-white/60">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={14} /> {c.lessons} {t.courses.lessons}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={14} /> {c.students} {t.courses.students}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-lg font-extrabold">{c.price}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-flame-500 transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="container-x mt-12 hidden lg:block">
          <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
            <div data-courses-bar className="h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-flame-500 to-sun-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
