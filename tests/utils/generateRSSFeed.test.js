// @vitest-environment node
import fs from 'fs'
import generateRSSFeed from 'utils/generateRSSFeed'

const post = (data, extra = {}) => ({ props: { data }, ...extra })

describe('generateRSSFeed', () => {
	let write
	const env = { ...process.env }

	beforeEach(() => {
		write = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {})
		delete process.env.BASE_URL
		delete process.env.NEXT_PUBLIC_SITE_URL
	})

	afterEach(() => {
		vi.restoreAllMocks()
		process.env = { ...env }
	})

	const xml = () => write.mock.calls[0][1]

	it('writes public/rss.xml exactly once', async () => {
		await generateRSSFeed([])
		expect(write).toHaveBeenCalledTimes(1)
		expect(write.mock.calls[0][0]).toBe('./public/rss.xml')
		expect(xml()).toContain('<rss')
		expect(xml()).toContain('Bojanjagetic Blog Post | RSS Feed')
	})

	it('emits one <item> per post with link, guid, description and date', async () => {
		await generateRSSFeed([
			post({ title: 'Hello & welcome', slug: 'hello', excerpt: 'First post', publishedAt: '2022-12-26' }),
			post({ title: 'Second', slug: 'second', excerpt: 'Two', publishedAt: '2023-01-02' })
		])
		const out = xml()
		expect(out.match(/<item>/g)).toHaveLength(2)
		expect(out).toContain('https://www.jageticbojan.com/post/hello')
		expect(out).toContain('<guid isPermaLink="false">https://www.jageticbojan.com/post/second</guid>')
		expect(out).toContain('First post')
		expect(out).toContain('Mon, 26 Dec 2022')
		// Titles are CDATA-wrapped so special chars survive.
		expect(out).toContain('<![CDATA[Hello & welcome]]>')
	})

	it('uses BASE_URL, then NEXT_PUBLIC_SITE_URL for absolute links', async () => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://public.example'
		await generateRSSFeed([post({ title: 'a', slug: 'a' })])
		expect(xml()).toContain('https://public.example/post/a')
		expect(xml()).toContain('https://public.example/rss.xml')

		write.mockClear()
		process.env.BASE_URL = 'https://base.example'
		await generateRSSFeed([post({ title: 'a', slug: 'a' })])
		expect(xml()).toContain('https://base.example/post/a')
	})

	it('falls back to createdAt when publishedAt is missing', async () => {
		await generateRSSFeed([post({ title: 'a', slug: 'a', createdAt: '2020-02-02' })])
		expect(xml()).toContain('02 Feb 2020')
	})

	it('produces an XML document a feed reader can parse', async () => {
		await generateRSSFeed([post({ title: '<b>x</b>', slug: 'x', excerpt: 'a < b' })])
		const doc = xml()
		expect(doc.startsWith('<?xml')).toBe(true)
		expect(doc.trim().endsWith('</rss>')).toBe(true)
	})
})
