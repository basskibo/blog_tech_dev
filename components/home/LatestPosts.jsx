import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import dayjs from 'dayjs'
import { tagName } from '../jagetic/format'

const IMAGE_HOSTS = ['res.cloudinary.com', 'images.unsplash.com', 'images.pexels.com', 'avatars.githubusercontent.com']

// next/image only optimises hosts listed in next.config.js.
export function canOptimize (src) {
	if (!src) return false
	if (src.startsWith('/')) return true
	try {
		const host = new URL(src).host
		return IMAGE_HOSTS.includes(host) || host.endsWith('.amazonaws.com')
	} catch (error) {
		return false
	}
}

// A dated list: the date column carries the order, so there are no cards.
export function GuideRow ({ post }) {
	const date = post.publishedAt ? dayjs(post.publishedAt) : null
	return (
		<li className="guide-row">
			<Link href={`/post/${post.slug}`} className="guide-link" data-umami-event={`landing-ftr-post-${post.slug}`}>
				<span className="guide-date">
					{date && date.isValid()
						? <time dateTime={date.format('YYYY-MM-DD')}><b>{date.format('MMM D')}</b><span>{date.format('YYYY')}</span></time>
						: <span>Undated</span>}
				</span>
				<span className="guide-main">
					<span className="guide-title">{post.title}</span>
					{post.excerpt && <span className="guide-excerpt">{post.excerpt}</span>}
				</span>
				<span className="guide-meta">
					<span className="tag">{tagName(post)}</span>
					{post.read && <span className="t-mut t-small">{post.read}</span>}
				</span>
			</Link>
		</li>
	)
}

export default function LatestPosts ({ posts }) {
	if (!posts?.length) return null
	return (
		<section className="sec" aria-labelledby="posts-title">
			<div className="wrap">
				<div className="sec-head">
					<h2 id="posts-title" className="t-h2">Writing</h2>
					<p className="t-mut">Notes from building these, and everything in between.</p>
				</div>
				<ol className="guide">
					{posts.map((post) => <GuideRow key={post.slug} post={post} />)}
				</ol>
				<Link href="/routes/blog" className="more-link">All posts <ArrowRight aria-hidden="true" /></Link>
			</div>
		</section>
	)
}
