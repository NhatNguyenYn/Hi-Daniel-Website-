"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ ease: "expo.out", duration: 1.1 });

// Mobile browsers resize the viewport when the address bar shows/hides;
// re-measuring every pinned section then causes visible jumps.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const DESKTOP = "(min-width: 1024px)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
