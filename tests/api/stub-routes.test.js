// @vitest-environment node
//
// Every file under pages/api becomes a public route. A route module whose body is
// entirely commented out has no default export, so Next answers every request
// with a 500 ("API route ... does not export a default function").
import fs from 'node:fs'
import path from 'node:path'

const API_DIR = 'pages/api'
const routes = []
;(function walk (dir) {
	for (const name of fs.readdirSync(dir)) {
		const full = path.join(dir, name)
		if (fs.statSync(full).isDirectory()) walk(full)
		else if (/\.(js|jsx)$/.test(name)) routes.push(full)
	}
})(API_DIR)

// BUG: analytics.js, comments.js, og.jsx and subscribers.js are fully commented out —
// they should be deleted (or restored) rather than shipped as broken routes.
const KNOWN_EMPTY = ['pages/api/analytics.js', 'pages/api/comments.js', 'pages/api/og.jsx', 'pages/api/subscribers.js']

const hasDefaultExport = (file) => /^\s*export\s+default\b/m.test(fs.readFileSync(file, 'utf8')) ||
	/^\s*export\s*\{[^}]*\bdefault\b/m.test(fs.readFileSync(file, 'utf8'))

describe('pages/api route modules', () => {
	it.each(routes.filter((r) => !KNOWN_EMPTY.includes(r)))('%s exports a default handler', (file) => {
		expect(hasDefaultExport(file)).toBe(true)
	})

	it.fails.each(KNOWN_EMPTY)('%s exports a default handler (known: file is entirely commented out)', (file) => {
		expect(hasDefaultExport(file)).toBe(true)
	})
})
