import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Link2 } from 'lucide-react'
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si'
import { canOptimize } from '../home/LatestPosts'
import { estimateRead, formatDate, tagName } from './format'

function Cover ({ src, sizes, priority }) {
	if (!src) return null
	return canOptimize(src)
		? <Image src={src} alt="" fill priority={priority} sizes={sizes} style={{ objectFit: 'cover' }} />
		: <img src={src} alt="" loading={priority ? undefined : 'lazy'} fetchpriority={priority ? 'high' : undefined} />
}

// Headings come from the rendered MDX (h2 with slug ids), so the table of
// contents is read from the DOM after mount.
function useOutline (ref) {
	const [items, setItems] = useState([])
	const [active, setActive] = useState('')

	useEffect(() => {
		const root = ref.current
		if (!root) return undefined
		const heads = [...root.querySelectorAll('h2[id]')]
		setItems(heads.map((h) => ({ id: h.id, text: h.textContent.trim() })))
		if (!heads.length || typeof IntersectionObserver === 'undefined') return undefined
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
		}, { rootMargin: '-15% 0px -70% 0px' })
		heads.forEach((h) => observer.observe(h))
		return () => observer.disconnect()
	}, [ref])

	return [items, active]
}

// Percent of the article read; re-renders only when the whole number changes.
function useProgress (ref) {
	const [pct, setPct] = useState(0)
	useEffect(() => {
		let frame = 0
		const update = () => {
			frame = 0
			const el = ref.current
			if (!el) return
			const rect = el.getBoundingClientRect()
			const total = rect.height - window.innerHeight
			const value = total > 0 ? Math.round(Math.min(1, Math.max(0, -rect.top / total)) * 100) : 0
			setPct(value)
		}
		const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
		update()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
			cancelAnimationFrame(frame)
		}
	}, [ref])
	return pct
}

export default function PostView ({ data, nextPost, backHref = '/routes/blog', backLabel = 'All posts', children }) {
	const [toast, setToast] = useState('')
	const [url, setUrl] = useState('')
	const article = useRef(null)
	const [outline, active] = useOutline(article)
	const pct = useProgress(article)

	useEffect(() => { setUrl(window.location.href) }, [])

	useEffect(() => {
		if (!toast) return undefined
		const timer = setTimeout(() => setToast(''), 2400)
		return () => clearTimeout(timer)
	}, [toast])

	const read = estimateRead(data)
	const share = encodeURIComponent(url)

	const copyLink = () => {
		navigator.clipboard?.writeText(window.location.href)
		setToast('Link copied')
	}

	return (
		<div className="wrap">
			<header className="post-hero bj-in">
				<Link href={backHref} className="post-back"><ArrowLeft aria-hidden="true" /> {backLabel}</Link>
				<div className="post-chips">
					<span className="tag">{tagName(data)}</span>
					{data.publishedAt && <time className="post-chip" dateTime={data.publishedAt}>{formatDate(data.publishedAt)}</time>}
					<span className="post-chip">{read}</span>
				</div>
				<h1 className="post-title">{data.title}</h1>
				{data.excerpt && <p className="post-excerpt">{data.excerpt}</p>}
				<div className="post-author">
					<span className="post-avatar" aria-hidden="true">BJ</span>
					<span><b>Bojan Jagetić</b><small>Full-stack engineer</small></span>
				</div>
			</header>

			{data.featuredImage && (
				<figure className="post-figure">
					<Cover src={data.featuredImage} priority sizes="(max-width: 1240px) 100vw, 1180px" />
				</figure>
			)}

			<div className="post-body">
				<article id="jag-article" className="bj-prose" ref={article}>
					{children}
				</article>

				<aside className="post-aside" aria-label="On this page">
					<div className="post-progress" aria-hidden="true">
						<span className="post-progress-bar"><i style={{ transform: `scaleX(${pct / 100})` }} /></span>
						<span>{pct}% read</span>
					</div>
					{outline.length > 0 && (
						<nav className="post-toc" aria-label="Table of contents">
							<p>On this page</p>
							<ol>
								{outline.map((item) => (
									<li key={item.id}>
										<a href={`#${item.id}`} aria-current={item.id === active ? 'location' : undefined}>{item.text}</a>
									</li>
								))}
							</ol>
						</nav>
					)}
					<div className="post-share">
						<p>Share</p>
						<div>
							<button type="button" className="icon-btn" aria-label="Copy link" onClick={copyLink}><Link2 aria-hidden="true" /></button>
							<a className="icon-btn" aria-label="Share on X" href={`https://twitter.com/intent/tweet?url=${share}&text=${encodeURIComponent(data.title)}`} target="_blank" rel="noopener noreferrer"><SiX aria-hidden="true" /></a>
							<a className="icon-btn" aria-label="Share on LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${share}`} target="_blank" rel="noopener noreferrer"><SiLinkedin aria-hidden="true" /></a>
						</div>
					</div>
				</aside>
			</div>

			<footer className="post-end">
				<div className="post-bio">
					<span className="post-avatar is-big" aria-hidden="true">BJ</span>
					<div>
						<p className="post-bio-name">Written by Bojan Jagetić</p>
						<p className="t-mut">Full-stack engineer. I build products end to end and write about how they are made.</p>
						<div className="post-bio-links">
							<a className="chip" href="https://github.com/basskibo" target="_blank" rel="noopener noreferrer"><SiGithub aria-hidden="true" /> GitHub</a>
							<a className="chip" href="https://linkedin.com/in/bojan-jagetic" target="_blank" rel="noopener noreferrer"><SiLinkedin aria-hidden="true" /> LinkedIn</a>
							<Link className="chip" href="/routes/aboutme">About me</Link>
						</div>
					</div>
				</div>
				{nextPost && (
					<Link href={`/post/${nextPost.slug}`} className="next-post">
						<span className="next-post-img"><Cover src={nextPost.featuredImage} sizes="(max-width: 900px) 100vw, 560px" /></span>
						<span className="next-post-body">
							<span className="next-post-label">Read next</span>
							<span className="next-post-title">{nextPost.title}</span>
							{nextPost.excerpt && <span className="next-post-excerpt">{nextPost.excerpt}</span>}
							<span className="next-post-go">Read the post <ArrowRight aria-hidden="true" /></span>
						</span>
					</Link>
				)}
				<Link href={backHref} className="more-link"><ArrowLeft aria-hidden="true" /> {backLabel}</Link>
			</footer>
			{toast && <div className="toast" role="status">{toast}</div>}
		</div>
	)
}
