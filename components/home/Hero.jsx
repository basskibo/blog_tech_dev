import React from 'react'
import { Download } from 'lucide-react'
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

export const INTRO = 'Full-stack engineer. I build products end to end, from the database to the last pixel. Right now that means an AI money app, an AI chef and a scratch-off travel map.'

export default function Hero () {
	return (
		<section className="intro" aria-label="Introduction">
			<div className="intro-main">
				<h1 className="t-display intro-name">Bojan Jagetić</h1>
				<p className="t-lead intro-lead">{INTRO}</p>
				<div className="intro-links">
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
			<div className="intro-side">
				<HeroSpotify />
			</div>
		</section>
	)
}
