# Performance & decisions ledger

Things that cost speed (or correctness), and decisions that belong to the owner.
Open items come first, each with a recommendation. Fixed items are at the bottom, with the numbers each change bought.

Status: `OPEN` needs a decision or work · `FIXED` done (October 2026)

## How it was measured

- Production build (`next build && next start`) on localhost. `main` before the redesign was measured on the same machine.
- **Lighthouse 12, mobile preset** (simulated slow 4G + 4× CPU). Scores move about ±10 between runs on this machine, so read them as a range.
- **Real-browser check:** Chromium with 4× CPU throttling and no network throttling, reading `largest-contentful-paint` entries directly. These are stable between runs.

### Before and after

Accessibility and Best Practices are the same on every page measured:
- **Accessibility:** 100 on every page after (was 92–100).
- **Best Practices:** 96 on every page after (was 75–96). The remaining 4 points are the two Vercel scripts that only 404 on localhost.

| Page | Lighthouse perf before | Lighthouse perf after | LCP (Lighthouse) before → after | TBT before → after | CLS before → after |
|---|---|---|---|---|---|
| `/` | 32 | 81–84 | 14.1 s → 4.4–4.9 s | 3.7 s → 80–110 ms | 0.108 → 0 |
| `/routes/projects` | 39 | 95 | 5.8 s → 2.7 s | 1.7 s → 90–100 ms | 0 → 0 |
| `/routes/blog` | – | 95 | – → 2.6 s | – → 160 ms | – → 0 |
| `/post/building-coinsel-ai-finance` | – | 88 | – → 3.0 s | – → 290 ms | – → 0 |
| `/post/webos-project` | 39 | 74–77 | 24 s → 5.1 s | 3.1 s → 80–190 ms | 0 → 0 |
| `/routes/aboutme` | – | 94 | – → 3.0 s | – → 20 ms | – → 0 |

Measured after the "aurora" redesign (Bricolage Grotesque + Instrument Serif, 3D project stack on the homepage); `/post/webos-project` is from the previous round. The home LCP is the front 3D screenshot.

October 15: the homepage hero became a stacked project deck (no 3D tilt, no scattered screens), and the tech strip and project list left the homepage. Lighthouse could not be re-run cleanly because another project's Playwright suite was loading the machine (load average 13). An A/B run under that same load, Chromium with 4× CPU throttling, three runs each, gave:
- **Blocking time:** about 1.1 s against 2.4 s for the previous commit.
- **LCP:** 0.6–2.3 s against 2.1–5.2 s for the previous commit.

The cards behind the front one are dimmed with an overlay instead of `filter: brightness()`, which is cheaper to animate.

The "–" cells were not measured on `main`.

Real-browser LCP on `/` went from 3.7 s on `main` to 0.26 s. On a post page it went from 2.7 s to 1.1 s.

First-load JavaScript (from `next build`):

| Route | `main` | Now |
|---|---|---|
| `/` | 176 kB | 111 kB |
| `/routes/projects` | 161 kB | 104 kB |
| `/routes/blog` | 103 kB | 103 kB |
| `/post/[slug]`, `/libary/[slug]` | 582 kB | 214 kB |

---

## Open: decisions for the owner

### D1. The lofi radio started playing on page load `FIXED`
The stream now starts only when the visitor presses play, so no audio is downloaded on page load.

### D2. "Most viewed" and "Top on Dev.to" are no longer on the homepage `OPEN`
The old homepage fetched both in the browser on every visit, which also opened a Prisma connection.
- **Decision needed:** should they come back? If yes, fetch them in `getStaticProps` with `revalidate`, not in the browser.

### D3. Vercel Analytics overlaps with Umami `OPEN`
Both count page views.
- **Recommendation:** keep Umami and Vercel Speed Insights (Core Web Vitals from real visitors), and drop Vercel Analytics.

## Open: work left

### W1. Post pages ship 214 kB of JavaScript `OPEN` · impact: medium
`MdxComponents.jsx` imports every MDX component up front, even for posts that don't use them: react-modal-image, react-toastify plus its CSS, react-copy-to-clipboard, github-user-repo-card, @headlessui Disclosure, cloudinary-build-url and slugify.
- **Recommendation:** load each one with `next/dynamic`, and replace react-toastify with the small toast the post page already has.

### W2. No metric-matched fallback fonts `OPEN` · impact: low
The fonts are self-hosted and preloaded, and measured CLS is 0. Visitors on slow connections can still see a small reflow when Unbounded replaces the fallback in long headlines.
- **Recommendation:** add `size-adjust` / `ascent-override` fallback faces, or move to `next/font/local` pointing at `public/fonts`.

### W3. Next 15/16 and the App Router `OPEN` · impact: medium
The site is on Next 14.2, the last release line that needs no code changes for the Pages Router. React hydration is now the largest remaining main-thread cost.
- **Recommendation:** move the mostly static pages (home, projects, blog list) to server components so they ship less JavaScript.

### W4. Covers are optimised on first request `OPEN` · impact: low on Vercel
Post covers come from Unsplash and Cloudinary through `next/image`. On localhost the first request converts the full-size photo, which is why post LCP measures 4.7–5.1 s here. On Vercel the result is cached at the CDN.
- **Recommendation:** nothing, unless field data (Speed Insights) shows slow LCP on posts.

## Open: bugs

Each of these has a test marked `it.fails`, so the suite reports when one gets fixed.

- **B1:** `scripts/convert-to-devto.js` writes frontmatter values unquoted, so a title containing `: ` produces invalid YAML. This already happened in `posts/blog/automating-content-publishing-mdx-to-devto-devto.md`. Fix with `matter.stringify`.
- **B2:** `pages/api/analytics.js`, `comments.js`, `og.jsx` and `subscribers.js` are entirely commented out. They ship as public routes that return 500. Delete them or restore them.
- **B3:** `pages/api/views/featured.js`: GET increments a view counter and POST reads the top three. Crawlers and link prefetches count as views. Swap the methods and update the callers.
- **B4:** 11 library posts have tags with an empty `slug` (`{ slug: "", name: "project" }`).

## Dead project deployments

These live URLs return 404, so their projects are shown without a live link:
- `gamedealhub.vercel.app`
- `pallete-generator.vercel.app`
- `leaflet-destination-map.vercel.app`
- `pirate-hunter-two.vercel.app`

`githubcard.bojanjagetic.com` does not resolve.

## Security notes from other repos

None of these are mentioned in the published posts.
- **Voyage Vault:** the Gumroad webhook skips the HMAC check when no signature header is sent.
- **Singularity:** `proxy.ts` compares the token with `===` (not constant-time).
- **Coinsel:** the SMS ingest route accepts `?token=` in the query string, so the token can end up in access logs.

---

## Fixed

| # | What | Why it was slow or wrong | Change |
|---|---|---|---|
| F1 | `SplashScreen` wrapped the whole app | Server HTML was only a spinner until hydration. That hurt LCP and SEO. | Removed. |
| F2 | Google Fonts `<link>`, then `next/font/google` | First render-blocking CSS from Google. Then the deploy broke, because the build downloaded fonts from Google. | Fonts are self-hosted in `public/fonts` and the two first-paint files are preloaded. Bricolage Grotesque and Instrument Serif italic, latin and latin-ext files only. |
| F3 | Five analytics tools | Clarity cost ~400 ms of main-thread time and set third-party cookies. GA added a tag manager. | GA and Clarity removed. Umami kept. PostHog loads only with a key, after the page is idle, with replay off. |
| F4 | Animated blur blobs and `setState` on mouse move in the hero | Constant GPU work and re-renders | Gone in the redesign. |
| F5 | Entrance animations with `opacity: 0` and `filter: blur()` | Delayed LCP and caused full-screen blur rasterisation | Transform-only, or none. |
| F6 | Custom cursor | `requestAnimationFrame` loop on every page, and the owner disliked it | Removed. The system pointer is back. |
| F7 | Homepage posts fetched in the browser (axios, framer-motion, react-countup, Prisma) | Two requests plus a DB connection per visit | Built at build time. |
| F8 | Shell scroll progress via `setState` | Re-rendered the page on every scroll event | A ref and a transform, at most once per frame. |
| F9 | Full highlight.js build in every post | Every language in the bundle | Light build with the 14 languages the posts use: 582 kB → 214 kB. |
| F10 | `cheerio` in the browser bundle | Large parser on every post | Uses the browser's `DOMParser`. |
| F11 | framer-motion, next-themes, Radix, particles and 30+ other packages | Bundle weight and install time | Removed, along with more than 60 files nothing imported. |
| F12 | Two theme systems (next-themes and the Shell's own) | Double render and a dark flash for light-mode visitors | One system: `data-theme` on the shell, saved in localStorage. |
| F13 | Next 13.5 and sharp 0.32 | sharp needed a native build that pnpm skipped. React printed `fetchPriority` warnings. | Next 14.2.35 and sharp 0.34 (prebuilt binaries). |
| F14 | Three lockfiles | CI, Vercel and local installs could resolve different versions | Only `pnpm-lock.yaml`, with `packageManager` pinned. |
| F15 | `/api/views` rewrite to `http://localhost:3000` | Broken in production | Removed. |
| F16 | Post covers as full-size `<img>` and CSS backgrounds | 1600 px photos on phones, and text over images | `next/image` with `sizes` and priority. The title is never placed over the photo. |
| F17 | Long URLs, tables and code without a language | Horizontal scrolling on phones | Text wraps; tables and code scroll inside the column. |
| F18 | Low-contrast colours (code comments, tab counts, links not underlined in text) | Accessibility 92–96 | Accessibility 100 on every page. |
| F19 | Build crash on `/post/webos-project` | next-mdx-remote v6 strips JS props | `serialize(..., { blockJS: false })` for local posts. |
| F20 | CI workflow had an invalid line | CI could not run | Fixed. CI also runs the tests. |
