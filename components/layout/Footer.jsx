import React from 'react'
import { SiGmail, SiTwitter, SiLinkedin, SiGithub } from 'react-icons/si'
// import ReactTooltip from 'react-tooltip'
// import Accent from '../custom/Accent'
import SpotifyCard from '../custom/SpotifyCard'
import { ThemeSwitcher } from '../ui/theme-switcher'

const waysToReachMe = [
	{ name: 'gmail', description: 'test', externalLink: false, icon: SiGmail, href: 'mailto:jagetic.bojan@gmail.com' },
	{
		name: 'Twitter',
		description: 'test',
		externalLink: true,
		href: 'https://twitter.com/basskibo1',
		icon: SiTwitter
	},
	{
		name: 'Github',
		description: 'test',
		href: 'https://github.com/basskibo',
		externalLink: true,
		icon: SiGithub
	},
	{
		name: 'Linkedin',
		description: 'test',
		externalLink: true,
		href: 'https://linkedin.com/in/bojan-jagetic-972203106',
		icon: SiLinkedin
	}
]
const Footer = () => {
	return (
		<footer className='relative body-font border-t border-border bottom-0 w-full bg-background'>
			<div className='container px-5 py-6 lg:py-8 mx-auto flex flex-col gap-5'>
				{/* Logo + copyright */}
				<div className='flex flex-col items-center gap-2 sm:flex-row sm:items-center'>
					<div className='flex-shrink-0 flex items-center justify-center sm:justify-start'>
						<a data-umami-event={'footer-logo-click'} href='/'>
							<img
								className='block lg:hidden h-6 w-auto'
								src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1666821240/igutech/logo/logo_jibobs.webp'
								alt='Jagetic'
							/>
							<img
								className='hidden lg:block h-8 w-auto'
								src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1666821292/igutech/logo/logo-no-background_dbpm3q.svg'
								alt='Jagetic'
							/>
						</a>
					</div>
					<p className='text-xs sm:text-sm text-muted-foreground sm:ml-4 sm:pl-4 sm:border-l sm:border-border sm:py-2 text-center sm:text-left'>
						© {new Date().getFullYear()} Bojan Jagetic
					</p>
				</div>

				{/* Bottom section: Spotify + links */}
				<div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
					<div className='w-full max-w-sm mx-auto sm:mx-0'>
						<SpotifyCard />
					</div>

					<div className='w-full sm:w-auto flex flex-col items-center sm:items-end gap-3 text-xs sm:text-sm'>
						{/* Text links row */}
						<div className='flex flex-wrap justify-center sm:justify-end gap-3'>
							<a
								data-umami-event={'footer-statistics-click'}
								className='text-muted-foreground hover:text-foreground transition-colors'
								href='https://eu.umami.is/share/zT2j3LFvt31l6Q0g/jageticbojan.com'
								target='_blank'
								rel='noopener noreferrer'>
								Site Statistics
							</a>
							<a
								data-umami-event={'footer-newsletter-click'}
								className='text-muted-foreground hover:text-foreground transition-colors'
								href='https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist'
								target='_blank'
								rel='noopener noreferrer'>
								Newsletter
							</a>
							<a
								data-umami-event={'footer-rss-click'}
								className='text-muted-foreground hover:text-foreground transition-colors'
								href='https://jageticbojan.com/rss.xml'
								target='_blank'
								rel='noopener noreferrer'>
								RSS
							</a>
						</div>

						{/* Icons + theme switcher */}
						<div className='flex items-center justify-center sm:justify-end gap-4'>
							<div className='flex items-center gap-3'>
								{waysToReachMe.map((medium) => (
									<a
										data-umami-event={`footer-${medium.name}-click`}
										className='text-muted-foreground hover:text-foreground transition-colors'
										href={medium.href}
										target='_blank'
										rel='noreferrer'
										key={medium.name}>
										<medium.icon
											className='text-lg lg:text-xl'
											data-tip
											data-for={medium.name}
										/>
									</a>
								))}
							</div>

							<div className='h-6 w-px bg-border hidden sm:block' />

							<div className='flex items-center'>
								<ThemeSwitcher />
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
