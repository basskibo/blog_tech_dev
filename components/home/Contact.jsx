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
		<section className="sec" aria-labelledby="contact-title">
			<div className="wrap">
				<div className="contact">
					<div>
						<h2 id="contact-title" className="t-h2">Have an idea?</h2>
						<p className="t-lead" style={{ marginTop: 14 }}>I am always up for talking about new projects, odd ideas, or a chance to be part of something good.</p>
						<div className="contact-actions">
							<a className="btn btn-solid" href="mailto:jagetic.bojan@gmail.com" data-umami-event="say-hello-click">
								<Mail aria-hidden="true" /> Say hello
							</a>
							<a className="btn btn-ghost" href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist" target="_blank" rel="noopener noreferrer" data-umami-event="newsletter-subscribe-click">
								<SiSubstack aria-hidden="true" /> Subscribe on Substack
							</a>
						</div>
					</div>
					<div className="contact-side">
						<p className="t-mut">New posts also go to</p>
						<div className="contact-platforms">
							{PLATFORMS.map(({ name, Icon, href }) => (
								<a key={name} className="chip" href={href} target="_blank" rel="noopener noreferrer" data-umami-event={`newsletter-${name.toLowerCase()}-click`}>
									<Icon aria-hidden="true" /> {name}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
