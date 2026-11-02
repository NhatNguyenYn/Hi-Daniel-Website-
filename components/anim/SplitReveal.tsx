"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  children: React.ReactNode;
  /** Play on mount instead of when scrolled into view (use for above-the-fold text). */
  immediate?: boolean;
  delay?: number;
};

/** Text that rises line by line out of a mask as it scrolls into view. */
export default function SplitReveal({ as: Tag = "h2", className, children, immediate = false, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      SplitText.create(el, {
        type: "lines,words",
        mask: "lines",
        linesClass: "pb-[0.08em]",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: "visible" });
          return gsap.from(self.words, {
            yPercent: 120,
            rotate: 4,
            stagger: 0.035,
            duration: 1.25,
            delay,
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} data-split className={className}>
      {children}
    </Tag>
  );
}
