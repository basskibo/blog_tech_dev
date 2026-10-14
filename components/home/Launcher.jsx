import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

// The featured projects as an app launcher: a big preview of the selected
// project and a row of tiles under it. A single focus ring slides between
// the tiles; hover, click, or the arrow keys pick a project.
export default function Launcher ({ projects, total, priority = true }) {
	const [index, setIndex] = useState(0)
	const [ring, setRing] = useState(null)
	const tiles = useRef([])
	const baseId = useId()
	const current = projects[index] || projects[0]

	const measure = useCallback(() => {
		const el = tiles.current[index]
		if (!el) return
		setRing({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight })
	}, [index])

	useIsoLayoutEffect(() => {
		measure()
	}, [measure])

	useEffect(() => {
		window.addEventListener('resize', measure)
		return () => window.removeEventListener('resize', measure)
	}, [measure])

	const select = (next, focus = false) => {
		const target = (next + projects.length) % projects.length
		setIndex(target)
		if (focus) tiles.current[target]?.focus()
	}

	const onKeyDown = (event) => {
		const keys = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: projects.length - 1 }
		if (!(event.key in keys)) return
		event.preventDefault()
		select(keys[event.key], true)
	}

	if (!current) return null
	const tabId = (i) => `${baseId}-tab-${i}`
	const panelId = `${baseId}-panel`

	return (
		<section className="launch" aria-label="Featured projects" style={{ '--p': current.color }}>
			<div className="stage" id={panelId} role="tabpanel" aria-labelledby={tabId(index)}>
				<div className="screen">
					{projects.map((project, i) => (
						<div key={project.slug} className={`screen-img${i === index ? ' is-on' : ''}`} data-testid="launch-screen">
							<Image
								src={project.image}
								alt={i === index ? `${project.name} screenshot` : ''}
								fill
								sizes="(max-width: 960px) 100vw, 720px"
								priority={priority && i === 0}
								style={{ objectFit: 'cover', objectPosition: 'top center' }}
							/>
						</div>
					))}
				</div>
				<div className="info" key={current.slug}>
					<span className="info-bar" aria-hidden="true" />
					<h2 className="t-h2">{current.name}</h2>
					<p className="info-tag">{current.tagline}</p>
					<p className="info-desc">{current.description}</p>
					{current.highlights && (
						<ul className="info-hl">
							{current.highlights.map((item) => <li key={item}>{item}</li>)}
						</ul>
					)}
					<div className="info-actions">
						{current.liveUrl && (
							<a className="btn btn-solid" href={current.liveUrl} target="_blank" rel="noopener noreferrer" data-umami-event={`featured-open-${current.slug}`}>
								Open {current.name} <ArrowUpRight aria-hidden="true" />
							</a>
						)}
						{current.post && (
							<Link className="btn btn-ghost" href={`/post/${current.post}`} data-umami-event={`featured-story-${current.slug}`}>How I built it</Link>
						)}
						{current.repoUrl && (
							<a className="btn btn-ghost btn-icon" href={current.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${current.name} source code on GitHub`}>
								<SiGithub aria-hidden="true" />
							</a>
						)}
					</div>
				</div>
			</div>

			<div className="rail-wrap">
				<div className="rail" role="tablist" aria-label="Featured projects" aria-orientation="horizontal" onKeyDown={onKeyDown}>
					{ring && (
						<span
							className="ring"
							aria-hidden="true"
							data-testid="focus-ring"
							style={{ transform: `translate(${ring.x}px, ${ring.y}px)`, width: ring.w, height: ring.h }}
						/>
					)}
					{projects.map((project, i) => (
						<button
							key={project.slug}
							ref={(node) => { tiles.current[i] = node }}
							type="button"
							role="tab"
							id={tabId(i)}
							aria-selected={i === index}
							aria-controls={panelId}
							tabIndex={i === index ? 0 : -1}
							className="tile"
							style={{ '--p': project.color }}
							onClick={() => select(i)}
							onPointerEnter={(event) => { if (event.pointerType === 'mouse') select(i) }}
						>
							<span className="tile-img">
								<Image src={project.image} alt="" fill sizes="(max-width: 960px) 70vw, 280px" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
							</span>
							<span className="tile-name">{project.name}</span>
							<span className="tile-tag">{project.tagline}</span>
						</button>
					))}
				</div>
				{total && (
					<Link href="/routes/projects" className="tile tile-more" data-umami-event="landing-all-projects">
						<span className="tile-more-n">{total}</span>
						<span className="tile-name">All projects <ArrowRight aria-hidden="true" /></span>
					</Link>
				)}
			</div>
		</section>
	)
}
