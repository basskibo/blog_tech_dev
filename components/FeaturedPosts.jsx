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
		<div className='relative bg-background overflow-hidden md:p-5' id='featuredPostsSection'>
			<div className='pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32 safe-top safe-bottom'>
				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 sm:static'>
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

				<div className='relative max-w-7xl mx-auto px-4 sm:px-6 my-8 sm:my-10 lg:px-0 sm:static'>
					<ComponentHeader titlePrefix={'My Most Popular posts on '} title={'Dev.to'} text={devtotext} size={'md'} />
				
					{devToPosts.length > 0 ? (

						<div className="flex flex-col md:flex-row gap-4 sm:gap-6 mt-10">
							{devToPosts.slice(0, 3).map((post, i) => {
								const rankColors = {
									0: { border: "border-yellow-500/50", bg: "bg-yellow-500/10", text: "text-yellow-400", badge: "bg-yellow-500/20 text-yellow-400" },
									1: { border: "border-gray-400/50", bg: "bg-gray-400/10", text: "text-gray-300", badge: "bg-gray-400/20 text-gray-300" },
									2: { border: "border-orange-600/50", bg: "bg-orange-600/10", text: "text-orange-400", badge: "bg-orange-600/20 text-orange-400" }
								};
								const colors = rankColors[i] || rankColors[2];
								const heights = i === 0 ? "min-h-[400px] md:min-h-[450px]" : i === 1 ? "min-h-[380px] md:min-h-[420px]" : "min-h-[360px] md:min-h-[400px]";

								return (
									<a
										key={post.title}
										data-umami-event={`landing-ftr-post-${post.slug}`}
										className={`relative group transform transition-all duration-300 rounded-2xl w-full md:w-1/3 shadow-xl hover:shadow-2xl border-2 ${colors.border} ${colors.bg} overflow-hidden hover:scale-[1.02]`}
										href={post.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* Gradient Overlay */}
										<div className={`absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}></div>
										
										{/* First Place - Crown Icon */}
										{i === 0 && (
											<div className="absolute top-3 right-3 z-20 h-16 w-16 flex justify-center items-center animate-pulse">
												<FaCrown className="text-yellow-400 text-3xl drop-shadow-lg" />
											</div>
										)}

										<div className={`flex flex-col ${heights} p-5 sm:p-6 relative z-0`}>
											{/* Rank Badge */}
											<div className={`inline-flex items-center justify-center w-fit px-3 py-1.5 rounded-full ${colors.badge} text-xs sm:text-sm font-bold mb-4 backdrop-blur-sm`}>
												Rank #{i + 1}
											</div>

											{/* Image Section */}
											<div className="relative mb-4 rounded-xl overflow-hidden">
												{post.img ? (
													<img
														src={post.img}
														alt={post.title}
														className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
													/>
												) : (
													<div className="w-full h-40 sm:h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-500">
														<span className="text-sm">No Image</span>
													</div>
												)}
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
											</div>

											{/* Content Section */}
											<div className="flex flex-col flex-grow">
												<h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
													{post.title || <Skeleton />}
												</h3>
												<p className="text-gray-400 text-sm sm:text-base mb-4 line-clamp-2 flex-grow">
													{post.description}
												</p>
											</div>

											{/* Stats Section */}
											<div className="flex justify-between items-center pt-4 border-t border-gray-800/50 mt-auto">
												<div className="flex items-center gap-2 text-gray-400">
													<BsEye className="text-indigo-400 text-base sm:text-lg" />
													<span className="text-xs sm:text-sm font-medium">
														<CountUp end={post.pageViews} /> views
													</span>
												</div>
												<div className="flex items-center gap-2 text-gray-400">
													<IoHeartOutline className="text-pink-400 text-base sm:text-lg" />
													<span className="text-xs sm:text-sm font-medium">
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
