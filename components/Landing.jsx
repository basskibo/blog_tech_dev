import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Accent from '../components/custom/Accent'
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si'
import { TypeAnimation } from 'react-type-animation'
import { IoCloudDownloadOutline } from "react-icons/io5"
import ParticlesBackground from './custom/ParticlesBackground'
import AnchorLinkComponent from './custom/AnchorLink'
import FeaturedProjectTeaser from './custom/FeaturedProjectTeaser'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

// Lazy load components that are below the fold
const FeaturedPosts = dynamic(() => import('./').then(mod => mod.FeaturedPosts), {
	ssr: true // Keep SSR for SEO
})
const NewsLetter = dynamic(() => import('./NewsLetter'), {
	ssr: true
})

const Landing = () => {

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = '/Bojan_Jagetić.pdf';
		link.download = 'Bojan_Jagetić.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1
			}
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut"
			}
		}
	}

	return (
		<div className='bg-gradient-to-b from-background via-background/95 to-background/90 min-h-screen'>
			<div className='text-foreground relative safe-top safe-left safe-right'>
				<ParticlesBackground />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className='flex flex-col justify-center min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 safe-top safe-bottom mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10'
				>
					{/* Hero Section */}
					<motion.div variants={itemVariants} className='mb-8 sm:mb-10 md:mb-12 lg:mb-16'>
						<div className='text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-muted-foreground'>
							Hello there, 👋
						</div>
						<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1.1] tracking-tight'>
							<span className='block sm:inline'>My name is</span>{' '}
							<Accent>
								<span className='inline-block whitespace-nowrap min-w-[8ch] sm:min-w-[10ch] md:min-w-[12ch]'>
									<TypeAnimation
										sequence={[
											700,
											'Jagetic',
											2000,
											'Bojan Jagetic'
										]}
										wrapper='span'
										cursor={true}
										speed={25}
										repeat={0}
										style={{ 
											fontSize: '1em',
											display: 'inline-block',
											minHeight: '1em'
										}}
									/>
								</span>
							</Accent>
						</h1>
					</motion.div>

					{/* Description */}
					<motion.div variants={itemVariants} className='mb-8 sm:mb-10 md:mb-12 max-w-3xl'>
						<p className='font-normal text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground'>
							Writing code is my obsession as well as constant self-improvement. 
							I have developed many web applications and platforms from scratch 
							in my spare time. Accustomed to using extensive tech stack because 
							I love challenging and complex projects.
						</p>
						<p className='font-normal text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-muted-foreground mt-4 hidden lg:block'>
							I&apos;m passionate about coding and constantly pushing myself to improve. 
							Working with a wide range of technologies keeps me inspired and eager 
							to take on the next big idea.
						</p>
					</motion.div>

					{/* CTA Buttons */}
					<motion.div variants={itemVariants} className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10'>
						<Button
							asChild={true}
							variant="default"
							size="lg"
							id='blog_post_button'
							data-umami-event="landing-read-blog"
							className={cn(
								"w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-400",
								"hover:from-primary-500 hover:to-primary-300",
								"text-white font-semibold shadow-lg shadow-primary-500/20",
								"hover:shadow-xl hover:shadow-primary-500/30",
								"transition-all duration-300 hover:scale-105",
								"border-0"
							)}
						>
							<Link href='/routes/blog'>
								Read blog
							</Link>
						</Button>
						<Button
							asChild={true}
							variant="outline"
							size="lg"
							id='aboutme_button'
							data-umami-event="landing-see-bio"
							className={cn(
								"w-full sm:w-auto border-2 border-primary-400/50",
								"bg-black/30 backdrop-blur-sm text-white",
								"hover:bg-primary-400/10 hover:border-primary-400",
								"font-semibold shadow-lg",
								"transition-all duration-300 hover:scale-105"
							)}
						>
							<Link href='/routes/aboutme'>
								See my bio
							</Link>
						</Button>
					</motion.div>

					{/* Social Links */}
					<motion.div variants={itemVariants} className='flex flex-wrap items-center gap-4 sm:gap-6'>
						<a
							data-umami-event="landing-lnk-linkedin-button"
							id='lnk-linkedin-button'
							href="https://linkedin.com/in/bojan-jagetic"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"inline-flex items-center gap-2 text-sm sm:text-base",
								"text-muted-foreground hover:text-primary",
								"transition-colors duration-200 py-2",
								"group"
							)}
						>
							<SiLinkedin className='h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 group-hover:scale-110 transition-transform' />
							<span className='hidden sm:inline'>Bojan Jagetic</span>
							<span className='sm:hidden'>LinkedIn</span>
						</a>
						<a
							data-umami-event="landing-lnk-github-button"
							id='lnk-github-button'
							href="https://github.com/basskibo"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"inline-flex items-center gap-2 text-sm sm:text-base",
								"text-muted-foreground hover:text-foreground",
								"transition-colors duration-200 py-2",
								"group"
							)}
						>
							<SiGithub className='h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 group-hover:scale-110 transition-transform' />
							<span>basskibo</span>
						</a>
						<a
							data-umami-event='landing-lnk-twitter-button'
							id='lnk-twitter-button'
							href="https://twitter.com/basskibo1"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"inline-flex items-center gap-2 text-sm sm:text-base",
								"text-muted-foreground hover:text-primary",
								"transition-colors duration-200 py-2",
								"group"
							)}
						>
							<SiTwitter className='h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 group-hover:scale-110 transition-transform' />
							<span>basskibo1</span>
						</a>
						<button
							data-umami-event="landing-download-cv-button"
							onClick={handleDownload}
							id='download_button'
							className={cn(
								"inline-flex items-center gap-2 text-sm sm:text-base",
								"text-muted-foreground hover:text-primary",
								"transition-colors duration-200 py-2",
								"group"
							)}
						>
							<IoCloudDownloadOutline className='h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 group-hover:scale-110 transition-transform' />
							<span>Download CV</span>
						</button>
					</motion.div>

					{/* Scroll down arrow */}
					<motion.div variants={itemVariants} className='flex justify-center mt-6 sm:mt-8 md:mt-10'>
						<AnchorLinkComponent/>
					</motion.div>

					{/* Featured Project teaser with visual preview */}
					<motion.div variants={itemVariants} className='mt-8 sm:mt-10 md:mt-12 w-full'>
						<FeaturedProjectTeaser
							label='Featured project'
							title='Voyage Vault – interactive travel scratch map'
							description={`Create a personalized scratch map of countries you've visited, track your journeys and share them with friends – all in the browser.`}
							primaryHref='/routes/projects'
							primaryText='View projects'
							primaryInternal
							secondaryHref='https://scratch-travel.vercel.app/'
							secondaryText='Open Voyage Vault'
							showPreview
							previewImage='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1768492935/scratchTravel/pexels-miroalt-176400_fc5g7h.jpg'
							previewAlt='Voyage Vault preview'
						/>
					</motion.div>
				</motion.div>
			</div>
			<FeaturedPosts />
			<NewsLetter />
		</div>
	)
}

export default Landing
