// @vitest-environment node
import { estimateRead, formatDate, sortByDate, tagName } from '@/components/jagetic/format'

describe('tagName', () => {
	it('returns the first tag name', () => {
		expect(tagName({ tags: [{ slug: 'js', name: 'JavaScript' }, { slug: 'x', name: 'X' }] })).toBe('JavaScript')
	})

	it('falls back to the slug when the name is empty', () => {
		expect(tagName({ tags: [{ slug: 'docker', name: '' }] })).toBe('docker')
	})

	it('returns "Note" when tags are missing, empty, or blank', () => {
		expect(tagName({})).toBe('Note')
		expect(tagName({ tags: [] })).toBe('Note')
		expect(tagName({ tags: [{ slug: '', name: '' }] })).toBe('Note')
		expect(tagName({ tags: [null] })).toBe('Note')
	})

	it('tolerates a null/undefined post', () => {
		expect(tagName(undefined)).toBe('Note')
		expect(tagName(null)).toBe('Note')
	})
})

describe('formatDate', () => {
	it('formats ISO dates as "MMM D, YYYY"', () => {
		expect(formatDate('2022-12-26')).toBe('Dec 26, 2022')
		expect(formatDate('2024-01-05T10:00:00')).toBe('Jan 5, 2024')
	})

	it('accepts Date instances', () => {
		expect(formatDate(new Date(2023, 6, 4))).toBe('Jul 4, 2023')
	})

	it('returns an empty string for missing values', () => {
		expect(formatDate(undefined)).toBe('')
		expect(formatDate(null)).toBe('')
		expect(formatDate('')).toBe('')
	})

	it('echoes unparseable values back as a string instead of "Invalid Date"', () => {
		expect(formatDate('not a date')).toBe('not a date')
		expect(formatDate('2022-13-45')).not.toMatch(/Invalid/)
	})
})

describe('estimateRead', () => {
	it('prefers an explicit read value', () => {
		expect(estimateRead({ read: '7 min read', title: 'x' })).toBe('7 min read')
	})

	it('never estimates less than 3 minutes', () => {
		expect(estimateRead({})).toBe('3 min')
		expect(estimateRead({ title: 'Short' })).toBe('3 min')
	})

	it('scales with excerpt + title word count (18 words per minute)', () => {
		const excerpt = Array.from({ length: 90 }, () => 'word').join(' ')
		// 90 excerpt words + 2 title words = 92 → round(92 / 18) = 5
		expect(estimateRead({ title: 'Two words', excerpt })).toBe('5 min')
	})

	it('collapses repeated whitespace when counting words', () => {
		const excerpt = Array.from({ length: 90 }, () => 'word').join('   \n\t ')
		expect(estimateRead({ title: 'Two words', excerpt })).toBe('5 min')
	})
})

describe('sortByDate', () => {
	it('sorts newest first by publishedAt', () => {
		const posts = [
			{ slug: 'a', publishedAt: '2021-01-01' },
			{ slug: 'b', publishedAt: '2023-01-01' },
			{ slug: 'c', publishedAt: '2022-01-01' }
		]
		expect(sortByDate(posts).map((p) => p.slug)).toEqual(['b', 'c', 'a'])
	})

	it('falls back to `date` and treats missing dates as oldest', () => {
		const posts = [
			{ slug: 'none' },
			{ slug: 'date', date: 'June 15, 2022' },
			{ slug: 'pub', publishedAt: '2020-01-01' }
		]
		expect(sortByDate(posts).map((p) => p.slug)).toEqual(['date', 'pub', 'none'])
	})

	it('prefers publishedAt over date when both exist', () => {
		const posts = [
			{ slug: 'x', publishedAt: '2020-01-01', date: '2030-01-01' },
			{ slug: 'y', publishedAt: '2021-01-01' }
		]
		expect(sortByDate(posts).map((p) => p.slug)).toEqual(['y', 'x'])
	})

	it('keeps the original order for ties (stable sort)', () => {
		const posts = [
			{ slug: 'first', publishedAt: '2022-05-05' },
			{ slug: 'second', publishedAt: '2022-05-05' },
			{ slug: 'third', publishedAt: '2022-05-05' }
		]
		expect(sortByDate(posts).map((p) => p.slug)).toEqual(['first', 'second', 'third'])
	})

	it('does not mutate the input array', () => {
		const posts = [{ slug: 'a', publishedAt: '2020-01-01' }, { slug: 'b', publishedAt: '2021-01-01' }]
		const copy = [...posts]
		sortByDate(posts)
		expect(posts).toEqual(copy)
	})

	it('handles an empty list', () => {
		expect(sortByDate([])).toEqual([])
	})

	// Regression test — fixed bug (format.js sortByDate): an unparseable publishedAt yields NaN in the
	// comparator, which Array#sort treats as "equal" — so it can wedge between two
	// valid posts and freeze them in the wrong order. Fix: map NaN to 0
	// (`Number.isNaN(t) ? 0 : t`) so invalid dates sort as oldest.
	it('keeps valid dates ordered even when an invalid one is mixed in', () => {
		const posts = [
			{ slug: 'old', publishedAt: '2019-01-01' },
			{ slug: 'bad', publishedAt: 'garbage' },
			{ slug: 'new', publishedAt: '2024-01-01' }
		]
		const order = sortByDate(posts).map((p) => p.slug).filter((s) => s !== 'bad')
		expect(order).toEqual(['new', 'old'])
	})
})
