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
		<section id="contact" className="sec" aria-labelledby="contact-title">
			<div className="wrap">
				<div className="contact">
					<h2 id="contact-title" className="contact-title">Have an <span className="t-serif">idea?</span></h2>
					<p className="contact-lead">I am always up for talking about new projects, odd ideas, or a chance to be part of something good.</p>
					<div className="contact-actions">
						<a className="btn btn-solid" href="mailto:jagetic.bojan@gmail.com" data-umami-event="say-hello-click">
							<Mail aria-hidden="true" /> jagetic.bojan@gmail.com
						</a>
						<a className="btn btn-ghost" href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist" target="_blank" rel="noopener noreferrer" data-umami-event="newsletter-subscribe-click">
							<SiSubstack aria-hidden="true" /> Get new posts by email
						</a>
					</div>
					<div className="contact-platforms">
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
