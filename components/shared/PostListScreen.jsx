import React, { useState, useMemo } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Virtualized from '../custom/Masonary'
import { ComponentHeader } from '../layout/ComponentHeading'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ArrowUpDown, Calendar, SortAsc, SortDesc } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import dayjs from 'dayjs'
import { getCategories } from 'utils/getCategories'


const PostListScreen = ({ 
	posts, 
	type = 'blog', // 'blog' or 'libary'
	titlePrefix = '',
	title = '',
	subtitle = '',
	description = '',
	showSort = true,
	sortOptions = ['newest', 'oldest', 'title-asc', 'title-desc']
}) => {
	const [chips] = useState(getCategories(posts))
	const [search, setSearch] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('')
	const [showFilters, setShowFilters] = useState(false)
	const [sortBy, setSortBy] = useState('newest')

	const handleCategoryClick = (categoryName) => {
		if (selectedCategory === categoryName) {
			setSelectedCategory('')
		} else {
			setSelectedCategory(categoryName)
		}
	}

	const handleSearchChange = (e) => {
		setSearch(e.target.value)
	}

	const handleSortChange = (sortType) => {
		setSortBy(sortType)
	}

	// Filter and sort posts
	const filteredAndSortedPosts = useMemo(() => {
		let filtered = posts.filter((post) => {
			const postData = post.props.data
			
			// Search filter
			const matchesSearch = search === '' || 
				postData.title.toLowerCase().includes(search.toLowerCase()) ||
				postData.excerpt?.toLowerCase().includes(search.toLowerCase())
			
			// Category filter
			const matchesCategory = selectedCategory === '' ||
				postData.tags?.some(tag => tag.name === selectedCategory)
			
			return matchesSearch && matchesCategory
		})

		// Sort posts
		const sorted = [...filtered].sort((a, b) => {
			const aData = a.props.data
			const bData = b.props.data

			switch (sortBy) {
				case 'newest':
					return dayjs(bData.publishedAt || bData.createdAt || 0).unix() - dayjs(aData.publishedAt || aData.createdAt || 0).unix()
				case 'oldest':
					return dayjs(aData.publishedAt || aData.createdAt || 0).unix() - dayjs(bData.publishedAt || bData.createdAt || 0).unix()
				case 'title-asc':
					return aData.title.localeCompare(bData.title)
				case 'title-desc':
					return bData.title.localeCompare(aData.title)
				default:
					return 0
			}
		})

		return sorted
	}, [posts, search, selectedCategory, sortBy])

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1
			}
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut"
			}
		}
	}

	return (
		<div className={cn(
			"min-h-screen bg-background",
			"bg-gradient-to-b from-background via-background/95 to-background/90",
			"px-4 sm:px-6 md:px-8 lg:px-10",
			"py-8 sm:py-12 md:py-16 lg:py-20"
		)}>
			<div className="max-w-7xl mx-auto">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="space-y-8 sm:space-y-10 md:space-y-12"
				>
					{/* Header Section */}
					<motion.div variants={itemVariants} className="text-center">
						<ComponentHeader 
							titlePrefix={titlePrefix} 
							title={title} 
							subtitle={subtitle} 
							text={description} 
						/>
					</motion.div>

					{/* Search and Filter Section */}
					<motion.div variants={itemVariants}>
						<Card className={cn(
							"p-4 sm:p-5 md:p-6",
							"bg-card/50 backdrop-blur-sm border-border",
							"shadow-xl shadow-black/5",
							"hover:shadow-2xl hover:shadow-black/10",
							"transition-all duration-300"
						)}>
							{/* Search and Controls Row */}
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
								{/* Search Input - Not full width but larger */}
								<div className="relative flex-1 max-w-lg">
									<Search className={cn(
										"absolute left-4 top-1/2 -translate-y-1/2",
										"h-5 w-5 text-muted-foreground",
										"transition-colors duration-200"
									)} />
									<Input
										type="search"
										placeholder="Search posts..."
										value={search}
										onChange={handleSearchChange}
										className={cn(
											"pl-11 pr-4 h-12 text-base",
											"bg-background/50 border-input/50",
											"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
											"transition-all duration-200",
											"hover:border-input"
										)}
									/>
								</div>

								{/* Sort Dropdown */}
								{showSort && (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="outline"
												className={cn(
													"h-12 px-4",
													"gap-2"
												)}
											>
												<ArrowUpDown className="h-4 w-4" />
												<span className="hidden sm:inline">Sort</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-48">
											<DropdownMenuLabel>Sort by</DropdownMenuLabel>
											<DropdownMenuSeparator />
											{sortOptions.includes('newest') && (
												<DropdownMenuItem
													onClick={() => handleSortChange('newest')}
													className={cn(
														"cursor-pointer",
														sortBy === 'newest' && "bg-accent"
													)}
												>
													<Calendar className="mr-2 h-4 w-4" />
													Newest first
												</DropdownMenuItem>
											)}
											{sortOptions.includes('oldest') && (
												<DropdownMenuItem
													onClick={() => handleSortChange('oldest')}
													className={cn(
														"cursor-pointer",
														sortBy === 'oldest' && "bg-accent"
													)}
												>
													<Calendar className="mr-2 h-4 w-4" />
													Oldest first
												</DropdownMenuItem>
											)}
											{(sortOptions.includes('title-asc') || sortOptions.includes('title-desc')) && (
												<>
													<DropdownMenuSeparator />
													{sortOptions.includes('title-asc') && (
														<DropdownMenuItem
															onClick={() => handleSortChange('title-asc')}
															className={cn(
																"cursor-pointer",
																sortBy === 'title-asc' && "bg-accent"
															)}
														>
															<SortAsc className="mr-2 h-4 w-4" />
															Title A-Z
														</DropdownMenuItem>
													)}
													{sortOptions.includes('title-desc') && (
														<DropdownMenuItem
															onClick={() => handleSortChange('title-desc')}
															className={cn(
																"cursor-pointer",
																sortBy === 'title-desc' && "bg-accent"
															)}
														>
															<SortDesc className="mr-2 h-4 w-4" />
															Title Z-A
														</DropdownMenuItem>
													)}
												</>
											)}
										</DropdownMenuContent>
									</DropdownMenu>
								)}

								{/* Filter Toggle Button */}
								<Button
									variant={showFilters ? "default" : "outline"}
									onClick={() => setShowFilters(!showFilters)}
									className={cn(
										"h-12 px-4 gap-2",
										showFilters && "bg-primary"
									)}
								>
									<Filter className="h-4 w-4" />
									<span className="hidden sm:inline">Filters</span>
									{selectedCategory && (
										<Badge
											variant="secondary"
											className={cn(
												"ml-1 h-5 px-1.5 text-xs",
												showFilters ? "bg-primary-foreground/20" : "bg-secondary"
											)}
										>
											1
										</Badge>
									)}
								</Button>
							</div>

							{/* Active Filters */}
							{(selectedCategory || search) && (
								<div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-border">
									<span className="text-sm text-muted-foreground">Active filters:</span>
									{selectedCategory && (
										<Badge
											variant="default"
											className={cn(
												"gap-1.5 px-2.5 py-1",
												"bg-primary text-primary-foreground"
											)}
										>
											{selectedCategory}
											<X
												className="h-3 w-3 cursor-pointer hover:opacity-70"
												onClick={() => setSelectedCategory('')}
											/>
										</Badge>
									)}
									{search && (
										<Badge
											variant="secondary"
											className={cn(
												"gap-1.5 px-2.5 py-1"
											)}
										>
											Search: {search}
											<X
												className="h-3 w-3 cursor-pointer hover:opacity-70"
												onClick={() => setSearch('')}
											/>
										</Badge>
									)}
								</div>
							)}

							{/* Category Badges - Collapsible */}
							<AnimatePresence>
								{showFilters && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="overflow-hidden"
									>
										<div className="flex flex-wrap gap-2.5 pt-2">
											{chips?.map((category) => {
												const isActive = selectedCategory === category.name
												return (
													<motion.div
														key={category.slug}
														whileHover={{ scale: 1.05 }}
														whileTap={{ scale: 0.95 }}
													>
														<Badge
															onClick={() => handleCategoryClick(category.name)}
															variant={isActive ? "default" : "outline"}
															className={cn(
																"cursor-pointer transition-all duration-200",
																"px-3 py-1.5 text-sm font-medium",
																"border-2",
																isActive
																	? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
																	: "hover:bg-accent hover:text-accent-foreground hover:border-accent"
															)}
														>
															{category.name}
														</Badge>
													</motion.div>
												)
											})}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</Card>
					</motion.div>

					{/* Posts Section */}
					<motion.div variants={itemVariants} className="w-full">
						{filteredAndSortedPosts.length > 0 ? (
							<Virtualized posts={filteredAndSortedPosts} type={type} />
						) : (
							<div className={cn(
								"flex flex-col items-center justify-center",
								"py-16 px-4",
								"text-center"
							)}>
								<p className={cn(
									"text-lg font-semibold text-foreground mb-2"
								)}>
									No posts found
								</p>
								<p className={cn(
									"text-sm text-muted-foreground"
								)}>
									Try adjusting your search or filters
								</p>
							</div>
						)}
					</motion.div>
				</motion.div>
			</div>
		</div>
	)
}

export default PostListScreen

