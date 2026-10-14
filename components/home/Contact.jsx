import React from 'react'
import { Mail } from 'lucide-react'
import { SiDevdotto, SiHashnode, SiMedium, SiSubstack } from 'react-icons/si'

const PLATFORMS = [
	{ name: 'Dev.to', Icon: SiDevdotto, href: 'https://dev.to/basskibo' },
	{ name: 'Medium', Icon: SiMedium, href: 'https://medium.com/@jagetic.bojan' },
	{ name: 'Hashnode', Icon: SiHashnode, href: 'https://hashnode.jageticbojan.com/' }
]

export default function Contact () {
	return (
		<section className="sec" aria-label="Contact">
			<div className="wrap contact">
				<div className="contact-main">
					<h2>Have an idea?</h2>
					<p>I am always up for talking about new projects, odd ideas, or a chance to be part of something good.</p>
					<a className="btn btn-solid" href="mailto:jagetic.bojan@gmail.com" data-umami-event="say-hello-click">
						<Mail aria-hidden="true" /> Say hello
					</a>
				</div>
				<div className="contact-side">
					<h3>Get new posts by email</h3>
					<p>One email when something new is published. No spam.</p>
					<div>
						<a className="btn btn-sm btn-ghost" href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist" target="_blank" rel="noopener noreferrer" data-umami-event="newsletter-subscribe-click">
							<SiSubstack aria-hidden="true" /> Subscribe on Substack
						</a>
					</div>
					<div className="platforms">
						{PLATFORMS.map(({ name, Icon, href }) => (
							<a key={name} className="chip" href={href} target="_blank" rel="noopener noreferrer" data-umami-event={`newsletter-${name.toLowerCase()}-click`}>
								<Icon aria-hidden="true" /> {name}
							</a>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
