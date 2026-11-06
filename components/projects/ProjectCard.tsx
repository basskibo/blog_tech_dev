import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, ExternalLink, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '../data/projects'
import { projectCategories } from '../data/projects'

export type ProjectPost = {
	slug: string
	title: string
	seriesTitle?: string | null
	seriesPart?: number | null
}

const statusStyles: Record<string, string> = {
	Live: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/40',
	Released: 'bg-sky-500/10 text-sky-300 ring-sky-500/40',
	'In development': 'bg-amber-500/10 text-amber-300 ring-amber-500/40',
	'Personal tool': 'bg-violet-500/10 text-violet-300 ring-violet-500/40'
}

const categoryLabel = (id: string) => projectCategories.find((c) => c.id === id)?.label ?? id

export const StatusBadge: React.FC<{ status: string; year?: string }> = ({ status, year }) => (
	<span
		className={cn(
			'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ring-1',
			statusStyles[status] ?? statusStyles.Released
		)}
	>
		<span className='h-1.5 w-1.5 rounded-full bg-current' />
		{status}
		{year && <span className='opacity-70'>· {year}</span>}
	</span>
)

const ProjectVisual: React.FC<{ project: Project; className?: string }> = ({ project, className }) => (
	<div className={cn('relative overflow-hidden bg-neutral-900', className)}>
		{project.image ? (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={project.image}
				alt={`${project.name} preview`}
				loading='lazy'
				className='h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]'
			/>
		) : (
			<div className='flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.22),transparent_55%)]'>
				<span className='px-6 text-center text-2xl sm:text-3xl font-bold tracking-tight text-white/85'>
					{project.name}
				</span>
			</div>
		)}
		<div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
	</div>
)

const PostLinks: React.FC<{ posts?: ProjectPost[] }> = ({ posts }) => {
	if (!posts?.length) return null
	const seriesTitle = posts.find((p) => p.seriesTitle)?.seriesTitle
	return (
		<div className='rounded-xl border border-border/70 bg-background/40 p-3'>
			<p className='mb-2 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground'>
				<BookOpen className='h-3.5 w-3.5' />
				{posts.length > 1 ? `${seriesTitle ?? 'The story'} · ${posts.length} parts` : 'Read the story'}
			</p>
			<ul className='space-y-1'>
				{posts.map((post) => (
					<li key={post.slug}>
						<Link
							href={`/post/${post.slug}`}
							className='group/link flex items-start gap-2 text-sm text-foreground/90 hover:text-primary transition-colors'
						>
							{posts.length > 1 && (
								<span className='mt-0.5 shrink-0 font-mono text-xs text-muted-foreground'>
									{String(post.seriesPart ?? 0).padStart(2, '0')}
								</span>
							)}
							<span className='line-clamp-1'>{post.title}</span>
							<ArrowUpRight className='mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/link:opacity-100' />
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

const ActionLinks: React.FC<{ project: Project }> = ({ project }) => {
	const isNpm = project.liveUrl?.includes('npmjs.com')
	const isGnome = project.liveUrl?.includes('extensions.gnome.org')
	const liveText = isNpm ? 'View on npm' : isGnome ? 'Get the extension' : 'Open live'
	return (
		<div className='flex flex-wrap items-center gap-2'>
			{project.liveUrl && (
				<a
					href={project.liveUrl}
					target='_blank'
					rel='noopener noreferrer'
					data-umami-event={`project-live-${project.slug}`}
					className='inline-flex items-center gap-1.5 rounded-full border border-cyan-400/60 bg-cyan-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.25)] transition-all hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_24px_rgba(34,211,238,0.45)]'
				>
					<ExternalLink className='h-3.5 w-3.5' />
					{liveText}
				</a>
			)}
			{project.repoUrl && (
				<a
					href={project.repoUrl}
					target='_blank'
					rel='noopener noreferrer'
					data-umami-event={`project-repo-${project.slug}`}
					className='inline-flex items-center gap-1.5 rounded-full border border-border bg-black/40 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground'
				>
					<Github className='h-3.5 w-3.5' />
					Source
				</a>
			)}
			{project.extraLinks?.map((l) => (
				<Link
					key={l.href}
					href={l.href}
					className='inline-flex items-center gap-1.5 rounded-full border border-border bg-black/40 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground'
				>
					{l.label}
				</Link>
			))}
			{!project.liveUrl && !project.repoUrl && !project.extraLinks?.length && (
				<span className='text-xs text-muted-foreground/80'>Private project · write-up below</span>
			)}
		</div>
	)
}

const TechChips: React.FC<{ tech: string[]; max?: number }> = ({ tech, max }) => {
	const shown = max ? tech.slice(0, max) : tech
	const rest = max ? tech.length - shown.length : 0
	return (
		<div className='flex flex-wrap gap-1.5'>
			{shown.map((t) => (
				<span key={t} className='rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[0.7rem] text-muted-foreground'>
					{t}
				</span>
			))}
			{rest > 0 && <span className='px-1 py-0.5 text-[0.7rem] text-muted-foreground'>+{rest}</span>}
		</div>
	)
}

/** Big, alternating showcase row for featured projects. */
export const FeaturedProjectRow: React.FC<{ project: Project; posts?: ProjectPost[]; reverse?: boolean }> = ({
	project,
	posts,
	reverse
}) => (
	<article
		id={project.slug}
		className='group relative scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/10'
	>
		<div className={cn('grid md:grid-cols-2', reverse && 'md:[&>*:first-child]:order-2')}>
			<div className='relative flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.14),transparent_60%)] p-4 sm:p-6 lg:p-8'>
				<ProjectVisual
					project={project}
					className='aspect-[16/10] w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/60'
				/>
			</div>
			<div className='flex flex-col gap-4 p-5 sm:p-7 lg:p-9'>
				<div className='flex flex-wrap items-center gap-2'>
					<StatusBadge status={project.status} year={project.year} />
					<span className='text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground'>
						{categoryLabel(project.category)}
					</span>
				</div>
				<div className='space-y-1.5'>
					<h3 className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground'>{project.name}</h3>
					<p className='text-sm sm:text-base font-medium text-cyan-200/90'>{project.tagline}</p>
				</div>
				<p className='text-sm sm:text-base leading-relaxed text-muted-foreground'>{project.description}</p>
				<ul className='space-y-1.5'>
					{project.highlights.slice(0, 4).map((h) => (
						<li key={h} className='flex gap-2 text-sm text-foreground/85'>
							<span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400' />
							{h}
						</li>
					))}
				</ul>
				<TechChips tech={project.tech} />
				<PostLinks posts={posts} />
				<div className='mt-auto pt-1'>
					<ActionLinks project={project} />
				</div>
			</div>
		</div>
	</article>
)

/** Compact card for the grid. */
export const ProjectCard: React.FC<{ project: Project; posts?: ProjectPost[] }> = ({ project, posts }) => (
	<article
		id={project.slug}
		className='group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10'
	>
		<ProjectVisual project={project} className='aspect-[16/9]' />
		<div className='flex flex-1 flex-col gap-3 p-5'>
			<div className='flex flex-wrap items-center gap-2'>
				<StatusBadge status={project.status} year={project.year} />
			</div>
			<div className='space-y-1'>
				<h3 className='text-lg sm:text-xl font-bold text-foreground'>{project.name}</h3>
				<p className='text-sm font-medium text-cyan-200/85'>{project.tagline}</p>
			</div>
			<p className='text-sm leading-relaxed text-muted-foreground line-clamp-3'>{project.description}</p>
			<TechChips tech={project.tech} max={5} />
			<PostLinks posts={posts} />
			<div className='mt-auto pt-1'>
				<ActionLinks project={project} />
			</div>
		</div>
	</article>
)
