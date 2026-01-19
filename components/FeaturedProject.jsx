import React from 'react'
import EmbeddedLink from './custom/EmbededLInk'
import Image from 'next/image'

const FeaturedProject = () => {
	return (
		// <div className='bg-gradient-to-b from-neutral-900  to-[#7928ca] '>
		<div className=' relative    '>
			<div className='  pt-16 pb-20 sm:pt-24 sm:pb-20 lg:pt-20 lg:pb-32'>
				<div className='  absolute max-w-7xl mx-auto px-4 lg:px-0 sm:static'>
					<div className=' sm:max-w-lg'>
						<h2 className='text-xl font font-bold tracking-tight text-white sm:text-4xl'>
							Coming soon
							{/* <Accent> posts</Accent> */}
							{/* Popular posts */}
						</h2>
						<p className='mt-4 text-md text-slate-400'>
							Dive into the sea of interesting topics and technologies.
							There is a number of topics I tried to cover, so please be my
							guest and checkout, I hope there is something for everyone
						</p>
					</div>

					<div className='imageContainer relative w-full h-auto'>
						<Image 
							src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							className='responsiveImage'
							width={1887}
							height={1258}
							alt='scratch travel'
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							priority={false}
						/>
					</div>


				</div>
			</div>
			{/* <div className='h-24 bg-gradient-to-b from-neutral-900  to-[#7928ca]'>

			</div>
			<div className='h-16 bg-gradient-to-t from-neutral-900  to-[#7928ca]'>

			</div> */}
		</div>
	)
}

export default FeaturedProject