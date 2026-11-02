"use client";

import { Bot, Trophy, CircleCheck, Smartphone, Plug, ShieldCheck, Sparkles, Flame } from "lucide-react";
import SplitReveal from "../anim/SplitReveal";
import type { Dictionary } from "@/content";

const icons = { bot: Bot, trophy: Trophy, check: CircleCheck, phone: Smartphone, plug: Plug, shield: ShieldCheck };

// Bento layout: [AI (wide)] [Gamification (tall)] / [Grading] [Mobile] / [Integrations (wide)] [Security]
const layout = [
  "lg:col-span-2",
  "lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
];

export default function Features({ t }: { t: Dictionary }) {
  return (
    <section id="features" className="relative bg-paper py-28 sm:py-36">
      <div className="container-x">
        <div className="max-w-[720px]">
          <span data-reveal className="eyebrow">
            {t.features.eyebrow}
          </span>
          <SplitReveal className="heading-lg mt-5 text-navy-900">{t.features.title}</SplitReveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((f, i) => {
            const Icon = icons[f.icon as keyof typeof icons] ?? Sparkles;
            return (
              <article
                key={f.title}
                data-reveal
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
                }}
                className={`group relative flex flex-col overflow-hidden rounded-[28px] bg-white p-7 ring-1 ring-navy-900/5 transition-[box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgb(10_26_71/0.35)] sm:p-8 ${layout[i]}`}
              >
                {/* Spotlight that follows the cursor */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(420px circle at var(--x) var(--y), rgb(255 106 19 / .09), transparent 60%)" }}
                />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-800 text-white transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-[22px] font-bold tracking-tight text-navy-900">{f.title}</h3>
                <p className="mt-2 max-w-[42ch] text-[15.5px] leading-relaxed text-navy-900/60">{f.text}</p>
                <div className="mt-auto pt-8">
                  <Visual kind={f.icon} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Visual({ kind }: { kind: string }) {
  switch (kind) {
    case "bot":
      return (
        <div className="flex flex-col gap-2.5">
          <div className="ml-auto w-[62%] rounded-2xl rounded-br-md bg-navy-800 p-3">
            <div className="h-2 w-4/5 rounded bg-white/40" />
            <div className="mt-1.5 h-2 w-1/2 rounded bg-white/25" />
          </div>
          <div className="flex items-end gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-flame-400 to-flame-600 text-white">
              <Sparkles size={14} />
            </span>
            <div className="w-[70%] rounded-2xl rounded-bl-md bg-flame-50 p-3">
              <div className="h-2 w-full rounded bg-flame-200" />
              <div className="mt-1.5 h-2 w-3/4 rounded bg-flame-200" />
              <div className="mt-2.5 flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-flame-500" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case "trophy":
      return (
        <div className="flex flex-col gap-2">
          <div className="mx-auto mb-3 grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-sun-brand to-flame-500 shadow-[0_20px_40px_-15px_rgb(255_106_19/.7)] transition-transform duration-700 ease-out-expo group-hover:rotate-[14deg] group-hover:scale-105">
            <Trophy size={46} className="text-white" />
          </div>
          {[
            { n: "Bảo Anh", xp: "2,480", c: "from-sun-brand to-flame-500", r: 1 },
            { n: "Minh Khôi", xp: "2,315", c: "from-sky-brand to-navy-500", r: 2 },
            { n: "Thu Hà", xp: "2,190", c: "from-mint-brand to-sky-brand", r: 3 },
          ].map((p) => (
            <div key={p.n} className="flex items-center gap-3 rounded-xl bg-paper px-3 py-2.5">
              <span className="w-4 text-sm font-extrabold text-navy-900/40">{p.r}</span>
              <span className={`h-7 w-7 rounded-full bg-gradient-to-br ${p.c}`} />
              <span className="text-sm font-semibold text-navy-900">{p.n}</span>
              <span className="ml-auto flex items-center gap-1 text-sm font-bold text-flame-500">
                <Flame size={13} /> {p.xp}
              </span>
            </div>
          ))}
        </div>
      );
    case "check":
      return (
        <div className="flex items-center gap-5">
          <div
            className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
            style={{ background: "conic-gradient(#1fc8a0 0 95%, #eef2fb 0)" }}
          >
            <div className="grid h-[76px] w-[76px] place-items-center rounded-full bg-white text-2xl font-extrabold text-navy-900">9.5</div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            {[1, 1, 1, 0].map((ok, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`h-4 w-4 rounded-full ${ok ? "bg-mint-brand" : "bg-flame-400"}`} />
                <span className="h-2 flex-1 rounded bg-navy-50" />
              </div>
            ))}
          </div>
        </div>
      );
    case "phone":
      return (
        <div className="mx-auto h-40 w-24 rounded-[22px] bg-navy-900 p-1.5 shadow-xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:rotate-[-6deg]">
          <div className="h-full rounded-[17px] bg-gradient-to-b from-flame-400 to-flame-600 p-2">
            <div className="mx-auto h-1 w-6 rounded-full bg-white/50" />
            <div className="mt-3 h-10 rounded-lg bg-white/25" />
            <div className="mt-1.5 h-2 w-3/4 rounded bg-white/50" />
            <div className="mt-1 h-2 w-1/2 rounded bg-white/35" />
            <div className="mt-3 grid grid-cols-2 gap-1">
              <div className="h-6 rounded bg-white/25" />
              <div className="h-6 rounded bg-white/25" />
            </div>
          </div>
        </div>
      );
    case "plug":
      return (
        <div className="flex flex-wrap items-center gap-3">
          {[
            ["G", "bg-white text-[#4285f4]"],
            ["M", "bg-white text-[#f25022]"],
            ["Z", "bg-[#2d8cff] text-white"],
            ["Za", "bg-[#0068ff] text-white"],
            ["VN", "bg-white text-[#e30019]"],
            ["+", "bg-navy-800 text-white"],
          ].map(([l, c], i) => (
            <span
              key={l}
              className={`grid h-14 w-14 place-items-center rounded-2xl text-lg font-extrabold shadow-[0_10px_25px_-12px_rgb(10_26_71/.4)] ring-1 ring-navy-900/5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1.5 ${c}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {l}
            </span>
          ))}
        </div>
      );
    default:
      return (
        <div className="relative mx-auto grid h-28 w-28 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-mint-brand/20 [animation-duration:2.4s]" />
          <span className="absolute inset-3 rounded-full bg-mint-brand/15" />
          <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-mint-brand to-sky-brand text-white">
            <ShieldCheck size={30} />
          </span>
        </div>
      );
  }
}
