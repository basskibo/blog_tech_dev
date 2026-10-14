import projects, { KINDS, countByKind, filterProjects, getFeaturedProjects, getSpotlightProjects, hostOf, primaryLink } from '@/lib/projects'
import fs from 'node:fs'
import path from 'node:path'

describe('projects data', () => {
	it('has unique slugs', () => {
		const slugs = projects.map((p) => p.slug)
		expect(new Set(slugs).size).toBe(slugs.length)
	})

	it('every project has the fields the UI renders', () => {
		for (const p of projects) {
			expect(p.name, p.slug).toBeTruthy()
			expect(p.tagline, p.slug).toBeTruthy()
			expect(p.description, p.slug).toBeTruthy()
			expect(Array.isArray(p.tech) && p.tech.length > 0, p.slug).toBe(true)
			expect(KINDS, p.slug).toContain(p.kind)
			expect(['live', 'in development', 'archived'], p.slug).toContain(p.status)
			expect(p.color, p.slug).toMatch(/^#[0-9a-f]{6}$/i)
			expect(Number.isInteger(p.year), p.slug).toBe(true)
		}
	})

	it('links are https and local images exist', () => {
		for (const p of projects) {
			for (const url of [p.liveUrl, p.repoUrl].filter(Boolean)) {
				expect(url, p.slug).toMatch(/^https:\/\//)
			}
			if (p.image) {
				expect(fs.existsSync(path.join('public', p.image)), p.image).toBe(true)
			}
		}
	})

	it('features Coinsel, Captain Cook and Voyage Vault in that order', () => {
		expect(getFeaturedProjects().map((p) => p.slug)).toEqual(['coinsel', 'captain-cook', 'voyage-vault'])
	})

	it('ranks the featured projects first', () => {
		expect(projects.slice(0, 3).map((p) => p.slug)).toEqual(['coinsel', 'captain-cook', 'voyage-vault'])
	})

	it('featured projects have a screenshot and a live link', () => {
		for (const p of getFeaturedProjects()) {
			expect(p.image).toBeTruthy()
			expect(p.liveUrl).toBeTruthy()
		}
	})

	it('spotlights Singularity and the Real-Debrid HLS addon with terminal lines', () => {
		const spot = getSpotlightProjects()
		expect(spot.map((p) => p.slug)).toEqual(['singularity', 'ipad-hls'])
		for (const p of spot) expect(p.terminal.length).toBeGreaterThan(1)
	})
})

describe('filterProjects', () => {
	it('returns everything for All or empty', () => {
		expect(filterProjects(projects, 'All')).toBe(projects)
		expect(filterProjects(projects, undefined)).toBe(projects)
	})

	it('filters by kind and keeps rank order', () => {
		const ai = filterProjects(projects, 'AI')
		expect(ai.length).toBeGreaterThan(0)
		expect(ai.every((p) => p.kind === 'AI')).toBe(true)
		const idx = ai.map((p) => projects.indexOf(p))
		expect([...idx].sort((a, b) => a - b)).toEqual(idx)
	})

	it('returns an empty list for an unknown kind', () => {
		expect(filterProjects(projects, 'Nope')).toEqual([])
	})
})

describe('countByKind', () => {
	it('counts every kind and the total', () => {
		const counts = countByKind(projects)
		expect(counts.All).toBe(projects.length)
		const sum = KINDS.reduce((acc, k) => acc + counts[k], 0)
		expect(sum).toBe(projects.length)
	})

	it('reports zero for kinds with no projects', () => {
		expect(countByKind([])).toEqual({ All: 0, AI: 0, 'Web app': 0, Tool: 0, Library: 0, Game: 0 })
	})

	it('counts kinds outside the known list instead of dropping them', () => {
		expect(countByKind([{ kind: 'Hardware' }]).Hardware).toBe(1)
	})
})

describe('primaryLink', () => {
	it('prefers the live app', () => {
		expect(primaryLink({ liveUrl: 'https://a.dev', repoUrl: 'https://github.com/x' })).toEqual({ href: 'https://a.dev', label: 'Open app' })
	})

	it('uses a custom live label', () => {
		expect(primaryLink({ liveUrl: 'https://npmjs.com/x', liveLabel: 'npm' }).label).toBe('npm')
	})

	it('falls back to the code', () => {
		expect(primaryLink({ liveUrl: null, repoUrl: 'https://github.com/x' })).toEqual({ href: 'https://github.com/x', label: 'View code' })
	})

	it('returns null when there is nothing public', () => {
		expect(primaryLink({ liveUrl: null, repoUrl: null })).toBeNull()
	})
})

describe('hostOf', () => {
	it('strips protocol, path and www', () => {
		expect(hostOf('https://www.npmjs.com/package/x')).toBe('npmjs.com')
		expect(hostOf('https://coinsel.jageticbojan.com/')).toBe('coinsel.jageticbojan.com')
	})

	it('is empty for missing or invalid urls', () => {
		expect(hostOf(null)).toBe('')
		expect(hostOf('not a url')).toBe('')
	})
})
