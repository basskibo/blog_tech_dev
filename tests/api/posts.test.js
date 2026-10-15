// @vitest-environment node
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { mockReq, mockRes } from '../helpers/http'

// pages/api/posts.js imports the bare specifier 'services/indexv2' (resolved via
// jsconfig baseUrl in Next). Vitest has no alias for it, so map it explicitly.
const files = vi.hoisted(() => ({ override: null }))
vi.mock('services/indexv2', async () => {
	const real = await import('../../services/indexv2.js')
	return { ...real, getPostFiles: () => files.override ?? real.getPostFiles() }
})

const { default: handler } = await import('../../pages/api/posts')

const realPosts = fs.readdirSync('posts/blog')
	.filter((f) => f.endsWith('.mdx'))
	.map((f) => ({ ...matter(fs.readFileSync(path.join('posts/blog', f), 'utf8')).data, slug: f.split('.')[0] }))

describe('/api/posts', () => {
	beforeEach(() => {
		files.override = null
		vi.spyOn(console, 'log').mockImplementation(() => {})
	})
	afterEach(() => vi.restoreAllMocks())

	describe('?all=1', () => {
		it('lists every published post with title, slug, excerpt and first tag', async () => {
			const res = mockRes()
			await handler(mockReq({ query: { all: '1' } }), res)
			expect(res.status).toHaveBeenCalledWith(200)
			const { posts } = res.json.mock.calls[0][0]
			const published = realPosts.filter((p) => !p.inPreparation)
			expect(posts).toHaveLength(published.length)
			for (const p of posts) {
				expect(Object.keys(p).sort()).toEqual(['excerpt', 'slug', 'tag', 'title'])
				expect(typeof p.title).toBe('string')
				expect(p.tag).toBeTruthy()
			}
		})

		it('never includes inPreparation drafts', async () => {
			const res = mockRes()
			await handler(mockReq({ query: { all: '1' } }), res)
			const slugs = res.json.mock.calls[0][0].posts.map((p) => p.slug)
			for (const draft of realPosts.filter((p) => p.inPreparation)) expect(slugs).not.toContain(draft.slug)
		})
	})

	describe('default (similar posts)', () => {
		it('returns 3 distinct, published random posts', async () => {
			const res = mockRes()
			await handler(mockReq(), res)
			expect(res.status).toHaveBeenCalledWith(200)
			const { similiarPosts } = res.send.mock.calls[0][0]
			expect(similiarPosts).toHaveLength(3)
			expect(new Set(similiarPosts.map((p) => p.slug)).size).toBe(3)
			for (const p of similiarPosts) expect(p.inPreparation).not.toBe(true)
		})

		it('returns an empty list when there are no posts', async () => {
			files.override = []
			const res = mockRes()
			await handler(mockReq(), res)
			expect(res.send.mock.calls[0][0]).toEqual({ similiarPosts: [] })
		})

		// Regression test — fixed bug (pages/api/posts.js:56-67 selectRandomNumberOfPosts): `count` is capped
		// by the TOTAL number of posts, but drafts are skipped inside the loop. With
		// fewer than 3 published posts the `while` never terminates and the request
		// hangs (100% CPU). Fix: filter drafts first, then cap count by that length
		// (or shuffle + slice).
		// Math.random is stubbed to throw after many calls so a regression can't hang the suite.
		it('terminates when fewer than 3 posts are published', async () => {
			const published = realPosts.find((p) => !p.inPreparation).slug + '.mdx'
			const drafts = realPosts.filter((p) => p.inPreparation).slice(0, 3).map((p) => p.slug + '.mdx')
			files.override = [published, ...drafts]
			let calls = 0
			vi.spyOn(Math, 'random').mockImplementation(() => {
				if (++calls > 10000) throw new Error('infinite loop in selectRandomNumberOfPosts')
				return (calls % 97) / 97
			})
			const res = mockRes()
			await handler(mockReq(), res)
			expect(res.send.mock.calls[0][0].similiarPosts).toHaveLength(1)
		})
	})
})
