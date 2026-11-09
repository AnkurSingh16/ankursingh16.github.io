# CLAUDE.md

Ankur Pawar's personal website. React 19 + TypeScript + Vite, tested with Vitest + Testing Library, deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Read this before exploring

You rarely need to search the repo. The layout is fixed:

- `src/content/site.ts`: every word, link, price and feature switch. Most requests are edits here only.
- `src/content/types.ts`: the content's types. Change it first when adding a field.
- `src/components/<Section>.tsx` + `<Section>.test.tsx`: one per page section (Header, Hero, Offers, Background, Writing, Contact, ContactForm, Footer).
- `src/lib/contact.ts`: contact form validation and sending.
- `src/styles/global.css`: all styles; tokens are CSS variables at the top.
- `TODO.md`: open decisions and planned features.

## Commands

- `npm run check`: type-check + test + build. Run before saying work is done.
- `npm test -- <pattern>`: run matching tests only.
- `npm run dev`: local server at http://localhost:5173.

## Rules

- No placeholder text in `site.ts` (a test enforces it). Missing content = `null` or `[]`, and the component falls back.
- Every component change keeps or adds a test in the matching `.test.tsx`.
- Copy: plain, specific, sentence case. No invented stats or testimonials.
- Design: keep the existing tokens and layout language. No gradients, emoji, card grids or all-caps labels.
- Accessibility: real buttons and links, labelled inputs, visible focus, 4.5:1 contrast.

## Working with the agents (save tokens)

You are the orchestrator. Delegate, keep your own context small, and pass agents file paths rather than file contents.

- Finding where something is → `scout` (cheap).
- A clear, small change → do it yourself or hand it to `builder`, then `tester`.
- A decision with real trade-offs (architecture, a new feature's design, a library choice) → `/debate <question>`.
- Never run a debate for copy edits, styling tweaks or one-file fixes.

Full roles and the debate protocol: `.claude/AGENTS.md`.
