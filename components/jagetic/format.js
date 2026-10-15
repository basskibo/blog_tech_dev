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

function timeOf (post) {
	const time = new Date(post.publishedAt || post.date || 0).getTime()
	// Unparseable dates sort as oldest instead of poisoning the comparator with NaN.
	return Number.isNaN(time) ? 0 : time
}

export function sortByDate (posts) {
	return [...posts].sort((a, b) => timeOf(b) - timeOf(a))
}
