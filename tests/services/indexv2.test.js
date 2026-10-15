// @vitest-environment node
import fs from 'node:fs'
import path from 'node:path'
import { getAllPosts, getLibaryFiles, getPostFiles } from '../../services/indexv2'

const onDisk = (dir) => fs.readdirSync(path.join(process.cwd(), dir))

describe('services/indexv2', () => {
	describe('getPostFiles', () => {
		it('lists every .mdx file in posts/blog and nothing else', () => {
			const files = getPostFiles()
			const expected = onDisk('posts/blog').filter((f) => f.endsWith('.mdx'))
			expect([...files].sort()).toEqual([...expected].sort())
			expect(files.length).toBeGreaterThan(0)
		})

		it('excludes generated dev.to markdown exports', () => {
			expect(getPostFiles().some((f) => f.endsWith('.md'))).toBe(false)
		})
	})

	describe('getLibaryFiles', () => {
		it('lists the library posts', () => {
			const files = getLibaryFiles()
			expect([...files].sort()).toEqual([...onDisk('posts/libaries')].sort())
		})

		// getLibaryFiles has no extension filter (unlike getPostFiles). Today every
		// file is .mdx; this guards against a stray README/.DS_Store/-devto.md
		// becoming a broken /libary/<slug> page.
		it('only contains .mdx files', () => {
			for (const f of getLibaryFiles()) expect(f).toMatch(/\.mdx$/)
		})
	})

	describe('getAllPosts', () => {
		it('parses frontmatter and derives the slug from the filename', () => {
			const files = getPostFiles()
			const posts = getAllPosts(files)
			expect(posts).toHaveLength(files.length)
			posts.forEach((post, i) => {
				expect(post.data.slug).toBe(files[i].replace(/\.mdx$/, ''))
				expect(typeof post.data.title).toBe('string')
			})
		})

		it('keeps the inPreparation flag so callers can filter drafts', () => {
			const posts = getAllPosts(getPostFiles())
			const drafts = posts.filter((p) => p.data.inPreparation === true)
			const published = posts.filter((p) => !p.data.inPreparation)
			expect(published.length).toBeGreaterThan(0)
			for (const d of drafts) expect(typeof d.data.inPreparation).toBe('boolean')
		})

		it('returns an empty list for no files', () => {
			expect(getAllPosts([])).toEqual([])
		})

		it('throws for a file that does not exist', () => {
			expect(() => getAllPosts(['does-not-exist.mdx'])).toThrow(/ENOENT/)
		})
	})
})
