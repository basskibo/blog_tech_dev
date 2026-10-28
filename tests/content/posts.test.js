// @vitest-environment node
//
// Content-integrity checks over every published post. The file list is globbed
// at collection time (never hardcoded) so new posts are covered automatically.
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const DIRS = ['posts/blog', 'posts/libaries']

// KNOWN EXCEPTIONS — existing content that violates a rule. Do not add new
// entries casually: fix the post instead.
//
// Library posts use `tags: [{ slug: "", name: "project" }]` — the slug is empty.
// Nothing currently links to /category/<slug> for libraries, so this is
// harmless today, but it would produce broken links if tag pages come back.
const EMPTY_TAG_SLUG_ALLOWED = new Set([
	'posts/libaries/crypto-scrapper.mdx',
	'posts/libaries/github-card-npm-component.mdx',
	'posts/libaries/javascript-algorithms-ts.mdx',
	'posts/libaries/nestjs-jwt-auth-boilerplate.mdx',
	'posts/libaries/network-arp-scanner.mdx',
	'posts/libaries/parallax-jungle.mdx',
	'posts/libaries/plain-html-portofolio.mdx',
	'posts/libaries/spotify-listen-now-card.mdx',
	'posts/libaries/ts-express-react-boilerplate.mdx',
	'posts/libaries/ubuntu-essentials.mdx',
	'posts/libaries/umami-dockerized.mdx'
])

const files = DIRS.flatMap((dir) =>
	fs.readdirSync(dir)
		.filter((name) => name.endsWith('.mdx'))
		.map((name) => path.posix.join(dir, name))
)

const parsed = new Map(files.map((file) => [file, matter(fs.readFileSync(file, 'utf8'))]))

describe('post content integrity', () => {
	it('finds posts to check', () => {
		expect(files.filter((f) => f.startsWith('posts/blog')).length).toBeGreaterThan(10)
		expect(files.filter((f) => f.startsWith('posts/libaries')).length).toBeGreaterThan(0)
	})

	it('has no stray non-.mdx files in posts/libaries (getStaticPaths does not filter)', () => {
		for (const name of fs.readdirSync('posts/libaries')) expect(name).toMatch(/\.mdx$/)
	})

	it('has no duplicate titles', () => {
		const seen = new Map()
		const dups = []
		for (const [file, { data }] of parsed) {
			const key = String(data.title).trim().toLowerCase()
			if (seen.has(key)) dups.push(`${file} duplicates ${seen.get(key)} ("${data.title}")`)
			else seen.set(key, file)
		}
		expect(dups).toEqual([])
	})

	it('has no duplicate slugs across blog and libraries', () => {
		const slugs = files.map((f) => path.basename(f, '.mdx'))
		const dups = slugs.filter((s, i) => slugs.indexOf(s) !== i)
		expect(dups).toEqual([])
	})

	describe.each(files)('%s', (file) => {
		const { data, content } = parsed.get(file)

		it('has a slug-safe filename', () => {
			expect(path.basename(file)).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*\.mdx$/)
		})

		it('has a non-empty title and excerpt', () => {
			expect(typeof data.title).toBe('string')
			expect(data.title.trim()).not.toBe('')
			expect(typeof data.excerpt).toBe('string')
			expect(data.excerpt.trim()).not.toBe('')
		})

		it('has a valid, quoted publishedAt that is not in the far future', () => {
			// Must be a string: a YAML Date object breaks Next's props serialization.
			expect(typeof data.publishedAt).toBe('string')
			const time = Date.parse(data.publishedAt)
			expect(Number.isNaN(time)).toBe(false)
			expect(time).toBeGreaterThan(Date.parse('2015-01-01'))
			expect(time).toBeLessThan(Date.now() + 365 * 24 * 3600 * 1000)
		})

		it('has a tags array of { slug, name }', () => {
			expect(Array.isArray(data.tags)).toBe(true)
			expect(data.tags.length).toBeGreaterThan(0)
			for (const tag of data.tags) {
				expect(tag).toEqual(expect.objectContaining({ name: expect.any(String), slug: expect.any(String) }))
				expect(tag.name.trim()).not.toBe('')
				if (!EMPTY_TAG_SLUG_ALLOWED.has(file)) {
					expect(tag.slug, `empty tag slug in ${file}`).toMatch(/^[a-z0-9.+#-]+$/i)
				}
			}
		})

		it('has an http(s) featuredImage when present', () => {
			if (data.featuredImage === undefined || data.featuredImage === '') return
			expect(data.featuredImage).toMatch(/^https?:\/\/\S+$/)
		})

		it('has a boolean inPreparation when present', () => {
			if (data.inPreparation === undefined) return
			expect(typeof data.inPreparation).toBe('boolean')
		})

		it('has a body', () => {
			expect(content.trim().length).toBeGreaterThan(0)
		})
	})

	it('known-exception list only names files that still exist and still need it', () => {
		for (const file of EMPTY_TAG_SLUG_ALLOWED) {
			expect(parsed.has(file), `${file} no longer exists — remove it from the list`).toBe(true)
			const needsIt = parsed.get(file).data.tags.some((t) => !t.slug)
			expect(needsIt, `${file} has been fixed — remove it from the list`).toBe(true)
		}
	})
})

describe('MDX bodies compile', () => {
	// @mdx-js/mdx (v2, the repo's direct dependency) and next-mdx-remote's
	// serialize (MDX v3 — what the site actually renders with) both have to accept
	// every body.
	let compile
	let serialize

	beforeAll(async () => {
		;({ compile } = await import('@mdx-js/mdx'))
		;({ serialize } = await import('next-mdx-remote/serialize'))
	})

	it.each(files)('%s compiles with @mdx-js/mdx', async (file) => {
		const { content } = parsed.get(file)
		await expect(compile(content, { development: false })).resolves.toBeDefined()
	})

	it.each(files)('%s serializes with next-mdx-remote', async (file) => {
		const { content } = parsed.get(file)
		// Same options as pages/post/[slug].js and pages/libary/[slug].js.
		const result = await serialize(content, { blockJS: false })
		expect(typeof result.compiledSource).toBe('string')
	})
})
