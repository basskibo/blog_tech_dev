import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import projects, { KINDS, countByKind, filterProjects, getFeaturedProjects, getSpotlightProjects } from '../../lib/projects'
import ProjectIndex from '../../components/projects/ProjectIndex'
import Bento from '../../components/home/Bento'

const featured = getFeaturedProjects()
const tools = getSpotlightProjects()
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
				<header className="page-head bj-in">
					<h1 className="t-display">Things I <span className="t-serif t-grad">ship</span></h1>
					<p className="t-lead">{projects.length} things I have built, most interesting first. The top three are where my evenings go right now.</p>
				</header>

			</div>
			<Bento featured={featured} tools={tools} heading={false} />
			<div className="wrap">

				<section aria-labelledby="all-title">
					<div className="page-tools" style={{ marginTop: 96 }}>
						<h2 id="all-title" className="t-h2">Everything</h2>
						<div className="tabs" role="group" aria-label="Filter projects by kind">
							{['All', ...KINDS].filter((k) => counts[k] > 0).map((k) => (
								<button key={k} type="button" className="tab" aria-pressed={kind === k} onClick={() => setKind(k)}>
									{k} <span className="count">{counts[k]}</span>
								</button>
							))}
						</div>
					</div>
					<ProjectIndex key={kind} projects={list} rankOf={rankOf} />
				</section>
			</div>
		</>
	)
}
