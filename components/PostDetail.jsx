import React from "react"
import moment from "moment"
import CategoryChip from "./CategoryChip"
import Image from "next/image"
import ReadTime from "./ReadTime"
import constants from "../lib/constants"
import { SiFacebook, SiTwitter, SiLinkedin, SiReddit, SiTelegram } from "react-icons/si"
import {
	TelegramShareButton,
	EmailIcon,
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	LinkedinShareButton,
	TwitterIcon,
	RedditButton,
	RedditIcon,
} from "react-share"

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
			<div className='lg:px-0'>
				<div className=' text-slate-400 mb-6 my-6 w-full'>
					<div className='flex-1  mb-2 w-full lg:w-auto mr-8'>
						<p className='text-slate-400 ml-2 lg:text-md sm:text-sm'>
							Writen on{" "}
							<span className='font-semibold'>
								{moment(post.publishedAt).format("MMMM DD, YYYY")}
							</span>{" "}
							by <span className='font-semibold'>{post.author}</span>
						</p>
					</div>
					<ReadTime className='sm:flex-1 mb-4  w-full lg:w-auto mr-8 ml-2 lg:text-md sm:text-sm'>
						{content.compiledSource}
					</ReadTime>
					<div className='sm:flex-1 mb-4 lg:mb-0 w-full lg:w-auto mr-8 ml-2'>
						{/* <span className='lg:text-lg sm:text-md mr-3 p-0'>Share: </span> */}
						<FacebookShareButton
							className='mr-3 '
							quote={"This is only a test"}
							url={`https://igutech.vercel.app/post/${post.slug}`}
							hashtag={"#iguana #iguanadevelopment"}
						>
							<SiFacebook size={24} rounded='true' />
						</FacebookShareButton>
						<TwitterShareButton
							className='mr-3'
							url={`https://igutech.vercel.app/post/${post.slug}`}
						>
							<SiTwitter size={24} rounded='true' />
						</TwitterShareButton>
						<LinkedinShareButton
							className='mr-3 '
							url={`https://igutech.vercel.app/post/${post.slug}`}
						>
							<SiLinkedin size={24} rounded='true' />
						</LinkedinShareButton>
						<TelegramShareButton
							className='mr-3'
							url={`https://igutech.vercel.app/post/${post.slug}`}
						>
							<SiTelegram size={24} rounded='true' />
						</TelegramShareButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostDetail
