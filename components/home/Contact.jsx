import React from 'react'
import { Mail } from 'lucide-react'
import { SiDevdotto } from 'react-icons/si'

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
						<a className="btn btn-ghost" href="https://dev.to/basskibo" target="_blank" rel="noopener noreferrer" data-umami-event="newsletter-dev.to-click">
							<SiDevdotto aria-hidden="true" /> Dev.to
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
