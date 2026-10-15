// @vitest-environment node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import matter from 'gray-matter'
import handler from '../../pages/api/convert-to-devto'
import { mockReq, mockRes } from '../helpers/http'

// The handler resolves `postPath` against process.cwd(); point cwd at a temp dir
// so the real converter writes there, never into posts/.
describe('/api/convert-to-devto', () => {
	let tmp

	beforeEach(() => {
		tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'devto-'))
		fs.mkdirSync(path.join(tmp, 'posts/blog'), { recursive: true })
		vi.spyOn(process, 'cwd').mockReturnValue(tmp)
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.restoreAllMocks()
		fs.rmSync(tmp, { recursive: true, force: true })
	})

	const writePost = (rel, frontmatter, body = '## Hi\n\n<LgList><li>one</li></LgList>\n') => {
		fs.writeFileSync(path.join(tmp, rel), `---\n${frontmatter}\n---\n\n${body}`)
	}

	it('rejects non-POST with 405', async () => {
		const res = mockRes()
		await handler(mockReq({ method: 'GET' }), res)
		expect(res.status).toHaveBeenCalledWith(405)
	})

	it('requires postPath', async () => {
		const res = mockRes()
		await handler(mockReq({ method: 'POST', body: {} }), res)
		expect(res.status).toHaveBeenCalledWith(400)
		expect(res.json).toHaveBeenCalledWith({ error: 'postPath is required' })
	})

	it('404s when the file does not exist', async () => {
		const res = mockRes()
		await handler(mockReq({ method: 'POST', body: { postPath: 'posts/blog/nope.mdx' } }), res)
		expect(res.status).toHaveBeenCalledWith(404)
	})

	it('rejects non-.mdx files', async () => {
		fs.writeFileSync(path.join(tmp, 'posts/blog/readme.md'), '# hi')
		const res = mockRes()
		await handler(mockReq({ method: 'POST', body: { postPath: 'posts/blog/readme.md' } }), res)
		expect(res.status).toHaveBeenCalledWith(400)
	})

	it('converts the post, writes <slug>-devto.md and returns its content', async () => {
		writePost('posts/blog/hello.mdx', 'title: "Hello"\npublishedAt: "2024-01-01"\nexcerpt: "x"')
		const res = mockRes()
		await handler(mockReq({ method: 'POST', body: { postPath: 'posts/blog/hello.mdx' } }), res)
		expect(res.status).toHaveBeenCalledWith(200)
		const body = res.json.mock.calls[0][0]
		expect(body.success).toBe(true)
		expect(body.outputPath).toBe('/posts/blog/hello-devto.md')
		expect(fs.existsSync(path.join(tmp, 'posts/blog/hello-devto.md'))).toBe(true)
		expect(body.content).toContain('title: Hello')
		expect(body.content).toContain('published: false')
		expect(body.content).toContain('<ul>')
		expect(body.content).not.toContain('<LgList>')
	})

	// BUG, NOT FIXED — left for the owner (scripts/convert-to-devto.js formatFrontmatter ~line 137-147): values are
	// written unquoted (`title: ${value}`), so any title containing ": " produces
	// invalid YAML — exactly what happened to
	// posts/blog/automating-content-publishing-mdx-to-devto-devto.md (dev.to and
	// gray-matter both reject it). Fix: JSON.stringify string values / use
	// matter.stringify.
	it.fails('emits valid YAML frontmatter for titles containing a colon', async () => {
		writePost('posts/blog/colon.mdx', 'title: "Part 1: The Basics"\npublishedAt: "2024-01-01"\nexcerpt: "x"')
		const res = mockRes()
		await handler(mockReq({ method: 'POST', body: { postPath: 'posts/blog/colon.mdx' } }), res)
		const { content } = res.json.mock.calls[0][0]
		expect(matter(content).data.title).toBe('Part 1: The Basics')
	})

	// Regression test — fixed bug (pages/api/convert-to-devto.js:15-18): postPath is joined to cwd without
	// containment, so `../` lets an unauthenticated caller read any *.mdx on the
	// server and write a sibling *-devto.md file. Fix: resolve and require the
	// result to start with path.join(cwd, 'posts') + path.sep.
	it('refuses paths outside posts/', async () => {
		const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'outside-'))
		fs.writeFileSync(path.join(outside, 'secret.mdx'), '---\ntitle: "secret"\n---\nsecret body')
		const rel = path.relative(tmp, path.join(outside, 'secret.mdx'))
		const res = mockRes()
		try {
			await handler(mockReq({ method: 'POST', body: { postPath: rel } }), res)
			expect(res.status).toHaveBeenCalledWith(400)
			expect(fs.existsSync(path.join(outside, 'secret-devto.md'))).toBe(false)
		} finally {
			fs.rmSync(outside, { recursive: true, force: true })
		}
	})

	it('refuses a sibling folder whose name merely starts with "posts"', async () => {
		fs.mkdirSync(path.join(tmp, 'posts-evil'))
		fs.writeFileSync(path.join(tmp, 'posts-evil/x.mdx'), '---\ntitle: "x"\n---\n')
		const res = mockRes()
		await handler(mockReq({ method: 'POST', body: { postPath: 'posts-evil/x.mdx' } }), res)
		expect(res.status).toHaveBeenCalledWith(400)
	})

	it('responds 500 when conversion throws', async () => {
		// A directory named *.mdx passes existsSync + extension checks, then readFileSync throws EISDIR.
		fs.mkdirSync(path.join(tmp, 'posts/blog/dir.mdx'))
		const res = mockRes()
		await handler(mockReq({ method: 'POST', body: { postPath: 'posts/blog/dir.mdx' } }), res)
		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.json.mock.calls[0][0].error).toBe('Failed to convert post')
	})
})
