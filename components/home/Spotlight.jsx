import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

function Terminal ({ lines }) {
	return (
		<div className="term" aria-hidden="true">
			<div className="term-bar"><i /><i /><i /></div>
			{lines.map((line, i) => (
				<span key={line} className={`term-line${line.startsWith('✓') || line.startsWith('→') ? ' is-ok' : ''}`} style={{ '--i': i }}>{line}</span>
			))}
		</div>
	)
}

// Two tools without a public URL: a terminal stands in for the screenshot and
// types itself out once the section scrolls into view.
export default function Spotlight ({ projects }) {
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
		}, { threshold: 0.25 })
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	if (!projects.length) return null

	return (
		<section className="sec" aria-labelledby="spot-title">
			<div className="wrap">
				<div className="sec-head">
					<h2 id="spot-title" className="t-h2">Workshop</h2>
					<p className="t-mut">Tools I built for myself first. No landing page, just a terminal.</p>
				</div>
				<div ref={ref} className={`spot-grid${seen ? ' is-seen' : ''}`}>
					{projects.map((project) => (
						<article key={project.slug} className="spot" style={{ '--p': project.color }} aria-labelledby={`spot-${project.slug}`}>
							<Terminal lines={project.terminal} />
							<h3 id={`spot-${project.slug}`} className="t-h3 spot-name">{project.name}</h3>
							<p className="spot-tag">{project.tagline}</p>
							<p className="spot-desc">{project.description}</p>
							<div className="stack">
								{project.tech.map((t) => <span key={t}>{t}</span>)}
							</div>
							<div className="spot-foot">
								<span className="spot-note">Private repo. Ask me for a demo.</span>
								{project.post && <Link className="btn btn-sm btn-ghost" href={`/post/${project.post}`}>Read the write-up</Link>}
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
