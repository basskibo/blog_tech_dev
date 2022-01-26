import React from "react"
import moment from "moment"

import Link from "next/link"

const PostCard = ({ post }) => {
	return (
		<div className='bg-slate-900 shadow-lg first:mt-5 lg:mt-5 sm:mt-10 lg:rounded-lg p-0 lg:p-0 lg:pb-7 pb-12 md-8 mb-12 lg:md-14'>
			<div className='relative overflow-hidden shadow-md pb-80 md-6' alt='image'>
				<img
					src={post.featuredImage.url}
					alt={post.title}
					className='object-cover absolute h-80 w-full object-cover shadow-lg lg:rounded-t-lg '
				/>
			</div>
			<div className=' bg-slate-800 border-slate-600 pb-5'>
				<h1 className='transition duration-800 pt-4   text-center mb-8 cursor-pointer hover:text-sky-800 text-3xl  text-white font-semibold'>
					<Link href={`/post/${post.slug}`}>{post.title}</Link>
				</h1>
				<div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
					<div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
						<img
							alt={post.author.name}
							height='20px'
							width='20px'
							className='inline-block h-8 w-8 rounded-full ring-2 ring-orange-600'
							// className="align-middle rounded-full"
							src={post.author.photo.url}
						/>
						<p className='inline align-middle text-slate-400 ml-2 lg:text-lg'>
							{post.author.name}
						</p>
					</div>
					<div className='font-medium text-slate-400'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 inline mr-2 text-sky-800'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
							/>
						</svg>
						<span className='align-middle text-slate-400 lg:text-lg'>
							{moment(post.createdAt).format("MMM DD, YYYY")}
						</span>
					</div>
				</div>
				<p className='text-center text-lg text-slate-400 font-normal px-3 lg:px-20 mb-4'>
					{post.excerpt}
				</p>

				<div className='text-center lg:mt-5'>
					<Link href={`/post/${post.slug}`}>
						<a class='inline-flex hover:animate-pulse'>
							<span class='h-12 flex items-center mt-3 justify-center  uppercase font-semibold px-5 border-2 border-sky-800 text-slate-400 hover:bg-sky-800 hover:text-white hover:border-slate-400 hover:cursor-pointer transition duration-500 ease-in-out'>
								Continue reading
								<span className='ml-2  '>
									<svg
										class='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M17 8l4 4m0 0l-4 4m4-4H3'
										></path>
									</svg>
								</span>
							</span>
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default PostCard
