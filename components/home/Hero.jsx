import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

export const INTRO = 'Full-stack engineer. I build products end to end, from the database to the last pixel.'

const LINKS = [
	{ id: 'github', href: 'https://github.com/basskibo', label: 'GitHub' },
	{ id: 'linkedin', href: 'https://linkedin.com/in/bojan-jagetic', label: 'LinkedIn' },
	{ id: 'twitter', href: 'https://twitter.com/basskibo1', label: 'X' }
]

export const AUTO_MS = 3500

const host = (url) => (url || '').replace(/^https?:\/\//, '').replace(/\/.*$/, '')

// The featured projects as a stacked deck of browser windows: the front one
// is fully visible, the others peek out behind it. It advances on its own
// (paused while hovered or focused), and with the arrows, the tabs, the
// arrow keys or a swipe.
export default function Hero ({ featured = [] }) {
	const [index, setIndex] = useState(0)
	const [paused, setPaused] = useState(false)
	const swipe = useRef(null)
	const swiped = useRef(false)
	const count = featured.length
	const current = featured[index]

	const go = (step) => setIndex((i) => (i + step + count) % count)

	useEffect(() => {
		if (paused || count < 2) return undefined
		if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
		const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_MS)
		return () => clearInterval(timer)
	}, [paused, count])

	const onKeyDown = (event) => {
		if (event.key === 'ArrowRight') { event.preventDefault(); go(1) }
		if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1) }
	}

	const onPointerDown = (event) => { swipe.current = event.clientX }
	const onPointerUp = (event) => {
		if (swipe.current === null) return
		const dx = event.clientX - swipe.current
		swipe.current = null
		swiped.current = Math.abs(dx) > 40
		if (swiped.current) go(dx < 0 ? 1 : -1)
	}

	// A swipe ends with a click on the card; that click must not open the link.
	const onClickCapture = (event) => {
		if (!swiped.current) return
		swiped.current = false
		event.preventDefault()
	}

	return (
		<section className="hero" aria-label="Introduction">
			<div className="hero-copy">
				{featured[0] && (
					<a className="hero-news" href={featured[0].liveUrl} target="_blank" rel="noopener noreferrer" style={{ '--c': featured[0].color }}>
						<span>New</span> {featured[0].name} now has an Android app
					</a>
				)}
				<h1 className="hero-name">
					<span className="hero-first">Bojan</span>{' '}
					<span className="hero-last t-serif t-grad">Jagetić</span>
				</h1>
				<p className="hero-lead">
					{INTRO} Right now that means an <b>AI money app</b>, an <b>AI chef</b> and a <b>scratch-off travel map</b>.
				</p>
				<div className="hero-actions">
					<a href="#work" className="btn btn-solid" data-umami-event="landing-see-work">See my work <ArrowRight aria-hidden="true" /></a>
					<Link href="/routes/blog" className="btn btn-ghost" data-umami-event="landing-read-blog">Read the blog</Link>
				</div>
				<div className="hero-links">
					{LINKS.map(({ id, href, label }) => (
						<a key={id} href={href} target="_blank" rel="noopener noreferrer" data-umami-event={`landing-lnk-${id}-button`}>{label}</a>
					))}
					<a href="/Bojan_Jagetić.pdf" download data-umami-event="landing-download-cv-button">Download CV</a>
				</div>
			</div>

			{current && (
				<div
					className="deck"
					role="region"
					aria-roledescription="carousel"
					aria-label="Featured projects"
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
					onFocus={() => setPaused(true)}
					onBlur={() => setPaused(false)}
					onKeyDown={onKeyDown}
				>
					<div className="deck-stack" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onClickCapture={onClickCapture}>
						{featured.map((project, i) => {
							const pos = (i - index + count) % count
							return (
								<a
									key={project.slug}
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="deck-card"
									data-pos={pos}
									style={{ '--c': project.color, zIndex: count - pos }}
									aria-hidden={pos !== 0}
									tabIndex={pos === 0 ? 0 : -1}
									draggable={false}
								>
									<span className="sr-only">Open {project.name}: </span>
									<span className="deck-bar"><i /><i /><i /><span>{host(project.liveUrl)}</span></span>
									<span className="deck-img">
										<Image src={project.image} alt="" fill priority={i === 0} sizes="(max-width: 1080px) 92vw, 620px" style={{ objectFit: 'cover', objectPosition: 'top' }} draggable={false} />
									</span>
								</a>
							)
						})}
					</div>
					<div className="deck-foot">
						<div className="deck-caption" key={current.slug} aria-live="polite">
							<span className="deck-dot" style={{ '--c': current.color }} aria-hidden="true" />
							<span>
								<b>{current.name}</b>
								<small>{current.tagline}</small>
							</span>
							<a className="deck-open" href={current.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${current.name}`}><ArrowUpRight aria-hidden="true" /></a>
						</div>
						<div className="deck-nav">
							<button type="button" className="icon-btn" aria-label="Previous project" onClick={() => go(-1)}><ArrowLeft aria-hidden="true" /></button>
							<div className="deck-tabs" role="tablist" aria-label="Choose a project">
								{featured.map((project, i) => (
									<button
										key={project.slug}
										type="button"
										role="tab"
										aria-selected={i === index}
										aria-label={project.name}
										className="deck-tab"
										style={{ '--c': project.color }}
										onClick={() => setIndex(i)}
									>
										{i === index && <span className="deck-tab-fill" style={{ animationDuration: `${AUTO_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }} />}
									</button>
								))}
							</div>
							<button type="button" className="icon-btn" aria-label="Next project" onClick={() => go(1)}><ArrowRight aria-hidden="true" /></button>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}
