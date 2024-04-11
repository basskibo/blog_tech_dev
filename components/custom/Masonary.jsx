
// Then, you can access the hooks like this:
// import { useInsertionEffect } from 'framer-motion';
import VirtualGrid from 'react-responsive-virtual-grid';
// import PostCard from '../PostCard'
import clsx from 'clsx';
import Image from 'next/image';
// import ReadTime from '../ReadTime'
import dayjs from 'dayjs';
import constants from '../../utils/constants';
// import CategoryChip from '../CategoryChip'
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Accent from './Accent';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const Child = ({ style, index, data, readyInViewport, scrolling }) => {
	const { ref, inView, entry } = useInView();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		console.log('in view' , inView)
		console.log('entry' , entry)
		if (inView) {
			setIsVisible(true);
		}
	}, [inView]);
	const post = data[index]?.props
	return (
		<motion.div
			ref={ref}

			initial={{ opacity: 0, y: -25 }} // Initial animation state
			animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
			transition={{ duration: 0.5, delay: index * 0.1 }} // Apply stagger delay
			style={{  opacity: 0 }}
			key={post.id}
		>
			<div
				style={{ display: 'flex', borderRadius: '15px', ...style }}>
				<a
					data-umami-event={`blog-post-${post?.data?.slug}-click`}
					// data-splitbee-event={`Blog post clicked ${post?.data?.slug}_post`}
					// id={`${post?.data?.slug}_post`}
					className={clsx(
						post?.data?.inPreparation ? ' pointer-events-none ' : ' ', 'relative flex flex-wrap  items-end justify-end flex-1 m-2 h-96 transform-gpu scale-100 hover:scale-[1.02] active:scale-[0.99] hover:cursor-pointer  transition duration-100 animate-shadow rounded-lg border-4 border-neutral-800'
					)}
					href={`/post/${post?.data?.slug}`}
				>
					{/* <span style={{ position: 'absolute' }}>Pcisum #{index}{scrolling ? ' - Scrolling' : ''}{readyInViewport ? ' - ReadyInViewport' : ''}<	/span> */}
					<Image
						alt={post?.data?.featuredImage}
						src={post?.data?.featuredImage || 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1669989316/igutech/blogs/almos-bechtold-GFgWx3o8bTI-unsplash_nfqh81.jpg'}
						layout='fill'
						style={{ transform: 'translate3d(0, 0, 0)' }}
						blurDataURL={constants.imageBlogURI}
						placeholder='blur'
						sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
						className={clsx(
							post?.data?.inPreparation ? 'blur-sm grayscale' : '',
							'object-cover '
						)}
					/>

					{/* <div className=' pt-0 self-end  text-white text-xs md:text-xs text-center leading-4'>
							<CategoryChip className='my-0' categories={post?.data?.tags} />
                         </div> */}
					<div
						// backdrop-blur-3xl
						className={clsx(post?.data?.inPreparation ? ' text-slate-400 h-1/3' : 'lg:h-2/5 xs:h-1/2   hover:bg-neutral-900  text-white',
							'pr-3 mt-1 z-50 bg-neutral-900  w-full bottom-0 p-3 '
						)}>
						<h1 className='text-md font-bold '> {post?.data?.title}</h1>
						<div className='mt-1 text-white flex-row '>
							<div className='basis-1/2 '>
								<p className='align-middle  font-semibold text-xs text-slate-400 '>
									{post?.data?.inPreparation
										? ''
										: dayjs(post?.data?.publishedAt).format(
											'MMMM DD, YYYY'
										)}
								</p>
							</div>
							{/* <div className=' basis-1/2 pt-0 bottom-0 inset-x-0  text-white text-xs md:text-xs text-center leading-4'>
                             <CategoryChip className='my-0' categories={post.data.tags} />
                         </div> */}

							<div className='mt-1 '>
								{post?.data?.inPreparation
									? <p className=' my-5 bottom-0 h-64'><Accent className='w-full bg-neutral-900  font-extrabold animate-pulse'>Cooming soon...</Accent></p>
									: <div className=''><p className='align-middle italic text-xs text-slate-400  '>
										{post?.data?.excerpt}
									</p>
										{/* <div className=' w-full pt-0 bottom-0 inset-x-0  text-white text-xs md:text-xs text-center leading-4'>
                             <CategoryChip className='my-0' categories={post?.data?.tags} />
                         </div> */}
									</div>}
							</div>
						</div>
					</div>
				</a>
			</div>
		</motion.div>
	)
}

const ChildLibrary = ({ style, index, data, readyInViewport, scrolling }) => {
	const post = data[index]?.props
	return (
		//     <div className='my-5'>
		//  <LibaryCard libary={post.data}
		//     key={post.data.slug} />
		//     </div>
		<div
			style={{ display: 'flex', borderRadius: '15px', ...style }} >
			<a
				data-umami-event={`lib-post-${post?.data?.slug}-click`}

				// data-splitbee-event={`Blog post clicked ${post?.data?.slug}_post`}
				id={`${post?.data?.slug}_post`}
				className={clsx(
					post?.data?.inPreparation ? ' pointer-events-none border-2' : 'border-4 ', 'relative flex flex-wrap   flex-1 m-2 h-48 transform-gpu scale-100 hover:scale-[1.02] active:scale-[0.99] hover:cursor-pointer transition duration-100 animate-shadow rounded-lg  border-neutral-800'
				)}

				href={`/libary/${post?.data?.slug}`}
			>

				<div
					className={clsx(post?.data?.inPreparation ? ' text-slate-400 bg-neutral-800' : 'bg-neutral-900  text-white',
						'pr-3 z-50  w-full bottom-0 p-3 '
					)}>
					<h1 className='text-lg font-bold '> {post?.data?.title}</h1>
					<div className='mt-1 text-white flex-row '>

						<div className='basis-1/2'>
							<p className='align-middle  font-semibold text-sm text-slate-400 mt-1'>
								{post?.data?.inPreparation
									? ''
									: dayjs(post?.data?.publishedAt).format(
										'MMMM DD, YYYY'
									)}
							</p>
						</div>
						<div className=' text-slate-400 text-sm flex mt-3'>
							{post?.data?.technologies.map((techIcon) =>
								constants.generateIcon(techIcon)
							)}
						</div>
						<div className=' '>
							{post?.data?.inPreparation
								? <p className=' my-2 bottom-0 h-10'><Accent className='w-full bg-neutral-900  font-extrabold animate-pulse'>Cooming soon...</Accent></p>
								: <div className=''><p className='align-middle italic text-sm text-slate-400 mt-1 '>
									{post?.data?.excerpt}
								</p>

								</div>}
						</div>
					</div>
				</div>
			</a>
		</div>

	)
}

const App = ({ ...props }) => {
	console.log(props)
	const data = props.posts
	const type = props.type
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
	const cellWidthByType = type === 'blog' ? { height: 400, width: 400 } : { height: 200, width: 400 }
	const cellHeightByType = type === 'blog' ? { height: 400 } : { height: 200 }
	const cellSize = !isTabletOrMobile ? cellWidthByType : cellHeightByType
	return (
		<section style={{  }}>
				<VirtualGrid
					total={props.posts.length}
					cell={cellSize}
					child={type === 'blog' ? Child : ChildLibrary}
					childProps={{ data }}
					viewportRowOffset={12}
					// initial={{ opacity: 0 }}
					// animate={{ opacity: 1 }}
					// transition={{ duration: 0.5 }}
				/>
		</section>
	)
}

export default App
