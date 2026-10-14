import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { hostOf } from '../../lib/projects'

// Desktop: a sticky "device" on the left wipes to the project whose chapter is
// in the middle of the viewport. Mobile: each chapter carries its own screenshot.
export default function FeaturedWork ({ projects }) {
	const [active, setActive] = useState(0)
	const chapters = useRef([])

	useEffect(() => {
		const nodes = chapters.current.filter(Boolean)
		if (!nodes.length || typeof IntersectionObserver === 'undefined') return undefined
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
			})
		}, { rootMargin: '-45% 0px -45% 0px' })
		nodes.forEach((node) => observer.observe(node))
		return () => observer.disconnect()
	}, [projects.length])

	const current = projects[active] || projects[0]
	if (!current) return null

	return (
		<section id="work" className="sec fw" aria-labelledby="work-title" style={{ '--p': current.color }}>
			<div className="fw-glows" aria-hidden="true">
				{projects.map((project, i) => (
					<div key={project.slug} className={`fw-glow${i === active ? ' is-on' : ''}`} style={{ '--p': project.color }} />
				))}
			</div>
			<div className="wrap">
				<div className="sec-head">
					<h2 id="work-title" className="sec-title">Selected work</h2>
					<p className="sec-sub">Three products I build, ship and use every week.</p>
				</div>
				<div className="fw-grid">
					<div className="fw-stage" aria-hidden="true">
						<div className="device">
							<div className="device-bar">
								<i /><i /><i />
								<span className="device-url">{hostOf(current.liveUrl)}</span>
							</div>
							<div className="device-screen">
								{projects.map((project, i) => (
									<div key={project.slug} className={`screen${i === active ? ' is-on' : ''}${i < active ? ' is-past' : ''}`} data-testid="fw-screen">
										<Image src={project.image} alt="" fill sizes="(max-width: 1023px) 0px, 680px" priority={i === 0} />
									</div>
								))}
							</div>
						</div>
						<div className="fw-meter">
							<span>{String(active + 1).padStart(2, '0')}</span>
							<span className="fw-meter-track">
								<span className="fw-meter-fill" style={{ display: 'block', transform: `scaleX(${(active + 1) / projects.length})` }} />
							</span>
							<span>{String(projects.length).padStart(2, '0')}</span>
						</div>
					</div>
					<div className="fw-chapters">
						{projects.map((project, i) => (
							<article
								key={project.slug}
								id={`work-${project.slug}`}
								ref={(node) => { chapters.current[i] = node }}
								data-index={i}
								className="fw-ch"
								style={{ '--p': project.color }}
								aria-labelledby={`work-${project.slug}-name`}
							>
								<div className="fw-ch-shot device">
									<div className="device-screen">
										<Image src={project.image} alt={`${project.name} screenshot`} fill sizes="(max-width: 1023px) 100vw, 0px" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
									</div>
								</div>
								<span className="fw-rank">{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
								<h3 id={`work-${project.slug}-name`} className="fw-name">{project.name}</h3>
								<p className="fw-tag">{project.tagline}</p>
								<p className="fw-desc">{project.description}</p>
								{project.highlights && (
									<ul className="fw-hl">
										{project.highlights.map((item) => <li key={item}>{item}</li>)}
									</ul>
								)}
								<div className="stack">
									{project.tech.map((t) => <span key={t}>{t}</span>)}
								</div>
								<div className="fw-actions">
									<a className="btn btn-project" href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-umami-event={`featured-open-${project.slug}`}>
										Open {project.name} <ArrowUpRight aria-hidden="true" />
									</a>
									{project.post && (
										<Link className="btn btn-ghost" href={`/post/${project.post}`} data-umami-event={`featured-story-${project.slug}`}>How I built it</Link>
									)}
									{project.repoUrl && (
										<a className="btn btn-ghost" href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source code on GitHub`}>
											<SiGithub aria-hidden="true" />
										</a>
									)}
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
