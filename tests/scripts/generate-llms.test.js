// @vitest-environment node
import { buildLlmsTxt } from '../../scripts/generate-llms.js'

describe('generate-llms', () => {
	const out = buildLlmsTxt()

	it('starts with the llms.txt H1 and summary', () => {
		expect(out.startsWith('# Bojan Jagetić\n\n> ')).toBe(true)
	})

	it('lists published posts and libraries on the www host, skipping drafts', () => {
		expect(out).toContain('(https://www.jageticbojan.com/libary/browser-game-studio)')
		expect(out).toMatch(/\(https:\/\/www\.jageticbojan\.com\/post\/[^)]+\)/)
		expect(out).not.toContain('/libary/blogtech)')
		expect(out).not.toContain('/post/all-you-need-to-know-about-microservices)')
	})
})
