// @vitest-environment node
import config from '../../next-sitemap.config.js'

describe('next-sitemap config', () => {
	const transform = (loc) => config.transform({ changefreq: 'daily', priority: 0.7 }, loc)

	it('uses the www host and a flat sitemap', () => {
		expect(config.siteUrl).toBe('https://www.jageticbojan.com')
		expect(config.generateIndexSitemap).toBe(false)
	})

	it('takes lastmod for posts and libraries from publishedAt', async () => {
		expect((await transform('/post/dynamic-island-gnome-extension')).lastmod).toBe(new Date('2026-10-28').toISOString())
		expect((await transform('/libary/browser-game-studio')).lastmod).toBe(new Date('2026-10-22').toISOString())
	})

	it('leaves drafts out and keeps other routes', async () => {
		expect(await transform('/libary/blogtech')).toBeNull()
		expect(await transform('/routes/blog')).toMatchObject({ loc: '/routes/blog', priority: 0.7 })
	})
})
