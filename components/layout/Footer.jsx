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
			<div className='container px-5 py-4 lg:py-8 mx-auto flex items-center sm:flex-row flex-col'>
				<div className='flex-shrink-0 flex items-center'>
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
				<p className='text-sm text-muted-foreground sm:ml-4 sm:pl-4 sm:border-border sm:py-2 sm:mt-0 mt-4'>
					© {new Date().getFullYear()} Bojan Jagetic
				</p>
				<SpotifyCard />

				<span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start items-center gap-4'>
					<a data-umami-event={'footer-statistics-click'}
						className='text-muted-foreground hover:text-foreground transition-colors text-xs lg:text-sm'
						href='https://eu.umami.is/share/zT2j3LFvt31l6Q0g/jageticbojan.com'
						target='_blank'
						rel='noopener noreferrer'>
						Site Statistics
					</a>
					<a data-umami-event={'footer-newsletter-click'}
						className='text-muted-foreground hover:text-foreground transition-colors text-xs lg:text-sm'
						href='https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist'
						target='_blank'
						rel='noopener noreferrer'>
						Newsletter
					</a>

					<a
						data-umami-event={'footer-rss-click'}
						className='text-muted-foreground hover:text-foreground transition-colors text-xs lg:text-sm'
						href='https://jageticbojan.com/rss.xml'
						target='_blank'
						rel='noopener noreferrer'>
						RSS
					</a>

					{waysToReachMe.map((medium, index) => (
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
					
					{/* Theme Switcher */}
					<div className="ml-4 flex items-center border-l border-border pl-4">
						<ThemeSwitcher />
					</div>
				</span>
			</div>
		</footer>

	)
}

export default Footer
