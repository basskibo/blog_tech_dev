import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import { Search, X } from 'lucide-react'
import projects, { KINDS, countByKind, filterProjects, getFeaturedProjects, getSpotlightProjects, matchesQuery } from '../../lib/projects'
import ProjectCard from '../../components/projects/ProjectCard'
import Bento from '../../components/home/Bento'

const featured = getFeaturedProjects()
const tools = getSpotlightProjects()
const counts = countByKind(projects)
const live = projects.filter((p) => p.status === 'live').length
const rankOf = (project) => projects.indexOf(project) + 1

export default function Projects () {
	const [kind, setKind] = useState('All')
	const [query, setQuery] = useState('')
	const list = useMemo(() => filterProjects(projects, kind).filter((p) => matchesQuery(p, query)), [kind, query])
	const reset = () => { setKind('All'); setQuery('') }

	return (
		<>
			<Head>
				<title>Projects — Bojan Jagetić</title>
				<meta name="description" content={`${projects.length} things Bojan Jagetić has built: AI products, web apps, tools, libraries and games.`} />
			</Head>
			<div className="wrap">
				<header className="blog-head bj-in">
					<div>
						<h1 className="t-display">Things I <span className="t-serif t-grad">ship</span></h1>
						<p className="t-lead">{projects.length} things I have built, most interesting first. The top three are where my evenings go right now.</p>
					</div>
					<dl className="blog-stats">
						<div><dt>Projects</dt><dd>{projects.length}</dd></div>
						<div><dt>Live</dt><dd>{live}</dd></div>
					</dl>
				</header>
			</div>

			<Bento featured={featured} tools={tools} heading={false} />

			<div className="wrap">
				<section className="sec" aria-labelledby="all-title">
					<h2 id="all-title" className="t-h2">Every<span className="t-serif" style={{ color: 'var(--accT)' }}>thing</span></h2>
					<div className="blog-bar">
						<div className="tabs blog-tabs" role="group" aria-label="Filter projects by kind">
							{['All', ...KINDS].filter((k) => counts[k] > 0).map((k) => (
								<button key={k} type="button" className="tab" aria-pressed={kind === k} onClick={() => setKind(k)}>
									{k} <span className="count">{counts[k]}</span>
								</button>
							))}
						</div>
						<label className="field blog-search">
							<Search aria-hidden="true" />
							<span className="sr-only">Search projects</span>
							<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or tech" />
							{query && <button type="button" className="blog-clear" aria-label="Clear search" onClick={() => setQuery('')}><X aria-hidden="true" /></button>}
						</label>
					</div>
					{list.length > 0
						? (
							<div className="pgrid">
								{list.map((project) => <ProjectCard key={project.slug} project={project} rank={rankOf(project)} />)}
							</div>
						)
						: (
							<div className="empty">
								<p>No projects match &ldquo;{query}&rdquo;{kind !== 'All' ? ` in ${kind}` : ''}.</p>
								<button type="button" className="btn btn-ghost" onClick={reset}>Show all projects</button>
							</div>
						)}
				</section>
			</div>
		</>
	)
}
