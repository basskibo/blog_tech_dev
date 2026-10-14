// @vitest-environment node
import { getCategories } from 'utils/getCategories'

const post = (...tags) => ({ props: { data: { tags } } })

describe('getCategories', () => {
	it('flattens tags across posts and de-duplicates by name', () => {
		const result = getCategories([
			post({ slug: 'js', name: 'javascript' }, { slug: 'react', name: 'react' }),
			post({ slug: 'react', name: 'react' }),
			post({ slug: 'docker', name: 'docker' })
		])
		expect(result.map((t) => t.name)).toEqual(['javascript', 'react', 'docker'])
	})

	it('keeps the last occurrence when two tags share a name', () => {
		const result = getCategories([
			post({ slug: 'old', name: 'react' }),
			post({ slug: 'new', name: 'react' })
		])
		expect(result).toEqual([{ slug: 'new', name: 'react' }])
	})

	it('returns an empty list for no posts', () => {
		expect(getCategories([])).toEqual([])
	})

	// Regression test — a post without `tags` used to crash the whole category list.
	it('skips posts that have no tags', () => {
		const result = getCategories([post({ slug: 'a', name: 'a' }), { props: { data: {} } }])
		expect(result).toEqual([{ slug: 'a', name: 'a' }])
	})

	it('wraps malformed input in a descriptive error', () => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		expect(() => getCategories([{}])).toThrow(/Error parsing category/)
	})
})
