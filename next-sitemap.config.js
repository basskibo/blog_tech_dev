const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const POST_DIRS = { '/post/': 'posts/blog', '/libary/': 'posts/libaries' }

function frontmatterFor (loc) {
	const prefix = Object.keys(POST_DIRS).find((p) => loc.startsWith(p))
	const file = prefix && path.join(POST_DIRS[prefix], `${loc.slice(prefix.length)}.mdx`)
	return file && fs.existsSync(file) ? matter(fs.readFileSync(file, 'utf8')).data : null
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://www.jageticbojan.com',
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	sitemapSize: 7000,
	// Drafts stay reachable by direct link but are left out; posts take lastmod from frontmatter, not the build time.
	transform: async (config, loc) => {
		const data = frontmatterFor(loc)
		if (data?.inPreparation) return null
		return {
			loc,
			lastmod: new Date(data ? data.updatedAt || data.publishedAt : Date.now()).toISOString(),
			changefreq: config.changefreq,
			priority: config.priority
		}
	}
}
