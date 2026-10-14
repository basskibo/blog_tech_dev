// @vitest-environment node
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const rss = vi.hoisted(() => vi.fn(async () => {}))
vi.mock('utils/generateRSSFeed', () => ({ default: rss }))
vi.mock('services/indexv2', async () => await import('../../services/indexv2.js'))

const { getStaticProps } = await import('../../pages/routes/blog.js')

const files = fs.readdirSync('posts/blog').filter((f) => f.endsWith('.mdx'))

describe('pages/routes/blog getStaticProps', () => {
	beforeEach(() => rss.mockClear())

	it('returns one { props: { data } } per blog .mdx with a slug', async () => {
		const { props } = await getStaticProps()
		expect(props.posts).toHaveLength(files.length)
		const slugs = props.posts.map((p) => p.props.data.slug)
		expect(slugs.sort()).toEqual(files.map((f) => f.replace(/\.mdx$/, '')).sort())
		for (const p of props.posts) expect(typeof p.props.data.title).toBe('string')
	})

	it('props are JSON-serializable', async () => {
		const { props } = await getStaticProps()
		expect(JSON.parse(JSON.stringify(props))).toEqual(props)
	})

	it('regenerates the RSS feed once with every published post', async () => {
		const { props } = await getStaticProps()
		expect(rss).toHaveBeenCalledTimes(1)
		const published = props.posts.filter((p) => !p.props.data.inPreparation)
		expect(rss.mock.calls[0][0].map((p) => p.props.data.slug)).toEqual(published.map((p) => p.props.data.slug))
	})

	// Regression test — fixed bug (pages/routes/blog.js:41): every post — including inPreparation drafts —
	// is passed to generateRSSFeed, so unfinished drafts are published to
	// /rss.xml (and syndicated by feed readers) while the site itself hides them.
	// Fix: `generateRSSFeed(posts.filter((p) => !p.props.data.inPreparation))`.
	it('does not publish inPreparation drafts to the RSS feed', async () => {
		await getStaticProps()
		const fed = rss.mock.calls[0][0]
		expect(fed.some((p) => p.props.data.inPreparation)).toBe(false)
	})

	it('has at least one draft in the content (keeps the RSS test above meaningful)', () => {
		const drafts = files.filter((f) => matter(fs.readFileSync(path.join('posts/blog', f), 'utf8')).data.inPreparation)
		expect(drafts.length).toBeGreaterThan(0)
	})
})
