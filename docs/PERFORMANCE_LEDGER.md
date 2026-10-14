# Performance & decisions ledger

Things that cost speed (or correctness) and need a decision from the owner.
Each open item has a recommendation; nothing here has been changed yet.
Fixed items are kept at the bottom, with numbers, so we know what each change bought.

Status: `OPEN` needs a decision · `FIXED` done in the redesign (October 2026)

## How it was measured

- Production build (`next build && next start`) on localhost, same machine for `main` and the redesign.
- **Lighthouse 12, mobile preset** (simulated slow 4G + 4× CPU). Scores on this machine move ±10 between runs, so treat them as a range.
- **Real-browser check:** Chromium with 4× CPU throttling and no network throttling, reading `largest-contentful-paint` and `longtask` entries directly. These numbers are stable between runs.

| Page | `main` Lighthouse perf | Redesign Lighthouse perf | `main` real LCP | Redesign real LCP |
|---|---|---|---|---|
| `/` | 32 (LCP 14.1 s, TBT 3.7 s, CLS 0.108) | 48–55 (LCP 5.3–5.8 s, TBT 0.8–1.5 s, CLS 0) | 3.7 s (FCP 2.4 s) | **0.41 s** (FCP 0.41 s) |
| `/routes/projects` | 39 (TBT 1.7 s) | 46–62 (CLS 0) | – | – |
| `/post/webos-project` | 39 (LCP 24 s, TBT 3.1 s) | 47–49 (TBT 1.4–1.8 s) | 2.7 s (FCP 1.9 s) | **1.1 s** (FCP 0.7 s) |

Accessibility went from 92–93 to 100 on `/` and `/routes/projects`.
In real browsers the page now paints its main content on the first frame. Lighthouse's simulated score is held back by the items below, mostly JavaScript work and third-party scripts.

First-load JavaScript (from `next build`):

| Route | `main` | Redesign |
|---|---|---|
| `/` | 176 kB | 121 kB |
| `/routes/projects` | 161 kB | 112 kB |
| `/post/[slug]`, `/libary/[slug]` | 582 kB | 218 kB |

---

## Open: need a decision

### P1. Five analytics tools on every page `OPEN` · impact: high
Google Analytics (when `NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID` is set), Umami, Microsoft Clarity, Vercel Analytics and Vercel Speed Insights all load on every page.
- Clarity alone blocks the main thread for about 370–450 ms on a mid-range phone. It also sets third-party cookies (CLID, MUID, SM via `c.bing.com`), and that cookie use is the only reason Best Practices is 75 instead of 100.
- **Recommendation:** keep Umami (already used for click events via `data-umami-event`) and Vercel Speed Insights. Drop Clarity and GA. If session replay matters, load Clarity only after the first user interaction.

### P2. Lofi radio starts playing on page load `OPEN` · impact: medium
`components/jagetic/HeroSpotify.jsx` calls `audio.play()` on mount. When the browser allows it, a 128 kbps MP3 stream starts downloading and decoding right away, which costs data and battery on phones. When the browser blocks it, the call is wasted.
- **Recommendation:** start the stream only on the first click on ▶ and keep the rest of the player as is.

### P3. React hydration is the biggest remaining cost `OPEN` · impact: high
Most of the remaining Total Blocking Time is `framework.js`: React 18 hydrating the whole page in one go, about 250–550 ms in tasks on a throttled CPU.
- **Recommendation:** upgrade to Next 14/15. That also fixes P4 and P11. After that, either move to the App Router with server components (the homepage and projects page are almost static, so they would ship very little JS), or keep the Pages Router and lazy-hydrate below-the-fold sections.

### P4. Next.js 13.5 / next/font has no fallback metrics for our fonts `OPEN` · impact: low
The build logs `Failed to find font override values` for Bricolage Grotesque and Instrument Serif. Without an adjusted fallback font, text can shift slightly when the web font arrives (measured CLS is still 0–0.001).
- **Recommendation:** fixed by the Next upgrade in P3, or set `adjustFontFallback`/`fallback` by hand.

### P5. Two theme systems `OPEN` · impact: medium
`next-themes` (`ThemeProvider` in `_app.js`, class on `<html>`) and `Shell.jsx` (its own `data-theme` state, saved as `bj-theme` in localStorage) both run. Shell always renders dark on the server and switches after hydration, so light-mode visitors see a dark flash and the whole tree renders twice.
- **Recommendation:** keep one. Use next-themes with `attribute="data-theme"`, or add a tiny inline script that sets the theme before first paint.

### P6. Post pages still ship 218 kB of JS `OPEN` · impact: medium
`MdxComponents.jsx` imports every MDX component up front, even for posts that don't use them: react-modal-image, react-toastify plus its CSS, react-copy-to-clipboard, github-user-repo-card, @headlessui Disclosure, cloudinary-build-url and slugify.
- **Recommendation:** load each one with `next/dynamic` so a post only downloads what it renders. Replace react-toastify with the small toast the Shell already has.

### P7. Legacy CSS and dead components `OPEN` · impact: medium
Every page loads 21 kB of CSS: Tailwind, an 890-line `globals.scss` (mostly `jag-*` classes from the old landing page), `jagetic.css` and `site.css`. Many components are no longer rendered:
- `layout/Header.jsx`, `layout/Footer.jsx`
- `FeatureLanding`, `FeaturedProject`, `custom/FeaturedProjectTeaser`, `FeaturedPosts`, `HighlightPost`
- `PostBody`, `PostDetail`, `shared/PostListScreen` (and `custom/Masonary`, which only it uses), `QuizComponent`
- `custom/SplashScreen`, `custom/ParticlesBackground`, `custom/TechnologyStack`, `SupportMe`, `CV`

Nothing imports these, apart from the barrel file `components/index.js` and each other.
- **Recommendation:** delete the dead components, then let Tailwind purge and remove the unused `jag-*` rules. I did not delete them because some might be wanted back.

### P8. Unused or duplicate dependencies `OPEN` · impact: low at runtime, high for installs and CI
- **Not imported anywhere:** `react-window`, `@radix-ui/themes`, `react-type-animation`, `querystring`, `@splitbee/web`.
- **Only imported by the dead components in P7:** `react-tsparticles`, `tsparticles-slim`, `react-google-charts`, `react-responsive-virtual-grid`, `react-countup`.
- **`fs`:** an npm placeholder package that shadows Node's `fs` in tools like Vitest. The test config works around it with an alias.
- **Three lockfiles:** `package-lock.json`, `yarn.lock` and `pnpm-lock.yaml`. CI uses pnpm.
- **Recommendation:** remove these packages, keep only `pnpm-lock.yaml`, and run `pnpm dedupe`.

### P9. External post images skip optimisation `OPEN` · impact: low
Featured images from hosts that are not in `images.remotePatterns` (for example `coinsel.jageticbojan.com/opengraph-image`) are served full size as plain `<img loading="lazy">`.
- **Recommendation:** add `*.jageticbojan.com` and `*.vercel.app` to `remotePatterns`, or download those covers into `public/images`.

### P10. `sharp` is broken in local installs `OPEN` · impact: low (Vercel uses its own)
`sharp-linux-x64.node` is missing after `pnpm install`, because pnpm ignores build scripts (`pnpm approve-builds`). Locally, `next start` then falls back to a much slower image optimiser.
- **Recommendation:** `pnpm approve-builds` (allow sharp, prisma, esbuild), or upgrade to sharp 0.33+, which ships prebuilt binaries.

### P11. React warning: `fetchPriority` `OPEN` · impact: none (dev noise)
Next 13.5 with React 18.3 warns about the `fetchPriority` prop on prioritised images. Fixed by the upgrade in P3.

### P12. `next.config.js` rewrites `/api/views` to `http://localhost:3000` `OPEN` · impact: correctness
In production this sends the view counter to localhost.
- **Recommendation:** remove the rewrite. The route itself is now a 405-guarded no-op, and `/api/views/featured` is where views are really stored.

### P13. Homepage no longer calls `/api/views/featured` or `/api/devto` `OPEN` · decision
The old homepage fetched "most viewed" posts from Postgres (Prisma) and "Top on Dev.to" on every visit, which meant two client-side requests plus a database connection on page load. The redesign shows the three newest posts, rendered at build time.
- **Decision needed:** should "most viewed" and "Top on Dev.to" come back? If yes, fetch them in `getStaticProps` with `revalidate`, not in the browser.

---

## Open: bugs left for the owner

Each of these has a test marked `it.fails`, so the suite tells you when it gets fixed.

- **B1:** `scripts/convert-to-devto.js` writes frontmatter values unquoted, so a title containing `: ` produces invalid YAML. This already happened in `posts/blog/automating-content-publishing-mdx-to-devto-devto.md`. Fix with `matter.stringify`.
- **B2:** `pages/api/analytics.js`, `comments.js`, `og.jsx` and `subscribers.js` are entirely commented out. They ship as public routes that return 500. Delete them or restore them.
- **B3:** `pages/api/views/featured.js`: GET increments a view counter and POST reads the top three. Crawlers and link prefetches count as views. Swap the methods and update the callers.
- **B4:** 11 library posts have tags with an empty `slug` (`{ slug: "", name: "project" }`).

## Dead project deployments (found while collecting projects)

These live URLs return 404. Their projects are shown as "archived" or "in development" without a live link:
- `gamedealhub.vercel.app`
- `pallete-generator.vercel.app`
- `leaflet-destination-map.vercel.app`
- `pirate-hunter-two.vercel.app`

`githubcard.bojanjagetic.com` does not resolve. `buddy-bill-eight.vercel.app` (the old Coinsel) is still up.

## Security notes from other repos (found while writing the project posts)

None of these are mentioned in the published posts.
- **Voyage Vault:** the Gumroad webhook skips the HMAC check when no signature header is sent.
- **Singularity:** `proxy.ts` compares the token with `===` (not constant-time).
- **Coinsel:** the SMS ingest route accepts `?token=` in the query string, so the token can end up in access logs.

---

## Fixed in the redesign

| # | What | Why it was slow or wrong | Change |
|---|---|---|---|
| F1 | `SplashScreen` wrapped the whole app | Server HTML contained only a Pac-Man spinner. No content was painted until React hydrated, which hurt LCP and SEO. | Removed. Pages render on the server again. |
| F2 | Google Fonts `<link>` (4 families, one unused: Montserrat) | Render-blocking CSS from a third-party origin | `next/font` self-hosts the fonts. Only the italic Instrument Serif is loaded, and JetBrains Mono is not preloaded. |
| F3 | Hero blobs: three 420–600 px `filter: blur(90px)` layers, animated forever | Constant GPU and paint work | Static gradients. |
| F4 | Hero `onMouseMove` → `setState` | Re-rendered the whole hero on every mouse move | CSS variables written once per frame. |
| F5 | Hero text started hidden (opacity 0 and blur, or letters clipped) | Chrome could not use the headline as LCP until the animation ended | Text is visible on the first frame. The effect is now a light beam across the name and a short slide-up. |
| F6 | `bjIn` page entrance used `opacity: 0` and `filter: blur(10px)` on whole screens | Full-screen blur rasterisation, and LCP was delayed on every page | Transform-only. |
| F7 | Featured carousel tilt: `setState` on every pointer move | Re-renders | Replaced by the scroll showcase, which uses an IntersectionObserver and CSS transitions. |
| F8 | Homepage featured posts fetched in the browser (axios, framer-motion, react-countup, Prisma) | Two requests plus a DB connection on every visit, and a skeleton flash | Built at build time from `getStaticProps`. |
| F9 | Shell scroll progress: `setState` on every scroll event | Re-rendered the shell on every scroll | A ref and a transform, at most once per frame. |
| F10 | Custom cursor `requestAnimationFrame` loop | Ran 60 times a second even when the mouse was still | The loop stops once the ring catches up. |
| F11 | `react-syntax-highlighter` default build | Every highlight.js language bundled into every post | Light build with the 14 languages the posts use. Post first-load JS went from 582 kB to 218 kB. |
| F12 | `cheerio` in the browser bundle (EmbeddedLink) | Large parser shipped to every post | Uses the browser's `DOMParser`. |
| F13 | framer-motion on the homepage and projects page | Animation runtime in the critical bundle | CSS only. `/` went from 176 kB to 121 kB, `/routes/projects` from 161 kB to 112 kB. |
| F14 | Project images | Third-party stock photos, some from dead URLs | Real screenshots as WebP (30–100 kB) through `next/image` with `sizes`. |
| F15 | `/routes/blog` wrote every post to `localStorage` on every render | Synchronous storage write that nothing read | Removed. |
| F16 | Build crashed on `/post/webos-project` | next-mdx-remote v6 strips JS props (`blockJS`), so `<Table header={...}>` got `undefined` | `serialize(..., { blockJS: false })` for local posts, and Table props have defaults. |
| F17 | CI workflow had a stray `k` line | Invalid YAML; CI could not run | Removed. CI now also runs `pnpm test`. |
