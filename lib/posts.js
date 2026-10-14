import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join('posts', 'blog')

// Only the fields the cards render, so the page props stay small.
export function toCard (data, slug, content = '') {
	return {
		slug,
		title: data.title || slug,
		excerpt: data.excerpt || '',
		publishedAt: data.publishedAt ? String(data.publishedAt) : null,
		featuredImage: data.featuredImage || null,
		tags: Array.isArray(data.tags) ? data.tags.map((t) => ({ slug: t.slug || null, name: t.name || null })) : [],
		read: content ? readingTime(content).text : null
	}
}

export function getLatestPosts (limit = 3, dir = BLOG_DIR) {
	return fs.readdirSync(dir)
		.filter((file) => file.endsWith('.mdx'))
		.map((file) => {
			const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'))
			return { data, content, slug: file.replace(/\.mdx$/, '') }
		})
		.filter(({ data }) => !data.inPreparation)
		.sort((a, b) => new Date(b.data.publishedAt || 0) - new Date(a.data.publishedAt || 0))
		.slice(0, limit)
		.map(({ data, content, slug }) => toCard(data, slug, content))
}
