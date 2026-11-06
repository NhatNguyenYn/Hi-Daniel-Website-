"use client";

import { useEffect } from "react";
import { ArrowRight, BookOpen, ChartLine, ClipboardCheck, GraduationCap, Info, Layers, LogIn, ShieldCheck, Users } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./sections/Footer";
import SmartLink from "./SmartLink";
import { LogoMark } from "./Logo";
import { lmsHref } from "@/lib/lms";
import { dictionaries, lmsProductPath, localePath, type Locale } from "@/content";

const icons = {
  course: BookOpen,
  lessons: Layers,
  students: Users,
  grading: ClipboardCheck,
  progress: ChartLine,
  teach: GraduationCap,
  admin: ShieldCheck,
} as const;

/**
 * Product page for Hi Daniel! LMS. Describes only features the LMS has today
 * (no figures, testimonials or screenshots). Without NEXT_PUBLIC_LMS_URL the
 * LMS is not public, so the page says so instead of showing dead buttons.
 */
export default function LmsPage({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  const p = t.lmsPage;
  const register = lmsHref("/register");
  const login = lmsHref("/login");
  const courses = lmsHref("/courses");
  const home = lmsHref("/");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      <Navbar t={t} locale={locale} onLanding={false} alternates={lmsProductPath} />
      <main>
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[560px] max-w-[900px] rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, rgb(255 106 19 / .22), transparent 70%), radial-gradient(closest-side at 25% 60%, rgb(61 139 255 / .18), transparent 70%)",
            }}
          />
          <div className="container-x text-center">
            <span className="eyebrow">{p.eyebrow}</span>
            <h1 className="heading-xl mx-auto mt-6 max-w-[16ch] text-navy-900">{p.title}</h1>
            <p className="mx-auto mt-7 max-w-[620px] text-[17px] leading-relaxed text-navy-900/65 sm:text-[19px]">{p.subtitle}</p>

            {register && login && courses ? (
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={register} className="btn-primary group">
                  {p.register}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href={login} className="btn-ghost">
                  <LogIn size={17} /> {p.login}
                </a>
                <a href={courses} className="btn px-4 text-navy-900/75 hover:text-navy-900">
                  {p.courses}
                </a>
              </div>
            ) : (
              <NotLive text={p.notLive} />
            )}
            <p className="mt-5 text-[13px] text-navy-900/45">{p.note}</p>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="container-x">
            <h2 className="heading-lg max-w-[18ch] text-navy-900">{p.featuresTitle}</h2>
            <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.features.map((f) => {
                const Icon = icons[f.icon as keyof typeof icons];
                return (
                  <li key={f.title} className="rounded-[28px] bg-paper p-7 ring-1 ring-navy-900/5">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-navy-800 text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-navy-900">{f.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-navy-900/65">{f.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container-x">
            <h2 className="heading-lg max-w-[18ch] text-navy-900">{p.rolesTitle}</h2>
            <ol className="mt-14 grid gap-6 lg:grid-cols-3">
              {p.roles.map((r, i) => (
                <li key={r.name} className="rounded-[28px] bg-white p-7 ring-1 ring-navy-900/5">
                  <span className="text-sm font-bold text-flame-500">0{i + 1}</span>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-navy-900">{r.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-900/65">{r.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="relative overflow-hidden bg-navy-900 py-24 text-white sm:py-28">
          <div aria-hidden className="pointer-events-none absolute top-1/2 -right-[8%] -translate-y-1/2 opacity-10">
            <LogoMark dark className="h-[50vmin] w-[50vmin]" />
          </div>
          <div className="container-x relative">
            <h2 className="heading-lg max-w-[16ch]">{p.ctaTitle}</h2>
            {register && home ? (
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href={register} className="btn-primary group">
                  {p.register}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href={home} className="btn-ghost-dark">
                  {p.ctaOpen}
                </a>
              </div>
            ) : (
              <SmartLink href={localePath[locale]} className="btn-ghost-dark mt-10">
                {p.backHome}
              </SmartLink>
            )}
          </div>
        </section>
      </main>
      <Footer t={t} locale={locale} alternate={lmsProductPath[locale === "vi" ? "en" : "vi"]} />
    </>
  );
}

function NotLive({ text }: { text: string }) {
  return (
    <p
      role="note"
      className="mx-auto mt-9 flex max-w-[560px] items-start gap-3 rounded-2xl bg-white p-4 text-left text-[15px] text-navy-900/75 ring-1 ring-navy-900/10"
    >
      <Info size={20} className="mt-0.5 shrink-0 text-flame-500" />
      {text}
    </p>
  );
}
