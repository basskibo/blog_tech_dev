import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const FeaturedProjectTeaser = ({
	label = 'Featured project',
	title,
	description,
	primaryHref,
	primaryText,
	primaryInternal = false,
	secondaryHref,
	secondaryText,
	className = '',
	showPreview = false,
	previewImage,
	previewAlt = ''
}) => {
	return (
		<div
			className={cn(
				'relative overflow-hidden rounded-2xl border border-border bg-black/40 backdrop-blur-md px-4 py-4 sm:px-6 sm:py-5 shadow-[0_0_30px_rgba(15,23,42,0.6)]',
				className
			)}
		>
			<div className='absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-emerald-400/10 pointer-events-none' />
			<div className='relative flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center'>
				<div className='flex-1 space-y-1'>
					<p className='text-[0.7rem] sm:text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80'>
						{label}
					</p>
					{title && (
						<h2 className='text-base sm:text-lg md:text-xl font-semibold text-foreground'>
							{title}
						</h2>
					)}
					{description && (
						<p className='text-xs sm:text-sm text-muted-foreground max-w-2xl'>
							{description}
						</p>
					)}
				</div>

				{showPreview && previewImage && (
					<div className='hidden md:block w-40 h-24 rounded-xl overflow-hidden border border-border/60 bg-black/60 shadow-lg'>
						<div
							className='h-full w-full bg-cover bg-center'
							style={{ backgroundImage: `url(${previewImage})` }}
							aria-label={previewAlt}
						/>
					</div>
				)}

				<div className='flex flex-col sm:flex-row gap-2 sm:gap-3'>
					{primaryHref && primaryText && (
						<Button
							asChild
							size='sm'
							variant='outline'
							className={cn(
								'border-cyan-400/70 bg-black/70 text-cyan-200',
								'shadow-[0_0_18px_rgba(34,211,238,0.45)]',
								'hover:bg-cyan-500/10 hover:border-cyan-300 hover:text-cyan-50',
								'rounded-full px-4 text-xs sm:text-sm'
							)}
						>
							{primaryInternal ? (
								<Link href={primaryHref}>{primaryText}</Link>
							) : (
								<a href={primaryHref} target='_blank' rel='noopener noreferrer'>
									{primaryText}
								</a>
							)}
						</Button>
					)}

					{secondaryHref && secondaryText && (
						<Button
							asChild
							variant='outline'
							size='sm'
							className={cn(
								'border-border bg-black/60 text-muted-foreground',
								'hover:bg-muted/40 hover:text-foreground',
								'rounded-full px-4 text-xs sm:text-sm'
							)}
						>
							<a href={secondaryHref} target='_blank' rel='noopener noreferrer'>
								{secondaryText}
							</a>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default FeaturedProjectTeaser


