import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProjectRow from './ProjectRow'
import ProjectVisual from './ProjectVisual'

// Ranked list of projects. On fine pointers a preview follows the cursor;
// position is written straight to the element so moving never re-renders.
export default function ProjectIndex ({ projects, rankOf, peek = true }) {
	const [open, setOpen] = useState(null)
	const [hovered, setHovered] = useState(null)
	const peekRef = useRef(null)
	const frame = useRef(0)

	const toggle = useCallback((slug) => setOpen((current) => (current === slug ? null : slug)), [])

	useEffect(() => {
		if (!peek || !hovered) return undefined
		const onMove = (event) => {
			if (frame.current) return
			const { clientX, clientY } = event
			frame.current = requestAnimationFrame(() => {
				frame.current = 0
				const el = peekRef.current
				if (el) el.style.transform = `translate(${clientX + 28}px, ${clientY - 100}px) rotate(-2deg)`
			})
		}
		window.addEventListener('pointermove', onMove, { passive: true })
		return () => {
			window.removeEventListener('pointermove', onMove)
			cancelAnimationFrame(frame.current)
			frame.current = 0
		}
	}, [peek, hovered])

	const showPeek = peek && hovered && hovered.slug !== open

	return (
		<>
			<ul className="rows" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
				{projects.map((project, i) => (
					<ProjectRow
						key={project.slug}
						project={project}
						rank={rankOf ? rankOf(project) : i + 1}
						open={open === project.slug}
						onToggle={toggle}
						onPeek={peek ? setHovered : undefined}
					/>
				))}
			</ul>
			{peek && (
				<div ref={peekRef} className={`peek${showPeek ? ' is-on' : ''}`} aria-hidden="true">
					{hovered && <ProjectVisual project={hovered} sizes="320px" />}
				</div>
			)}
		</>
	)
}
