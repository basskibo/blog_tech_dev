import React, { useMemo, useState } from 'react'
import Link from 'next/link'
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
		<div className="bj-screen bj-in">
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
				<div>
					<div className="bj-kicker">Blog · {items.length} posts</div>
					<h1 className="bj-display">Writ<span className="bj-serif">ing</span></h1>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 10, width: 'min(100%, 380px)', height: 54, padding: '0 18px', borderRadius: 99, border: '1px solid var(--line)', background: 'var(--card)' }}>
					<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts…" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink)', fontSize: 16 }} />
				</div>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 30 }}>
				{tags.map(([name, count]) => (
					<button key={name} type="button" className={`bj-pill${tag === name ? ' is-on' : ''}`} onClick={() => setTag(name)}>
						{name} <span className="bj-mono" style={{ opacity: 0.55, fontSize: 11 }}>{count}</span>
					</button>
				))}
			</div>
			{featured && (
				<Link href={`/post/${featured.slug}`} style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 0, borderRadius: 36, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--bg2)', minHeight: 320 }}>
					{featured.featuredImage && (
						<div style={{ minHeight: 240, background: `center/cover url(${featured.featuredImage})` }} />
					)}
					<div style={{ padding: 'clamp(26px, 3.5vw, 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
						<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
							<span className="bj-mono" style={{ fontSize: 11, fontWeight: 600, padding: '7px 11px', borderRadius: 99, background: 'var(--acc)', color: '#0b0c10' }}>{tagName(featured)}</span>
							<span className="bj-mono" style={{ fontSize: 11, color: 'var(--mut)' }}>LATEST</span>
						</div>
						<div style={{ font: "800 clamp(32px, 3.6vw, 50px)/1 'Bricolage Grotesque',sans-serif", letterSpacing: '-.045em' }}>{featured.title}</div>
						<p className="bj-serif" style={{ fontSize: 24, lineHeight: 1.3, margin: 0, color: 'var(--ink)' }}>{featured.excerpt}</p>
						<div style={{ display: 'flex', justifyContent: 'space-between' }} className="bj-mono">
							<span style={{ fontSize: 12, color: 'var(--mut)' }}>{formatDate(featured.publishedAt)} · {estimateRead(featured)}</span>
							<span style={{ color: 'var(--accT)', fontSize: 12 }}>READ →</span>
						</div>
					</div>
				</Link>
			)}
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 18, marginTop: 18 }}>
				{rest.map((post, i) => (
					<Link key={post.slug} href={`/post/${post.slug}`} className="bj-card" style={{ minHeight: 260, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', animationDelay: `${Math.min(i, 8) * 40}ms` }}>
						{post.featuredImage && <div style={{ height: 140, background: `center/cover url(${post.featuredImage})` }} />}
						<div style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16, flex: 1 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<span className="bj-mono" style={{ fontSize: 11, color: 'var(--accT)' }}>● {tagName(post)}</span>
								<span className="bj-mono" style={{ fontSize: 11, color: 'var(--mut)' }}>{String(i + 2).padStart(2, '0')}</span>
							</div>
							<div>
								<div style={{ font: "700 22px/1.12 'Bricolage Grotesque',sans-serif", letterSpacing: '-.03em' }}>{post.title}</div>
								<div style={{ color: 'var(--mut)', marginTop: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</div>
								<div className="bj-mono" style={{ fontSize: 11, color: 'var(--mut)', marginTop: 16 }}>{formatDate(post.publishedAt)} · {estimateRead(post)}</div>
							</div>
						</div>
					</Link>
				))}
			</div>
			{filtered.length === 0 && <div className="bj-serif" style={{ padding: '80px 0', textAlign: 'center', fontSize: 30, color: 'var(--mut)' }}>Nothing more to take away.</div>}
		</div>
	)
}
