import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BsEye } from 'react-icons/bs'
import CountUp from 'react-countup'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FeaturedPosts = () => {
	const [posts, setPosts] = useState([])
	// const [devToPosts, setDevToPosts] = useState([])
	useEffect(() => {
		getViews()
		// fetchLatestDevToPost()
	}, [])

	// const fetchLatestDevToPost = async () => {
		// const url = 'https://dev.to/api/articles/me/all'
		// const result = await axios.get(url, {
		// 	method: 'GET',
		// 	params: {
		// 		page: 1,
		// 		per_page: 3
		// 	},
		// 	headers: {
		// 		'api-key': process.env.REACT_DEVTO_API_KEY,
		// 		'Content-Type': 'application/json',
		// 		'Access-Control-Allow-Headers': '*'

		// 	}
		// })
		// setDevToPosts(result.data)
	// }
	const getViews = async (data) => {
		const url = '/api/views/featured'
		const result = await axios(url, {
			method: 'POST',
			params: {},
			headers: {
				'Content-Type': 'application/json'
			}
		})
		setPosts(result.data)
	}

	return (
		<div className='relative bg-black overflow-hidden md:p-5' id='featuredPostsSection'>
			<div className='pt-16 pb-20 sm:pt-24 sm:pb-20 lg:pt-20 lg:pb-32'>
				<div className='relative max-w-7xl mx-auto px-4 lg:px-0 sm:static'>
					<div className='sm:max-w-lg'>
						<h2 className='text-xl font font-bold tracking-tight text-white sm:text-4xl'>
							Popular posts
							{/* <Accent> posts</Accent> */}
							{/* Popular posts */}
						</h2>
						<p className='mt-4 text-md text-slate-400'>
							Dive into the sea of interesting topics and technologies.
							There is a number of topics I tried to cover, so please be my
							guest and checkout, I hope there is something for everyone
						</p>
					</div>
					{posts.length > 0
						? <div className=' flex gap-6 flex-col md:flex-row mt-10'>
							{posts.map((post) => (
								<a key={post.name}
									data-umami-event={`landing-ftr-post-${post.slug}`}
									className='transform hover:scale-[1.02] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-[#7928ca] to-[#ff0080]'
									href={post.slug}>
									<div className='flex flex-col justify-between h-full   rounded-lg p-4'>
										<div className='flex flex-col md:flex-row justify-between'>
											<h3 className='text-lg md:text-lg font-medium mb-4 sm:mb-10 w-full text-gray-100 tracking-tight'>
												{post.name || <Skeleton />}
											</h3>
										</div>
										<p className='text-gray-400 text-sm my-2 truncate '>{post.description}</p>

										<div className='flex items-center text-gray-400 capsize'>
											<BsEye className='text-lg' />
											<span className='ml-2 text-sm align-baseline capsize'>
												<CountUp end={post.views} /> views
											</span>
										</div>
									</div>
								</a>
							))}
						</div>
						: <div className='mt-10 grid grid-cols-3 gap-6'>
							<Skeleton count={7} baseColor="#202020" highlightColor="#444" />
							<Skeleton count={7} baseColor="#202020" highlightColor="#444" />
							<Skeleton count={7} baseColor="#202020" highlightColor="#444" />

						</div>}
				</div>
			</div>


			{/* <div className=''>
				<div className='relative max-w-7xl mx-auto px-4 lg:px-0 sm:static'>
					<div className='sm:max-w-lg'>
						<h2 className='text-xl font font-bold tracking-tight text-white sm:text-4xl'>
							My Latest Dev.to posts
			
						</h2>
						<p className='mt-4 text-md text-slate-400'>
							Dive into the sea of interesting topics and technologies.
							There is a number of topics I tried to cover, so please be my
							guest and checkout, I hope there is something for everyone
						</p>
					</div>
					{devToPosts.length > 0
						? <div className=' flex gap-6 flex-col md:flex-row mt-10'>
							{devToPosts.map((post) => (
								<a key={post.name}
									className='transform hover:scale-[1.02] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-[#7928ca] to-[#ff0080]'
									href={post.slug}>
									<div className='flex flex-col justify-between h-full   rounded-lg p-4'>
										<div className='flex flex-col md:flex-row justify-between'>
											<h3 className='text-lg md:text-lg font-medium mb-4 sm:mb-10 w-full text-gray-100 tracking-tight'>
												{post.name || <Skeleton />}
											</h3>
										</div>
										<p className='text-gray-400 text-sm my-2 truncate '>{post.description}</p>

										<div className='flex items-center text-gray-400 capsize'>
											<BsEye className='text-lg' />
											<span className='ml-2 text-sm align-baseline capsize'>
												<CountUp end={post.views} /> views
											</span>
										</div>
									</div>
								</a>
							))}
						</div>
						: <div className='mt-10 grid grid-cols-3 gap-6'>
							<Skeleton count={7} baseColor="#202020" highlightColor="#444" />
							<Skeleton count={7} baseColor="#202020" highlightColor="#444" />
							<Skeleton count={7} baseColor="#202020" highlightColor="#444" />

						</div>}
				</div>
			</div> */}
		</div>
	)
}

export default FeaturedPosts
