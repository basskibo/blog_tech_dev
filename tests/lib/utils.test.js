// @vitest-environment node
import { cn } from '@/lib/utils'

describe('cn', () => {
	it('joins class names and drops falsy values', () => {
		expect(cn('a', false && 'b', null, undefined, 'c')).toBe('a c')
	})

	it('supports clsx object/array syntax', () => {
		expect(cn(['a', { b: true, c: false }], { d: 1 })).toBe('a b d')
	})

	it('resolves conflicting tailwind utilities, last one wins', () => {
		expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
		expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
	})

	it('returns an empty string for no input', () => {
		expect(cn()).toBe('')
	})
})
