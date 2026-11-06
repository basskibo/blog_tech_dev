import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import type { GetStaticProps } from 'next'
import { motion } from 'framer-motion'
import Accent from '../../components/custom/Accent'
import { cn } from '@/lib/utils'
import { projects, projectCategories, featuredProjects } from '../../components/data/projects'
import type { ProjectCategory } from '../../components/data/projects'
import { FeaturedProjectRow, ProjectCard } from '../../components/projects/ProjectCard'
import type { ProjectPost } from '../../components/projects/ProjectCard'
import { getPostsByProject } from '../../services/projectPosts'

type ProjectsPageProps = {
	postsByProject: Record<string, ProjectPost[]>
}

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const Projects: React.FC<ProjectsPageProps> = ({ postsByProject }) => {
	const [category, setCategory] = useState<ProjectCategory | 'all'>('all')

	const others = useMemo(() => projects.filter((p) => !p.featured), [])
	const filtered = useMemo(
		() => (category === 'all' ? others : projects.filter((p) => p.category === category)),
		[category, others]
	)
	const counts = useMemo(() => {
		const c: Record<string, number> = { all: others.length }
		for (const p of projects) c[p.category] = (c[p.category] ?? 0) + 1
		return c
	}, [others])

	const writeUps = Object.values(postsByProject).reduce((n, posts) => n + posts.length, 0)

	return (
		<div className='min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90'>
			<Head>
				<title>Projects · Bojan Jagetic</title>
				<meta
					name='description'
					content='Apps, libraries, Linux tools and games built by Bojan Jagetic, with write-ups on how each one was made.'
				/>
			</Head>
			<div className='mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-20'>
				{/* Header */}
				<motion.header initial='hidden' animate='visible' variants={fadeUp} className='max-w-3xl space-y-4'>
					<p className='text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground'>Projects</p>
					<h1 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl'>
						Things I <Accent className=''>build</Accent> and ship
					</h1>
					<p className='text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg'>
						Web and mobile apps, libraries, Linux desktop tools and browser games. Most of them I use every day.
						Where there is more to tell, there is a write-up, sometimes in several parts.
					</p>
					<div className='flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground'>
						<span>
							<span className='font-semibold text-foreground'>{projects.length}</span> projects
						</span>
						<span>
							<span className='font-semibold text-foreground'>{projects.filter((p) => p.status === 'Live' || p.status === 'Released').length}</span>{' '}
							live or released
						</span>
						{writeUps > 0 && (
							<span>
								<span className='font-semibold text-foreground'>{writeUps}</span> write-ups
							</span>
						)}
					</div>
				</motion.header>

				{/* Featured */}
				<section className='mt-12 space-y-8 sm:mt-14 md:space-y-10'>
					<h2 className='text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80'>Featured</h2>
					{featuredProjects.map((project, i) => (
						<motion.div
							key={project.slug}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, margin: '-80px' }}
							variants={fadeUp}
						>
							<FeaturedProjectRow project={project} posts={postsByProject[project.slug]} reverse={i % 2 === 1} />
						</motion.div>
					))}
				</section>

				{/* All / filtered */}
				<section className='mt-16 sm:mt-20'>
					<div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
						<h2 className='text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
							{category === 'all' ? 'More projects' : projectCategories.find((c) => c.id === category)?.label}
						</h2>
						<div className='-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0'>
							<div className='flex w-max gap-2'>
								{projectCategories.map((c) => (
									<button
										key={c.id}
										type='button'
										onClick={() => setCategory(c.id)}
										className={cn(
											'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
											category === c.id
												? 'border-cyan-400/70 bg-cyan-500/15 text-cyan-100'
												: 'border-border bg-black/30 text-muted-foreground hover:text-foreground'
										)}
									>
										{c.label}
										<span className='ml-1.5 text-xs opacity-60'>{counts[c.id] ?? 0}</span>
									</button>
								))}
							</div>
						</div>
					</div>

					<div className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{filtered.map((project) => (
							<motion.div key={project.slug} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
								<ProjectCard project={project} posts={postsByProject[project.slug]} />
							</motion.div>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}

export default Projects

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
	const byProject = getPostsByProject()
	const postsByProject: Record<string, ProjectPost[]> = {}
	for (const [slug, posts] of Object.entries(byProject)) {
		postsByProject[slug] = posts.map(({ slug: s, title, seriesTitle, seriesPart }) => ({
			slug: s,
			title,
			seriesTitle,
			seriesPart
		}))
	}
	return { props: { postsByProject } }
}
