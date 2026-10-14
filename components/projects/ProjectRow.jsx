import React, { useId } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import ProjectVisual from './ProjectVisual'

export const STATUS_LABEL = {
	live: 'Live',
	'in development': 'In development',
	archived: 'Archived'
}

export function StatusBadge ({ status }) {
	return <span className={`status status-${status.replace(/\s+/g, '-')}`}>{STATUS_LABEL[status] || status}</span>
}

export default function ProjectRow ({ project, rank, open, onToggle, onPeek }) {
	const bodyId = useId()
	return (
		<li
			className={`row${open ? ' is-open' : ''}`}
			style={{ '--p': project.color }}
			onPointerEnter={onPeek ? () => onPeek(project) : undefined}
			onPointerLeave={onPeek ? () => onPeek(null) : undefined}
		>
			<button type="button" className="row-head" aria-expanded={open} aria-controls={bodyId} onClick={() => onToggle(project.slug)}>
				<span className="row-rank">{String(rank).padStart(2, '0')}</span>
				<span className="row-title">
					<span className="row-name">{project.name}</span>
					<span className="row-tagline">{project.tagline}</span>
				</span>
				<span className="row-kind">{project.kind}</span>
				<span className="row-stack">{project.tech.slice(0, 3).join(', ')}</span>
				<span className="row-year">{project.year}</span>
				<span className="row-plus" aria-hidden="true"><Plus /></span>
			</button>
			<div className="row-body" id={bodyId} role="region" aria-label={`${project.name} details`} {...(open ? {} : { inert: '', 'aria-hidden': true })}>
				<div>
					<div className="row-inner">
						<div>
							<StatusBadge status={project.status} />
							<p className="row-desc" style={{ marginTop: 12 }}>{project.description}</p>
							<div className="stack">
								{project.tech.map((t) => <span key={t}>{t}</span>)}
							</div>
							{(project.liveUrl || project.repoUrl)
								? (
									<div className="row-links">
										{project.liveUrl && (
											<a className="btn btn-sm btn-project" href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-umami-event={`project-open-${project.slug}`}>
												{project.liveLabel || 'Open app'} <ArrowUpRight aria-hidden="true" />
											</a>
										)}
										{project.repoUrl && (
											<a className="btn btn-sm btn-ghost" href={project.repoUrl} target="_blank" rel="noopener noreferrer" data-umami-event={`project-code-${project.slug}`}>
												<SiGithub aria-hidden="true" /> Code
											</a>
										)}
									</div>
								)
								: <p className="row-private">Private for now. Ask me for a demo.</p>}
						</div>
						<div className="row-visual">
							{open && <ProjectVisual project={project} sizes="(max-width: 1023px) 100vw, 420px" />}
						</div>
					</div>
				</div>
			</div>
		</li>
	)
}
