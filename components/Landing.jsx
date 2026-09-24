import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { SiHashnode, SiDevdotto, SiMedium } from 'react-icons/si'
import { IoArrowForward, IoCloudDownloadOutline, IoMailOutline } from "react-icons/io5"
import { motion } from 'framer-motion'
import HeroSpotify from './jagetic/HeroSpotify'
import FeaturedCarousel from './jagetic/FeaturedCarousel'

const FeaturedPosts = dynamic(() => import('./').then(mod => mod.FeaturedPosts), {
	ssr: true
})

const Landing = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const heroRef = useRef(null)

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
		{ id: 'linkedin', href: 'https://linkedin.com/in/bojan-jagetic', label: 'LinkedIn · Bojan Jagetic' },
		{ id: 'github', href: 'https://github.com/basskibo', label: 'GitHub · basskibo' },
		{ id: 'twitter', href: 'https://twitter.com/basskibo1', label: 'Twitter · basskibo1' }
	]
	const marquee = ['Node.js', 'React', 'TypeScript', 'Docker', 'webOS', 'Tizen', 'NGINX', 'MongoDB', 'Redis', 'AWS', 'React Native']

	const blogPlatforms = [
		{ name: 'Dev.to', icon: SiDevdotto, href: 'https://dev.to/basskibo' },
		{ name: 'Medium', icon: SiMedium, href: 'https://medium.com/@jagetic.bojan' },
		{ name: 'Hashnode', icon: SiHashnode, href: 'https://hashnode.jageticbojan.com/' }
	]

	return (
		<main className='min-h-screen overflow-x-clip' role="main" style={{ background: 'var(--bg)', color: 'var(--ink)' }}>
			<section
				ref={heroRef}
				onMouseMove={(e) => {
					const rect = e.currentTarget.getBoundingClientRect()
					setMousePosition({
						x: ((e.clientX - rect.left) / rect.width) * 100,
						y: ((e.clientY - rect.top) / rect.height) * 100
					})
				}}
				className='relative flex flex-col justify-end overflow-hidden'
				style={{ minHeight: '100vh', padding: '140px 0 72px', zIndex: 1 }}
				aria-label="Hero section"
			>
				<div className='absolute' style={{ inset: -80 }}>
					{[
						['oklch(0.8 0.09 232)', 520, '8%', '10%', 'bjFloatA 16s ease-in-out infinite'],
						['oklch(0.7 0.09 265)', 600, '52%', '-6%', 'bjFloatB 20s ease-in-out infinite'],
						['oklch(0.78 0.07 200)', 420, '30%', '48%', 'bjFloatA 24s ease-in-out infinite reverse']
					].map((blob) => (
						<div key={blob[2]} style={{ position: 'absolute', left: blob[2], top: blob[3], width: blob[1], height: blob[1], borderRadius: '50%', background: blob[0], filter: 'blur(90px)', opacity: 0.5, animation: blob[4] }} />
					))}
				</div>
				<div className='absolute inset-0 pointer-events-none' style={{ background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, oklch(0.82 0.1 232 / .1), transparent 60%)` }} />
				<div className='absolute inset-0' style={{ backgroundImage: 'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)' }} />
				<div className='absolute left-0 right-0 bottom-0' style={{ height: 260, background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />

				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className='relative z-10 w-full mx-auto'
					style={{ maxWidth: 1180, padding: '0 32px' }}
				>
					<div>
						<motion.div variants={itemVariants} className='inline-flex items-center gap-2.5' style={{ font: "500 13px 'JetBrains Mono', monospace", letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--mut)' }}>
							<span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--acc)', boxShadow: '0 0 14px var(--acc)' }} />
							Hello there, 👋 my name is
						</motion.div>

						<motion.h1 variants={itemVariants} style={{ margin: '22px 0 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '.18em', lineHeight: 0.86 }}>
							<span style={{ font: "800 clamp(84px, 14vw, 220px)/.86 'Bricolage Grotesque', sans-serif", letterSpacing: '-.06em' }}>Bojan</span>
							<span style={{ font: "italic 400 clamp(90px, 15vw, 236px)/.9 'Instrument Serif', serif", letterSpacing: '-.025em', color: 'var(--accT)' }}>Jagetić</span>
						</motion.h1>

						<div className='grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,460px)] gap-10 items-end'>
						<div>
						{/* Description */}
						<motion.p 
							variants={itemVariants} 
							className='max-w-xl text-lg md:text-xl text-[#9698a6] leading-relaxed mb-10'
						>
							Writing code is my obsession as well as constant self-improvement. I have developed many web applications and platforms from scratch in my spare time. Accustomed to using extensive tech stack because I love challenging and complex projects.
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
									<span style={{ font: "500 12px 'JetBrains Mono', monospace" }}>{social.label}</span>
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
						</div>
						<motion.div variants={itemVariants}>
							<HeroSpotify />
						</motion.div>
						</div>
					</div>
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

			<div style={{ position: 'relative', zIndex: 0, background: 'var(--bg)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '26px 0', overflow: 'hidden' }}>
				<div style={{ display: 'flex', width: 'max-content', animation: 'bjMarq 38s linear infinite' }}>
					{[...marquee, ...marquee].map((word, index) => (
						<span key={`${word}-${index}`} style={{ font: "800 64px/1 'Bricolage Grotesque', sans-serif", letterSpacing: '-.045em', padding: '0 28px', whiteSpace: 'nowrap', color: index % 2 ? 'transparent' : 'var(--ink)', WebkitTextStroke: index % 2 ? '1px var(--ink)' : '0' }}>{word} ✦</span>
					))}
				</div>
			</div>

			<FeaturedCarousel />

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
