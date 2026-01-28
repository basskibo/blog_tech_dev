import React from 'react'
import Accent from '../../components/custom/Accent'
import FeaturedProjectTeaser from '../../components/custom/FeaturedProjectTeaser'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Loader2 } from 'lucide-react'
import dayjs from 'dayjs'

const projects = [
	{
		name: 'Voyage Vault – Interactive Travel Scratch Map',
		slug: 'voyage-vault',
		description:
      'Create a personalized scratch travel map, track visited countries and share your adventures with friends – no sign-up required.',
		tech: ['Next.js', 'React', 'TypeScript', 'Leaflet', 'Framer Motion'],
		role: 'Personal project – idea, design, frontend & backend',
		liveUrl: 'https://scratch-travel.vercel.app/',
		repoUrl: 'https://github.com/basskibo/scratch-travel',
		status: 'In development',//'Live',
		year: '2026',
		bgImage:
      'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1768492935/scratchTravel/pexels-miroalt-176400_fc5g7h.jpg'
	},
    {
        name: 'Buddy Bill – Your money managment buddy',
        slug: 'buddy-bill',
        description:
          'Your money managment buddy, track your expenses and income, and get insights into your spending habits.',
        tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        role: 'Personal project – idea, design, frontend & backend',
        liveUrl: 'https://buddy-bill-eight.vercel.app/',
        repoUrl: null,
        status: 'In development',//'Live',
        year: '2026',
        bgImage: 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1768492935/buddyBill/pexels-miroalt-176400_fc5g7h.jpg'
    }
]

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.05 }
	}
}

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: 'easeOut' }
	}
}

const Projects = () => {

    
	return (
		<div className='bg-gradient-to-b from-background via-background/95 to-background/90 min-h-screen'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 lg:py-20'>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					className='space-y-10 sm:space-y-12 md:space-y-16'
				>
					{/* Header */}
					<motion.div variants={itemVariants} className='max-w-3xl space-y-4'>
						<p className='text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground'>
							Selected projects
						</p>
						<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground'>
							<Accent>Web applications</Accent> I&apos;ve built
						</h1>
						<p className='text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed'>
							These are some of my favorite side‑projects – real, deployed apps that I
							use to experiment with modern UI, performance and product ideas.
						</p>
					</motion.div>

					{/* Reusable teaser */}
					<motion.div variants={itemVariants}>
						<FeaturedProjectTeaser
							label='Current focus'
							title='Voyage Vault – interactive travel scratch map'
							description={`A modern travel companion that lets you track visited countries on an interactive world map and share your progress with friends.`}
							primaryHref={projects[0].liveUrl}
							primaryText='Open live preview'
							secondaryHref={projects[0].repoUrl}
							secondaryText='View source code'
							showPreview
							previewImage={projects[0].bgImage}
							previewAlt='Voyage Vault preview'
							className='mt-2'
						/>
					</motion.div>

					{/* Projects grid */}
					<div className='grid gap-6 md:gap-8 md:grid-cols-1'>
						{projects.map((project) => (
							<motion.div key={project.slug} variants={itemVariants}>
								<Card
									className={cn(
										'relative overflow-hidden border-border bg-card/80 backdrop-blur-sm',
										'hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300'
									)}
								>
									<div className='grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 md:gap-8'>
										{/* Left: content */}
										<div className='p-5 sm:p-6 md:p-8 flex flex-col gap-4'>
											<div className='flex items-center gap-3 flex-wrap'>
												<span
													className={cn(
														'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1',
														project.status === 'In development'
															? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/40'
															: 'bg-amber-500/10 text-amber-300 ring-amber-500/40'
													)}
												>
													{project.status}
													{project.status !== 'In development' && (
														<span className='mx-1'>• {project.year}</span>
													)}
													{project.status === 'In development' && (
														<Loader2 className='ml-2 h-3.5 w-3.5 animate-spin' />
													)}
												</span>
											</div>
											<div className='space-y-2'>
												<h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-foreground'>
													{project.name}
												</h2>
												<p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
													{project.description}
												</p>
											</div>
											<div className='space-y-1'>
												<p className='text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
													Tech stack
												</p>
												<div className='flex flex-wrap gap-2'>
													{project.tech.map((t) => (
														<span
															key={t}
															className='rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground'
														>
															{t}
														</span>
													))}
												</div>
											</div>
											<p className='text-xs sm:text-sm text-muted-foreground/80'>
												{project.role}
											</p>
											<div className='mt-2 flex flex-wrap items-center gap-3'>
												<Button
													asChild
													variant='outline'
													size='sm'
													className={cn(
														'border-cyan-400/70 bg-black/70 text-cyan-200',
														'shadow-[0_0_18px_rgba(34,211,238,0.45)]',
														'hover:bg-cyan-500/10 hover:border-cyan-300 hover:text-cyan-50',
														'transition-all duration-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.7)]',
														'rounded-full px-4'
													)}
												>
													<a
														href={project.liveUrl}
														target='_blank'
														rel='noopener noreferrer'
														className='flex items-center gap-2'
													>
														<ExternalLink className='h-4 w-4' />
														<span>View live project</span>
													</a>
												</Button>
												{project.repoUrl && (
													<Button
														asChild
														variant='outline'
														size='sm'
														className={cn(
															'border-border bg-black/60 text-muted-foreground',
															'hover:bg-muted/40 hover:text-foreground',
															'rounded-full px-4 transition-colors duration-200'
														)}
													>
														<a
															href={project.repoUrl}
															target='_blank'
															rel='noopener noreferrer'
															className='flex items-center gap-2'
														>
															<Github className='h-4 w-4' />
															<span>View source</span>
														</a>
													</Button>
												)}
											</div>
										</div>

										{/* Right: image preview */}
										<div className='relative overflow-hidden'>
											<div className='absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-emerald-400/10 pointer-events-none' />
											<div className='relative h-full min-h-[220px]'>
												{(() => {
													const trimmed = project.liveUrl?.replace(/\/$/, '') || ''
													const fallbackOg = trimmed ? `${trimmed}/og-image.png` : ''
													const bg = project.bgImage || fallbackOg

													return (
														<div
															className='h-full w-full bg-cover bg-center'
															style={{
																backgroundImage: bg ? `url(${bg})` : 'radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 60%), radial-gradient(circle at bottom, rgba(16,185,129,0.25), transparent 60%)'
															}}
														/>
													)
												})()}
												<div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent' />
												<div className='pointer-events-none absolute inset-x-4 bottom-4 rounded-xl border border-border/80 bg-background/85 px-4 py-3 shadow-lg'>
													<p className='text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground mb-1'>
														Preview
													</p>
													<p className='text-sm text-foreground line-clamp-2'>
														Interactive world map where you scratch countries
														you&apos;ve visited and share your progress with
														friends.
													</p>
												</div>
											</div>
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default Projects


