import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Server-only helpers (used from getStaticProps) that connect blog posts to projects and series
// through frontmatter: `project`, `series`, `seriesTitle`, `seriesPart`.

export type PostRef = {
	slug: string
	title: string
	excerpt: string | null
	publishedAt: string | null
	project: string | null
	series: string | null
	seriesTitle: string | null
	seriesPart: number | null
}

const BLOG_DIR = path.join('posts/blog')

export function getPostRefs (): PostRef[] {
	return fs
		.readdirSync(BLOG_DIR)
		.filter((f) => f.endsWith('.mdx'))
		.map((filename) => {
			const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8'))
			if (data.inPreparation === true || data.inPreparation === 'true') return null
			return {
				slug: filename.replace(/\.mdx$/, ''),
				title: String(data.title ?? ''),
				excerpt: data.excerpt ? String(data.excerpt) : null,
				publishedAt: data.publishedAt ? String(data.publishedAt) : null,
				project: data.project ? String(data.project) : null,
				series: data.series ? String(data.series) : null,
				seriesTitle: data.seriesTitle ? String(data.seriesTitle) : null,
				seriesPart: data.seriesPart != null ? Number(data.seriesPart) : null
			}
		})
		.filter((p): p is PostRef => p !== null)
}

const byPartThenDate = (a: PostRef, b: PostRef) =>
	(a.seriesPart ?? 0) - (b.seriesPart ?? 0) || String(a.publishedAt).localeCompare(String(b.publishedAt))

/** Map of project slug -> posts written about it (series parts in order). */
export function getPostsByProject (): Record<string, PostRef[]> {
	const map: Record<string, PostRef[]> = {}
	for (const post of getPostRefs()) {
		if (!post.project) continue
		;(map[post.project] ||= []).push(post)
	}
	for (const key of Object.keys(map)) map[key].sort(byPartThenDate)
	return map
}

/** All parts of a series, in order. */
export function getSeriesPosts (series?: string | null): PostRef[] {
	if (!series) return []
	return getPostRefs().filter((p) => p.series === series).sort(byPartThenDate)
}
