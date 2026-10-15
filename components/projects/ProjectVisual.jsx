import React from 'react'
import Image from 'next/image'

// Screenshot when we have one, otherwise a quiet cover: the project's
// initials in outline with a single glow in its colour.
export default function ProjectVisual ({ project, sizes = '(max-width: 1080px) 100vw, 400px', priority = false }) {
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
			<span className="cover-mark" aria-hidden="true">{project.name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('')}</span>
		</div>
	)
}
