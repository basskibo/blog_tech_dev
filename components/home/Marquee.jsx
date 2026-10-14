import React from 'react'

const STACK = ['Next.js', 'React 19', 'TypeScript', 'Node.js', 'Postgres', 'Drizzle', 'Gemini', 'Claude', 'MCP', 'ffmpeg', 'Leaflet', 'Three.js', 'Docker', 'Vercel']

export default function Marquee () {
	return (
		<div className="marquee" aria-label="Tools I work with">
			<ul className="marquee-track">
				{[...STACK, ...STACK].map((item, i) => (
					<li key={`${item}-${i}`} aria-hidden={i >= STACK.length ? 'true' : undefined}>{item}</li>
				))}
			</ul>
		</div>
	)
}
