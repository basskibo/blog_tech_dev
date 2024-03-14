import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const AnchorLinkComponent = () => {
	return (
		<AnchorLink
			id='btn-anchor-linkg'
			href='#featuredPostsSection'
			aria-label='Scroll down'
			className=' absolute hidden md:inline bottom-5 text-white left-1/2 -translate-x-1/2 md:bottom-5
rounded-md transition-colors cursor-pointer hover:text-primary-300 focus-visible:text-primary-300 animate-bounce'>
			<svg
				className='w-6 h-6'
				fill='currentColor'
				viewBox='0 0 20 20'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					fillRule='evenodd'
					d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
					clipRule='evenodd'></path>
			</svg>
		</AnchorLink>
	)
}

export default AnchorLinkComponent