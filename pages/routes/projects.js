import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import { ArrowUpRight } from 'lucide-react'
import projects, { KINDS, countByKind, filterProjects, getFeaturedProjects } from '../../lib/projects'
import ProjectIndex from '../../components/projects/ProjectIndex'
import ProjectVisual from '../../components/projects/ProjectVisual'

const featured = getFeaturedProjects()
const counts = countByKind(projects)
const rankOf = (project) => projects.indexOf(project) + 1

export default function Projects () {
	const [kind, setKind] = useState('All')
	const list = useMemo(() => filterProjects(projects, kind), [kind])

	return (
		<>
			<Head>
				<title>Projects — Bojan Jagetić</title>
				<meta name="description" content={`${projects.length} things Bojan Jagetić has built: AI products, web apps, tools, libraries and games.`} />
			</Head>
			<div className="wrap">
				<header className="pj-hero bj-in">
					<h1 className="pj-title">Projects</h1>
					<p className="pj-lead">{projects.length} things I have built, most interesting first. The top three are where my evenings go right now.</p>
				</header>

				<section className="trio" aria-label="Featured projects">
					{featured.map((project, i) => (
						<article key={project.slug} className="trio-card" style={{ '--p': project.color }}>
							<div className="trio-shot">
								<ProjectVisual project={project} priority={i === 0} sizes={i === 0 ? '(max-width: 1023px) 100vw, 700px' : '(max-width: 1023px) 100vw, 520px'} />
							</div>
							<div className="trio-body">
								<div>
									<h2 className="trio-name">
										<a className="stretched" href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-umami-event={`projects-featured-${project.slug}`}>{project.name}</a>
									</h2>
									<p className="trio-tag">{project.tagline}</p>
								</div>
								<span className="trio-go" aria-hidden="true"><ArrowUpRight /></span>
								{i === 0 && <p className="trio-desc">{project.description}</p>}
								{i === 0 && project.highlights && (
									<ul className="fw-hl trio-desc">
										{project.highlights.map((item) => <li key={item}>{item}</li>)}
									</ul>
								)}
							</div>
						</article>
					))}
				</section>

				<div className="filters" role="group" aria-label="Filter projects by kind">
					{['All', ...KINDS].filter((k) => counts[k] > 0).map((k) => (
						<button key={k} type="button" className={`bj-pill${kind === k ? ' is-on' : ''}`} aria-pressed={kind === k} onClick={() => setKind(k)}>
							{k} <span>{counts[k]}</span>
						</button>
					))}
				</div>

				<ProjectIndex key={kind} projects={list} rankOf={rankOf} />
			</div>
		</>
	)
}
