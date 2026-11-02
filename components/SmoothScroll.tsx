"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** Inertia scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      // Touch devices keep native (already smooth, GPU-driven) scrolling.
      syncTouch: false,
      // Every in-page "#section" link glides instead of jumping.
      anchors: { offset: -72, duration: 1.4 },
    });
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Scroll to an in-page anchor smoothly; falls back to native scrolling. */
export function useScrollTo() {
  const lenis = useLenis();
  return (href: string) => {
    if (!href.startsWith("#")) return false;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return false;
    if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
    return true;
  };
}
