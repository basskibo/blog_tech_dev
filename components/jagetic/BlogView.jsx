import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { GuideRow, canOptimize } from '../home/LatestPosts'
import { estimateRead, formatDate, sortByDate, tagName } from './format'

export default function BlogView ({ posts }) {
	const items = useMemo(() => sortByDate(posts.map((p) => p.data || p.props?.data || p).filter((p) => p && !p.inPreparation)), [posts])
	const [query, setQuery] = useState('')
	const [tag, setTag] = useState('All')

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

	const filtered = items.filter((post) => {
		const hay = `${post.title} ${post.excerpt || ''}`.toLowerCase()
		const matchesQuery = !query || hay.includes(query.toLowerCase())
		const matchesTag = tag === 'All' || (post.tags || []).some((t) => (t.name || t.slug) === tag)
		return matchesQuery && matchesTag
	})
	const [featured, ...rest] = filtered

	return (
		<div className="wrap">
			<header className="page-head">
				<h1 className="t-display">Blog</h1>
				<p className="t-lead">{items.length} posts on Node.js, React, tooling, and how my own projects are built.</p>
			</header>
			<div className="page-tools">
				<div className="tabs" role="group" aria-label="Filter posts by tag">
					{tags.map(([name, count]) => (
						<button key={name} type="button" className="tab" aria-pressed={tag === name} onClick={() => setTag(name)}>
							{name} <span className="count">{count}</span>
						</button>
					))}
				</div>
				<label className="field">
					<Search aria-hidden="true" />
					<span className="sr-only">Search posts</span>
					<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts" />
				</label>
			</div>
			{featured && (
				<Link href={`/post/${featured.slug}`} className="lead-post">
					<span className="lead-post-img">
						{featured.featuredImage && (canOptimize(featured.featuredImage)
							? <Image src={featured.featuredImage} alt="" fill priority sizes="(max-width: 960px) 100vw, 640px" style={{ objectFit: 'cover' }} />
							: <img src={featured.featuredImage} alt="" />)}
					</span>
					<span className="lead-post-body">
						<span className="tag">{tagName(featured)}</span>
						<span className="lead-post-title">{featured.title}</span>
						{featured.excerpt && <span className="t-mut">{featured.excerpt}</span>}
						<span className="t-mut t-small">
							<time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>, {estimateRead(featured)}
						</span>
					</span>
				</Link>
			)}
			{rest.length > 0 && (
				<ol className="guide">
					{rest.map((post) => <GuideRow key={post.slug} post={{ ...post, read: estimateRead(post) }} />)}
				</ol>
			)}
			{filtered.length === 0 && (
				<div className="empty">
					<p>No posts match &ldquo;{query}&rdquo;{tag !== 'All' ? ` in ${tag}` : ''}.</p>
					<button type="button" className="btn btn-ghost" onClick={() => { setQuery(''); setTag('All') }}>Show all posts</button>
				</div>
			)}
		</div>
	)
}
