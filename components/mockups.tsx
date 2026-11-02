// UI mock-ups rendered in HTML/CSS so they stay crisp at any size.
// Swap them for real product screenshots later (e.g. <img src="/screens/lms.png" />).
import {
  BookOpen,
  Calendar,
  CircleCheck,
  FileText,
  Flame,
  LayoutDashboard,
  Bell,
  Search,
  Trophy,
  Mic,
  Camera,
  MonitorUp,
  MessageCircle,
  PhoneOff,
  Sparkles,
  TrendingUp,
  Play,
} from "lucide-react";
import { LogoMark } from "./Logo";
import { screens, screenUrls } from "@/content/media";
import { ScrollTrigger } from "@/lib/gsap";
import { asset } from "@/lib/asset";
import type { Dictionary, Locale } from "@/content";

type M = Dictionary["mock"];
type ScreenKey = keyof typeof screens;

export function Window({
  children,
  url = "app.hidaniel.vn",
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  url?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[18px] shadow-[0_40px_120px_-30px_rgb(10_26_71/0.45)] ring-1 ${
        dark ? "bg-navy-950 ring-white/10" : "bg-white ring-navy-900/10"
      } ${className}`}
    >
      <div className={`flex items-center gap-2 px-4 py-2.5 ${dark ? "bg-white/5" : "bg-navy-50/70"}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span
          className={`mx-auto rounded-md px-10 py-0.5 text-[10px] font-medium ${
            dark ? "bg-white/10 text-white/50" : "bg-white text-navy-900/40"
          }`}
        >
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

const coverGradients: Record<string, string> = {
  flame: "from-flame-400 via-flame-500 to-[#ff3d6e]",
  sky: "from-sky-brand via-[#5b6cff] to-navy-600",
  mint: "from-mint-brand via-[#18b6c9] to-sky-brand",
  sun: "from-sun-brand via-flame-300 to-flame-500",
  violet: "from-violet-brand via-[#c05cf6] to-[#ff5c9a]",
};
export const cover = (hue: string) => coverGradients[hue] ?? coverGradients.flame;

/* ------------------------------------------------------------------ LMS */
export function DashboardMock({ m }: { m: M }) {
  const icons = [LayoutDashboard, BookOpen, Calendar, FileText, Trophy];
  const bars = [42, 68, 51, 86, 72, 100, 58];
  return (
    <Window>
      <div className="grid grid-cols-1 bg-paper text-left sm:grid-cols-[170px_1fr]">
        <aside className="hidden flex-col gap-1 border-r border-navy-900/5 bg-white p-4 sm:flex">
          <div className="mb-4 flex items-center gap-1.5">
            <LogoMark className="h-6 w-6" />
            <span className="text-[13px] font-extrabold text-navy-800">
              Hi Daniel<span className="text-flame-500">!</span>
            </span>
          </div>
          {m.nav.map((label, i) => {
            const Icon = icons[i];
            return (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11.5px] font-medium ${
                  i === 0 ? "bg-flame-50 text-flame-600" : "text-navy-900/55"
                }`}
              >
                <Icon size={14} /> {label}
              </div>
            );
          })}
          <div className="mt-auto rounded-xl bg-navy-800 p-3 text-white">
            <Flame size={18} className="text-flame-400" />
            <div className="mt-1 text-xl font-extrabold">12</div>
            <div className="text-[10px] text-white/60">{m.streak}</div>
          </div>
        </aside>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[15px] font-bold text-navy-900 sm:text-[17px]">{m.greeting} 👋</div>
              <div className="text-[11px] text-navy-900/50">{m.sub}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] text-navy-900/40 ring-1 ring-navy-900/5 md:flex">
                <Search size={11} /> Search
              </div>
              <div className="relative grid h-7 w-7 place-items-center rounded-full bg-white ring-1 ring-navy-900/5">
                <Bell size={12} className="text-navy-900/60" />
                <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-flame-500" />
              </div>
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-sun-brand to-flame-500" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="col-span-3 rounded-xl bg-white p-3.5 ring-1 ring-navy-900/5 md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-navy-900">{m.weekly}</span>
                <span className="rounded-full bg-mint-brand/10 px-2 py-0.5 text-[9.5px] font-bold text-mint-brand">+18%</span>
              </div>
              <div className="mt-3 flex h-24 items-end gap-2 sm:h-28">
                {bars.map((h, i) => (
                  <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                    <div
                      className={`w-full rounded-md ${i === 5 ? "bg-gradient-to-t from-flame-500 to-flame-300" : "bg-navy-100"}`}
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[9px] text-navy-900/40">{m.days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-3 flex flex-col gap-3 md:col-span-1">
              <div className="rounded-xl bg-navy-800 p-3.5 text-white">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-flame-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame-400" /> {m.upcoming}
                </div>
                <div className="mt-1.5 text-[12.5px] font-bold">IELTS Speaking</div>
                <div className="text-[10px] text-white/55">19:30 · Daniel Nguyễn</div>
                <div className="mt-2 flex -space-x-1.5">
                  {["bg-sky-brand", "bg-mint-brand", "bg-sun-brand", "bg-violet-brand"].map((c) => (
                    <span key={c} className={`h-5 w-5 rounded-full ring-2 ring-navy-800 ${c}`} />
                  ))}
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 text-[8px] ring-2 ring-navy-800">+24</span>
                </div>
              </div>
              <div className="rounded-xl bg-white p-3.5 ring-1 ring-navy-900/5">
                <div className="text-[10px] font-semibold text-navy-900/50">{m.continue}</div>
                <div className="mt-1 text-[12px] font-bold text-navy-900">Python · Bài 14</div>
                <div className="mt-2 h-1.5 rounded-full bg-navy-50">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-sky-brand to-mint-brand" />
                </div>
              </div>
            </div>

            {(["flame", "sky", "mint"] as const).map((hue, i) => (
              <div key={hue} className={`overflow-hidden rounded-xl bg-white ring-1 ring-navy-900/5 ${i === 2 ? "hidden md:block" : ""}`}>
                <div className={`relative h-12 bg-gradient-to-br sm:h-14 ${cover(hue)}`}>
                  <Play size={12} className="absolute right-2 bottom-2 fill-white text-white" />
                </div>
                <div className="p-2.5">
                  <div className="h-1.5 w-3/4 rounded bg-navy-100" />
                  <div className="mt-1.5 h-1.5 w-1/2 rounded bg-navy-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ Live */
export function LiveMock({ m }: { m: M }) {
  const people = [
    { n: "MA", c: "from-sky-brand to-navy-500" },
    { n: "TL", c: "from-mint-brand to-sky-brand" },
    { n: "BN", c: "from-violet-brand to-[#ff5c9a]" },
    { n: "QH", c: "from-sun-brand to-flame-500" },
  ];
  return (
    <Window dark url="live.hidaniel.vn/ielts-speaking">
      <div className="grid grid-cols-[1fr_auto] gap-3 p-3 text-left">
        <div className="relative overflow-hidden rounded-xl bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#ff3b5c] px-2 py-0.5 text-[9px] font-bold text-white">● {m.liveNow}</span>
            <span className="text-[10px] font-semibold text-navy-900/50">IELTS Speaking · Unit 7</span>
          </div>
          <div className="mt-4 text-[15px] font-extrabold text-navy-900 sm:text-[19px]">Present Perfect</div>
          <div className="mt-1 text-[12px] text-navy-900/70 sm:text-[14px]">
            S + <span className="font-bold text-flame-500">have / has</span> + V3
          </div>
          <svg viewBox="0 0 300 90" className="mt-3 w-full max-w-[340px]">
            <path d="M6 60 C 50 10, 90 10, 130 50 S 210 90, 250 30" fill="none" stroke="#3d8bff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="250" cy="30" r="6" fill="#ff6a13" />
            <path d="M20 80 h 110" stroke="#1fc8a0" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
            <text x="140" y="84" fontSize="12" fill="#0a1a47" opacity=".6" fontWeight="600">since 2020 → now</text>
          </svg>
          <div className="absolute right-3 bottom-3 h-16 w-24 overflow-hidden rounded-lg bg-gradient-to-br from-flame-400 to-[#ff3d6e] sm:h-20 sm:w-28">
            <div className="grid h-full place-items-center text-lg font-extrabold text-white/90">DN</div>
            <span className="absolute bottom-1 left-1.5 text-[8px] font-semibold text-white">Daniel</span>
          </div>
        </div>
        <div className="flex w-[74px] flex-col gap-2 sm:w-[110px]">
          {people.map((p) => (
            <div key={p.n} className={`relative grid aspect-[4/3] place-items-center rounded-lg bg-gradient-to-br ${p.c}`}>
              <span className="text-[11px] font-bold text-white">{p.n}</span>
              <Mic size={9} className="absolute right-1 bottom-1 text-white/80" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 pb-3">
        <div className="hidden flex-col gap-1.5 sm:flex">
          {m.chat.slice(0, 2).map((c) => (
            <span key={c} className="w-fit rounded-full rounded-bl-sm bg-white/10 px-2.5 py-1 text-[10px] text-white/80">
              {c}
            </span>
          ))}
        </div>
        <div className="mx-auto flex items-center gap-2 sm:mx-0">
          {[Mic, Camera, MonitorUp, MessageCircle].map((Icon, i) => (
            <span key={i} className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white">
              <Icon size={14} />
            </span>
          ))}
          <span className="grid h-8 w-11 place-items-center rounded-full bg-[#ff3b5c] text-white">
            <PhoneOff size={14} />
          </span>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ Studio */
export function StudioMock({ m }: { m: M }) {
  return (
    <Window url="studio.hidaniel.vn">
      <div className="grid grid-cols-1 bg-paper text-left sm:grid-cols-[150px_1fr]">
        <aside className="hidden flex-col gap-1.5 border-r border-navy-900/5 bg-white p-3 sm:flex">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
                n === 3 ? "bg-violet-brand/10 font-semibold text-violet-brand" : "text-navy-900/55"
              }`}
            >
              {n < 3 ? <CircleCheck size={12} className="text-mint-brand" /> : <span className="h-3 w-3 rounded-full border border-current" />}
              Unit {n}
            </div>
          ))}
        </aside>
        <div className="p-4">
          <div className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-violet-brand/30">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-brand to-[#ff5c9a] text-white">
              <Sparkles size={14} />
            </span>
            <span className="text-[11.5px] font-medium text-navy-900/80">{m.studioPrompt}</span>
          </div>
          <div className="mt-3 rounded-xl bg-white p-3.5 ring-1 ring-navy-900/5">
            <div className="text-[11.5px] font-bold text-navy-900">1. She ___ here since 2020.</div>
            <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10.5px]">
              {["lives", "has lived", "is living", "lived"].map((o, i) => (
                <span
                  key={o}
                  className={`rounded-lg px-2.5 py-1.5 ring-1 ${
                    i === 1 ? "bg-mint-brand/10 font-semibold text-[#0d9a78] ring-mint-brand/40" : "text-navy-900/60 ring-navy-900/10"
                  }`}
                >
                  {"ABCD"[i]}. {o}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-white p-3.5 ring-1 ring-navy-900/5">
            <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold text-violet-brand">
              <Sparkles size={11} /> {m.studioGenerating}
            </div>
            {["w-11/12", "w-3/4", "w-5/6"].map((w) => (
              <div
                key={w}
                className={`mb-1.5 h-2 ${w} animate-pulse rounded bg-violet-brand/15`}
              />
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ Insights */
export function InsightsMock({ m }: { m: M }) {
  const kpis = [
    { v: "8,214", d: "+12%" },
    { v: "87%", d: "+6%" },
    { v: "8.4", d: "+0.3" },
  ];
  return (
    <Window url="insights.hidaniel.vn">
      <div className="bg-paper p-4 text-left">
        <div className="grid grid-cols-3 gap-2.5">
          {kpis.map((k, i) => (
            <div key={i} className="rounded-xl bg-white p-3 ring-1 ring-navy-900/5">
              <div className="truncate text-[9.5px] font-medium text-navy-900/50">{m.insightsKpi[i]}</div>
              <div className="mt-1 text-[16px] font-extrabold text-navy-900 sm:text-[19px]">{k.v}</div>
              <div className="flex items-center gap-1 text-[9.5px] font-bold text-mint-brand">
                <TrendingUp size={10} /> {k.d}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2.5">
          <div className="col-span-3 rounded-xl bg-white p-3 ring-1 ring-navy-900/5 sm:col-span-2">
            <svg viewBox="0 0 300 120" className="w-full">
              <defs>
                <linearGradient id="ig" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#1fc8a0" stopOpacity=".35" />
                  <stop offset="1" stopColor="#1fc8a0" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[30, 60, 90].map((y) => (
                <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#0a1a47" strokeOpacity=".06" />
              ))}
              <path d="M0 95 C30 90 45 70 75 72 S120 50 150 55 S200 25 230 30 S280 12 300 10 V120 H0Z" fill="url(#ig)" />
              <path d="M0 95 C30 90 45 70 75 72 S120 50 150 55 S200 25 230 30 S280 12 300 10" fill="none" stroke="#1fc8a0" strokeWidth="2.5" />
              <path d="M0 105 C40 100 70 92 110 94 S180 80 220 78 S270 66 300 60" fill="none" stroke="#3d8bff" strokeWidth="2" strokeDasharray="4 5" />
              <circle cx="230" cy="30" r="4.5" fill="#fff" stroke="#1fc8a0" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="col-span-3 flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-navy-900/5 sm:col-span-1 sm:flex-col sm:justify-center">
            <div
              className="grid h-20 w-20 shrink-0 place-items-center rounded-full"
              style={{ background: "conic-gradient(#1fc8a0 0 62%, #3d8bff 0 84%, #ff6a13 0 100%)" }}
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-[13px] font-extrabold text-navy-900">87%</div>
            </div>
            <div className="flex flex-col gap-1 text-[9.5px] text-navy-900/60">
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-mint-brand" /> A</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-sky-brand" /> B</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-flame-500" /> C</span>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ------------------------------------------------------------------ Real screenshots */
const mocks = { hero: DashboardMock, lms: DashboardMock, live: LiveMock, studio: StudioMock, insights: InsightsMock };

/** Shows the screenshot set in content/media.ts, or the coded mock-up when none is set. */
export function ProductScreen({ k, m, locale, alt }: { k: ScreenKey; m: M; locale: Locale; alt: string }) {
  const src = screens[k];
  const url = typeof src === "string" ? src : src[locale];
  if (!url) {
    const Mock = mocks[k];
    return <Mock m={m} />;
  }
  return (
    <Window url={screenUrls[k]}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are served as-is */}
      <img
        src={asset(url)}
        alt={alt}
        className="block h-auto w-full"
        loading={k === "hero" ? "eager" : "lazy"}
        decoding="async"
        // Pinned sections are measured from page height, so re-measure once the image has its size.
        onLoad={() => ScrollTrigger.refresh()}
      />
    </Window>
  );
}
