// @vitest-environment node
// nextPost edge cases with a fake posts/blog (fs mocked), so they don't depend on
// the real content.
import fs from 'fs'

vi.mock('@/components/custom/MdxComponents', () => ({ default: {} }))
vi.mock('next-mdx-remote/serialize', () => ({ serialize: vi.fn(async () => ({ compiledSource: '' })) }))

const { getStaticProps } = await import('../../pages/post/[slug].js')

function useFakeBlog (posts) {
	const byFile = Object.fromEntries(posts.map((p) => [`${p.slug}.mdx`, p]))
	vi.spyOn(fs, 'readdirSync').mockReturnValue([...Object.keys(byFile), 'ignored-devto.md'])
	vi.spyOn(fs, 'readFileSync').mockImplementation((file) => {
		const name = String(file).split(/[\\/]/).pop()
		const p = byFile[name]
		if (!p) throw new Error(`ENOENT ${file}`)
		const lines = [`title: "${p.title || p.slug}"`]
		if (p.publishedAt) lines.push(`publishedAt: "${p.publishedAt}"`)
		if (p.inPreparation) lines.push('inPreparation: true')
		return `---\n${lines.join('\n')}\n---\nbody ${p.slug}`
	})
}

afterEach(() => vi.restoreAllMocks())

describe('nextPost edge cases', () => {
	it('is null when the post is the only published one', async () => {
		useFakeBlog([{ slug: 'only', publishedAt: '2024-01-01' }])
		const { props } = await getStaticProps({ params: { slug: 'only' } })
		expect(props.nextPost).toBeNull()
	})

	it('is null when the only other posts are drafts', async () => {
		useFakeBlog([
			{ slug: 'live', publishedAt: '2024-01-01' },
			{ slug: 'draft', publishedAt: '2025-01-01', inPreparation: true }
		])
		const { props } = await getStaticProps({ params: { slug: 'live' } })
		expect(props.nextPost).toBeNull()
	})

	it('treats posts without publishedAt as oldest', async () => {
		useFakeBlog([
			{ slug: 'undated' },
			{ slug: 'new', publishedAt: '2024-01-01' },
			{ slug: 'old', publishedAt: '2020-01-01' }
		])
		expect((await getStaticProps({ params: { slug: 'new' } })).props.nextPost.slug).toBe('old')
		expect((await getStaticProps({ params: { slug: 'old' } })).props.nextPost.slug).toBe('undated')
		expect((await getStaticProps({ params: { slug: 'undated' } })).props.nextPost.slug).toBe('new')
	})

	it('fills defaults for missing excerpt/tags/featuredImage', async () => {
		useFakeBlog([
			{ slug: 'a', publishedAt: '2024-01-01' },
			{ slug: 'b', publishedAt: '2023-01-01' }
		])
		const { props } = await getStaticProps({ params: { slug: 'a' } })
		expect(props.nextPost).toEqual({ slug: 'b', title: 'b', excerpt: '', tags: [], featuredImage: '' })
	})

	it('a draft with the newest date still links to a published post, not itself', async () => {
		useFakeBlog([
			{ slug: 'draft', publishedAt: '2030-01-01', inPreparation: true },
			{ slug: 'live', publishedAt: '2024-01-01' }
		])
		const { props } = await getStaticProps({ params: { slug: 'draft' } })
		expect(props.nextPost.slug).toBe('live')
	})
})
