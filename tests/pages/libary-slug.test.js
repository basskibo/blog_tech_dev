// @vitest-environment node
import fs from 'node:fs'

vi.mock('@/components/custom/MdxComponents', () => ({ default: {} }))
vi.mock('next-mdx-remote/serialize', () => ({ serialize: vi.fn(async () => ({ compiledSource: 'compiled' })) }))

const { getStaticPaths, getStaticProps } = await import('../../pages/libary/[slug].js')

const files = fs.readdirSync('posts/libaries').filter((f) => f.endsWith('.mdx'))

describe('pages/libary/[slug]', () => {
	it('getStaticPaths covers every library .mdx file with fallback false', async () => {
		const { paths, fallback } = await getStaticPaths()
		expect(fallback).toBe(false)
		expect(paths.map((p) => p.params.slug).sort()).toEqual(files.map((f) => f.replace(/\.mdx$/, '')).sort())
	})

	it('getStaticProps returns data, mdxSource and a table of contents', async () => {
		const slug = files[0].replace(/\.mdx$/, '')
		const { props } = await getStaticProps({ params: { slug } })
		expect(Object.keys(props).sort()).toEqual(['data', 'mdxSource', 'toc'])
		expect(props.data.slug).toBe(slug)
		expect(typeof props.data.title).toBe('string')
		expect(Array.isArray(props.toc)).toBe(true)
		expect(JSON.parse(JSON.stringify(props))).toEqual(props)
	})

	it('builds a nested TOC from ## / ### headings in every library post', async () => {
		for (const file of files) {
			const slug = file.replace(/\.mdx$/, '')
			const { props } = await getStaticProps({ params: { slug } })
			for (const entry of props.toc) {
				expect(entry.headerType, slug).toBe('h2')
				expect(entry.link).toMatch(/^#[a-z0-9-]*$/)
				for (const sub of entry.subheading) expect(sub.headerType).toBe('h3')
			}
		}
	})

	describe('table of contents (fake content)', () => {
		afterEach(() => vi.restoreAllMocks())

		const withContent = (body) => {
			vi.spyOn(fs, 'readFileSync').mockReturnValue(`---\ntitle: "T"\n---\n${body}`)
			return getStaticProps({ params: { slug: 'fake' } })
		}

		it('nests h3 under the preceding h2 and slugifies links', async () => {
			const { props } = await withContent('## Getting Started!\ntext\n### Install & Run\n### Configure\n## API\n')
			expect(props.toc).toEqual([
				{
					title: 'Getting Started!',
					headerType: 'h2',
					link: '#getting-started',
					subheading: [
						{ title: 'Install & Run', headerType: 'h3', link: '#install-and-run', subheading: [] },
						{ title: 'Configure', headerType: 'h3', link: '#configure', subheading: [] }
					]
				},
				{ title: 'API', headerType: 'h2', link: '#api', subheading: [] }
			])
		})

		it('ignores # and #### headings', async () => {
			const { props } = await withContent('# Title\n#### Deep\n## Real\n')
			expect(props.toc.map((t) => t.title)).toEqual(['Real'])
		})

		// Regression test — fixed bug (pages/libary/[slug].js getTableOfContents ~line 37-45): an h3 that
		// appears before any h2 dereferences `lastEl` (undefined) and crashes the
		// build with "Cannot read properties of undefined (reading 'subheading')".
		// Fix: if there is no preceding h2, push the h3 as a top-level entry.
		it('handles an h3 before any h2', async () => {
			const { props } = await withContent('### Orphan\n## Section\n')
			expect(props.toc.length).toBeGreaterThan(0)
		})
	})
})
