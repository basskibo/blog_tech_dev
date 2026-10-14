// For component tests that must run in the *node* environment (because the
// component imports a bare jsconfig-baseUrl specifier like 'src/quizQuestions'
// that Vite's browser-mode import analysis rejects before vi.mock can step in).
// Installs jsdom globals by hand. Note: @testing-library's global `screen` was
// created before the DOM existed, so use `within(document.body)` instead.
import { JSDOM } from 'jsdom'
import { populateGlobal } from 'vitest/environments'

export function installDom () {
	if (globalThis.document) return
	const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
		url: 'http://localhost/',
		pretendToBeVisual: true
	})
	populateGlobal(globalThis, dom.window, { bindFunctions: true })
}
