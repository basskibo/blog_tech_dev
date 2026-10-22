const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const roots = ['posts/blog', 'posts/libaries', 'posts/projects']
const required = ['title', 'publishedAt', 'excerpt']

function collect (dir, files) {
	if (!fs.existsSync(dir)) return
	for (const name of fs.readdirSync(dir)) {
		const full = path.join(dir, name)
		if (fs.statSync(full).isDirectory()) {
			collect(full, files)
			continue
		}
		if (!/\.(md|mdx)$/.test(name)) continue
		if (name.endsWith('-devto.md')) continue
		files.push(full)
	}
}

const files = []
for (const root of roots) collect(root, files)

const errors = []
const slugs = new Map()

for (const file of files) {
	const raw = fs.readFileSync(file, 'utf8')
	let data
	try {
		data = matter(raw).data
	} catch (error) {
		errors.push(`${file}: invalid frontmatter (${error.message})`)
		continue
	}

	for (const key of required) {
		const value = data[key]
		if (typeof value !== 'string' || value.trim() === '') {
			errors.push(`${file}: missing ${key}`)
		}
	}

	if (typeof data.publishedAt === 'string' && Number.isNaN(Date.parse(data.publishedAt))) {
		errors.push(`${file}: publishedAt is not a date (${data.publishedAt})`)
	}

	const slug = path.basename(file).replace(/\.(md|mdx)$/, '')
	if (slugs.has(slug)) {
		errors.push(`${file}: duplicate slug "${slug}" (also ${slugs.get(slug)})`)
	} else {
		slugs.set(slug, file)
	}
}

if (errors.length) {
	console.error(`Post check failed (${errors.length}):`)
	for (const error of errors) console.error(`- ${error}`)
	process.exit(1)
}

console.log(`Post check passed (${files.length} files).`)
