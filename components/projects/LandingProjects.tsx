import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Package } from 'lucide-react'
import Accent from '../custom/Accent'
import { featuredProjects, projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const libraries = projects.filter((p) => p.category === 'libraries' || p.slug === 'dynamic-island' || p.slug === 'nautag')

const LandingProjects: React.FC = () => (
	<section id='projectsSection' className='relative bg-background'>
		<div className='mx-auto max-w-6xl px-4 pt-16 pb-8 sm:px-6 sm:pt-20 md:pt-24 lg:px-8'>
			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-80px' }}
				variants={fadeUp}
				className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'
			>
				<div className='max-w-2xl space-y-3'>
					<p className='text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80'>Selected work</p>
					<h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						What I&apos;m <Accent className=''>building</Accent>
					</h2>
					<p className='text-sm leading-relaxed text-muted-foreground sm:text-base'>
						A finance app, a 3D office for AI agents, browser games and tools for the Linux desktop.
					</p>
				</div>
				<Link
					href='/routes/projects'
					data-umami-event='landing-all-projects'
					className='group inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-50'
				>
					All {projects.length} projects
					<ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
				</Link>
			</motion.div>

			<div className='mt-10 grid gap-6 sm:grid-cols-2'>
				{featuredProjects.map((project) => (
					<motion.div
						key={project.slug}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-60px' }}
						variants={fadeUp}
					>
						<ProjectCard project={project} />
					</motion.div>
				))}
			</div>

			{/* Libraries & tools strip */}
			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-60px' }}
				variants={fadeUp}
				className='mt-16 rounded-3xl border border-border bg-card/60 p-5 sm:p-8'
			>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
					<div className='flex items-center gap-3'>
						<span className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30'>
							<Package className='h-5 w-5' />
						</span>
						<div>
							<h3 className='text-lg font-bold text-foreground sm:text-xl'>Libraries &amp; tools</h3>
							<p className='text-sm text-muted-foreground'>Packages and extensions anyone can install.</p>
						</div>
					</div>
					<Link href='/routes/libaries' className='text-sm font-semibold text-cyan-200 hover:text-cyan-50'>
						Library archive →
					</Link>
				</div>
				<ul className='mt-6 grid gap-3 sm:grid-cols-2'>
					{libraries.map((lib) => (
						<li key={lib.slug}>
							<Link
								href={`/routes/projects#${lib.slug}`}
								className='flex h-full flex-col gap-1 rounded-2xl border border-border/70 bg-background/40 p-4 transition-colors hover:border-primary/40 hover:bg-background/70'
							>
								<span className='font-semibold text-foreground'>{lib.name}</span>
								<span className='text-sm text-muted-foreground'>{lib.tagline}</span>
								<span className='mt-1 text-xs text-muted-foreground/80'>{lib.tech.slice(0, 3).join(' · ')}</span>
							</Link>
						</li>
					))}
				</ul>
			</motion.div>
		</div>
	</section>
)

export default LandingProjects
