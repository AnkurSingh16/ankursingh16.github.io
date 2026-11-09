# ankurpawar.github.io

Personal website for Ankur Pawar: software services, 1:1 mentoring, interview preparation, writing and a newsletter.

Built with React 19, TypeScript and Vite. Tested with Vitest and Testing Library. Every push to `main` is type-checked, tested and, if everything passes, deployed to GitHub Pages.

## Where things live

```
src/
  content/site.ts      all the words, links, prices and feature switches
  content/types.ts     the shape of that content
  components/          one component per page section, each with a .test.tsx
  lib/contact.ts       contact form validation and sending
  styles/global.css    all styling; colours and fonts are variables at the top
public/                files served as-is (favicon, and your photo in images/)
.github/workflows/     the test-and-deploy pipeline
TODO.md                decisions and features still to come
```

**Most changes only need `src/content/site.ts`.** For example:

| To… | Set… |
|---|---|
| Show a price | `price: 'A$150 a session.'` on the offer |
| Send a button to Topmate / Cal.com | `bookingUrl: 'https://…'` on the offer |
| Hide an offer | `enabled: false` |
| Turn on the newsletter | `newsletter: { name, sendDay, subscribeUrl }` |
| Turn on the contact form | `contactFormEndpoint: 'https://formspree.io/f/…'` |
| Show your email | `links.email: 'hello@yourdomain.com'` |
| Add your photo | put it at `public/images/ankur.jpg`, then set `photo` (see the comment in the file) |

Sections with nothing to show (quotes, articles, newsletter, contact form) fall back to something sensible instead of showing placeholders. A test fails if placeholder text like `[YOUR PRICE]` ever lands in the content.

## Run it locally

Needs Node 20.19 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # run the tests once
npm run test:watch # re-run tests as you edit
npm run check      # type-check, test and build: what CI runs
```

## Deploying

One-time setup in the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

After that, every push to `main` deploys automatically. The site is served at
`https://ankursingh16.github.io/ankurpawar.github.io/` until a custom domain is connected.

### Connecting a custom domain

1. Buy the domain (see the setup guide linked in TODO.md).
2. Add `public/CNAME` containing just the domain, e.g. `ankurpawar.com`.
3. At the registrar's DNS, add the records from [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS**.

The build reads the Pages settings, so asset paths switch from `/ankurpawar.github.io/` to `/` by themselves.
