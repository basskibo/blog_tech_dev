import VirtualGrid from 'react-responsive-virtual-grid';
import clsx from 'clsx';
import Image from 'next/image';
import dayjs from 'dayjs';
import constants from '../../utils/constants';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Accent from './Accent';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import CategoryChip from '../CategoryChip';
import { IoCalendarClearOutline } from 'react-icons/io5';

const Child = ({ style, index, data }) => {
	const { ref, inView } = useInView();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (inView) {
			setIsVisible(true);
		}
	}, [inView]);

	const post = data[index]?.props;

	return (
		<div ref={ref} style={{ ...style, overflow: 'hidden', padding: '1rem' }}>
			<div className={`fade-in ${isVisible ? 'visible' : ''}`} style={{ height: '100%' }}>
				<div className="relative flex flex-col h-full rounded-lg border-2 border-neutral-800 shadow-lg overflow-hidden">
					<a
						data-umami-event={`blog-post-${post?.data?.slug}-click`}
						href={`/post/${post?.data?.slug}`}
						className={clsx(
							'relative flex flex-1 flex-col transition transform scale-100 card-hover cursor-pointer',
							post?.data?.inPreparation && 'pointer-events-none'
						)}
					>
						{/* Image Section */}
						<div className="relative w-full h-80"> {/* Fixed height for image */}
							<Image
								alt={post?.data?.featuredImage}
								src={
									post?.data?.featuredImage ||
									'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1669989316/igutech/blogs/almos-bechtold-GFgWx3o8bTI-unsplash_nfqh81.jpg'
								}
								layout="fill"
								objectFit="cover"
								blurDataURL={constants.imageBlogURI}
								placeholder="blur"
								sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
								className={clsx(
									'object-cover',
									post?.data?.inPreparation && 'blur-sm grayscale'
								)}
							/>
						</div>

						{/* Content Section */}
						<div className="flex flex-col space-y-2 justify-start p-3 bg-neutral-900 text-white h-full">
							<div>
								<CategoryChip categories={post?.data?.tags} className="mb-2" />
								<h1 className="text-lg font-bold mb-1">{post?.data?.title}</h1>
							</div>

							{!post?.data?.inPreparation && (
								<div>
									<div className="flex items-start space-x-1 bottom-0 text-xs text-slate-500">
										<IoCalendarClearOutline className="text-slate-500" />
										<p className="ml-1 font-semibold">
											{dayjs(post?.data?.publishedAt).format('MMMM DD, YYYY')}
										</p>
									</div>
								</div>
							)}

							{/* Coming Soon Message */}
							{post?.data?.inPreparation && (
								<div className="flex items-start justify-center h-full">
									<p className="text-md text-slate-400 coming-soon">
										<Accent className="font-extrabold">Coming soon...</Accent>
									</p>
								</div>
							)}
						</div>
					</a>
				</div>
			</div>
		</div>
	);
};


const App = ({ posts, type }) => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
	const cellSize = !isTabletOrMobile
		? { height: 400, width: 400 }
		: { height: 300, width: 300 };

	return (
		<section style={{ overflowY: 'auto' }}>
			<VirtualGrid
				total={posts.length}
				cell={cellSize}
				child={Child}
				childProps={{ data: posts }}
				viewportRowOffset={12}
			/>
		</section>
	);
};

export default App;
