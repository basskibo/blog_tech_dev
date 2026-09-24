import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { IoArrowForward } from 'react-icons/io5'

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
		<article
			className={cn(
				'group relative overflow-hidden rounded-2xl',
				'bg-gradient-to-br from-card via-card to-card/80',
				'border border-border hover:border-primary/30',
				'shadow-lg hover:shadow-xl hover:shadow-primary/5',
				'transition-all duration-300',
				className
			)}
		>
			{/* Subtle gradient accent */}
			<div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />
			
			<div className='relative p-5 sm:p-6'>
				<div className='flex flex-col gap-4'>
					{/* Header with label and preview */}
					<div className='flex items-start justify-between gap-4'>
						<div className='flex-1 min-w-0'>
							<span className='inline-block text-xs font-semibold uppercase tracking-wider text-primary mb-2'>
								{label}
							</span>
							{title && (
								<h3 className='text-lg sm:text-xl font-bold text-foreground leading-tight'>
									{title}
								</h3>
							)}
						</div>
						
						{showPreview && previewImage && (
							<div className='hidden sm:block flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-border/50 shadow-md'>
								<div
									className='h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110'
									style={{ backgroundImage: `url(${previewImage})` }}
									role="img"
									aria-label={previewAlt}
								/>
							</div>
						)}
					</div>

					{/* Description */}
					{description && (
						<p className='text-sm text-muted-foreground leading-relaxed'>
							{description}
						</p>
					)}

					{/* Actions */}
					<div className='flex flex-wrap items-center gap-3 pt-2'>
						{primaryHref && primaryText && (
							<Button
								asChild
								size='sm'
								className={cn(
									'bg-primary hover:bg-primary/90 text-primary-foreground',
									'font-medium shadow-sm',
									'transition-all duration-200'
								)}
							>
								{primaryInternal ? (
									<Link href={primaryHref} className='inline-flex items-center gap-1.5'>
										{primaryText}
										<IoArrowForward className='w-3.5 h-3.5' aria-hidden="true" />
									</Link>
								) : (
									<a href={primaryHref} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1.5'>
										{primaryText}
										<IoArrowForward className='w-3.5 h-3.5' aria-hidden="true" />
									</a>
								)}
							</Button>
						)}

						{secondaryHref && secondaryText && (
							<Button
								asChild
								variant='ghost'
								size='sm'
								className='text-muted-foreground hover:text-foreground font-medium'
							>
								<a href={secondaryHref} target='_blank' rel='noopener noreferrer'>
									{secondaryText}
								</a>
							</Button>
						)}
					</div>
				</div>
			</div>
		</article>
	)
}

export default FeaturedProjectTeaser


