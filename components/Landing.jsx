import React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Accent from '../components/custom/Accent'
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si'
import { TypeAnimation } from 'react-type-animation'
import { IoCloudDownloadOutline, IoArrowForward } from "react-icons/io5"
import ParticlesBackground from './custom/ParticlesBackground'
import AnchorLinkComponent from './custom/AnchorLink'
import FeaturedProjectTeaser from './custom/FeaturedProjectTeaser'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const FeaturedPosts = dynamic(() => import('./').then(mod => mod.FeaturedPosts), {
	ssr: true
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
				staggerChildren: 0.15,
				delayChildren: 0.1
			}
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.25, 0.46, 0.45, 0.94]
			}
		}
	}

	const socialLinks = [
		{
			id: 'linkedin',
			href: 'https://linkedin.com/in/bojan-jagetic',
			icon: SiLinkedin,
			label: 'LinkedIn',
			fullLabel: 'Bojan Jagetic',
			hoverColor: 'hover:text-[#0A66C2]'
		},
		{
			id: 'github',
			href: 'https://github.com/basskibo',
			icon: SiGithub,
			label: 'GitHub',
			fullLabel: 'basskibo',
			hoverColor: 'hover:text-foreground'
		},
		{
			id: 'twitter',
			href: 'https://twitter.com/basskibo1',
			icon: SiTwitter,
			label: 'Twitter',
			fullLabel: 'basskibo1',
			hoverColor: 'hover:text-[#1DA1F2]'
		}
	]

	return (
		<main className='bg-background min-h-screen' role="main">
			{/* Hero Section */}
			<section 
				className='relative min-h-screen flex items-center'
				aria-label="Hero section"
			>
				<ParticlesBackground />
				
				{/* Subtle gradient overlay for depth */}
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none' />
				
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className='relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24'
				>
					<div className='grid lg:grid-cols-12 gap-8 lg:gap-12 items-center'>
						{/* Main Content */}
						<div className='lg:col-span-7 space-y-6 sm:space-y-8'>
							{/* Greeting Badge */}
							<motion.div variants={itemVariants}>
								<span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm sm:text-base font-medium text-primary'>
									<span className='animate-wave inline-block origin-[70%_70%]'>👋</span>
									<span>Hello there</span>
								</span>
							</motion.div>

							{/* Main Heading */}
							<motion.div variants={itemVariants}>
								<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]'>
									<span className='block text-foreground'>I&apos;m</span>
									<Accent>
										<span className='inline-block'>
											<TypeAnimation
												sequence={[
													600,
													'Bojan',
													1500,
													'Bojan Jagetic'
												]}
												wrapper='span'
												cursor={true}
												speed={30}
												repeat={0}
												style={{ 
													display: 'inline-block',
													minHeight: '1.2em'
												}}
											/>
										</span>
									</Accent>
								</h1>
							</motion.div>

							{/* Description */}
							<motion.div variants={itemVariants} className='max-w-2xl'>
								<p className='text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed'>
									A passionate full-stack developer obsessed with writing clean code 
									and building exceptional digital experiences. I thrive on complex 
									projects and love exploring new technologies.
								</p>
							</motion.div>

							{/* CTA Buttons */}
							<motion.div 
								variants={itemVariants} 
								className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2'
							>
								<Button
									asChild
									size="lg"
									id='blog_post_button'
									data-umami-event="landing-read-blog"
									className={cn(
										"group relative overflow-hidden",
										"bg-primary hover:bg-primary/90",
										"text-primary-foreground font-semibold",
										"shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
										"transition-all duration-300 hover:-translate-y-0.5",
										"h-12 px-6 sm:px-8 text-base"
									)}
								>
									<Link href='/routes/blog' className='inline-flex items-center gap-2'>
										<span>Read the blog</span>
										<IoArrowForward className='w-4 h-4 transition-transform group-hover:translate-x-1' />
									</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									size="lg"
									id='aboutme_button'
									data-umami-event="landing-see-bio"
									className={cn(
										"group border-2 border-border",
										"bg-background/50 backdrop-blur-sm",
										"hover:bg-accent hover:border-primary/50",
										"font-semibold transition-all duration-300",
										"h-12 px-6 sm:px-8 text-base"
									)}
								>
									<Link href='/routes/aboutme'>
										About me
									</Link>
								</Button>
							</motion.div>

							{/* Social Links */}
							<motion.div 
								variants={itemVariants} 
								className='flex flex-wrap items-center gap-1 pt-4'
							>
								{socialLinks.map((social) => (
									<a
										key={social.id}
										data-umami-event={`landing-lnk-${social.id}-button`}
										id={`lnk-${social.id}-button`}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`Visit ${social.label} profile`}
										className={cn(
											"group inline-flex items-center gap-2 px-3 py-2 rounded-lg",
											"text-sm sm:text-base text-muted-foreground",
											"hover:bg-accent/50 transition-all duration-200",
											social.hoverColor
										)}
									>
										<social.icon className='w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110' />
										<span className='hidden sm:inline'>{social.fullLabel}</span>
										<span className='sm:hidden'>{social.label}</span>
									</a>
								))}
								<button
									data-umami-event="landing-download-cv-button"
									onClick={handleDownload}
									id='download_button'
									aria-label="Download CV"
									className={cn(
										"group inline-flex items-center gap-2 px-3 py-2 rounded-lg",
										"text-sm sm:text-base text-muted-foreground",
										"hover:bg-accent/50 hover:text-primary transition-all duration-200"
									)}
								>
									<IoCloudDownloadOutline className='w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110' />
									<span>CV</span>
								</button>
							</motion.div>
						</div>

						{/* Featured Project Card */}
						<motion.div 
							variants={itemVariants}
							className='lg:col-span-5 hidden lg:block'
						>
							<FeaturedProjectTeaser
								label='Featured project'
								title='Voyage Vault'
								description={`Interactive travel scratch map – track your journeys and share them with friends.`}
								primaryHref='/routes/projects'
								primaryText='View projects'
								primaryInternal
								secondaryHref='https://scratch-travel.vercel.app/'
								secondaryText='Try it live'
								showPreview
								previewImage='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1768492935/scratchTravel/pexels-miroalt-176400_fc5g7h.jpg'
								previewAlt='Voyage Vault preview'
							/>
						</motion.div>
					</div>

					{/* Scroll Indicator */}
					<motion.div 
						variants={itemVariants}
						className='absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block'
					>
						<AnchorLinkComponent />
					</motion.div>
				</motion.div>
			</section>

			{/* Mobile Featured Project */}
			<section className='lg:hidden px-4 py-8 sm:py-12' aria-label="Featured project">
				<FeaturedProjectTeaser
					label='Featured project'
					title='Voyage Vault'
					description={`Interactive travel scratch map – track your journeys and share them with friends.`}
					primaryHref='/routes/projects'
					primaryText='View projects'
					primaryInternal
					secondaryHref='https://scratch-travel.vercel.app/'
					secondaryText='Try it live'
					showPreview
					previewImage='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1768492935/scratchTravel/pexels-miroalt-176400_fc5g7h.jpg'
					previewAlt='Voyage Vault preview'
				/>
			</section>

			{/* Featured Posts Section */}
			<FeaturedPosts />
			
			{/* Newsletter Section */}
			<NewsLetter />
		</main>
	)
}

export default Landing
