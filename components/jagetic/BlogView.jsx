import React, { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { PostCard } from '../home/LatestPosts'
import { estimateRead, sortByDate } from './format'

export const PAGE_SIZE = 12

export default function BlogView ({ posts }) {
	const items = useMemo(() => sortByDate(posts.map((p) => p.data || p.props?.data || p).filter((p) => p && !p.inPreparation)).map((p) => ({ ...p, read: p.read || estimateRead(p) })), [posts])
	const [query, setQuery] = useState('')
	const [tag, setTag] = useState('All')
	const [shown, setShown] = useState(PAGE_SIZE)

	const tags = useMemo(() => {
		const counts = new Map()
		items.forEach((post) => {
			(post.tags || []).forEach((t) => {
				const name = t.name || t.slug
				if (!name) return
				counts.set(name, (counts.get(name) || 0) + 1)
			})
		})
		return [['All', items.length], ...[...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)]
	}, [items])

	const topics = tags.length - 1
	const filtering = Boolean(query) || tag !== 'All'
	const filtered = items.filter((post) => {
		const hay = `${post.title} ${post.excerpt || ''}`.toLowerCase()
		const matchesQuery = !query || hay.includes(query.toLowerCase())
		const matchesTag = tag === 'All' || (post.tags || []).some((t) => (t.name || t.slug) === tag)
		return matchesQuery && matchesTag
	})

	// Unfiltered: the three newest posts get the top bento, the rest page in below.
	const top = filtering ? [] : filtered.slice(0, 3)
	const rest = filtering ? filtered : filtered.slice(3)
	const visible = rest.slice(0, shown)

	const pickTag = (name) => { setTag(name); setShown(PAGE_SIZE) }
	const reset = () => { setQuery(''); setTag('All'); setShown(PAGE_SIZE) }

	return (
		<div className="wrap">
			<header className="blog-head bj-in">
				<div>
					<h1 className="t-display">The <span className="t-serif t-grad">blog</span></h1>
					<p className="t-lead">{items.length} posts on Node.js, React, Next.js, Docker and AI tooling, written by a full-stack engineer working since 2015. Most of them come out of building and running my own products.</p>
				</div>
				<dl className="blog-stats">
					<div><dt>Posts</dt><dd>{items.length}</dd></div>
					<div><dt>Topics</dt><dd>{topics}</dd></div>
				</dl>
			</header>

			<div className="blog-bar">
				<div className="tabs blog-tabs" role="group" aria-label="Filter posts by topic">
					{tags.map(([name, count]) => (
						<button key={name} type="button" className="tab" aria-pressed={tag === name} onClick={() => pickTag(name)}>
							{name} <span className="count">{count}</span>
						</button>
					))}
				</div>
				<label className="field blog-search">
					<Search aria-hidden="true" />
					<span className="sr-only">Search posts</span>
					<input value={query} onChange={(e) => { setQuery(e.target.value); setShown(PAGE_SIZE) }} placeholder="Search posts" />
					{query && (
						<button type="button" className="blog-clear" aria-label="Clear search" onClick={() => setQuery('')}><X aria-hidden="true" /></button>
					)}
				</label>
			</div>

			{top.length > 0 && (
				<section className="blog-top" aria-label="Latest posts">
					{top.map((post, i) => <PostCard key={post.slug} post={post} big={i === 0} />)}
				</section>
			)}

			{filtering && filtered.length > 0 && (
				<p className="blog-count" role="status">{filtered.length} {filtered.length === 1 ? 'post' : 'posts'}{tag !== 'All' ? ` in ${tag}` : ''}{query ? ` matching “${query}”` : ''}</p>
			)}

			{visible.length > 0 && (
				<section aria-label={filtering ? 'Results' : 'More posts'}>
					{!filtering && <h2 className="blog-sub">More posts</h2>}
					<ul className="post-grid">
						{visible.map((post) => <li key={post.slug}><PostCard post={post} /></li>)}
					</ul>
					{rest.length > shown && (
						<div className="blog-more">
							<button type="button" className="btn btn-ghost" onClick={() => setShown((n) => n + PAGE_SIZE)}>
								Show more posts <span className="t-mut">{rest.length - shown} left</span>
							</button>
						</div>
					)}
				</section>
			)}

			{filtered.length === 0 && (
				<div className="empty">
					<p>No posts match &ldquo;{query}&rdquo;{tag !== 'All' ? ` in ${tag}` : ''}.</p>
					<button type="button" className="btn btn-ghost" onClick={reset}>Show all posts</button>
				</div>
			)}
		</div>
	)
}
