import React, { useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import Cursor from './Cursor'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cursor from './Cursor'

const NAV = [
	{ href: '/', label: 'Home' },
	{ href: '/routes/blog', label: 'Blog' },
	{ href: '/routes/libaries', label: 'Libraries' },
	{ href: '/routes/aboutme', label: 'About' },
	{ href: '/quiz', label: 'Quiz' }
]

export default function Shell ({ children }) {
	const router = useRouter()
	const [theme, setTheme] = useState('dark')
	const [progress, setProgress] = useState(0)
	const [palette, setPalette] = useState(false)
	const [sheet, setSheet] = useState(false)
	const [q, setQ] = useState('')
	const [active, setActive] = useState(0)
	const [posts, setPosts] = useState([])
	const [msg, setMsg] = useState('')
	const [sent, setSent] = useState(false)
	const [toast, setToast] = useState('')

	useEffect(() => {
		const saved = window.localStorage.getItem('bj-theme')
		if (saved === 'light' || saved === 'dark') setTheme(saved)
	}, [])

	useEffect(() => {
		const onScroll = () => {
			const h = document.documentElement.scrollHeight - window.innerHeight
			setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0)
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [router.asPath])

	useEffect(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault()
				setPalette(true)
			}
			if (e.key === 'Escape') {
				setPalette(false)
				setSheet(false)
			}
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [])

	useEffect(() => {
		if (!palette || posts.length) return
		fetch('/api/posts?all=1')
			.then((r) => r.json())
			.then((data) => setPosts(data.posts || []))
			.catch(() => setPosts([]))
	}, [palette, posts.length])

	useEffect(() => {
		if (!toast) return
		const t = setTimeout(() => setToast(''), 2200)
		return () => clearTimeout(t)
	}, [toast])

	const results = useMemo(() => {
		const pages = [
			{ href: '/', label: 'Home', sub: 'Page' },
			{ href: '/routes/blog', label: 'Blog', sub: 'Page' },
			{ href: '/routes/libaries', label: 'Libraries', sub: 'Page' },
			{ href: '/routes/aboutme', label: 'About', sub: 'Page' },
			{ href: '/quiz', label: 'Quiz', sub: 'Page' }
		]
		const query = q.trim().toLowerCase()
		const pageHits = pages.filter((p) => !query || p.label.toLowerCase().includes(query))
		const postHits = posts
			.filter((p) => !query || `${p.title} ${p.excerpt || ''}`.toLowerCase().includes(query))
			.slice(0, 8)
			.map((p) => ({ href: `/post/${p.slug}`, label: p.title, sub: p.tag || 'Post' }))
		return [
			...pageHits.map((p) => ({ ...p, head: p === pageHits[0] ? 'PAGES' : '' })),
			...postHits.map((p, i) => ({ ...p, head: i === 0 ? 'POSTS' : '' }))
		]
	}, [q, posts])

	const go = (href) => {
		setPalette(false)
		setQ('')
		router.push(href)
	}

	const toggleTheme = (event) => {
		const next = theme === 'dark' ? 'light' : 'dark'
		const rect = event.currentTarget.getBoundingClientRect()
		document.documentElement.style.setProperty('--vx', `${rect.left + rect.width / 2}px`)
		document.documentElement.style.setProperty('--vy', `${rect.top + rect.height / 2}px`)
		const apply = () => {
			setTheme(next)
			window.localStorage.setItem('bj-theme', next)
		}
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (document.startViewTransition && !reduce) {
			document.startViewTransition(() => {
				flushSync(apply)
			})
		} else {
			apply()
		}
	}

	const mailto = `mailto:jagetic.bojan@gmail.com?subject=${encodeURIComponent('Hello from jageticbojan.com')}&body=${encodeURIComponent(msg)}`

	return (
		<div data-bjw="1" data-theme={theme}>
			<Cursor />
			<Cursor />
			<div style={{ position: 'fixed', top: 0, left: 0, height: 2, width: `${progress * 100}%`, background: 'var(--acc)', boxShadow: '0 0 12px var(--acc)', zIndex: 100 }} />
			<nav style={{ position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 90, width: 'min(1180px, calc(100% - 32px))', height: 60, borderRadius: 30, display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px 0 12px', boxSizing: 'border-box', background: 'var(--glass)', backdropFilter: 'blur(24px) saturate(1.7)', border: '1px solid var(--line)' }}>
				<Link href="/" style={{ width: 40, height: 40, borderRadius: 14, background: 'var(--inv)', color: 'var(--invInk)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "800 16px 'Bricolage Grotesque',sans-serif", letterSpacing: '-.05em', flex: 'none' }}>bj<span style={{ color: 'oklch(0.55 0.1 240)' }}>.</span></Link>
				<div style={{ display: 'flex', gap: 2, marginLeft: 10, flex: 1, minWidth: 0, overflow: 'auto' }}>
					{NAV.map((item) => {
						const on = item.href === '/' ? router.asPath === '/' : router.asPath.startsWith(item.href)
						return <Link key={item.href} href={item.href} className={`bj-nav-link${on ? ' is-on' : ''}`}>{item.label}</Link>
					})}
				</div>
				<button type="button" onClick={() => setPalette(true)} style={{ height: 40, padding: '0 12px 0 14px', borderRadius: 99, border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--mut)', display: 'flex', alignItems: 'center', gap: 10, font: "500 13px 'Bricolage Grotesque',sans-serif", flex: 'none' }}>
					<span style={{ width: 11, height: 11, border: '2px solid currentColor', borderRadius: '50%', boxSizing: 'border-box' }} />
					Search
					<span className="bj-mono" style={{ fontSize: 10, padding: '3px 6px', borderRadius: 6, border: '1px solid var(--line)' }}>⌘K</span>
				</button>
				<button type="button" aria-label="Toggle theme" onClick={toggleTheme} style={{ width: 40, height: 40, flex: 'none', borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<span style={{ width: 16, height: 16, borderRadius: '50%', background: 'linear-gradient(90deg, var(--ink) 50%, transparent 50%)', border: '2px solid var(--ink)', boxSizing: 'border-box' }} />
				</button>
			</nav>

			<main style={{ flex: 1 }}>{children}</main>

			{router.pathname !== '/' && <footer style={{ width: '100%', maxWidth: 1180, margin: '0 auto', padding: '130px 32px 40px', boxSizing: 'border-box', overflow: 'hidden' }}>
				<div style={{ font: "800 clamp(80px, 17vw, 250px)/.8 'Bricolage Grotesque',sans-serif", letterSpacing: '-.07em', color: 'transparent', WebkitTextStroke: '1px var(--line)', whiteSpace: 'nowrap' }}>
					jagetić<span style={{ WebkitTextStroke: 0, color: 'var(--acc)' }}>.</span>
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 20, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)', font: "400 12px 'JetBrains Mono',monospace", color: 'var(--mut)' }}>
					<span>© Bojan Jagetić · jageticbojan.com</span>
					<span style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
						<Link href="/routes/blog">Blog</Link>
						<Link href="/routes/libaries">Libraries</Link>
						<Link href="/routes/aboutme">About</Link>
						<Link href="/quiz">Quiz</Link>
						<a href="https://github.com/basskibo" target="_blank" rel="noreferrer">GitHub</a>
					</span>
				</div>
			</footer>}

			{palette && (
				<div onClick={() => setPalette(false)} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(6,6,9,.45)', backdropFilter: 'blur(14px)', animation: 'bjFade .25s both', display: 'flex', justifyContent: 'center', padding: '14vh 16px 0' }}>
					<div onClick={(e) => e.stopPropagation()} style={{ width: 'min(640px, 100%)', alignSelf: 'flex-start', borderRadius: 28, background: 'var(--glass)', backdropFilter: 'blur(30px) saturate(1.8)', border: '1px solid var(--line)', overflow: 'hidden', animation: 'bjDrop .35s cubic-bezier(.2,.9,.3,1.2) both' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', height: 64, borderBottom: '1px solid var(--line)' }}>
							<input autoFocus value={q} onChange={(e) => { setQ(e.target.value); setActive(0) }} onKeyDown={(e) => {
								if (e.key === 'ArrowDown') setActive((n) => Math.min(results.length - 1, n + 1))
								if (e.key === 'ArrowUp') setActive((n) => Math.max(0, n - 1))
								if (e.key === 'Enter' && results[active]) go(results[active].href)
							}} placeholder="Search posts, pages, actions…" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink)', fontSize: 18 }} />
							<span className="bj-mono" style={{ fontSize: 10, padding: '4px 7px', borderRadius: 6, border: '1px solid var(--line)', color: 'var(--mut)' }}>ESC</span>
						</div>
						<div style={{ maxHeight: '56vh', overflowY: 'auto', padding: 8 }}>
							{results.map((r, i) => (
								<div key={r.href + r.label}>
									{r.head && <div className="bj-mono" style={{ fontSize: 10, letterSpacing: '.12em', color: 'var(--mut)', padding: '12px 12px 6px' }}>{r.head}</div>}
									<button type="button" onMouseEnter={() => setActive(i)} onClick={() => go(r.href)} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 14, border: 'none', background: i === active ? 'var(--card)' : 'transparent', color: 'var(--ink)' }}>
										<span style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--acc)', color: '#0b0c10', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 12px 'JetBrains Mono',monospace" }}>{r.sub === 'Page' ? '⌘' : '#'}</span>
										<span style={{ flex: 1, minWidth: 0 }}>
											<span style={{ display: 'block', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.label}</span>
											<span className="bj-mono" style={{ fontSize: 11, color: 'var(--mut)' }}>{r.sub}</span>
										</span>
									</button>
								</div>
							))}
							{results.length === 0 && <div className="bj-serif" style={{ padding: 32, textAlign: 'center', fontSize: 22, color: 'var(--mut)' }}>Nothing more to take away.</div>}
						</div>
					</div>
				</div>
			)}

			{sheet && (
				<div onClick={() => setSheet(false)} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'rgba(6,6,9,.5)', backdropFilter: 'blur(10px)', animation: 'bjFade .25s both', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
					<div onClick={(e) => e.stopPropagation()} style={{ width: 'min(520px, 100%)', borderRadius: 36, background: 'var(--bg2)', border: '1px solid var(--line)', padding: 36, animation: 'bjDrop .45s cubic-bezier(.2,.9,.25,1.2) both' }}>
						{!sent ? (
							<>
								<div style={{ font: "800 44px/1 'Bricolage Grotesque',sans-serif", letterSpacing: '-.045em' }}>Say <span className="bj-serif" style={{ fontSize: 48 }}>hello</span></div>
								<p style={{ color: 'var(--mut)', margin: '10px 0 20px' }}>Straight to jagetic.bojan@gmail.com</p>
								<textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Tell me about your idea or project…" style={{ width: '100%', height: 150, boxSizing: 'border-box', borderRadius: 20, border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--ink)', padding: 16, fontSize: 16, resize: 'none', outline: 'none' }} />
								<div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
									<a href={msg.trim() ? mailto : undefined} onClick={() => msg.trim() && setSent(true)} style={{ flex: 1, height: 56, borderRadius: 99, background: msg.trim() ? 'var(--acc)' : 'var(--card)', color: msg.trim() ? '#0b0c10' : 'var(--mut)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, pointerEvents: msg.trim() ? 'auto' : 'none' }}>Send message →</a>
									<button type="button" onClick={() => setSheet(false)} style={{ height: 56, padding: '0 22px', borderRadius: 99, border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)' }}>Cancel</button>
								</div>
							</>
						) : (
							<div style={{ textAlign: 'center', animation: 'bjIn .5s both' }}>
								<div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--acc)', color: '#0b0c10', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, fontWeight: 800 }}>✓</div>
								<div style={{ fontWeight: 800, fontSize: 32, marginTop: 20 }}>Opening your mail app</div>
								<p className="bj-serif" style={{ fontSize: 22, color: 'var(--mut)' }}>Talk soon.</p>
								<button type="button" onClick={() => setSheet(false)} style={{ height: 48, padding: '0 26px', borderRadius: 99, border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--ink)' }}>Done</button>
							</div>
						)}
					</div>
				</div>
			)}

			{toast && <div style={{ position: 'fixed', left: '50%', bottom: 32, transform: 'translateX(-50%)', zIndex: 130, padding: '14px 20px', borderRadius: 99, background: 'var(--inv)', color: 'var(--invInk)', fontWeight: 600, animation: 'bjDrop .35s both' }}>{toast}</div>}
		</div>
	)
}

