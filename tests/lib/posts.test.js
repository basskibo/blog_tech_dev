import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { getLatestPosts, toCard } from '@/lib/posts'

function tmpBlog (files) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-'))
	for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), body)
	return dir
}

const post = (fm, body = 'Hello world') => `---\n${fm}\n---\n${body}\n`

describe('getLatestPosts', () => {
	it('returns newest first, skips drafts and non-mdx files, respects the limit', () => {
		const dir = tmpBlog({
			'old.mdx': post('title: Old\npublishedAt: "2020-01-01"'),
			'new.mdx': post('title: New\npublishedAt: "2026-10-12"'),
			'mid.mdx': post('title: Mid\npublishedAt: "2024-05-05"'),
			'draft.mdx': post('title: Draft\npublishedAt: "2027-01-01"\ninPreparation: true'),
			'notes.md': post('title: Not mdx\npublishedAt: "2030-01-01"')
		})
		expect(getLatestPosts(2, dir).map((p) => p.slug)).toEqual(['new', 'mid'])
		expect(getLatestPosts(10, dir).map((p) => p.slug)).toEqual(['new', 'mid', 'old'])
	})

	it('puts posts without a date last', () => {
		const dir = tmpBlog({
			'nodate.mdx': post('title: No date'),
			'dated.mdx': post('title: Dated\npublishedAt: "2021-01-01"')
		})
		expect(getLatestPosts(5, dir).map((p) => p.slug)).toEqual(['dated', 'nodate'])
	})

	it('reads the real blog and includes the new project posts', () => {
		const latest = getLatestPosts(50)
		expect(latest.length).toBeGreaterThan(5)
		const slugs = latest.map((p) => p.slug)
		for (const slug of ['building-coinsel-ai-finance', 'captain-cook-ai-chef', 'voyage-vault-scratch-map', 'singularity-shared-mcp-notebook', 'realdebrid-hls-old-ipad']) {
			expect(slugs).toContain(slug)
		}
	})
})

describe('toCard', () => {
	it('keeps only serialisable card fields', () => {
		const card = toCard({ title: 'T', excerpt: 'E', publishedAt: '2026-01-02', featuredImage: 'x', tags: [{ slug: 's', name: 'n', extra: 1 }], body: 'ignored' }, 'slug', 'one two three')
		expect(card).toEqual({ slug: 'slug', title: 'T', excerpt: 'E', publishedAt: '2026-01-02', featuredImage: 'x', tags: [{ slug: 's', name: 'n' }], read: '1 min read' })
	})

	it('fills safe defaults (no undefined, which Next cannot serialise)', () => {
		const card = toCard({}, 'slug')
		expect(card).toEqual({ slug: 'slug', title: 'slug', excerpt: '', publishedAt: null, featuredImage: null, tags: [], read: null })
		expect(JSON.parse(JSON.stringify(card))).toEqual(card)
	})

	it('stringifies dates that YAML parsed into Date objects', () => {
		const card = toCard({ publishedAt: new Date('2026-03-04T00:00:00Z') }, 's')
		expect(typeof card.publishedAt).toBe('string')
	})
})
