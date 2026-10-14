// @vitest-environment node
import fs from 'node:fs'

vi.mock('services/indexv2', async () => await import('../../services/indexv2.js'))

const { getStaticProps } = await import('../../pages/routes/libaries.js')

describe('pages/routes/libaries getStaticProps', () => {
	it('returns every library post with data and content', async () => {
		const files = fs.readdirSync('posts/libaries')
		const { props } = await getStaticProps()
		expect(props.libaries).toHaveLength(files.length)
		for (const item of props.libaries) {
			expect(Object.keys(item.props).sort()).toEqual(['content', 'data'])
			expect(typeof item.props.data.slug).toBe('string')
			expect(typeof item.props.data.title).toBe('string')
			expect(typeof item.props.content).toBe('string')
		}
		expect(props.libaries.map((l) => l.props.data.slug).sort())
			.toEqual(files.map((f) => f.replace(/\.mdx$/, '')).sort())
	})

	it('props are JSON-serializable', async () => {
		const { props } = await getStaticProps()
		expect(JSON.parse(JSON.stringify(props))).toEqual(props)
	})
})
