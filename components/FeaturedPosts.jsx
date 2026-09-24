import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { BsEye } from 'react-icons/bs'
import CountUp from 'react-countup'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { IoHeartOutline } from 'react-icons/io5'
import { FaCrown } from 'react-icons/fa'
import { ComponentHeader } from './layout/ComponentHeading'
import { cn } from '@/lib/utils'

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
			if (process.env.NODE_ENV === 'development') {
				console.error(exc)
			}
		}
	}

	const getViews = async () => {
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

	const postsText = `Explore a curated collection of articles covering modern web development, software architecture, and best practices.`
	const devtoText = `My most engaged articles on Dev.to – tutorials, guides, and insights that resonated with the developer community.`

	const PostCardSkeleton = () => (
		<div className='rounded-xl bg-card border border-border p-5 animate-pulse'>
			<div className='h-6 bg-muted rounded w-3/4 mb-4' />
			<div className='h-4 bg-muted rounded w-full mb-2' />
			<div className='h-4 bg-muted rounded w-2/3 mb-6' />
			<div className='h-4 bg-muted rounded w-1/4' />
		</div>
	)

	return (
		<section 
			className='relative bg-background overflow-hidden' 
			id='featuredPostsSection'
			aria-label="Featured posts"
		>
			<div className='py-16 sm:py-20 md:py-24 lg:py-32'>
				{/* Blog Posts Section */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<ComponentHeader 
						titlePrefix='Most Popular ' 
						title='Posts' 
						text={postsText} 
						size='md' 
					/>

					{posts.length > 0 ? (
						<ul className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 list-none p-0'>
							{posts.map((post) => (
								<li key={post.name}>
									<a
										data-umami-event={`landing-ftr-post-${post.slug}`}
										href={post.slug}
										className={cn(
											"group block h-full rounded-xl overflow-hidden",
											"bg-card border border-border",
											"hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
											"transition-all duration-300 hover:-translate-y-1"
										)}
									>
										<article className='flex flex-col h-full p-5 sm:p-6'>
											<h3 className='text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2'>
												{post.name}
											</h3>
											<p className='text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow'>
												{post.description}
											</p>
											<div className='flex items-center gap-2 text-muted-foreground text-sm pt-4 border-t border-border'>
												<BsEye className='w-4 h-4' aria-hidden="true" />
												<span>
													<CountUp end={post.views} /> views
												</span>
											</div>
										</article>
									</a>
								</li>
							))}
						</ul>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12'>
							<PostCardSkeleton />
							<PostCardSkeleton />
							<PostCardSkeleton />
						</div>
					)}
				</div>

				{/* Dev.to Posts Section */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 md:mt-24'>
					<ComponentHeader 
						titlePrefix='Top posts on ' 
						title='Dev.to' 
						text={devtoText} 
						size='md' 
					/>

					{devToPosts.length > 0 ? (
						<ul className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 list-none p-0'>
							{devToPosts.slice(0, 3).map((post, i) => {
								const rankStyles = {
									0: {
										card: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800/50',
										badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
										text: 'text-amber-900 dark:text-amber-100'
									},
									1: {
										card: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/30 dark:to-slate-900/20 border-slate-200 dark:border-slate-700/50',
										badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300',
										text: 'text-slate-900 dark:text-slate-100'
									},
									2: {
										card: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 border-orange-200 dark:border-orange-800/50',
										badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
										text: 'text-orange-900 dark:text-orange-100'
									}
								}
								const styles = rankStyles[i] || rankStyles[2]

								return (
									<li key={post.title}>
										<a
											data-umami-event={`landing-ftr-post-${post.slug}`}
											href={post.url}
											target="_blank"
											rel="noopener noreferrer"
											className={cn(
												"group relative block h-full rounded-xl overflow-hidden border-2",
												"hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
												styles.card
											)}
										>
											<article className='flex flex-col h-full'>
												{/* Rank Badge & Crown */}
												<div className='absolute top-4 left-4 z-10 flex items-center gap-2'>
													<span className={cn(
														"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
														styles.badge
													)}>
														{i === 0 && <FaCrown className='w-3 h-3' aria-hidden="true" />}
														#{i + 1}
													</span>
												</div>

												{/* Image */}
												<div className="relative h-44 sm:h-52 overflow-hidden">
													{post.img ? (
														<Image
															src={post.img}
															alt=""
															fill
															className="object-cover transition-transform duration-500 group-hover:scale-105"
															sizes="(max-width: 768px) 100vw, 33vw"
															loading="lazy"
															unoptimized={post.img?.includes('amazonaws.com')}
														/>
													) : (
														<div className='w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center'>
															<span className='text-sm text-muted-foreground'>No Image</span>
														</div>
													)}
													<div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
												</div>

												{/* Content */}
												<div className='flex flex-col flex-grow p-5'>
													<h3 className={cn(
														"text-lg font-bold tracking-tight mb-2 line-clamp-2 transition-colors",
														"group-hover:text-primary",
														styles.text
													)}>
														{post.title}
													</h3>
													<p className='text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow'>
														{post.description}
													</p>

													{/* Stats */}
													<div className='flex items-center justify-between pt-4 border-t border-border/50 text-sm text-muted-foreground'>
														<span className='inline-flex items-center gap-1.5'>
															<BsEye className='w-4 h-4 text-primary' aria-hidden="true" />
															<CountUp end={post.pageViews} /> views
														</span>
														<span className='inline-flex items-center gap-1.5'>
															<IoHeartOutline className='w-4 h-4 text-pink-500' aria-hidden="true" />
															<CountUp end={post.publicReactions} />
														</span>
													</div>
												</div>
											</article>
										</a>
									</li>
								)
							})}
						</ul>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12">
							<PostCardSkeleton />
							<PostCardSkeleton />
							<PostCardSkeleton />
						</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default FeaturedPosts
