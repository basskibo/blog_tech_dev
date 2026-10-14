// @vitest-environment node
import { findById, generateRandomQuestionList, getRandomQuestions } from 'utils/generalUtil'

const range = (n) => Array.from({ length: n }, (_, i) => ({ id: `q${i}`, i }))

afterEach(() => {
	vi.restoreAllMocks()
})

describe('findById', () => {
	it('finds the element with a matching id', () => {
		const list = range(5)
		expect(findById(list, 'q3')).toBe(list[3])
	})

	it('returns undefined when nothing matches', () => {
		expect(findById(range(2), 'nope')).toBeUndefined()
		expect(findById([], 'q0')).toBeUndefined()
	})
})

describe('getRandomQuestions', () => {
	it('returns the requested number of distinct questions from the list', () => {
		const list = range(20)
		const picked = getRandomQuestions([...list], 7)
		expect(picked).toHaveLength(7)
		expect(new Set(picked.map((q) => q.id)).size).toBe(7)
		for (const q of picked) expect(list).toContain(q)
	})

	it('returns everything when asking for more than exist', () => {
		expect(getRandomQuestions(range(3), 10)).toHaveLength(3)
	})

	// Regression test — fixed bug (utils/generalUtil.js getRandomQuestions): `questions.sort(...)` shuffles
	// the caller's array in place. QuizComponent passes the shared module-level
	// quiz deck, so every quiz start reorders the global data. Fix: `[...questions].sort(...)`.
	it('does not mutate the input array', () => {
		const list = range(30)
		const before = list.map((q) => q.id)
		vi.spyOn(Math, 'random').mockReturnValue(0.99)
		getRandomQuestions(list, 5)
		expect(list.map((q) => q.id)).toEqual(before)
	})
})

describe('generateRandomQuestionList', () => {
	it('picks 10 unique questions from a 50-question bank', () => {
		const bank = range(50)
		const picked = generateRandomQuestionList(bank)
		expect(picked).toHaveLength(10)
		expect(new Set(picked.map((q) => q.id)).size).toBe(10)
		for (const q of picked) expect(bank).toContain(q)
	})

	// Regression test — fixed bug (utils/generalUtil.js generateRandomQuestionList): indices are hardcoded
	// to 0..49, so a bank with fewer than 50 questions yields `undefined` entries.
	// Fix: `Array.from({ length: questions.length }, ...)`.
	it('never returns undefined entries for a bank smaller than 50', () => {
		const picked = generateRandomQuestionList(range(12))
		expect(picked).toHaveLength(10)
		expect(picked.every(Boolean)).toBe(true)
		expect(generateRandomQuestionList(range(4))).toHaveLength(4)
	})
})
