import { event, initAnalytics, pageview, resetAnalytics } from '@/lib/analytics'

function fakePosthog () {
	const client = { init: vi.fn(), capture: vi.fn() }
	return { client, load: vi.fn(() => Promise.resolve({ default: client })) }
}

beforeEach(() => {
	resetAnalytics()
	window.requestIdleCallback = (cb) => cb()
	delete window.umami
})

afterEach(() => {
	delete window.requestIdleCallback
})

describe('initAnalytics', () => {
	it('does nothing without a PostHog key', async () => {
		const { load } = fakePosthog()
		await expect(initAnalytics({ key: '', load })).resolves.toBeNull()
		expect(load).not.toHaveBeenCalled()
	})

	it('loads PostHog when idle, with replay off and no automatic page views', async () => {
		const { client, load } = fakePosthog()
		await initAnalytics({ key: 'phc_test', host: 'https://eu.i.posthog.com', load })
		expect(client.init).toHaveBeenCalledWith('phc_test', expect.objectContaining({
			api_host: 'https://eu.i.posthog.com',
			capture_pageview: false,
			persistence: 'localStorage',
			disable_session_recording: true
		}))
		expect(client.capture).toHaveBeenCalledWith('$pageview')
	})

	it('turns session replay on only when asked', async () => {
		const { client, load } = fakePosthog()
		await initAnalytics({ key: 'k', replay: true, load })
		expect(client.init.mock.calls[0][1].disable_session_recording).toBe(false)
	})

	it('loads once even when called again', async () => {
		const { load } = fakePosthog()
		await Promise.all([initAnalytics({ key: 'k', load }), initAnalytics({ key: 'k', load })])
		expect(load).toHaveBeenCalledTimes(1)
	})

	it('waits for idle time before loading', async () => {
		let idle
		window.requestIdleCallback = (cb) => { idle = cb }
		const { load } = fakePosthog()
		const ready = initAnalytics({ key: 'k', load })
		expect(load).not.toHaveBeenCalled()
		idle()
		await ready
		expect(load).toHaveBeenCalledTimes(1)
	})

	it('falls back to a timeout where requestIdleCallback is missing', async () => {
		vi.useFakeTimers()
		delete window.requestIdleCallback
		const { load } = fakePosthog()
		const ready = initAnalytics({ key: 'k', load })
		expect(load).not.toHaveBeenCalled()
		vi.advanceTimersByTime(2000)
		vi.useRealTimers()
		await ready
		expect(load).toHaveBeenCalledTimes(1)
	})

	it('survives a blocked PostHog script', async () => {
		const load = vi.fn(() => Promise.reject(new Error('blocked')))
		await expect(initAnalytics({ key: 'k', load })).resolves.toBeNull()
		expect(() => pageview('/x')).not.toThrow()
	})
})

describe('pageview', () => {
	it('is a no-op before PostHog loads', () => {
		expect(() => pageview('/routes/blog')).not.toThrow()
	})

	it('sends a page view with the full url once loaded', async () => {
		const { client, load } = fakePosthog()
		await initAnalytics({ key: 'k', load })
		pageview('/routes/blog')
		expect(client.capture).toHaveBeenLastCalledWith('$pageview', { $current_url: `${window.location.origin}/routes/blog` })
	})
})

describe('event', () => {
	it('sends to Umami when its script is present', () => {
		window.umami = { track: vi.fn() }
		event('say-hello-click', { from: 'home' })
		expect(window.umami.track).toHaveBeenCalledWith('say-hello-click', { from: 'home' })
	})

	it('sends to both Umami and PostHog', async () => {
		window.umami = { track: vi.fn() }
		const { client, load } = fakePosthog()
		await initAnalytics({ key: 'k', load })
		event('project-open', { slug: 'coinsel' })
		expect(window.umami.track).toHaveBeenCalledWith('project-open', { slug: 'coinsel' })
		expect(client.capture).toHaveBeenLastCalledWith('project-open', { slug: 'coinsel' })
	})

	it('does not throw when nothing is loaded (ad blockers)', () => {
		expect(() => event('x')).not.toThrow()
	})
})
