import React from "react"
import moment from "moment"
import CategoryChip from "./CategoryChip"
import Image from "next/image"
import ReadTime from "./ReadTime"
import constants from "../lib/constants"
import SocialNetworkShare from "./custom/SocialNetworkShare"

const PostDetail = ({ post, content }) => {
	console.log(post)
	return (
		<div className=' mx-auto  lg:rounded-lg lg:p-0 lg:mt-5 sm:mt-10 xs:mt-10'>
			<div className='flex justify-center mb-8 w-full pt-5 lg:pt-1 mt-0 lg:mt-0'>
				<h1 className='lg:text-4xl text-xl lg:my-5 text-semibold text-white font-bold'>
					{post.title}
				</h1>
			</div>
			<div className='relative  md-6 h-80  '>
				<Image
					src={post.featuredImage}
					alt={post.title}
					blurDataURL={constants.imageBlogURI}
					placeholder='blur'
					layout='fill'
					priority
					className=' object-cover h-full w-full '
				/>
			</div>
			<div className='lg:px-0 prose'>
				<div className=' text-slate-400 mb-6 my-6 w-full'>
					<div className='flex-1  mb-2 w-full lg:w-auto mr-8'>
						<p className='text-slate-400 ml-2 lg:text-md sm:text-sm'>
							Writen on{" "}
							<span className='font-semibold hidden lg:inline'>
								{moment(post.publishedAt).format("MMMM DD, YYYY")}
							</span>{" "}
							<span className='font-semibold lg:hidden inline'>
								{moment(post.publishedAt).format("DD.MM.YYYY")}
							</span>{" "}
							by <span className='font-semibold'>{post.author}</span>
						</p>
					</div>
					<ReadTime className='sm:flex-1 mb-4 w-full lg:w-auto mr-8 ml-2 lg:text-md sm:text-sm'>
						{content.compiledSource}
					</ReadTime>
					<blockquote className='mt-0 mb-4'>
						<p className='text-slate-400 mt-0'>{post.excerpt}</p>
					</blockquote>

					<div className='sm:flex-1 mb-4 lg:mb-0 w-full lg:w-auto mr-8 ml-2'>
						{/* <span className='lg:text-lg sm:text-md mr-3 p-0'>Share: </span> */}
						<SocialNetworkShare post={post} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostDetail
