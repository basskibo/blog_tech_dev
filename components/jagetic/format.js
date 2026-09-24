import dayjs from 'dayjs'

export function tagName (post) {
	const tag = post?.tags?.[0]
	if (!tag) return 'Note'
	return tag.name || tag.slug || 'Note'
}

export function formatDate (value) {
	if (!value) return ''
	const parsed = dayjs(value)
	return parsed.isValid() ? parsed.format('MMM D, YYYY') : String(value)
}

export function estimateRead (post) {
	if (post.read) return post.read
	const words = `${post.excerpt || ''} ${post.title || ''}`.trim().split(/\s+/).length
	const mins = Math.max(3, Math.round(words / 18))
	return `${mins} min`
}

export function sortByDate (posts) {
	return [...posts].sort((a, b) => {
		const da = new Date(a.publishedAt || a.date || 0).getTime()
		const db = new Date(b.publishedAt || b.date || 0).getTime()
		return db - da
	})
}
