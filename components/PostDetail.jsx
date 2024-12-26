import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import ReadTime from './ReadTime'
import constants from '../lib/constants'
import SocialNetworkShare from './custom/SocialNetworkShare'
import LastChangedFile from './custom/LastChangedFile'
import { BsEye } from 'react-icons/bs'
import axios from 'axios'
import CountUp from 'react-countup'

const PostDetail = ({ post, content }) => {
	const [views, setviews] = useState(0)
	const url = `url('${post.featuredImage}')`

	useEffect(() => {
		getViews(post)
	}, [])

	const getViews = async (data) => {
		const url = '/api/views'
		const result = await axios(url, {
			method: 'POST',
			params: { title: data.title, description: data.excerpt, slug: `post/${data.slug}` },
			headers: {
				'Content-Type': 'application/json'
			}
		})
		setviews(result.data.views)
	}

	const generateCreditImageUrl = () => {
		return `https://unsplash.com/@${post.imageCreditUsername}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`
	}

	return (
		<div className='mx-auto lg:rounded-lg lg:p-0 lg:mt-5 sm:mt-10 xs:mt-10'>
			<div className='flex justify-left w-full pt-5 lg:pt-1  lg:mt-0'>
				<h1 className='lg:text-4xl text-xl lg:my-5 text-semibold text-white font-bold'>
					{post.title}
				</h1>
			</div>
			<div
				className="absolute top-0 left-0 w-full h-80 bg-cover blur-xs bg-center"
				style={{
					backgroundImage: url,
				}}
			>

				{/* Gradient overlay with disintegration effect */}
				<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100 mask-image mask-linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%)"></div>
			</div>
			<div className="relative z-10 text-white px-0 pt-36">
				{/* Title */}
				<div className="text-start mb-8">
					<h1 className="lg:text-5xl text-3xl font-semibold">{post.title}</h1>
				</div>

				{/* Post Info */}
				<div className="mb-8 flex justify-between items-center ">
					<div className="text-slate-400">
						<p>
							Written on{' '}
							<span className="font-semibold hidden lg:inline">
								{dayjs(post.publishedAt).format('MMMM DD, YYYY')}
							</span>{' '}
							<span className="font-semibold lg:hidden inline">
								{dayjs(post.publishedAt).format('DD.MM.YYYY')}
							</span>{' '}
							by <span className="font-semibold">{post.author}</span>
						</p>
						<LastChangedFile fileName={`${post.slug}.mdx`} type="blog" />
					</div>

					{/* Views & Read Time */}
					<div className="flex items-center text-slate-400">
						<ReadTime className="mr-6 lg:text-md sm:text-sm">{content.compiledSource}</ReadTime>
						<div className="mr-6 text-white">
							<BsEye className="inline-block text-lg" />
							<span className="ml-2 pb-1">
								<CountUp end={views} /> views
							</span>
						</div>
					</div>
				</div>

				{/* Excerpt */}
				<blockquote className="mt-0 mb-4 text-slate-400">
					<p>{post.excerpt}</p>
				</blockquote>

				{/* Share Section */}
				<div className="flex mb-2">
					<span className="mr-2 font-semibold">Share:</span>
					<SocialNetworkShare post={post} type="post" />
				</div>
			</div>
		</div>
	)
}

export default PostDetail