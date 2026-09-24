import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { SiGithub, SiLinkedin, SiTwitter, SiHashnode, SiDevdotto, SiMedium } from 'react-icons/si'
import { IoArrowForward, IoCloudDownloadOutline, IoMailOutline, IoOpenOutline } from "react-icons/io5"
import { cn } from '@/lib/utils'
import { motion, useScroll, useTransform } from 'framer-motion'

const FeaturedPosts = dynamic(() => import('./').then(mod => mod.FeaturedPosts), {
	ssr: true
})

const Landing = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const heroRef = useRef(null)
	const { scrollY } = useScroll()
	const parallaxY = useTransform(scrollY, [0, 500], [0, 150])

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
		}
		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	const handleDownload = () => {
		const link = document.createElement('a')
		link.href = '/Bojan_Jagetić.pdf'
		link.download = 'Bojan_Jagetić.pdf'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2
			}
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.7,
				ease: [0.25, 0.46, 0.45, 0.94]
			}
		}
	}

	const socialLinks = [
		{ id: 'linkedin', href: 'https://linkedin.com/in/bojan-jagetic', icon: SiLinkedin, label: 'LinkedIn' },
		{ id: 'github', href: 'https://github.com/basskibo', icon: SiGithub, label: 'GitHub' },
		{ id: 'twitter', href: 'https://twitter.com/basskibo1', icon: SiTwitter, label: 'Twitter' }
	]

	const blogPlatforms = [
		{ name: 'Dev.to', icon: SiDevdotto, href: 'https://dev.to/basskibo' },
		{ name: 'Medium', icon: SiMedium, href: 'https://medium.com/@jagetic.bojan' },
		{ name: 'Hashnode', icon: SiHashnode, href: 'https://hashnode.jageticbojan.com/' }
	]

	return (
		<main className='bg-[#0b0c10] min-h-screen overflow-hidden' role="main">
			{/* Mouse Spotlight Effect */}
			<div 
				className='jag-spotlight hidden md:block'
				style={{ left: mousePosition.x, top: mousePosition.y }}
			/>

			{/* Hero Section */}
			<section 
				ref={heroRef}
				className='relative min-h-screen flex items-center justify-center'
				aria-label="Hero section"
			>
				{/* Background Elements */}
				<div className='absolute inset-0 overflow-hidden'>
					{/* Floating Orbs */}
					<div className='jag-orb jag-orb-purple' style={{ top: '-20%', left: '-10%' }} />
					<div className='jag-orb jag-orb-cyan' style={{ top: '30%', right: '-15%' }} />
					<div className='jag-orb jag-orb-fuchsia' style={{ bottom: '-10%', left: '30%' }} />
					
					{/* Grid Pattern Overlay */}
					<div className='jag-grid-pattern' />
				</div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20'
				>
					<motion.div style={{ y: parallaxY }} className='jag-parallax'>
						{/* Greeting Label */}
						<motion.div variants={itemVariants} className='mb-8'>
							<span className='jag-label inline-flex items-center gap-2 text-[#9698a6]'>
								<span className='jag-status-dot' />
								Hello there, 👋 my name is
							</span>
						</motion.div>

						{/* Main Name */}
						<motion.h1 variants={itemVariants} className='mb-4'>
							<span className='jag-hero-name block text-white'>Bojan</span>
							<span className='jag-hero-name jag-hero-surname block'>Jagetić</span>
						</motion.h1>

						{/* Description */}
						<motion.p 
							variants={itemVariants} 
							className='max-w-xl text-lg md:text-xl text-[#9698a6] leading-relaxed mb-10'
						>
							A passionate full-stack developer obsessed with writing clean code 
							and building exceptional digital experiences. I thrive on complex 
							projects and love exploring new technologies.
						</motion.p>

						{/* CTA Buttons */}
						<motion.div variants={itemVariants} className='flex flex-wrap gap-4 mb-12'>
							<Link 
								href='/routes/blog'
								data-umami-event="landing-read-blog"
								className='jag-btn-primary inline-flex items-center gap-2 font-semibold'
							>
								Read blog
								<IoArrowForward className='w-4 h-4' />
							</Link>
							<Link 
								href='/routes/aboutme'
								data-umami-event="landing-see-bio"
								className='jag-btn-glass inline-flex items-center gap-2'
							>
								See my bio
							</Link>
						</motion.div>

						{/* Social Links */}
						<motion.div variants={itemVariants} className='flex flex-wrap gap-3'>
							{socialLinks.map((social) => (
								<a
									key={social.id}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									data-umami-event={`landing-lnk-${social.id}-button`}
									className='jag-social-pill'
								>
									<social.icon className='w-4 h-4' />
									<span>{social.label}</span>
								</a>
							))}
							<button
								onClick={handleDownload}
								data-umami-event="landing-download-cv-button"
								className='jag-social-pill cursor-pointer'
							>
								<IoCloudDownloadOutline className='w-4 h-4' />
								<span>Download CV</span>
							</button>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Scroll Indicator */}
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.5, duration: 0.5 }}
					className='absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block'
				>
					<div className='w-6 h-10 rounded-full border-2 border-[#9698a6]/30 flex justify-center pt-2'>
						<motion.div 
							animate={{ y: [0, 8, 0] }}
							transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
							className='w-1.5 h-1.5 rounded-full bg-[#9698a6]'
						/>
					</div>
				</motion.div>
			</section>

			{/* Featured Project Section */}
			<section className='relative py-20 md:py-32 px-6 sm:px-8 lg:px-12' aria-label="Featured project">
				<div className='max-w-7xl mx-auto'>
					<div className='jag-featured-card'>
						{/* Image Side */}
						<div className='relative h-64 md:h-auto min-h-[300px]'>
							<Image
								src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1768492935/scratchTravel/pexels-miroalt-176400_fc5g7h.jpg'
								alt='Voyage Vault preview'
								fill
								className='object-cover'
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
							<div className='absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(20,21,27,0.8)] hidden md:block' />
						</div>
						
						{/* Content Side */}
						<div className='p-8 md:p-12 flex flex-col justify-center'>
							<span className='jag-tag mb-4 w-fit'>Featured Project</span>
							<h2 className='font-bricolage text-3xl md:text-4xl font-bold text-white tracking-tight mb-2'>
								Voyage Vault
							</h2>
							<p className='font-instrument text-xl text-[oklch(0.82_0.1_232)] italic mb-4'>
								Your travel scratch map
							</p>
							<p className='text-[#9698a6] mb-8 leading-relaxed'>
								Interactive travel scratch map – track your journeys and share them with friends.
								Mark countries you&apos;ve visited and see your travel progress come to life.
							</p>
							<div className='flex flex-wrap gap-4'>
								<a 
									href='https://scratch-travel.vercel.app/'
									target='_blank'
									rel='noopener noreferrer'
									className='jag-btn-primary inline-flex items-center gap-2 text-sm'
								>
									Open Voyage Vault
									<IoOpenOutline className='w-4 h-4' />
								</a>
								<Link 
									href='/routes/projects'
									className='jag-btn-glass inline-flex items-center gap-2 text-sm'
								>
									View projects
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Blog Cards Section */}
			<FeaturedPosts />

			{/* Newsletter Section */}
			<section className='relative py-20 md:py-32 px-6 sm:px-8 lg:px-12 bg-[#0b0c10]' aria-label="Newsletter">
				<div className='max-w-7xl mx-auto'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{/* CTA Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className='jag-cta-card'
						>
							<h2 className='font-bricolage text-4xl md:text-5xl font-bold text-white tracking-tight mb-4'>
								Don&apos;t be shy
							</h2>
							<p className='text-[#9698a6] text-lg mb-8 leading-relaxed'>
								Have an idea? I&apos;m always open to discussing new projects, 
								creative ideas, or opportunities to be part of something great.
							</p>
							<a 
								href="mailto:jagetic.bojan@gmail.com"
								data-umami-event='say-hello-click'
								className='jag-btn-primary inline-flex items-center gap-2'
							>
								<IoMailOutline className='w-5 h-5' />
								Say hello
							</a>
						</motion.div>

						{/* Newsletter Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className='jag-glass rounded-3xl p-8'
						>
							<h3 className='font-bricolage text-2xl font-bold text-white mb-2'>
								Subscribe to the newsletter
							</h3>
							<p className='text-[#9698a6] mb-6'>
								Get notified when I publish new articles. No spam, just quality content.
							</p>
							<div className='flex flex-col sm:flex-row gap-3 mb-8'>
								<input 
									type="email" 
									placeholder="your@email.com"
									className='jag-newsletter-input flex-1'
								/>
								<a
									href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist"
									target='_blank'
									rel='noopener noreferrer'
									data-umami-event='newsletter-subscribe-click'
									className='jag-btn-primary whitespace-nowrap'
								>
									Subscribe free
								</a>
							</div>

							{/* Blog Platforms */}
							<p className='jag-label text-[#9698a6] mb-4'>Also find me on</p>
							<div className='grid grid-cols-3 gap-3'>
								{blogPlatforms.map((platform) => (
									<a
										key={platform.name}
										href={platform.href}
										target='_blank'
										rel='noopener noreferrer'
										data-umami-event={`newsletter-${platform.name.toLowerCase()}-click`}
										className='jag-platform-card'
									>
										<platform.icon className='w-6 h-6 text-[#9698a6]' />
										<span className='text-sm text-[#9698a6]'>{platform.name}</span>
									</a>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='relative py-20 px-6 sm:px-8 lg:px-12 bg-[#0b0c10] border-t border-[rgba(255,255,255,0.08)]'>
				<div className='max-w-7xl mx-auto text-center'>
					<div className='jag-footer-text'>
						jagetić<span className='accent-dot'>.</span>
					</div>
					<p className='text-[#9698a6] mt-8'>
						© {new Date().getFullYear()} Bojan Jagetić. All rights reserved.
					</p>
				</div>
			</footer>
		</main>
	)
}

export default Landing
