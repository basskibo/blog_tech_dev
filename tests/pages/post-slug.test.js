// @vitest-environment node
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

vi.mock('@/components/custom/MdxComponents', () => ({ default: {} }))
vi.mock('next-mdx-remote/serialize', () => ({
	serialize: vi.fn(async (content) => ({ compiledSource: `compiled:${content.length}`, frontmatter: {}, scope: {} }))
}))

const { getStaticPaths, getStaticProps } = await import('../../pages/post/[slug].js')
const { serialize } = await import('next-mdx-remote/serialize')

const all = fs.readdirSync('posts/blog')
	.filter((f) => f.endsWith('.mdx'))
	.map((f) => ({ ...matter(fs.readFileSync(path.join('posts/blog', f), 'utf8')).data, slug: f.replace(/\.mdx$/, '') }))
const published = all.filter((p) => !p.inPreparation)
	.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
const drafts = all.filter((p) => p.inPreparation)

describe('pages/post/[slug] getStaticPaths', () => {
	it('emits one path per .mdx file (drafts included, so direct links work) and no fallback', async () => {
		const { paths, fallback } = await getStaticPaths()
		expect(fallback).toBe(false)
		expect(paths.map((p) => p.params.slug).sort()).toEqual(all.map((p) => p.slug).sort())
	})

	it('does not emit paths for generated -devto.md files', async () => {
		const { paths } = await getStaticPaths()
		for (const { params } of paths) {
			expect(fs.existsSync(path.join('posts/blog', `${params.slug}.mdx`))).toBe(true)
		}
	})
})

describe('pages/post/[slug] getStaticProps', () => {
	it('returns data, mdxSource and nextPost', async () => {
		const slug = published[0].slug
		const { props } = await getStaticProps({ params: { slug } })
		expect(Object.keys(props).sort()).toEqual(['data', 'mdxSource', 'nextPost'])
		expect(props.data.slug).toBe(slug)
		expect(props.data.title).toBe(published[0].title)
		expect(props.data.read).toMatch(/^\d+ min read$/)
		expect(props.mdxSource.compiledSource).toMatch(/^compiled:/)
		expect(serialize).toHaveBeenCalled()
	})

	it('props are JSON-serializable (Next rejects undefined/Date values)', async () => {
		const { props } = await getStaticProps({ params: { slug: published[1].slug } })
		expect(JSON.parse(JSON.stringify(props))).toEqual(props)
	})

	it('nextPost is the next-older published post', async () => {
		const { props } = await getStaticProps({ params: { slug: published[0].slug } })
		expect(props.nextPost.slug).toBe(published[1].slug)
		expect(props.nextPost).toEqual({
			slug: published[1].slug,
			title: published[1].title,
			excerpt: published[1].excerpt || '',
			tags: published[1].tags || [],
			featuredImage: published[1].featuredImage || ''
		})
	})

	it('the oldest post wraps around to the newest', async () => {
		const oldest = published[published.length - 1]
		const { props } = await getStaticProps({ params: { slug: oldest.slug } })
		expect(props.nextPost.slug).toBe(published[0].slug)
	})

	it('walks the whole chain newest → oldest without ever pointing to itself or a draft', async () => {
		const draftSlugs = new Set(drafts.map((d) => d.slug))
		for (let i = 0; i < published.length; i++) {
			const { props } = await getStaticProps({ params: { slug: published[i].slug } })
			expect(props.nextPost.slug, published[i].slug).not.toBe(published[i].slug)
			expect(draftSlugs.has(props.nextPost.slug)).toBe(false)
			expect(props.nextPost.slug).toBe(published[(i + 1) % published.length].slug)
		}
	})

	it('a draft (reachable by direct URL) points to the newest published post', async () => {
		if (drafts.length === 0) return
		const { props } = await getStaticProps({ params: { slug: drafts[0].slug } })
		expect(props.data.inPreparation).toBe(true)
		expect(props.nextPost.slug).toBe(published[0].slug)
	})

	it('throws for an unknown slug', async () => {
		await expect(getStaticProps({ params: { slug: 'definitely-not-a-post' } })).rejects.toThrow(/ENOENT/)
	})
})

describe('pages/post/[slug] with the real MDX serializer', () => {
	it('serializes a real post', async () => {
		const actual = await vi.importActual('next-mdx-remote/serialize')
		serialize.mockImplementationOnce(actual.serialize)
		const { props } = await getStaticProps({ params: { slug: published[0].slug } })
		expect(props.mdxSource.compiledSource.length).toBeGreaterThan(100)
	})
})
