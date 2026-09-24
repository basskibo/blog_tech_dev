import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { estimateRead, formatDate, tagName } from './format'

export default function PostView ({ data, nextPost, backHref = '/routes/blog', backLabel = '← ALL POSTS', children }) {
	const [pct, setPct] = useState(0)
	const [claps, setClaps] = useState(0)
	const [saved, setSaved] = useState(false)
	const [toast, setToast] = useState('')

	useEffect(() => {
		const onScroll = () => {
			const el = document.getElementById('jag-article')
			if (!el) return
			const start = el.offsetTop
			const total = el.offsetHeight - window.innerHeight
			const value = total > 0 ? (window.scrollY - start) / total : 0
			setPct(Math.max(0, Math.min(1, value)))
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		setSaved(window.localStorage.getItem(`bj-save-${data.slug}`) === '1')
		setClaps(Number(window.localStorage.getItem(`bj-clap-${data.slug}`) || 0))
	}, [data.slug])

	const read = estimateRead(data)
	const mins = parseInt(read, 10) || 5
	const left = Math.max(1, Math.ceil(mins * (1 - pct)))

	return (
		<div className="bj-in">
			<header style={{ position: 'relative', padding: '160px 32px 64px', overflow: 'hidden', background: data.featuredImage ? `linear-gradient(to top, var(--bg), transparent 55%), center/cover url(${data.featuredImage})` : 'var(--bg2)' }}>
				<div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
					<Link href={backHref} className="bj-mono" style={{ fontSize: 12, color: 'var(--mut)' }}>{backLabel}</Link>
					<div style={{ marginTop: 26 }}>
						<span className="bj-mono" style={{ fontSize: 11, fontWeight: 600, padding: '7px 11px', borderRadius: 99, background: 'var(--acc)', color: '#0b0c10' }}>{tagName(data)}</span>
					</div>
					<h1 style={{ font: "800 clamp(40px, 5.6vw, 76px)/1 'Bricolage Grotesque',sans-serif", letterSpacing: '-.05em', margin: '22px 0 0' }}>{data.title}</h1>
					<div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 30 }}>
						<div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--inv)', color: 'var(--invInk)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>BJ</div>
						<div>
							<div style={{ fontWeight: 600 }}>Bojan Jagetić</div>
							<div className="bj-mono" style={{ fontSize: 12, color: 'var(--mut)' }}>{formatDate(data.publishedAt)} · {read}</div>
						</div>
					</div>
				</div>
			</header>
			<div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', flexWrap: 'wrap', gap: '0 56px', justifyContent: 'center' }}>
				<article id="jag-article" className="bj-prose" style={{ minWidth: 0, flex: '1 1 520px', maxWidth: 720 }}>
					<p className="bj-serif" style={{ fontSize: 28, lineHeight: 1.3, margin: '40px 0 12px', color: 'var(--ink)', opacity: 1 }}>{data.excerpt}</p>
					{children}
					{nextPost && (
						<>
							<div className="bj-kicker" style={{ marginTop: 56 }}>Up next</div>
							<Link href={`/post/${nextPost.slug}`} className="bj-card" style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12, padding: 28, borderRadius: 30, background: nextPost.featuredImage ? `linear-gradient(to top, var(--bg2), transparent), center/cover url(${nextPost.featuredImage})` : 'var(--bg2)' }}>
								<span className="bj-mono" style={{ fontSize: 12, color: 'var(--mut)' }}>{tagName(nextPost)}</span>
								<span style={{ font: "700 28px/1.1 'Bricolage Grotesque',sans-serif" }}>{nextPost.title}</span>
								<span style={{ color: 'var(--accT)', fontWeight: 600 }}>Read next →</span>
							</Link>
						</>
					)}
				</article>
				<aside style={{ flex: '0 1 260px' }}>
					<div style={{ position: 'sticky', top: 110, marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 260 }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 24, border: '1px solid var(--line)', background: 'var(--card)' }}>
							<div style={{ width: 56, height: 56, borderRadius: '50%', background: `conic-gradient(var(--acc) ${pct * 360}deg, var(--line) 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bj-mono">{Math.round(pct * 100)}</div>
							</div>
							<span className="bj-mono" style={{ fontSize: 12, color: 'var(--mut)' }}>{left} MIN LEFT</span>
						</div>
						<button type="button" onClick={() => {
							const next = claps + 1
							setClaps(next)
							window.localStorage.setItem(`bj-clap-${data.slug}`, String(next))
						}} style={{ height: 52, borderRadius: 99, border: 'none', background: claps ? 'var(--acc)' : 'var(--inv)', color: claps ? '#0b0c10' : 'var(--invInk)', fontWeight: 700 }}>👏 {claps}</button>
						<button type="button" onClick={() => {
							const next = !saved
							setSaved(next)
							window.localStorage.setItem(`bj-save-${data.slug}`, next ? '1' : '0')
						}} style={{ height: 52, borderRadius: 99, border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontWeight: 600 }}>{saved ? 'Saved' : 'Save'}</button>
						<button type="button" onClick={() => {
							navigator.clipboard?.writeText(window.location.href)
							setToast('Link copied')
						}} style={{ height: 52, borderRadius: 99, border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)', fontWeight: 600 }}>Copy link</button>
					</div>
				</aside>
			</div>
			{toast && <div style={{ position: 'fixed', left: '50%', bottom: 32, transform: 'translateX(-50%)', zIndex: 130, padding: '14px 20px', borderRadius: 99, background: 'var(--inv)', color: 'var(--invInk)', fontWeight: 600 }}>{toast}</div>}
		</div>
	)
}
