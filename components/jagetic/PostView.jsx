import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { canOptimize } from '../home/LatestPosts'
import { ArrowLeft, Link2 } from 'lucide-react'
import { estimateRead, formatDate, tagName } from './format'

export default function PostView ({ data, nextPost, backHref = '/routes/blog', backLabel = 'All posts', children }) {
	const [toast, setToast] = useState('')

	useEffect(() => {
		if (!toast) return undefined
		const timer = setTimeout(() => setToast(''), 2400)
		return () => clearTimeout(timer)
	}, [toast])

	const read = estimateRead(data)

	const copyLink = () => {
		navigator.clipboard?.writeText(window.location.href)
		setToast('Link copied')
	}

	return (
		<div className="wrap">
			<header className="post-head bj-in">
				<Link href={backHref} className="post-back"><ArrowLeft aria-hidden="true" /> {backLabel}</Link>
				<h1 className="post-title">{data.title}</h1>
				<div className="post-meta">
					<span className="post-author"><span className="post-avatar" aria-hidden="true">BJ</span> Bojan Jagetić</span>
					{data.publishedAt && <time dateTime={data.publishedAt}>{formatDate(data.publishedAt)}</time>}
					<span>{read}</span>
					<span className="tag">{tagName(data)}</span>
				</div>
			</header>
			{data.featuredImage && (
				<figure className="post-figure">
					{canOptimize(data.featuredImage)
						? <Image src={data.featuredImage} alt="" fill priority sizes="(max-width: 1240px) 100vw, 1160px" style={{ objectFit: 'cover' }} />
						: <img src={data.featuredImage} alt="" fetchpriority="high" />}
				</figure>
			)}
			<div className="post-body">
				<article id="jag-article" className="bj-prose">
					{data.excerpt && <p className="post-excerpt">{data.excerpt}</p>}
					{children}
					{nextPost && (
						<Link href={`/post/${nextPost.slug}`} className="next-post">
							<span className="next-post-img">
								{nextPost.featuredImage && (canOptimize(nextPost.featuredImage)
									? <Image src={nextPost.featuredImage} alt="" fill sizes="200px" style={{ objectFit: 'cover' }} />
									: <img src={nextPost.featuredImage} alt="" loading="lazy" />)}
							</span>
							<span>
								<span className="next-post-label">Read next</span>
								<span className="next-post-title" style={{ display: 'block' }}>{nextPost.title}</span>
							</span>
						</Link>
					)}
				</article>
				<aside className="post-aside" aria-label="Share">
					<p>Found it useful? Send it to someone.</p>
					<button type="button" className="btn btn-sm btn-ghost" onClick={copyLink}><Link2 aria-hidden="true" /> Copy link</button>
				</aside>
			</div>
			{toast && <div className="toast" role="status">{toast}</div>}
		</div>
	)
}
