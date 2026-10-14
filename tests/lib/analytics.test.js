import { event, pageview } from '@/lib/analytics'

describe('analytics', () => {
	afterEach(() => {
		delete window.gtag
		vi.unstubAllEnvs()
	})

	it('pageview sends a config call with the page path', () => {
		vi.stubEnv('NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID', 'G-TEST')
		window.gtag = vi.fn()
		pageview('/post/hello')
		expect(window.gtag).toHaveBeenCalledWith('config', 'G-TEST', { page_path: '/post/hello' })
	})

	it('pageview is a no-op when gtag is not loaded (e.g. blocked by an adblocker)', () => {
		expect(() => pageview('/')).not.toThrow()
	})

	it('event forwards action and params to gtag', () => {
		window.gtag = vi.fn()
		event({ action: 'clap', params: { slug: 'x' } })
		expect(window.gtag).toHaveBeenCalledWith('event', 'clap', { slug: 'x' })
	})

	// Regression test — fixed bug (lib/analytics.js event): unlike pageview, event() does not guard
	// against a missing window.gtag, so any tracked click throws a TypeError when
	// the GA script is blocked. Fix: `if (window.gtag) window.gtag(...)` / `window.gtag?.(...)`.
	it('event is a no-op when gtag is not loaded', () => {
		expect(() => event({ action: 'clap', params: {} })).not.toThrow()
	})
})
