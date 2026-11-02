"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { dictionaries, type Locale } from "@/content";
import SmoothScroll from "./SmoothScroll";
import Navbar from "./Navbar";
import Hero from "./sections/Hero";
import Manifesto from "./sections/Manifesto";
import Stats from "./sections/Stats";
import Products from "./sections/Products";
import Features from "./sections/Features";
import Courses from "./sections/Courses";
import Testimonials from "./sections/Testimonials";
import Pricing from "./sections/Pricing";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";

export default function Landing({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Infinite CSS animations keep the GPU busy even when off-screen; pause them there.
  useEffect(() => {
    const loops = root.current!.querySelectorAll<HTMLElement>(
      "[class*='animate-marquee'], [class*='animate-float'], [class*='animate-ping'], [class*='animate-bounce'], [class*='animate-pulse']",
    );
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("offscreen", !e.isIntersecting)),
      { rootMargin: "200px" },
    );
    loops.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Every element marked `data-reveal` fades up when it enters the viewport.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, stagger: 0.09, duration: 1.2, overwrite: true }),
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
      });

      // Pinned sections change page height once fonts/layout settle.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    },
    { scope: root },
  );

  return (
    <SmoothScroll>
      <div ref={root}>
        <Navbar t={t} locale={locale} />
        <main>
          <Hero t={t} locale={locale} />
          <Manifesto t={t} />
          <Stats t={t} locale={locale} />
          <Products t={t} locale={locale} />
          <Features t={t} />
          <Courses t={t} />
          <Testimonials t={t} />
          <Pricing t={t} />
          <FinalCTA t={t} />
        </main>
        <Footer t={t} locale={locale} />
      </div>
    </SmoothScroll>
  );
}
