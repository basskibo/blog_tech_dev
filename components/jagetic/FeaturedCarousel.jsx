import React, { useRef, useState } from 'react'
import Link from 'next/link'

const PROJECTS = [
	{
		title: 'Voyage Vault',
		subtitle: '– interactive travel scratch map',
		description: "Create a personalized scratch map of countries you've visited, track your journeys and share them with friends – all in the browser.",
		image: 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1768492935/scratchTravel/pexels-miroalt-176400_fc5g7h.jpg',
		href: 'https://scratch-travel.vercel.app/',
		cta: 'Open Voyage Vault'
	},
	{
		title: 'Game Deal Hub',
		subtitle: '– the best deals on games',
		description: 'A hub for game deals. Find current discounts, compare stores and jump straight to the offer.',
		image: 'https://images.pexels.com/photos/2708981/pexels-photo-2708981.jpeg',
		href: 'https://gamedealhub.vercel.app/',
		cta: 'Open Game Deal Hub'
	},
	{
		title: 'Buddy Bill',
		subtitle: '– a money management buddy',
		description: 'Track expenses and income, then see where the money actually goes.',
		image: 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1769695596/igutech/post_data/Screenshot_from_2026-01-29_14-29-31_kfcgoe.png',
		href: 'https://buddy-bill-eight.vercel.app/',
		cta: 'Open Buddy Bill'
	},
	{
		title: 'Palette Generator',
		subtitle: '– colors from one starting point',
		description: 'Generate a palette from a primary color and take it into a Remix app.',
		image: 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1769695596/igutech/post_data/Screenshot_from_2026-01-29_14-12-39_nablzm.png',
		href: 'https://pallete-generator.vercel.app/',
		cta: 'Open Palette Generator'
	}
]

function ProjectSlide ({ project }) {
	const [tilt, setTilt] = useState(null)

	const move = (event) => {
		const rect = event.currentTarget.getBoundingClientRect()
		setTilt({
			x: (event.clientX - rect.left) / rect.width - 0.5,
			y: (event.clientY - rect.top) / rect.height - 0.5
		})
	}

	return (
		<article
			onPointerMove={move}
			onPointerLeave={() => setTilt(null)}
			style={{
				flex: '0 0 100%',
				scrollSnapAlign: 'start',
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
				borderRadius: 40,
				overflow: 'hidden',
				border: '1px solid var(--line)',
				background: 'var(--bg2)',
				position: 'relative',
				transform: tilt ? `perspective(1200px) rotateX(${-tilt.y * 8}deg) rotateY(${tilt.x * 8}deg)` : 'none',
				transition: 'transform .35s cubic-bezier(.2,.8,.2,1)'
			}}
		>
			<div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, background: tilt ? `radial-gradient(420px circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, rgba(255,255,255,.16), transparent 60%)` : 'transparent' }} />
			<div style={{ position: 'relative', minHeight: 420, overflow: 'hidden' }}>
				<img src={project.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
				<div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 50%, var(--bg2))' }} />
				<span className="bj-mono" style={{ position: 'absolute', top: 22, left: 22, fontSize: 11, fontWeight: 600, letterSpacing: '.1em', padding: '8px 12px', borderRadius: 99, background: 'var(--glass)', backdropFilter: 'blur(14px)' }}>FEATURED PROJECT</span>
			</div>
			<div style={{ padding: 'clamp(28px, 4vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
				<div style={{ font: "800 clamp(38px, 4.4vw, 60px)/.95 'Bricolage Grotesque', sans-serif", letterSpacing: '-.05em' }}>{project.title}</div>
				<div className="bj-serif" style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', lineHeight: 1.1, marginTop: 6 }}>{project.subtitle}</div>
				<p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--mut)', margin: '20px 0 30px', maxWidth: 460 }}>{project.description}</p>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
					<a href={project.href} target="_blank" rel="noreferrer" style={{ height: 52, padding: '0 24px', borderRadius: 99, background: 'var(--inv)', color: 'var(--invInk)', display: 'flex', alignItems: 'center', fontWeight: 700 }}>{project.cta} ↗</a>
					<Link href="/routes/projects" style={{ height: 52, padding: '0 24px', borderRadius: 99, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', fontWeight: 600 }}>View projects</Link>
				</div>
			</div>
		</article>
	)
}

export default function FeaturedCarousel () {
	const scroller = useRef(null)
	const [index, setIndex] = useState(0)

	const go = (next) => {
		const el = scroller.current
		if (!el) return
		const slide = el.firstElementChild
		const width = slide ? slide.getBoundingClientRect().width : el.clientWidth
		const target = Math.max(0, Math.min(PROJECTS.length - 1, next))
		el.scrollTo({ left: target * width, behavior: 'smooth' })
		setIndex(target)
	}

	return (
		<section aria-label="Featured projects" style={{ maxWidth: 1180, margin: '0 auto', padding: '110px 32px 0' }}>
			<div style={{ position: 'relative' }}>
				<div
					ref={scroller}
					onScroll={(event) => {
						const width = event.currentTarget.clientWidth || 1
						setIndex(Math.round(event.currentTarget.scrollLeft / width))
					}}
					style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', borderRadius: 40 }}
				>
					{PROJECTS.map((project) => (
						<ProjectSlide key={project.title} project={project} />
					))}
				</div>
				<button type="button" aria-label="Previous project" onClick={() => go(index - 1)} style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--glass)', color: 'var(--ink)', backdropFilter: 'blur(12px)' }}>←</button>
				<button type="button" aria-label="Next project" onClick={() => go(index + 1)} style={{ position: 'absolute', right: -8, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--line)', background: 'var(--glass)', color: 'var(--ink)', backdropFilter: 'blur(12px)' }}>→</button>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
				{PROJECTS.map((project, dot) => (
					<button key={project.title} type="button" aria-label={project.title} onClick={() => go(dot)} style={{ width: dot === index ? 22 : 8, height: 8, borderRadius: 99, border: 'none', background: dot === index ? 'var(--acc)' : 'var(--line)', transition: 'width .3s' }} />
				))}
			</div>
		</section>
	)
}
