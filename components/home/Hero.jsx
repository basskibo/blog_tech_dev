import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import HeroSpotify from '../jagetic/HeroSpotify'

export const INTRO = 'Full-stack engineer. I build products end to end, from the database to the last pixel.'

const LINKS = [
	{ id: 'github', href: 'https://github.com/basskibo', label: 'GitHub' },
	{ id: 'linkedin', href: 'https://linkedin.com/in/bojan-jagetic', label: 'LinkedIn' },
	{ id: 'twitter', href: 'https://twitter.com/basskibo1', label: 'X' }
]

// Three featured projects float as 3D screens. On fine pointers the stack
// tilts towards the cursor; the angle is written to CSS variables once per
// frame, so moving the mouse never re-renders React.
export default function Hero ({ featured = [] }) {
	const stage = useRef(null)
	const frame = useRef(0)
	const [front, right, left] = featured

	const onPointerMove = (event) => {
		if (event.pointerType !== 'mouse' || frame.current) return
		const { clientX, clientY, currentTarget } = event
		frame.current = requestAnimationFrame(() => {
			frame.current = 0
			const rect = currentTarget.getBoundingClientRect()
			const x = (clientX - rect.left) / rect.width - 0.5
			const y = (clientY - rect.top) / rect.height - 0.5
			stage.current?.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`)
			stage.current?.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
		})
	}

	const onPointerLeave = () => {
		stage.current?.style.setProperty('--ry', '0deg')
		stage.current?.style.setProperty('--rx', '0deg')
	}

	return (
		<section className="hero" aria-label="Introduction" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
			<div className="hero-copy">
				{front && (
					<a className="hero-news" href={front.liveUrl} target="_blank" rel="noopener noreferrer" style={{ '--c': front.color }}>
						<span>New</span> {front.name} now has an Android app
					</a>
				)}
				<h1 className="hero-name">
					<span className="hero-first">Bojan</span>{' '}
					<span className="hero-last t-serif t-grad">Jagetić</span>
				</h1>
				<p className="hero-lead">
					{INTRO} Right now that means an <b>AI money app</b>, an <b>AI chef</b> and a <b>scratch-off travel map</b>.
				</p>
				<div className="hero-actions">
					<a href="#work" className="btn btn-solid" data-umami-event="landing-see-work">See my work <ArrowRight aria-hidden="true" /></a>
					<Link href="/routes/blog" className="btn btn-ghost" data-umami-event="landing-read-blog">Read the blog</Link>
				</div>
				<div className="hero-links">
					{LINKS.map(({ id, href, label }) => (
						<a key={id} href={href} target="_blank" rel="noopener noreferrer" data-umami-event={`landing-lnk-${id}-button`}>{label}</a>
					))}
					<a href="/Bojan_Jagetić.pdf" download data-umami-event="landing-download-cv-button">Download CV</a>
				</div>
			</div>

			<div className="hero-stage">
				<div className="hero-3d" ref={stage} aria-hidden="true">
					{left && (
						<div className="screen3d s-left" style={{ '--c': left.color }}>
							<div className="screen3d-bar"><i /><i /><i /></div>
							<div className="screen3d-img"><Image src={left.image} alt="" fill sizes="470px" style={{ objectFit: 'cover', objectPosition: 'top' }} /></div>
						</div>
					)}
					{right && (
						<div className="screen3d s-right" style={{ '--c': right.color }}>
							<div className="screen3d-bar"><i /><i /><i /></div>
							<div className="screen3d-img"><Image src={right.image} alt="" fill sizes="470px" style={{ objectFit: 'cover', objectPosition: 'top' }} /></div>
						</div>
					)}
					{front && (
						<div className="screen3d s-front" style={{ '--c': front.color }}>
							<div className="screen3d-bar"><i /><i /><i /><span>{front.liveUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span></div>
							<div className="screen3d-img"><Image src={front.image} alt="" fill priority sizes="(max-width: 960px) 80vw, 540px" style={{ objectFit: 'cover', objectPosition: 'top' }} /></div>
						</div>
					)}
					{front && (
						<span className="float-chip f1" style={{ '--c': front.color }}>
							<i>{front.name.slice(0, 1)}</i><span><b>{front.name}</b><small>{front.label}, live</small></span>
						</span>
					)}
					{right && (
						<span className="float-chip f2" style={{ '--c': right.color }}>
							<i>{right.name.split(' ').map((w) => w[0]).join('')}</i><span><b>{right.name}</b><small>{right.label}, live</small></span>
						</span>
					)}
				</div>
				<div className="hero-radio"><HeroSpotify /></div>
			</div>
		</section>
	)
}
