import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import ProjectVisual from './ProjectVisual'
import { primaryLink } from '../../lib/projects'

export const STATUS_LABEL = {
	live: 'Live',
	'in development': 'In development',
	archived: 'Archived'
}

export function StatusBadge ({ status }) {
	return <span className={`status status-${status.replace(/\s+/g, '-')}`}>{STATUS_LABEL[status] || status}</span>
}

const MAX_TECH = 3

// The whole card opens the project's main link (live app, else the code);
// the code link sits above it so both stay clickable.
export default function ProjectCard ({ project, rank }) {
	const main = primaryLink(project)
	const extra = project.tech.length - MAX_TECH
	return (
		<article className="pcard" style={{ '--p': project.color }} aria-labelledby={`pc-${project.slug}`}>
			<div className="pcard-visual">
				<ProjectVisual project={project} />
				{rank && <span className="pcard-rank">#{String(rank).padStart(2, '0')}</span>}
			</div>
			<div className="pcard-body">
				<div className="pcard-meta">
					<StatusBadge status={project.status} />
					<span>{project.kind}</span>
					<span>{project.year}</span>
				</div>
				<h3 id={`pc-${project.slug}`} className="pcard-name">
					{main
						? <a className="stretched" href={main.href} target="_blank" rel="noopener noreferrer" data-umami-event={`project-open-${project.slug}`}>{project.name}</a>
						: project.name}
				</h3>
				<p className="pcard-tag">{project.tagline}</p>
				<p className="pcard-desc">{project.description}</p>
				<ul className="pcard-tech" aria-label="Built with">
					{project.tech.slice(0, MAX_TECH).map((t) => <li key={t}>{t}</li>)}
					{extra > 0 && <li>+{extra}</li>}
				</ul>
				<div className="pcard-foot">
					{main
						? <span className="pcard-go">{main.label} <ArrowUpRight aria-hidden="true" /></span>
						: <span className="t-small t-mut">Private for now. Ask me for a demo.</span>}
					{project.liveUrl && project.repoUrl && (
						<a className="pcard-code" href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} source code on GitHub`} data-umami-event={`project-code-${project.slug}`}>
							<SiGithub aria-hidden="true" />
						</a>
					)}
				</div>
			</div>
		</article>
	)
}
