// Analytics: Umami (script tag in _app) for page views and click events,
// PostHog for product analytics. PostHog is optional and only loads when
// NEXT_PUBLIC_POSTHOG_KEY is set, after the page is idle, so it never
// competes with rendering.

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'
// Session replay is heavy on the main thread, so it is opt-in.
const POSTHOG_REPLAY = process.env.NEXT_PUBLIC_POSTHOG_REPLAY === '1'

let posthog = null
let loading = null

function whenIdle (callback) {
	if (typeof window.requestIdleCallback === 'function') {
		window.requestIdleCallback(callback, { timeout: 4000 })
	} else {
		window.setTimeout(callback, 2000)
	}
}

export function initAnalytics ({ key = POSTHOG_KEY, host = POSTHOG_HOST, replay = POSTHOG_REPLAY, load = () => import('posthog-js') } = {}) {
	if (typeof window === 'undefined' || !key) return Promise.resolve(null)
	if (loading) return loading
	loading = new Promise((resolve) => {
		whenIdle(() => {
			load()
				.then((mod) => {
					const client = mod.default || mod
					client.init(key, {
						api_host: host,
						// Page views are sent on route changes from _app, so the
						// first one is captured here and SPA navigations are not doubled.
						capture_pageview: false,
						capture_pageleave: true,
						persistence: 'localStorage',
						disable_session_recording: !replay
					})
					posthog = client
					client.capture('$pageview')
					resolve(client)
				})
				.catch(() => resolve(null))
		})
	})
	return loading
}

export function pageview (url) {
	if (posthog) posthog.capture('$pageview', { $current_url: typeof window !== 'undefined' ? window.location.origin + url : url })
}

export function event (name, props) {
	if (typeof window === 'undefined') return
	if (window.umami && typeof window.umami.track === 'function') window.umami.track(name, props)
	if (posthog) posthog.capture(name, props)
}

// Test hook: forget the loaded client.
export function resetAnalytics () {
	posthog = null
	loading = null
}
