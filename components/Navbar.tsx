"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { useLenis, useScrollTo } from "./SmoothScroll";
import { gsap, useGSAP } from "@/lib/gsap";
import { localePath, type Dictionary, type Locale } from "@/content";

export default function Navbar({ t, locale }: { t: Dictionary; locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollTo();
  const lenis = useLenis();

  // Glass background after leaving the top, hide when scrolling down, show when scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useGSAP(
    () => {
      gsap.from("nav", { y: -40, opacity: 0, duration: 1.2, delay: 0.2 });
    },
    { scope: ref },
  );

  useGSAP(() => {
    if (!open) return;
    gsap.from("[data-mobile-link]", { y: 40, opacity: 0, stagger: 0.06, duration: 0.8 });
  }, [open]);

  const onNav = (e: React.MouseEvent, href: string) => {
    if (scrollTo(href)) e.preventDefault();
    setOpen(false);
  };

  const other: Locale = locale === "vi" ? "en" : "vi";

  return (
    <>
      <header
        ref={ref}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled || open ? "glass border-b border-navy-900/5 shadow-[0_8px_30px_-20px_rgb(10_26_71/0.35)]" : ""
          }`}
        >
          <nav className="container-x flex h-16 items-center justify-between gap-6">
            <Link href={localePath[locale]} aria-label="Hi Daniel!" onClick={(e) => onNav(e, "#top")}>
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {t.nav.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={(e) => onNav(e, l.href)}
                    className="group relative rounded-full px-4 py-2 text-[14.5px] font-medium text-navy-900/75 transition-colors hover:text-navy-900"
                  >
                    {l.label}
                    <span className="absolute inset-x-4 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-flame-500 transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <LangSwitch locale={locale} />
              <a href="#" className="hidden px-3 text-[14.5px] font-medium text-navy-900/80 hover:text-navy-900 md:inline">
                {t.nav.login}
              </a>
              <a href="#pricing" onClick={(e) => onNav(e, "#pricing")} className="btn-primary hidden !px-5 !py-2.5 !text-sm sm:inline-flex">
                {t.nav.cta}
              </a>
              <button
                onClick={() => setOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full text-navy-900 ring-1 ring-navy-900/10 lg:hidden"
                aria-label={t.nav.menu}
                aria-expanded={open}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
        <div ref={progressRef} className="h-[2px] origin-left scale-x-0 bg-gradient-to-r from-flame-500 via-sun-brand to-flame-400" />
      </header>

      {open && (
        <div className="glass fixed inset-0 z-40 pt-24 lg:hidden">
          <ul className="container-x flex flex-col gap-2">
            {t.nav.links.map((l) => (
              <li key={l.href} data-mobile-link>
                <Link
                  href={l.href}
                  onClick={(e) => onNav(e, l.href)}
                  className="flex items-center justify-between border-b border-navy-900/10 py-4 text-3xl font-bold tracking-tight text-navy-900"
                >
                  {l.label}
                  <ArrowRight className="text-flame-500" />
                </Link>
              </li>
            ))}
            <li data-mobile-link className="pt-6">
              <a href="#pricing" onClick={(e) => onNav(e, "#pricing")} className="btn-primary w-full">
                {t.nav.cta}
              </a>
            </li>
            <li data-mobile-link className="pt-2 text-center">
              <Link href={localePath[other]} className="text-sm font-semibold text-navy-900/60">
                {other === "en" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

function LangSwitch({ locale }: { locale: Locale }) {
  return (
    <div className="relative flex rounded-full bg-navy-900/5 p-1 text-xs font-bold ring-1 ring-navy-900/5">
      <span
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-500 ease-out-expo ${
          locale === "en" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {(["vi", "en"] as const).map((l) => (
        <Link
          key={l}
          href={localePath[l]}
          aria-current={l === locale ? "true" : undefined}
          className={`relative z-10 w-9 rounded-full py-1.5 text-center uppercase transition-colors ${
            l === locale ? "text-navy-900" : "text-navy-900/45 hover:text-navy-900/80"
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}
