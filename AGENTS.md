# AGENTS.md — Hi Daniel! website

Instructions for coding agents (Codex, Claude Code, Cursor…). `CLAUDE.md` imports this file.

## Design system (mandatory for any UI work)
Before creating or changing any UI, read and follow `design-system/DESIGN.md` — the Hi Daniel! design rules shared by every Hi Daniel! project (website, LMS, …).
- Use only its tokens and utilities (`bg-navy-900`, `text-fg-muted`, `btn-primary`, `var(--hd-…)`); never hard-code brand colours.
- Token values live in `design-system/tokens.json`. After editing it, run `node design-system/build.mjs` (regenerates the CSS files and fails on contrast problems). Never edit `hi-daniel.theme.css` or `hi-daniel.tokens.css` by hand.
- Run through the checklist in DESIGN.md §12 before finishing.

## Project
- Next.js 15 static export (`output: "export"`), Tailwind CSS v4, GSAP (ScrollTrigger, SplitText), Lenis.
- All page copy lives in `content/vi.ts` (default) and `content/en.ts`; both must keep the same shape.
- `npm run dev` to develop; `npm run build` writes `out/`. GitHub Pages deploys on push to `main` with `NEXT_PUBLIC_BASE_PATH=/<repo>`.
