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
import { Calendar, ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Child = ({ style, index, data, type }) => {
	const { ref, inView } = useInView();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (inView) {
			setIsVisible(true);
		}
	}, [inView]);

	const post = data[index]?.props;

	// Manually override height for "libary" type
	const customStyle = {
		...style,
		height: type === 'libary' ? '250px' : style.height, // Use fixed height from VirtualGrid
		width: style.width,
		overflow: 'hidden', // Keep overflow hidden for clean card edges
		padding: '1rem'
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut"
			}
		}
	}

	return (
		<div ref={ref} style={customStyle}>
			<motion.div
				variants={cardVariants}
				initial="hidden"
				animate={isVisible ? "visible" : "hidden"}
				className="h-full"
			>
				<Card className={cn(
					"group relative flex flex-col",
					"bg-card border-border",	
					"shadow-lg hover:shadow-2xl",
					"overflow-hidden",
					"transition-all duration-300",
					"hover:scale-[1.02]",
					post?.data?.inPreparation && "opacity-60",
					"h-full"
				)}>
					{/* Border fix to prevent line appearing on hover */}
					<div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-border/50 transition-colors duration-300 pointer-events-none z-10" />
					<Link
						href={type === 'blog' ? `/post/${post?.data?.slug}` : type === 'libary' ? `/libary/${post?.data?.slug}` : '/'}
						data-umami-event={`blog-post-${post?.data?.slug}-click`}
						className={cn(
							"relative flex flex-1 flex-col",
							post?.data?.inPreparation && "pointer-events-none cursor-not-allowed"
						)}
					>
						{/* Image Section */}
						{type === 'blog' && (
							<div className={cn(
								"relative w-full h-48 lg:h-64 xl:h-72",
								"overflow-hidden rounded-t-lg",
								"bg-muted"
							)}>
								<Image
									alt={post?.data?.title || 'Blog post image'}
									src={
										post?.data?.featuredImage ||
										'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1669989316/igutech/blogs/almos-bechtold-GFgWx3o8bTI-unsplash_nfqh81.jpg'
									}
									fill
									loading="lazy"
									className={cn(
										"object-cover transition-transform duration-500",
										"group-hover:scale-110",
										post?.data?.inPreparation && "blur-sm grayscale"
									)}
									blurDataURL={constants.imageBlogURI}
									placeholder="blur"
									sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
								/>
								{/* Gradient overlay for better tag visibility */}
								<div className={cn(
									"absolute inset-0",
									"bg-gradient-to-t from-card/80 via-transparent to-transparent"
								)} />
								{/* Tags over image */}
								{post?.data?.tags && (
									<div className={cn(
										"absolute bottom-3 left-3 right-3",
										"flex flex-wrap gap-1.5 z-10"
								)}>
										<CategoryChip categories={post?.data?.tags} />
									</div>
								)}
							</div>
						)}

						{/* Content Section */}
						<div className={cn(
							"flex flex-col flex-1",
							"p-3 sm:p-4 lg:p-5", // Reduced padding
							"min-h-0" // Allow flexbox to shrink
						)}>
							{/* Title - Limited to 2 lines to ensure Read more is visible */}
							<h2 className={cn(
								"text-lg sm:text-xl font-bold",
								"text-foreground",
								"group-hover:text-primary transition-colors duration-200",
								"leading-snug",
								"break-words",
								"flex-shrink-0",
								"line-clamp-2", // Limit to 2 lines to ensure space for Read more
								"mb-2" // Reduced margin
							)}>
								{post?.data?.title}
							</h2>

							{/* Date */}
							{!post?.data?.inPreparation && (
								<div className={cn(
									"flex items-center gap-2 flex-shrink-0",
									"text-sm text-muted-foreground",
									"mb-2" // Reduced margin
								)}>
									<Calendar className="h-4 w-4" />
									<span className="font-medium">
										{dayjs(post?.data?.publishedAt).format('MMMM DD, YYYY')}
									</span>
								</div>
							)}

							{/* Coming Soon Message */}
							{post?.data?.inPreparation && (
								<div className={cn(
									"flex items-center justify-center",
									"flex-1 py-4"
								)}>
									<p className={cn(
										"text-base font-semibold",
										"text-muted-foreground"
									)}>
										<Accent className="font-extrabold">Coming soon...</Accent>
									</p>
								</div>
							)}
							
							{/* Excerpt for libary */}
							{type === 'libary' && !post?.data?.inPreparation && (
								<p className={cn(
									"text-sm text-muted-foreground",
									"line-clamp-2 mb-3"
								)}>
									{post?.data?.excerpt}
								</p>
							)}

							{/* Read More Indicator - Always visible at bottom */}
							{!post?.data?.inPreparation && (
								<div className={cn(
									"flex items-center gap-2 mt-auto pt-2 flex-shrink-0",
									"text-sm font-medium text-primary",
									"opacity-0 group-hover:opacity-100",
									"transition-opacity duration-200",
									"border-t border-border/50"
								)}>
									<span>Read more</span>
									<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
								</div>
							)}
						</div>
					</Link>
				</Card>
			</motion.div>
		</div>
	);
};


const App = ({ posts, type }) => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
	// Increase height for blog posts to accommodate full titles
	const cellSize = !isTabletOrMobile
		? { height: type === 'libary' ? 250 : 500, width: type === 'libary' ? 400 : 400 }
		: { height: type === 'libary' ? 300 : 400, width: 300 };

	return (
		<section style={{ overflowY: 'auto' }}>
			<VirtualGrid
				total={posts.length}
				cell={cellSize}
				child={Child}
				childProps={{ data: posts,  type: type }}
				viewportRowOffset={12}
			/>
		</section>
	);
};


export default App;
