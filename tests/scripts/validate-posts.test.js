// @vitest-environment node
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

// scripts/validate-posts.js is a CLI with no exports. It resolves
// posts/{blog,libaries,projects} relative to process.cwd(), so we can point it
// at a throwaway fixture tree by changing cwd.
const SCRIPT = path.resolve('scripts/validate-posts.js')
// The script requires gray-matter; give the child the repo's node_modules.
const NODE_PATH = path.resolve('node_modules')

function run (cwd) {
	return spawnSync(process.execPath, [SCRIPT], { cwd, encoding: 'utf8', env: { ...process.env, NODE_PATH } })
}

const good = (title = 'Title') => `---\ntitle: "${title}"\npublishedAt: "2024-01-01"\nexcerpt: "An excerpt"\n---\n\nBody\n`

describe('scripts/validate-posts.js', () => {
	let tmp

	beforeEach(() => {
		tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'validate-posts-'))
	})

	afterEach(() => {
		fs.rmSync(tmp, { recursive: true, force: true })
	})

	function write (rel, content) {
		const full = path.join(tmp, rel)
		fs.mkdirSync(path.dirname(full), { recursive: true })
		fs.writeFileSync(full, content)
	}

	it('passes on the real posts', () => {
		const result = run(process.cwd())
		expect(result.stderr).toBe('')
		expect(result.status).toBe(0)
		expect(result.stdout).toMatch(/Post check passed \(\d+ files\)/)
	})

	it('passes on a valid fixture tree and counts nested files', () => {
		write('posts/blog/a.mdx', good('A'))
		write('posts/libaries/b.mdx', good('B'))
		write('posts/projects/nested/c.md', good('C'))
		const result = run(tmp)
		expect(result.status).toBe(0)
		expect(result.stdout).toContain('Post check passed (3 files)')
	})

	it('passes (0 files) when there are no post folders at all', () => {
		const result = run(tmp)
		expect(result.status).toBe(0)
		expect(result.stdout).toContain('(0 files)')
	})

	it('fails on missing required fields', () => {
		write('posts/blog/bad.mdx', '---\ntitle: "Only title"\n---\nBody')
		const result = run(tmp)
		expect(result.status).toBe(1)
		expect(result.stderr).toContain('missing publishedAt')
		expect(result.stderr).toContain('missing excerpt')
		expect(result.stderr).not.toContain('missing title')
	})

	it('fails on whitespace-only required fields', () => {
		write('posts/blog/blank.mdx', '---\ntitle: "   "\npublishedAt: "2024-01-01"\nexcerpt: "x"\n---\n')
		const result = run(tmp)
		expect(result.status).toBe(1)
		expect(result.stderr).toContain('missing title')
	})

	it('fails on an unparseable publishedAt', () => {
		write('posts/blog/date.mdx', '---\ntitle: "T"\npublishedAt: "someday"\nexcerpt: "x"\n---\n')
		const result = run(tmp)
		expect(result.status).toBe(1)
		expect(result.stderr).toContain('publishedAt is not a date (someday)')
	})

	it('fails on invalid YAML frontmatter', () => {
		write('posts/blog/yaml.mdx', '---\ntitle: Broken: colon: here\n---\n')
		const result = run(tmp)
		expect(result.status).toBe(1)
		expect(result.stderr).toMatch(/invalid frontmatter/)
	})

	it('fails on duplicate slugs across folders', () => {
		write('posts/blog/same.mdx', good('A'))
		write('posts/libaries/same.mdx', good('B'))
		const result = run(tmp)
		expect(result.status).toBe(1)
		expect(result.stderr).toContain('duplicate slug "same"')
	})

	it('ignores generated *-devto.md files and non-markdown files', () => {
		write('posts/blog/a.mdx', good())
		write('posts/blog/a-devto.md', '---\ntitle: Broken: yaml\n---\n')
		write('posts/blog/notes.txt', 'whatever')
		const result = run(tmp)
		expect(result.status).toBe(0)
		expect(result.stdout).toContain('(1 files)')
	})

	it('reports every error, not just the first', () => {
		write('posts/blog/one.mdx', '---\ntitle: "x"\n---\n')
		write('posts/blog/two.mdx', '---\nexcerpt: "x"\n---\n')
		const result = run(tmp)
		expect(result.status).toBe(1)
		expect(result.stderr).toMatch(/Post check failed \(4\)/)
	})

	// An unquoted `publishedAt: 2024-01-01` is parsed by YAML as a Date object.
	// Rejecting it is desirable: getStaticProps would otherwise return a Date in
	// props and Next.js refuses to serialize it. (The message could be clearer —
	// it says "missing" rather than "must be a quoted string".)
	it('rejects an unquoted YAML date', () => {
		write('posts/blog/unquoted.mdx', '---\ntitle: "T"\npublishedAt: 2024-01-01\nexcerpt: "x"\n---\n')
		const result = run(tmp)
		expect(result.status).toBe(1)
		expect(result.stderr).toContain('missing publishedAt')
	})
})
