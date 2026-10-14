import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatDate, tagName } from '../jagetic/format'

const IMAGE_HOSTS = ['res.cloudinary.com', 'images.unsplash.com', 'images.pexels.com', 'avatars.githubusercontent.com']

// next/image only optimises hosts listed in next.config.js; anything else
// is rendered as a plain lazy image.
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

function Cover ({ src }) {
	if (!src) return null
	if (canOptimize(src)) {
		return <Image src={src} alt="" fill sizes="(max-width: 1023px) 100vw, 400px" />
	}
	return <img src={src} alt="" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
}

export default function LatestPosts ({ posts }) {
	if (!posts?.length) return null
	return (
		<section className="sec" aria-labelledby="posts-title">
			<div className="wrap">
				<div className="sec-head">
					<h2 id="posts-title" className="sec-title">Writing</h2>
					<p className="sec-sub">Notes from building these, and everything in between.</p>
				</div>
				<div className="posts">
					{posts.map((post) => (
						<Link key={post.slug} href={`/post/${post.slug}`} className="post-card" data-umami-event={`landing-ftr-post-${post.slug}`}>
							<div className="post-img"><Cover src={post.featuredImage} /></div>
							<div className="post-body">
								<span className="post-tag">{tagName(post)}</span>
								<h3 className="post-title">{post.title}</h3>
								<p className="post-excerpt">{post.excerpt}</p>
								<span className="post-meta">{formatDate(post.publishedAt)}{post.read ? ` · ${post.read}` : ''}</span>
							</div>
						</Link>
					))}
				</div>
				<Link href="/routes/blog" className="more-link">All posts <ArrowRight aria-hidden="true" /></Link>
			</div>
		</section>
	)
}
