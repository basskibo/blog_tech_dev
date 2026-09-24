import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { BsEye } from 'react-icons/bs'
import CountUp from 'react-countup'
import { IoHeartOutline, IoCalendarOutline } from 'react-icons/io5'
import { FaCrown } from 'react-icons/fa'
import { motion } from 'framer-motion'
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
			const result = await axios.request(url, { method: 'GET' })
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
			headers: { 'Content-Type': 'application/json' }
		})
		setPosts(result.data)
	}

	return (
		<section 
			className='relative bg-[#0b0c10] overflow-hidden py-20 md:py-32 px-6 sm:px-8 lg:px-12' 
			id='featuredPostsSection'
			aria-label="Featured posts"
		>
			<div className='max-w-7xl mx-auto'>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='mb-12 md:mb-16'
				>
					<span className='jag-tag mb-4 inline-block'>Latest Articles</span>
					<h2 className='font-bricolage text-4xl md:text-5xl font-bold text-white tracking-tight mb-4'>
						From the Blog
					</h2>
					<p className='text-[#9698a6] text-lg max-w-2xl'>
						Explore my latest articles covering modern web development, software architecture, and best practices.
					</p>
				</motion.div>

				{/* Blog Cards Grid */}
				{posts.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{posts.map((post, index) => (
							<BlogCard 
								key={post.name} 
								post={post} 
								index={index + 1}
								delay={index * 0.1}
							/>
						))}
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{[1, 2, 3].map((i) => (
							<div key={i} className='jag-blog-card p-6 animate-pulse'>
								<div className='h-4 bg-white/5 rounded w-16 mb-4' />
								<div className='h-6 bg-white/5 rounded w-3/4 mb-3' />
								<div className='h-4 bg-white/5 rounded w-full mb-2' />
								<div className='h-4 bg-white/5 rounded w-2/3 mb-6' />
								<div className='h-4 bg-white/5 rounded w-1/4' />
							</div>
						))}
					</div>
				)}

				{/* Dev.to Section */}
				{devToPosts.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className='mt-20 md:mt-32'
					>
						<div className='mb-12'>
							<span className='jag-tag mb-4 inline-block'>Community Picks</span>
							<h2 className='font-bricolage text-4xl md:text-5xl font-bold text-white tracking-tight mb-4'>
								Top on Dev.to
							</h2>
							<p className='text-[#9698a6] text-lg max-w-2xl'>
								My most engaged articles – tutorials and insights that resonated with the developer community.
							</p>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{devToPosts.slice(0, 3).map((post, index) => (
								<DevToCard 
									key={post.title} 
									post={post} 
									rank={index + 1}
									delay={index * 0.1}
								/>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</section>
	)
}

const BlogCard = ({ post, index, delay }) => {
	const cardRef = useRef(null)
	const [tilt, setTilt] = useState({ x: 0, y: 0 })

	const handleMouseMove = (e) => {
		if (!cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		const x = (e.clientX - rect.left) / rect.width - 0.5
		const y = (e.clientY - rect.top) / rect.height - 0.5
		setTilt({ x: y * 10, y: -x * 10 })
	}

	const handleMouseLeave = () => {
		setTilt({ x: 0, y: 0 })
	}

	const tags = ['Development', 'JavaScript', 'React', 'Node.js']
	const randomTag = tags[index % tags.length]

	return (
		<motion.a
			ref={cardRef}
			href={post.slug}
			data-umami-event={`landing-ftr-post-${post.slug}`}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.5 }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className='jag-blog-card block p-6 group'
			style={{
				transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
				transition: 'transform 0.15s ease-out, box-shadow 0.3s ease'
			}}
		>
			{/* Large Faded Number */}
			<span className='jag-card-number'>0{index}</span>
			
			{/* Tag */}
			<span className='jag-tag mb-4 inline-block relative z-10'>{randomTag}</span>
			
			{/* Title */}
			<h3 className='font-bricolage text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[oklch(0.82_0.1_232)] transition-colors relative z-10'>
				{post.name}
			</h3>
			
			{/* Excerpt */}
			<p className='text-[#9698a6] text-sm mb-6 line-clamp-3 leading-relaxed relative z-10'>
				{post.description}
			</p>
			
			{/* Footer */}
			<div className='flex items-center justify-between text-[#9698a6] text-sm relative z-10 pt-4 border-t border-white/5'>
				<span className='inline-flex items-center gap-1.5'>
					<BsEye className='w-4 h-4' />
					<CountUp end={post.views} /> views
				</span>
				<span className='inline-flex items-center gap-1.5'>
					<IoCalendarOutline className='w-4 h-4' />
					{post.date || 'Recent'}
				</span>
			</div>
		</motion.a>
	)
}

const DevToCard = ({ post, rank, delay }) => {
	const cardRef = useRef(null)
	const [tilt, setTilt] = useState({ x: 0, y: 0 })

	const handleMouseMove = (e) => {
		if (!cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		const x = (e.clientX - rect.left) / rect.width - 0.5
		const y = (e.clientY - rect.top) / rect.height - 0.5
		setTilt({ x: y * 8, y: -x * 8 })
	}

	const handleMouseLeave = () => {
		setTilt({ x: 0, y: 0 })
	}

	const rankColors = {
		1: 'from-amber-500/20 to-amber-600/5 border-amber-500/30',
		2: 'from-slate-400/20 to-slate-500/5 border-slate-400/30',
		3: 'from-orange-500/20 to-orange-600/5 border-orange-500/30'
	}

	return (
		<motion.a
			ref={cardRef}
			href={post.url}
			target="_blank"
			rel="noopener noreferrer"
			data-umami-event={`landing-ftr-post-${post.slug}`}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.5 }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className={cn(
				'block rounded-2xl overflow-hidden group',
				'bg-gradient-to-br border',
				rankColors[rank] || rankColors[3]
			)}
			style={{
				transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
				transition: 'transform 0.15s ease-out, box-shadow 0.3s ease'
			}}
		>
			{/* Image */}
			<div className="relative h-48 overflow-hidden">
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
					<div className='w-full h-full bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center'>
						<span className='text-sm text-[#9698a6]'>No Image</span>
					</div>
				)}
				{/* Rank Badge */}
				<div className='absolute top-4 left-4 z-10'>
					<span className={cn(
						'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold',
						'bg-black/60 backdrop-blur-sm text-white'
					)}>
						{rank === 1 && <FaCrown className='w-3 h-3 text-amber-400' />}
						#{rank}
					</span>
				</div>
				<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
			</div>

			{/* Content */}
			<div className='p-6'>
				<h3 className='font-bricolage text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[oklch(0.82_0.1_232)] transition-colors'>
					{post.title}
				</h3>
				<p className='text-[#9698a6] text-sm mb-4 line-clamp-2'>
					{post.description}
				</p>

				{/* Stats */}
				<div className='flex items-center justify-between text-sm text-[#9698a6] pt-4 border-t border-white/5'>
					<span className='inline-flex items-center gap-1.5'>
						<BsEye className='w-4 h-4 text-[oklch(0.82_0.1_232)]' />
						<CountUp end={post.pageViews} /> views
					</span>
					<span className='inline-flex items-center gap-1.5'>
						<IoHeartOutline className='w-4 h-4 text-pink-500' />
						<CountUp end={post.publicReactions} />
					</span>
				</div>
			</div>
		</motion.a>
	)
}

export default FeaturedPosts
