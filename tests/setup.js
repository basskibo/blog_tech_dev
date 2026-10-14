import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
	cleanup()
})

// Server-side suites (pages/api, getStaticProps, services, scripts) opt into
// `// @vitest-environment node`, where there is no window at all.
const hasDom = typeof window !== 'undefined'

// jsdom does not implement these; components feature-detect them.
if (hasDom && !window.matchMedia) {
	window.matchMedia = vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		addListener: vi.fn(),
		removeListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
}

class MockIntersectionObserver {
	constructor (callback) {
		this.callback = callback
		MockIntersectionObserver.instances.push(this)
	}

	observe (el) { this.el = el }
	unobserve () {}
	disconnect () {}
}
MockIntersectionObserver.instances = []
if (hasDom) {
	window.IntersectionObserver = MockIntersectionObserver
	globalThis.IntersectionObserver = MockIntersectionObserver

	window.scrollTo = vi.fn()
	Element.prototype.scrollTo = vi.fn()
	Element.prototype.scrollIntoView = vi.fn()
}
