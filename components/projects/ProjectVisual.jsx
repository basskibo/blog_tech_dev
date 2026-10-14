import React from 'react'
import Image from 'next/image'

// Screenshot when we have one, otherwise a cover drawn from the project's colour.
export default function ProjectVisual ({ project, sizes = '(max-width: 1023px) 100vw, 50vw', priority = false }) {
	if (project.image) {
		return (
			<Image
				src={project.image}
				alt={`${project.name} screenshot`}
				fill
				sizes={sizes}
				priority={priority}
				style={{ objectFit: 'cover', objectPosition: 'top center' }}
			/>
		)
	}
	return (
		<div className="cover" style={{ '--p': project.color }} data-testid="project-cover">
			<span className="cover-kind">{project.kind}</span>
			<span className="cover-name">{project.name}</span>
			<span className="cover-mark" aria-hidden="true">{project.name.slice(0, 2)}</span>
		</div>
	)
}
