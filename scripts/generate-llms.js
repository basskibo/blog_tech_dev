const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const SITE_URL = 'https://www.jageticbojan.com'

function entries (dir, route) {
	return fs.readdirSync(dir)
		.filter((name) => name.endsWith('.mdx'))
		.map((name) => ({ ...matter(fs.readFileSync(path.join(dir, name), 'utf8')).data, slug: name.replace(/\.mdx$/, '') }))
		.filter((post) => !post.inPreparation)
		.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
		.map((post) => `- [${post.title.trim()}](${SITE_URL}/${route}/${post.slug}): ${(post.excerpt || '').trim()}`)
}

function buildLlmsTxt (root = '.') {
	return [
		'# Bojan Jagetić',
		'',
		'> Personal site of Bojan Jagetić, a full-stack engineer (since 2015). Projects he builds and runs, plus writing on Node.js, React, Next.js, Docker and AI.',
		'',
		'## Pages',
		'',
		`- [About](${SITE_URL}/routes/aboutme): background, experience and CV`,
		`- [Projects](${SITE_URL}/routes/projects): products and apps he builds and runs`,
		`- [Blog](${SITE_URL}/routes/blog): all blog posts`,
		`- [Open source](${SITE_URL}/routes/libaries): libraries, scripts and tools`,
		`- [Uses](${SITE_URL}/routes/uses): hardware and software he uses daily`,
		'',
		'## Blog posts',
		'',
		...entries(path.join(root, 'posts/blog'), 'post'),
		'',
		'## Open source',
		'',
		...entries(path.join(root, 'posts/libaries'), 'libary'),
		''
	].join('\n')
}

if (require.main === module) fs.writeFileSync('public/llms.txt', buildLlmsTxt())

module.exports = { buildLlmsTxt }
