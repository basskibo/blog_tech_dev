import React, { useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import projects, { getFeaturedProjects } from '../../lib/projects'

export const NAV = [
	{ href: '/', label: 'Home' },
	{ href: '/routes/projects', label: 'Projects' },
	{ href: '/routes/blog', label: 'Blog' },
	{ href: '/routes/libaries', label: 'Libraries' },
	{ href: '/routes/aboutme', label: 'About' }
]

const ELSEWHERE = [
	{ href: 'https://github.com/basskibo', label: 'GitHub' },
	{ href: 'https://linkedin.com/in/bojan-jagetic', label: 'LinkedIn' },
	{ href: 'https://twitter.com/basskibo1', label: 'X' },
	{ href: 'https://dev.to/basskibo', label: 'Dev.to' }
]

const STRIP = getFeaturedProjects().map((p) => p.color)

export function isActive (href, path) {
	const clean = (path || '/').split(/[?#]/)[0]
	if (href === '/') return clean === '/'
	return clean === href || clean.startsWith(`${href}/`)
}

export function searchResults (query, posts) {
	const q = query.trim().toLowerCase()
	const pages = NAV.filter((p) => !q || p.label.toLowerCase().includes(q)).map((p) => ({ href: p.href, label: p.label, sub: 'Page', group: 'Pages' }))
	const work = projects
		.filter((p) => q && `${p.name} ${p.tagline}`.toLowerCase().includes(q))
		.slice(0, 5)
		.map((p) => ({ href: '/routes/projects', label: p.name, sub: p.tagline, group: 'Projects' }))
	const writing = posts
		.filter((p) => !q || `${p.title} ${p.excerpt || ''}`.toLowerCase().includes(q))
		.slice(0, 8)
		.map((p) => ({ href: `/post/${p.slug}`, label: p.title, sub: p.tag || 'Post', group: 'Posts' }))
	return [...pages, ...work, ...writing]
}

export default function Shell ({ children }) {
	const router = useRouter()
	const [theme, setTheme] = useState('dark')
	const [palette, setPalette] = useState(false)
	const [sheet, setSheet] = useState(false)
	const [scrolled, setScrolled] = useState(false)
	const [q, setQ] = useState('')
	const [active, setActive] = useState(0)
	const [posts, setPosts] = useState([])
	const progressRef = useRef(null)

	useEffect(() => {
		const saved = window.localStorage.getItem('bj-theme')
		if (saved === 'light' || saved === 'dark') setTheme(saved)
	}, [])

	useEffect(() => {
		// Written straight to the bar (one frame at most) so scrolling never re-renders the page.
		let frame = 0
		let wasScrolled = null
		const update = () => {
			frame = 0
			const h = document.documentElement.scrollHeight - window.innerHeight
			const value = h > 0 ? Math.min(1, window.scrollY / h) : 0
			if (progressRef.current) progressRef.current.style.transform = `scaleX(${value})`
			const now = window.scrollY > 8
			if (now !== wasScrolled) {
				wasScrolled = now
				setScrolled(now)
			}
		}
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update)
		}
		update()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			window.removeEventListener('scroll', onScroll)
			cancelAnimationFrame(frame)
		}
	}, [router.asPath])

	useEffect(() => {
		setSheet(false)
	}, [router.asPath])

	// The page background behind overscroll and the mobile browser bar follow the theme.
	useEffect(() => {
		const bg = theme === 'dark' ? '#16133a' : '#f2f0f8'
		document.body.style.backgroundColor = bg
		document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg)
	}, [theme])

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

	const results = useMemo(() => searchResults(q, posts), [q, posts])

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

	return (
		<div data-bjw="1" data-theme={theme}>
			<div ref={progressRef} className="progress" data-testid="scroll-progress" />
			<header className={`top${scrolled ? ' is-scrolled' : ''}`}>
				<div className="wrap top-in">
					<Link href="/" className="wordmark" aria-label="Bojan Jagetić, home">
						<span className="wordmark-dot" aria-hidden="true" />
						Bojan Jagetić
					</Link>
					<nav className="menu" aria-label="Main">
						{NAV.map((item) => (
							<Link key={item.href} href={item.href} aria-current={isActive(item.href, router.asPath) ? 'page' : undefined}>{item.label}</Link>
						))}
					</nav>
					<div className="top-actions">
						<button type="button" className="search-btn" aria-label="Search" onClick={() => setPalette(true)}>
							<Search aria-hidden="true" />
							<span className="label">Search</span>
							<kbd>Ctrl K</kbd>
						</button>
						<button type="button" className="icon-btn" aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} onClick={toggleTheme}>
							{theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
						</button>
						<button type="button" className="icon-btn menu-btn" aria-label={sheet ? 'Close menu' : 'Open menu'} aria-expanded={sheet} onClick={() => setSheet((open) => !open)}>
							{sheet ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
						</button>
					</div>
				</div>
			</header>

			{sheet && (
				<nav className="sheet" aria-label="Main">
					<div className="wrap">
						{NAV.map((item) => (
							<Link key={item.href} href={item.href} aria-current={isActive(item.href, router.asPath) ? 'page' : undefined}>{item.label}</Link>
						))}
					</div>
				</nav>
			)}

			<main style={{ flex: 1 }}>{children}</main>

			<footer className="foot">
				<div className="wrap">
					<div className="strip" aria-hidden="true">
						{STRIP.map((color) => <span key={color} style={{ background: color }} />)}
					</div>
					<div className="foot-grid">
						<div>
							<p className="foot-word">Bojan Jagetić</p>
							<p className="t-mut" style={{ margin: '12px 0 0', maxWidth: '30em' }}>
								Full-stack engineer. Write to <a href="mailto:jagetic.bojan@gmail.com" style={{ color: 'var(--accT)', textDecoration: 'underline', textUnderlineOffset: 3 }}>jagetic.bojan@gmail.com</a>
							</p>
						</div>
						<div>
							<h2>On this site</h2>
							<ul>
								{NAV.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
							</ul>
						</div>
						<div>
							<h2>Elsewhere</h2>
							<ul>
								{ELSEWHERE.map((item) => <li key={item.href}><a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}</a></li>)}
							</ul>
						</div>
					</div>
					<p className="foot-note">© {new Date().getFullYear()} Bojan Jagetić</p>
				</div>
			</footer>

			{palette && (
				<div className="palette-scrim" onClick={() => setPalette(false)}>
					<div className="palette" role="dialog" aria-modal="true" aria-label="Search" onClick={(e) => e.stopPropagation()}>
						<div className="palette-in">
							<Search aria-hidden="true" />
							<input
								autoFocus
								value={q}
								aria-label="Search pages, projects and posts"
								placeholder="Search pages, projects and posts"
								onChange={(e) => { setQ(e.target.value); setActive(0) }}
								onKeyDown={(e) => {
									if (e.key === 'ArrowDown') { e.preventDefault(); setActive((n) => Math.min(results.length - 1, n + 1)) }
									if (e.key === 'ArrowUp') { e.preventDefault(); setActive((n) => Math.max(0, n - 1)) }
									if (e.key === 'Enter' && results[active]) go(results[active].href)
								}}
							/>
						</div>
						<div className="palette-list">
							{results.map((r, i) => (
								<div key={`${r.group}-${r.href}-${r.label}`}>
									{(i === 0 || results[i - 1].group !== r.group) && <div className="palette-group">{r.group}</div>}
									<button type="button" className={`palette-item${i === active ? ' is-on' : ''}`} onMouseEnter={() => setActive(i)} onClick={() => go(r.href)}>
										<b>{r.label}</b>
										<span>{r.sub}</span>
									</button>
								</div>
							))}
							{results.length === 0 && <div className="palette-empty">No matches. Try a shorter word, or open the blog to browse every post.</div>}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
