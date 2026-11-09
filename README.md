# ankursingh16.github.io

Personal website for Ankur Pawar: software services, 1:1 mentoring, interview preparation, writing and a newsletter.

Live at **https://ankursingh16.github.io/** (and at a custom domain once one is connected).

Built with React 19, TypeScript and Vite. Tested with Vitest and Testing Library.

## Run it on your computer

### One-time setup

1. **Install Node.js 22 (LTS).** Download it from [nodejs.org](https://nodejs.org/), or if you use a version manager:
   - macOS / Linux: `nvm install` (reads `.nvmrc`)
   - Windows: `nvm install 22` with [nvm-windows](https://github.com/coreybutler/nvm-windows)

   Check it worked: `node -v` should print `v22.x` or newer (anything from 20.19 works).
2. **Get the code:**
   ```bash
   git clone https://github.com/AnkurSingh16/ankursingh16.github.io.git
   cd ankursingh16.github.io
   ```
3. **Install packages:**
   ```bash
   npm install
   ```

### Every day

```bash
npm run dev
```

Open **http://localhost:5173**. The page reloads as you save files. Stop it with `Ctrl+C`.

### Other commands

| Command | What it does |
|---|---|
| `npm test` | Runs all tests once |
| `npm run test:watch` | Re-runs tests as you edit |
| `npm run typecheck` | Checks TypeScript types |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the built site at http://localhost:4173 to check it before pushing |
| `npm run check` | Type-check, test and build: exactly what CI runs |

## Where things live

```
src/
  content/site.ts      all the words, links, prices and feature switches
  content/types.ts     the shape of that content
  components/          one component per page section, each with a .test.tsx
  lib/contact.ts       contact form validation and sending
  styles/global.css    all styling; colours and fonts are variables at the top
public/                files served as-is (favicon, and your photo in images/)
.github/workflows/     CI/CD pipeline
.github/dependabot.yml weekly dependency updates
.claude/               Claude Code agents for building this project (see below)
CLAUDE.md              project brief that Claude Code reads first
TODO.md                decisions and features still to come
```

**Most changes only need `src/content/site.ts`:**

| To… | Set… |
|---|---|
| Show a price | `price: 'A$150 a session.'` on the offer |
| Send a button to Cal.com / Topmate | `bookingUrl: 'https://…'` on the offer |
| Hide an offer | `enabled: false` |
| Turn on the newsletter | `newsletter: { name, sendDay, subscribeUrl }` |
| Turn on the contact form | `contactFormEndpoint: 'https://formspree.io/f/…'` |
| Show your email | `links.email: 'hello@yourdomain.com'` |
| Add your photo | put it at `public/images/ankur.jpg`, then set `photo` (see the comment in the file) |

Sections with nothing to show fall back to something sensible instead of placeholders. A test fails if placeholder text like `[YOUR PRICE]` ever lands in the content.

## CI/CD

`.github/workflows/deploy.yml`:

- **Every pull request and push:** install, type-check, test, build. A failure blocks the merge (once branch protection is on) and blocks the deploy.
- **Every push to `main` that passes:** deploys to GitHub Pages.
- **Weekly:** Dependabot opens PRs for package and Action updates; they go through the same checks.

One-time GitHub settings:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Recommended: **Settings → Branches → Add rule** for `main`: require the *Type-check, test and build* check to pass before merging.

## Custom domain

1. Buy the domain (see the setup guide linked in TODO.md).
2. Add `public/CNAME` containing just the domain, e.g. `ankurpawar.com`.
3. Add the DNS records from [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS**.

## Building with Claude Code agents

`.claude/` holds a small team of agents for Claude Code. See [`.claude/AGENTS.md`](.claude/AGENTS.md) for who does what and when to use the debate.
