import React, { useEffect, useState } from 'react'
import { Accent } from '.'
import axios from 'axios'

const SimiliarPosts = ({ tags }) => {
	const [similiarPosts, setSimiliarPosts] = useState(null)
	console.log('find more with tags ', tags)
	useEffect(() => {
		getViews()
	}, [])
	const getViews = async (data) => {
		const url = '/api/posts'
		const result = await axios(url, {
			method: 'GET',
			// params: {  tags : tags },
			headers: {
				'Content-Type': 'application/json'
			}
		})
		console.log(result.data)
		setSimiliarPosts(result.data?.similiarPosts)
	}

	return (
		<div className='my-5'>
			<h2 className='text-3xl my-3 font-bold'><Accent>Other posts that you might like </Accent></h2>
			<div className='flex flex-col md:flex-row gap-5 '>
				{similiarPosts ? similiarPosts?.map((post) => (
					<a href={`/post/${post?.slug}`}
						className='bg-[#00000099] border border-neutral-800 break-words rounded-lg basis-1/1 md:basis-1/2 lg:basis-1/3 h-full hover:border-[#ff0080]'>
						<img className='rounded-t-xl h-64 w-full' src={post?.featuredImage} height={30} />
						<div className='p-3 flex flex-col h-52'>
							<span className='text-white font-bold mt-2 ml-2 mb-5'>
								{post.title}
							</span>
							<span className='text-sm text-slate-400'>
								{post?.date || post?.publishedAt} 
							</span>
							<span className='text-slate-500 text-xs'>
								{post.excerpt}
							</span>
						</div>

					</a>
				)) : <></>}


			</div>
		</div>
	)
}

export default SimiliarPosts