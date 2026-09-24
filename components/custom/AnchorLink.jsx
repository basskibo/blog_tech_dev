import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { cn } from '@/lib/utils'

const AnchorLinkComponent = () => {
	return (
		<AnchorLink
			data-umami-event="btn-anchor-link"
			id='btn-anchor-link'
			href='#featuredPostsSection'
			aria-label='Scroll to featured posts section'
			className={cn(
				'group inline-flex flex-col items-center gap-2',
				'text-muted-foreground hover:text-primary',
				'transition-colors duration-200 cursor-pointer',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
				'rounded-lg p-2'
			)}
		>
			<span className='text-xs font-medium uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity'>
				Scroll
			</span>
			<svg
				className='w-5 h-5 animate-bounce'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'
				aria-hidden="true"
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M19 14l-7 7m0 0l-7-7m7 7V3'
				/>
			</svg>
		</AnchorLink>
	)
}

export default AnchorLinkComponent