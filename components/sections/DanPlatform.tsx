"use client";

import { ArrowUpRight, ClipboardList, GraduationCap, Gamepad2, LogIn, MessagesSquare, Vote } from "lucide-react";
import SplitReveal from "../anim/SplitReveal";
import SmartLink from "../SmartLink";
import { danHomeHref, danLoginHref } from "@/lib/dan-platform";
import type { Dictionary } from "@/content";

const icons = { training: GraduationCap, survey: ClipboardList, polling: Vote, discussion: MessagesSquare, game: Gamepad2 };

/** Service block for Dan Platform, an independent system: buttons only navigate to it. */
export default function DanPlatform({ t }: { t: Dictionary }) {
  const d = t.danPlatform;
  return (
    <section id="dan-platform" className="relative bg-paper py-28 sm:py-36">
      <div className="container-x">
        <div className="max-w-[760px]">
          <span data-reveal className="eyebrow">
            {d.eyebrow}
          </span>
          <SplitReveal className="heading-lg mt-5 text-navy-900">{d.title}</SplitReveal>
          <p data-reveal className="mt-5 text-[18px] leading-relaxed font-medium text-navy-900/80">
            {d.summary}
          </p>
          <p data-reveal className="mt-4 text-[16px] leading-relaxed text-navy-900/65">
            {d.detail}
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.modules.map((m) => {
            const Icon = icons[m.icon as keyof typeof icons];
            return (
              <li
                key={m.name}
                data-reveal
                className="rounded-[28px] bg-white p-7 ring-1 ring-navy-900/5 transition-[box-shadow,translate] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgb(10_26_71/0.35)] sm:p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-800 text-white">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-5 text-[22px] font-bold tracking-tight text-navy-900">{m.name}</h3>
                <p className="mt-2 text-[15.5px] leading-relaxed text-navy-900/60">{m.text}</p>
              </li>
            );
          })}
        </ul>

        <div data-reveal className="mt-10">
          {danHomeHref && danLoginHref ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <SmartLink href={danHomeHref} className="btn-primary">
                {d.visit}
                <ArrowUpRight size={18} aria-hidden />
              </SmartLink>
              <SmartLink href={danLoginHref} className="btn-ghost">
                <LogIn size={17} aria-hidden />
                {d.login}
              </SmartLink>
            </div>
          ) : (
            <p className="inline-flex rounded-full bg-navy-900/5 px-4 py-2 text-[14px] font-semibold text-navy-900/60">{d.notLive}</p>
          )}
        </div>
      </div>
    </section>
  );
}
