import React, { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import HeroSpotify from '../jagetic/HeroSpotify'

function XIcon (props) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	)
}

const SOCIAL = [
	{ id: 'github', href: 'https://github.com/basskibo', label: 'GitHub', Icon: SiGithub },
	{ id: 'linkedin', href: 'https://linkedin.com/in/bojan-jagetic', label: 'LinkedIn', Icon: SiLinkedin },
	{ id: 'twitter', href: 'https://twitter.com/basskibo1', label: 'X', Icon: XIcon }
]

export default function Hero ({ featured }) {
	const ref = useRef(null)
	const frame = useRef(0)

	// Writes the pointer position into CSS variables once per frame; React never re-renders.
	const onPointerMove = (event) => {
		const el = ref.current
		if (!el || frame.current) return
		const { clientX, clientY } = event
		frame.current = requestAnimationFrame(() => {
			frame.current = 0
			const rect = el.getBoundingClientRect()
			el.style.setProperty('--mx', `${((clientX - rect.left) / rect.width) * 100}%`)
			el.style.setProperty('--my', `${((clientY - rect.top) / rect.height) * 100}%`)
		})
	}

	return (
		<section ref={ref} className="hero" aria-label="Introduction" onPointerMove={onPointerMove}>
			<div className="hero-light" />
			<div className="hero-grid" />
			<div className="hero-spot" />
			<div className="wrap" style={{ width: '100%' }}>
				<h1 className="hero-name">
					<span className="first">Bojan</span>{' '}
					<span className="last">Jagetić</span>
				</h1>
				<div className="hero-body">
					<div className="hero-fade" style={{ '--d': '.1s' }}>
						<p className="hero-lead">
							Full-stack engineer from Serbia. By day, smart-TV apps and Node platforms. By night, <strong>AI products, tools and the odd browser game</strong>.
						</p>
						<div className="hero-actions">
							<a href="#work" className="btn btn-solid" data-umami-event="landing-see-work">See the work <ArrowRight aria-hidden="true" /></a>
							<Link href="/routes/blog" className="btn btn-ghost" data-umami-event="landing-read-blog">Read the blog</Link>
						</div>
						<div className="hero-social">
							{SOCIAL.map(({ id, href, label, Icon }) => (
								<a key={id} className="chip" href={href} target="_blank" rel="noopener noreferrer" data-umami-event={`landing-lnk-${id}-button`}>
									<Icon aria-hidden="true" /> {label}
								</a>
							))}
							<a className="chip" href="/Bojan_Jagetić.pdf" download data-umami-event="landing-download-cv-button">
								<Download aria-hidden="true" /> CV
							</a>
						</div>
					</div>
					<div className="hero-fade" style={{ '--d': '.2s', justifySelf: 'end', width: '100%', maxWidth: 440 }}>
						<HeroSpotify />
					</div>
				</div>
				{featured?.length > 0 && (
					<nav className="shipping hero-fade" style={{ '--d': '.3s' }} aria-label="Featured projects">
						<span className="shipping-title">Now shipping</span>
						{featured.map((project) => (
							<a key={project.slug} href={`#work-${project.slug}`} style={{ '--p': project.color }}>
								<span className="dot" aria-hidden="true" />
								<span>{project.name}</span>
								<span>{project.tagline.toLowerCase()}</span>
							</a>
						))}
					</nav>
				)}
			</div>
		</section>
	)
}
