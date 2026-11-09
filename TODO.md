# To do

Things for Ankur and Claude to decide or build later. Tick them off as they land.
Each item names the field in `src/content/site.ts` that changes, where there is one.

## Decide together

- [ ] **Prices** for the three offers (`offers[].price`). Consider AUD for Australia and INR for India, or one USD price. Until set, each offer says "Get in touch for pricing."
- [ ] **Fractional engineering leadership**: final scope, engagement model (days per month, fixed-scope projects, retainer) and how it relates to the software venture with family, which may suit its own studio brand and domain. (`offers[0]`)
- [ ] **Newsletter**: name, send day, and platform. (`newsletter`)
- [ ] **Booking tool**: Topmate, Cal.com or Calendly, and whether to use different tools for Indian and Australian clients. (`offers[].bookingUrl`)
- [ ] **Domain**: which name and extension (.com, .au, .com.au). (`links.email`, `public/CNAME`)

## Set up (you)

- [ ] Turn on GitHub Pages: Settings → Pages → Source: **GitHub Actions**
- [ ] Protect `main`: Settings → Branches → require the CI check to pass
- [ ] Buy the domain and connect it (README → Connecting a custom domain)
- [ ] Domain email, e.g. hello@yourdomain.com (`links.email`)
- [ ] Free Formspree form for the contact section (`contactFormEndpoint`)
- [ ] Booking account and links (`offers[].bookingUrl`)
- [ ] Newsletter account (`newsletter`)
- [ ] A real, recent photo at `public/images/ankur.jpg` (`photo`)
- [ ] 2 or 3 real quotes from people you've managed or mentored (`quotes`)
- [ ] Your latest Medium articles (`articles`)

Step-by-step instructions and costs: [Website setup guide](https://claude.ai/artifact/BqFQmZKsLEhZTj6rZ9fXZn) (private to Ankur).

## Build later (Claude)

- [ ] Commit `package-lock.json` and switch CI to `npm ci` for repeatable installs
- [ ] Pull the latest Medium posts automatically at build time from the Medium RSS feed
- [ ] Embed the newsletter signup form directly instead of linking out
- [ ] Embed the booking calendar on the page
- [ ] Social share image (Open Graph) so links look good on LinkedIn
- [ ] Privacy-friendly analytics (e.g. Plausible, Umami or Cloudflare Web Analytics)
- [ ] Blog or notes section hosted on the site itself, cross-posted to Medium with canonical links
- [ ] Separate pages per offer, with FAQs, for search engines
- [ ] Dark mode
- [ ] Lighthouse and accessibility checks in CI
- [ ] Sitemap and robots.txt
