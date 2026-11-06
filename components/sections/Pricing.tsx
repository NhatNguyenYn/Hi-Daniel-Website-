"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import SplitReveal from "../anim/SplitReveal";
import SmartLink from "../SmartLink";
import { resolveHref } from "@/lib/lms";
import type { Dictionary, Locale } from "@/content";

export default function Pricing({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [yearly, setYearly] = useState(true);
  const p = t.pricing;

  return (
    <section id="pricing" className="relative bg-paper py-28 sm:py-36">
      <div className="container-x">
        <div className="text-center">
          <span data-reveal className="eyebrow">
            {p.eyebrow}
          </span>
          <SplitReveal className="heading-lg mx-auto mt-5 max-w-[17ch] text-navy-900">{p.title}</SplitReveal>

          <div data-reveal className="mt-10 inline-flex items-center gap-3">
            <div className="relative flex rounded-full bg-white p-1 ring-1 ring-navy-900/10">
              <span
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-navy-800 transition-transform duration-500 ease-out-expo ${
                  yearly ? "translate-x-full" : ""
                }`}
              />
              {[p.monthly, p.yearly].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setYearly(i === 1)}
                  className={`relative z-10 w-32 rounded-full py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    yearly === (i === 1) ? "text-white" : "text-navy-900/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="rounded-full bg-mint-brand/15 px-3 py-1 text-xs font-bold text-[#0d9a78]">{p.save}</span>
          </div>
        </div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {p.plans.map((plan, i) => {
            const featured = i === 1;
            const price = yearly ? plan.yearly : plan.monthly;
            const numeric = /\d/.test(price) && !price.startsWith("0") && price !== "$0";
            return (
              <div
                key={plan.name}
                data-reveal
                className={`relative flex flex-col rounded-[28px] p-8 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 ${
                  featured
                    ? "bg-navy-900 text-white shadow-[0_40px_90px_-30px_rgb(10_26_71/.65)] lg:-my-4 lg:py-12"
                    : "bg-white text-navy-900 ring-1 ring-navy-900/5"
                }`}
              >
                {featured && (
                  <>
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
                      <div className="absolute -top-32 -right-32 h-80 w-80 bg-[radial-gradient(closest-side,rgb(255_106_19/.35),transparent)]" />
                    </div>
                    <span className="absolute -top-3.5 left-8 rounded-full bg-flame-500 px-3.5 py-1 text-xs font-bold text-white shadow-lg">
                      {p.popular}
                    </span>
                  </>
                )}
                <h3 className="relative text-xl font-bold">{plan.name}</h3>
                <p className={`relative mt-1 text-sm ${featured ? "text-white/60" : "text-navy-900/55"}`}>{plan.desc}</p>
                <div className="relative mt-7 flex items-baseline gap-1">
                  <span key={price} className="animate-fade-up text-[42px] leading-none font-extrabold tracking-tight">
                    {price}
                  </span>
                  {numeric && <span className={featured ? "text-white/50" : "text-navy-900/45"}>{p.perMonth}</span>}
                </div>
                {/* Plans without a real destination (trial, sales contact) keep "#" for now. */}
                <SmartLink href={plan.href ? resolveHref(plan.href, locale) : "#"} className={`relative mt-8 w-full ${featured ? "btn-primary" : "btn-ghost !bg-navy-50 hover:!bg-navy-100"}`}>
                  {plan.cta}
                </SmartLink>
                <ul className="relative mt-8 flex flex-col gap-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-[15px] ${featured ? "text-white/85" : "text-navy-900/75"}`}>
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                          featured ? "bg-flame-500 text-white" : "bg-navy-800 text-white"
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
