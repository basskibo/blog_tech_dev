import React from 'react'
import Accent from './custom/Accent'
import { MdWavingHand } from 'react-icons/md'
import { SiHashnode, SiDevdotto, SiMedium } from 'react-icons/si'
import { IoNewspaperOutline, IoMailOutline } from 'react-icons/io5'
import { cn } from '@/lib/utils'

const NewsLetter = () => {
	const blogPlatforms = [
		{
			name: 'Dev.to',
			icon: SiDevdotto,
			href: 'https://dev.to/basskibo',
			event: 'newsletter-devto-click',
			color: 'hover:bg-gray-700 hover:border-gray-600'
		},
		{
			name: 'Hashnode',
			icon: SiHashnode,
			href: 'https://hashnode.jageticbojan.com/',
			event: 'newsletter-hashnode-click',
			color: 'hover:bg-blue-900/30 hover:border-blue-700'
		},
		{
			name: 'Medium',
			icon: SiMedium,
			href: 'https://medium.com/@jagetic.bojan',
			event: 'newsletter-medium-click',
			color: 'hover:bg-gray-700 hover:border-gray-600'
		}
	]

	return (
		<section 
			className='relative bg-card border-t border-border'
			aria-label="Contact and newsletter"
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
					{/* Left Column - Contact & Blogging */}
					<div className='space-y-12'>
						{/* Get in Touch */}
						<article className='space-y-4'>
							<h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
								Get in touch
							</h2>
							<p className='text-muted-foreground leading-relaxed'>
								<Accent className='font-semibold'>Have an idea?</Accent> I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something great.
							</p>
							<a 
								data-umami-event='say-hello-click'
								href="mailto:jagetic.bojan@gmail.com"
								className={cn(
									"group inline-flex items-center gap-2",
									"px-6 py-3 rounded-lg font-semibold",
									"bg-primary text-primary-foreground",
									"hover:bg-primary/90 shadow-lg shadow-primary/20",
									"hover:shadow-xl hover:shadow-primary/30",
									"transition-all duration-300 hover:-translate-y-0.5"
								)}
							>
								<IoMailOutline className='w-5 h-5' aria-hidden="true" />
								<span>Say hello</span>
								<MdWavingHand className='w-5 h-5 text-amber-300 group-hover:animate-wave' aria-hidden="true" />
							</a>
						</article>

						{/* Blogging Platforms */}
						<article className='space-y-4'>
							<h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
								Find me writing on
							</h2>
							<p className='text-muted-foreground leading-relaxed'>
								I share articles on <Accent className='font-semibold'>Dev.to</Accent>, <Accent className='font-semibold'>Medium</Accent>, and <Accent className='font-semibold'>Hashnode</Accent> – covering web development, best practices, and tech insights.
							</p>
							<nav 
								className='flex flex-wrap gap-3'
								aria-label="Blog platforms"
							>
								{blogPlatforms.map((platform) => (
									<a
										key={platform.name}
										data-umami-event={platform.event}
										href={platform.href}
										target='_blank'
										rel='noopener noreferrer'
										className={cn(
											"inline-flex items-center gap-2 px-4 py-2.5 rounded-lg",
											"bg-muted/50 border border-border text-foreground",
											"font-medium text-sm transition-all duration-200",
											platform.color
										)}
									>
										<platform.icon className='w-5 h-5' aria-hidden="true" />
										<span>{platform.name}</span>
									</a>
								))}
							</nav>
						</article>
					</div>

					{/* Right Column - Newsletter */}
					<div className='lg:pl-8 lg:border-l lg:border-border'>
						<article className='space-y-6'>
							<div className='space-y-4'>
								<h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
									Subscribe to the <Accent>newsletter</Accent>
								</h2>
								<p className='text-muted-foreground leading-relaxed'>
									Get notified when I publish new articles. No spam, just quality content about web development, software architecture, and tech insights delivered to your inbox.
								</p>
							</div>

							{/* Newsletter CTA */}
							<div className='p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20'>
								<div className='flex items-start gap-4'>
									<div className='p-3 rounded-lg bg-primary/10'>
										<IoNewspaperOutline className='w-6 h-6 text-primary' aria-hidden="true" />
									</div>
									<div className='flex-1 space-y-3'>
										<h3 className='font-semibold text-foreground'>
											Join on Substack
										</h3>
										<p className='text-sm text-muted-foreground'>
											Weekly/monthly updates with tutorials, tips, and behind-the-scenes content.
										</p>
										<a
											data-umami-event='newsletter-subscribe-click'
											href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist"
											target='_blank'
											rel='noopener noreferrer'
											className={cn(
												"inline-flex items-center gap-2",
												"px-5 py-2.5 rounded-lg font-semibold text-sm",
												"bg-primary text-primary-foreground",
												"hover:bg-primary/90 shadow-md",
												"transition-all duration-200 hover:-translate-y-0.5"
											)}
										>
											<span>Subscribe for free</span>
										</a>
									</div>
								</div>
							</div>

							{/* Trust indicators */}
							<p className='text-xs text-muted-foreground flex items-center gap-2'>
								<span className='inline-block w-2 h-2 rounded-full bg-green-500' aria-hidden="true" />
								No spam, unsubscribe anytime
							</p>
						</article>
					</div>
				</div>
			</div>
		</section>
	)
}

export default NewsLetter
