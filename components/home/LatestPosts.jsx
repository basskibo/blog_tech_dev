import React from 'react'
import Image from 'next/image'
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

function Cover ({ src, priority }) {
	if (!src) return null
	if (canOptimize(src)) return <Image src={src} alt="" fill priority={priority} sizes="(max-width: 960px) 100vw, 400px" style={{ objectFit: 'cover' }} />
	return <img src={src} alt="" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
}

// One post as a card: cover, tag, title, date and reading time.
export function PostCard ({ post, big = false }) {
	const date = post.publishedAt ? dayjs(post.publishedAt) : null
	return (
		<Link href={`/post/${post.slug}`} className={`post-card${big ? ' is-big' : ''}`} data-umami-event={`landing-ftr-post-${post.slug}`}>
			<span className="post-card-img">
				<Cover src={post.featuredImage} priority={big} />
				<span className="tag post-card-tag">{tagName(post)}</span>
			</span>
			<span className="post-card-body">
				<span className="post-card-title">{post.title}</span>
				{big && post.excerpt && <span className="post-card-excerpt">{post.excerpt}</span>}
				<span className="post-card-meta">
					{date && date.isValid() ? <time dateTime={date.format('YYYY-MM-DD')}>{date.format('MMM D, YYYY')}</time> : <span>Undated</span>}
					{post.read && <span>{post.read}</span>}
				</span>
			</span>
		</Link>
	)
}

export default function LatestPosts ({ posts }) {
	if (!posts?.length) return null
	return (
		<section className="sec" aria-labelledby="posts-title">
			<div className="wrap">
				<div className="sec-head">
					<h2 id="posts-title" className="t-h2">Fresh <span className="t-serif" style={{ color: 'var(--cyan)' }}>writing</span></h2>
					<Link href="/routes/blog" className="btn btn-ghost">All posts <ArrowRight aria-hidden="true" /></Link>
				</div>
				<div className="post-grid">
					{posts.slice(0, 3).map((post) => <PostCard key={post.slug} post={post} />)}
				</div>
			</div>
		</section>
	)
}
