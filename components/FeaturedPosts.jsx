import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BsEye } from 'react-icons/bs'
import CountUp from 'react-countup'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { IoHeartOutline, IoThumbsUp } from 'react-icons/io5'
import { FaCrown } from 'react-icons/fa'
import { ComponentHeader } from './layout/ComponentHeading'

const FeaturedPosts = () => {
	const [posts, setPosts] = useState([])
	const [devToPosts, setDevToPosts] = useState([])
	useEffect(() => {
		getViews()
		fetchLatestDevToPost()
	}, [])

	const fetchLatestDevToPost = async () => {
		try {
			const url = '/api/devto'
			const result = await axios.request(url, {
				method: 'GET'
			})
			setDevToPosts(result.data)
		} catch (exc) {
			console.error(exc)
		}

	}
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

	const postsText = `	Dive into the sea of interesting topics and technologies.
							There is a number of topics I tried to cover, so please be my
							guest and checkout, I hope there is something for everyone`
	const devtotext = `Dive into the sea of interesting topics and technologies.
							There is a number of topics I tried to cover, so please be my
							guest and checkout, I hope there is something for everyone`

	return (
		<div className='relative bg-black overflow-hidden md:p-5' id='featuredPostsSection'>
			<div className='pt-16 pb-20 sm:pt-24 sm:pb-20 lg:pt-20 lg:pb-32'>
				<div className='relative max-w-7xl mx-auto px-4 lg:px-0 sm:static'>
				<ComponentHeader titlePrefix={'Most Popular '} title={'Posts'} text={postsText} size={'md'} />

					{posts.length > 0
						? <div className=' flex gap-6 flex-col md:flex-row mt-10 '>
							{posts.map((post) => (
								<a key={post.name}
									data-umami-event={`landing-ftr-post-${post.slug}`}
									className='transform hover:scale-[1.02] transition-all rounded-xl text-gray-500 hover:text-gray-200 w-full md:w-1/3 bg-gradient-to-r p-1 from-primary-800 to-secondary-400'
									href={post.slug}>
									<div className='flex flex-col justify-between h-full bg-black rounded-lg p-4'>
										<div className='flex flex-col md:flex-row justify-between'>
											<h3 className='text-lg md:text-lg font-medium mb-4 sm:mb-10 w-full   tracking-tight'>
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

				<div className='relative max-w-7xl mx-auto px-4 my-10 lg:px-0 sm:static'>
					<ComponentHeader titlePrefix={'My Most Popular posts on '} title={'Dev.to'} text={devtotext} size={'md'} />
				
					{devToPosts.length > 0 ? (

						<div className="flex flex-col md:flex-row gap-6 mt-10">
							{devToPosts.slice(0, 3).map((post, i) => {
								const podiumClasses =
									i === 0
										? "order-2 h-80 md:h-96 border-gold" 
										: i === 1
											? "order-1 h-72 md:h-80 border-silver"
											: "order-3 h-64 md:h-72 border-bronze";

								return (
									<a
										key={post.title}
										data-umami-event={`landing-ftr-post-${post.slug}`}
										className={`relative transform transition-all rounded-xl w-full md:w-1/3 shadow-lg hover:shadow-xl border p-0 overflow-hidden ${podiumClasses}`}
										href={post.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<div className="flex flex-col justify-between h-full rounded-lg p-4 bg-black">
											{/* First Place - Crown Icon */}
											{i === 0 && (
												<div className="absolute -top-6 -right-5 h-24 w-24 flex justify-center items-center">
													<FaCrown className="text-yellow-500  text-4xl" />
												</div>
											)}

											{/* Image Section */}
											{post.img ? (
												<img
													src={post.img}
													alt={post.title}
													className="w-full h-40 object-cover rounded-lg mb-4"
												/>
											) : (
												<div className="w-full h-40 bg-gray-800 flex items-center justify-center text-gray-600 rounded-lg mb-4">
													<span>No Image</span>
												</div>
											)}

											{/* Content Section */}
											<div className="flex flex-col flex-grow">
												<p className="text-gray-400 text-sm mb-2 truncate">Rank #{i + 1}</p>
												<h3 className="text-lg font-semibold text-white tracking-tight mb-4">
													{post.title || <Skeleton />}
												</h3>
												<p className="text-gray-400 text-sm mb-6 truncate">{post.description}</p>
											</div>

											{/* Stats Section */}
											<div className="absolute bottom-2 left-2 right-2 flex justify-between text-gray-400 text-sm">
												<div className="flex items-center">
													<BsEye className="text-indigo-400 text-lg" />
													<span className="ml-2">
														<CountUp end={post.pageViews} /> views
													</span>
												</div>
												<div className="flex items-center">
													<IoHeartOutline className="text-pink-400 text-lg" />
													<span className="ml-2">
														<CountUp end={post.publicReactions} /> reactions
													</span>
												</div>
											</div>
										</div>
									</a>
								);
							})}
						</div>

					) : (
						<div className="mt-10 grid grid-cols-3 gap-6">
							<Skeleton count={7} baseColor="#202020" highlightColor="#444" />
							<Skeleton count={7} baseColor="#202020" highlightColor="#444" />
							<Skeleton count={7} baseColor="#202020" highlightColor="#444" />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default FeaturedPosts
