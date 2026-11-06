import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getProject } from './data/projects'

type SeriesPost = { slug: string; title: string; seriesPart: number | null }

type Props = {
	currentSlug: string
	seriesTitle?: string | null
	seriesPosts: SeriesPost[]
	projectSlug?: string | null
	position: 'top' | 'bottom'
}

/** "Part 2 of 3" box for multi-part write-ups, plus a link back to the project it belongs to. */
const SeriesNav: React.FC<Props> = ({ currentSlug, seriesTitle, seriesPosts, projectSlug, position }) => {
	const project = getProject(projectSlug)
	const hasSeries = seriesPosts.length > 1
	if (!hasSeries && !project) return null

	const index = seriesPosts.findIndex((p) => p.slug === currentSlug)
	const prev = index > 0 ? seriesPosts[index - 1] : null
	const next = index >= 0 && index < seriesPosts.length - 1 ? seriesPosts[index + 1] : null

	if (position === 'bottom') {
		if (!hasSeries) return null
		return (
			<nav className='my-10 grid gap-3 sm:grid-cols-2' aria-label='Series navigation'>
				{prev ? (
					<Link href={`/post/${prev.slug}`} className='group rounded-2xl border border-border bg-card/60 p-4 hover:border-primary/40'>
						<span className='flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground'>
							<ArrowLeft className='h-3.5 w-3.5' /> Part {prev.seriesPart}
						</span>
						<span className='mt-1 block text-sm font-semibold text-foreground group-hover:text-primary'>{prev.title}</span>
					</Link>
				) : <span className='hidden sm:block' />}
				{next && (
					<Link href={`/post/${next.slug}`} className='group rounded-2xl border border-border bg-card/60 p-4 text-right hover:border-primary/40'>
						<span className='flex items-center justify-end gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground'>
							Part {next.seriesPart} <ArrowRight className='h-3.5 w-3.5' />
						</span>
						<span className='mt-1 block text-sm font-semibold text-foreground group-hover:text-primary'>{next.title}</span>
					</Link>
				)}
			</nav>
		)
	}

	return (
		<aside className='my-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/5 p-4 sm:p-5'>
			<div className='flex flex-wrap items-center justify-between gap-2'>
				<p className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/90'>
					<Layers className='h-4 w-4' />
					{hasSeries ? `${seriesTitle ?? 'Series'} · Part ${seriesPosts[index]?.seriesPart ?? index + 1} of ${seriesPosts.length}` : 'Project write-up'}
				</p>
				{project && (
					<Link href={`/routes/projects#${project.slug}`} className='text-xs font-semibold text-cyan-200 hover:text-cyan-50'>
						About {project.name} →
					</Link>
				)}
			</div>
			{hasSeries && (
				<ol className='mt-3 space-y-1'>
					{seriesPosts.map((p) => (
						<li key={p.slug}>
							<Link
								href={`/post/${p.slug}`}
								className={cn(
									'flex gap-2 text-sm transition-colors',
									p.slug === currentSlug ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground'
								)}
							>
								<span className='font-mono text-xs leading-5'>{String(p.seriesPart ?? 0).padStart(2, '0')}</span>
								{p.title}
							</Link>
						</li>
					))}
				</ol>
			)}
		</aside>
	)
}

export default SeriesNav
