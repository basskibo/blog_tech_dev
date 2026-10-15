import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

function Terminal ({ lines, color }) {
	return (
		<div className="term" style={{ '--c': color }} aria-hidden="true">
			{lines.map((line, i) => (
				<span key={line} className={`term-line${line.startsWith('✓') || line.startsWith('→') ? ' is-ok' : ''}`} style={{ '--i': i }}>
					{line}{i === lines.length - 1 && <span className="caret" />}
				</span>
			))}
		</div>
	)
}

function Featured ({ project, big }) {
	return (
		<article className={`bento-card beam${big ? ' is-big' : ''}`} style={{ '--c': project.color }} aria-labelledby={`b-${project.slug}`}>
			<div className="bento-text">
				<span className="bento-kind"><i aria-hidden="true" />{project.status === 'live' ? 'Live' : 'In development'}, {project.label}</span>
				<h3 id={`b-${project.slug}`} className="bento-name">{project.name}</h3>
				{big && <p className="bento-tag t-serif">{project.tagline}</p>}
				<p className="bento-desc">{big ? project.description : project.tagline}</p>
				<div className="bento-actions">
					{project.liveUrl && (
						<a className="btn btn-sm btn-solid" href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-umami-event={`featured-open-${project.slug}`}>
							Open {project.name} <ArrowUpRight aria-hidden="true" />
						</a>
					)}
					{project.post && <Link className="btn btn-sm btn-ghost" href={`/post/${project.post}`} data-umami-event={`featured-story-${project.slug}`}>How I built it</Link>}
				</div>
			</div>
			<div className="bento-frame">
				<span className="bento-bar" aria-hidden="true"><i /><i /><i /><span>{(project.liveUrl || '').replace(/^https?:\/\//, '').replace(/\/.*$/, '')}</span></span>
				<span className="bento-shot">
					<Image src={project.image} alt={`${project.name} screenshot`} fill sizes={big ? '(max-width: 1080px) 100vw, 760px' : '(max-width: 1080px) 100vw, 380px'} style={{ objectFit: 'cover', objectPosition: 'top' }} />
				</span>
			</div>
		</article>
	)
}

function Tool ({ project }) {
	return (
		<article className="bento-card bento-tool" style={{ '--c': project.color }} aria-labelledby={`b-${project.slug}`}>
			<Terminal lines={project.terminal} color={project.color} />
			<div>
				<h3 id={`b-${project.slug}`} className="bento-name">{project.name}</h3>
				<p className="bento-desc">{project.tagline}. {project.description.split('. ')[0]}.</p>
				<div className="bento-actions">
					{project.post && <Link className="btn btn-sm btn-ghost" href={`/post/${project.post}`}>Read the write-up</Link>}
					<span className="t-small t-mut">Private repo</span>
				</div>
			</div>
		</article>
	)
}

export default function Bento ({ featured, tools = [], total, heading = true }) {
	const ref = useRef(null)
	const [seen, setSeen] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el || typeof IntersectionObserver === 'undefined') {
			setSeen(true)
			return undefined
		}
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setSeen(true)
				observer.disconnect()
			}
		}, { threshold: 0.15 })
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	const [first, ...rest] = featured
	if (!first) return null

	return (
		<section id="work" className="sec" aria-labelledby={heading ? 'work-title' : undefined} aria-label={heading ? undefined : 'Featured projects'}>
			<div className="wrap">
				{!heading && <h2 className="sr-only">Featured projects</h2>}
				{heading && (
					<div className="sec-head">
						<h2 id="work-title" className="t-h2">Selected <span className="t-serif" style={{ color: 'var(--accT)' }}>work</span></h2>
						{total && <Link href="/routes/projects" className="btn btn-ghost" data-umami-event="landing-all-projects">All {total} projects <ArrowRight aria-hidden="true" /></Link>}
					</div>
				)}
				<div ref={ref} className={`bento${seen ? ' is-seen' : ''}`}>
					<Featured project={first} big />
					{rest.map((project) => <Featured key={project.slug} project={project} />)}
					{tools.map((project) => <Tool key={project.slug} project={project} />)}
				</div>
			</div>
		</section>
	)
}
