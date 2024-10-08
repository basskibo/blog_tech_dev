import React from 'react'
import { Accent } from '.'
import { SiPatreon, SiBuymeacoffee } from "react-icons/si"

const SupportMe = () => {
	return (
		<div >
			<p className='mb-10'>
				If you like what I do,in order to be updated with latest posts
				and to vote for new content please feel free to donate
				whatever amount you like. Possible options are{' '}

				<ul className='flex flex-col space-y-2 items-start mt-2'>
					<li className='inline-flex justify-center align-baseline items-center space-x-3'>
						<SiBuymeacoffee />
						<a
							href='https://www.buymeacoffee.com/basskibo'
							target='_blank'
							rel='noreferrer'
							className='text-lime-500 underline decoration-dotted decoration-2decoration-sky-400
			underline-offset-4 link link-underline link-underline-black hover:no-underline hover:cursor-ne-resize '>
							<Accent>Buy me a coffee </Accent>
						</a>
					</li>
					<li className='inline-flex justify-center align-baseline items-center space-x-3'>
						<SiPatreon />
						<a
							href='https://www.patreon.com/bePatron?u=67759634'
							data-patreon-widget-type='become-patron-button'
							className='text-lime-500 underline decoration-dotted decoration-2decoration-sky-400 underline-offset-4
			link link-underline link-underline-black hover:no-underline hover:cursor-ne-resize'>
							{' '}
							<Accent>Become a Patron! </Accent>
						</a>
					</li>
				</ul>


			</p></div >
	)
}

export default SupportMe