import { Quote } from "lucide-react";
import SplitReveal from "../anim/SplitReveal";
import type { Dictionary } from "@/content";

const avatar = [
  "from-flame-400 to-[#ff3d6e]",
  "from-sky-brand to-navy-500",
  "from-mint-brand to-sky-brand",
  "from-sun-brand to-flame-500",
  "from-violet-brand to-[#ff5c9a]",
  "from-navy-500 to-navy-800",
];

const initials = (name: string) =>
  name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("");

export default function Testimonials({ t }: { t: Dictionary }) {
  const items = t.testimonials.items;
  const rows = [items, [...items].reverse()];

  return (
    <section className="relative overflow-hidden bg-white py-28 sm:py-36">
      <div className="container-x text-center">
        <span data-reveal className="eyebrow">
          {t.testimonials.eyebrow}
        </span>
        <SplitReveal className="heading-lg mx-auto mt-5 max-w-[18ch] text-navy-900">{t.testimonials.title}</SplitReveal>
      </div>

      <div data-reveal className="mask-fade-x mt-16 flex flex-col gap-5">
        {rows.map((row, r) => (
          <div key={r} className="flex overflow-hidden">
            <div
              className={`flex w-max gap-5 pr-5 hover:[animation-play-state:paused] ${
                r === 0 ? "animate-marquee" : "animate-marquee-reverse"
              } [--marquee-duration:60s]`}
            >
              {[...row, ...row].map((q, i) => (
                <figure
                  key={i}
                  className="flex w-[340px] shrink-0 flex-col rounded-[24px] bg-paper p-6 text-left ring-1 ring-navy-900/5 transition-colors duration-300 hover:bg-flame-50 sm:w-[400px]"
                >
                  <Quote size={22} className="text-flame-500" />
                  <blockquote className="mt-3 flex-1 text-[16px] leading-relaxed font-medium text-navy-900/85">{q.quote}</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${
                        avatar[items.indexOf(q) % avatar.length]
                      }`}
                    >
                      {initials(q.name)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-navy-900">{q.name}</span>
                      <span className="block text-xs text-navy-900/50">{q.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
