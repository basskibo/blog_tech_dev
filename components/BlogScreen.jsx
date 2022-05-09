import React, { useState, useEffect } from "react"
import moment from "moment"
import { PostCard, Categories, Pagination, CategoryChip } from "../components"
import Accent from "./custom/Accent"
const numberPerPage = 1

import MotionComponent from "./custom/MotionComponent"
import "react-loading-skeleton/dist/skeleton.css"
import _ from "underscore"
import clsx from "clsx"

const getCategories = (posts) => {
	try {
		const categories = []
		posts.forEach((post) => {
			const postCategory = post.props.data.tags
			categories.push(postCategory)
		})
		const flatenedArr = categories.flat()
		function getUniqueListBy(arr, key) {
			return [...new Map(arr.map((item) => [item[key], item])).values()]
		}

		const unique = getUniqueListBy(flatenedArr, "name")

		return unique
	} catch (e) {
		throw new Error(`Error parsing category: ${e.message}`)
	}
}
const BlogScreen = ({ posts }) => {
	const [chips, setchips] = useState(getCategories(posts))
	const [search, setSearch] = useState("")
	const [foundPosts, setFoundPosts] = useState(posts)

	const handleCategoryClick = (e) => {
		e.preventDefault()
		const selected = e.target.innerText
		if (selected === search) {
			setSearch(null)
			setFoundPosts(posts)
			return
		}
		setSearch(selected)
		setFoundPosts([])
		const postsWithCategory = []

		posts.filter((el, index) => {
			//if no input the return the original
			const data = el.props.data
			if (search === "") {
				postsWithCategory.push(posts[index])
			} else {
				//return the item which contains the user input
				data.tags.forEach((tag) => {
					if (tag.name === selected) {
						postsWithCategory.push(posts[index])
					}
				})
				// const includes =
			}
		})

		setFoundPosts(postsWithCategory)
	}
	const handleSearchChange = (e) => {
		e.preventDefault()
		setSearch(e.target.value.toLowerCase())
		const filteredData = posts.filter((el) => {
			//if no input the return the original
			const data = el.props.data
			if (search === "") {
				return data
			}
			//return the item which contains the user input
			else {
				const includes =
					data.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
					data.excerpt.toLowerCase().includes(e.target.value.toLowerCase())
				return includes
			}
		})
		setFoundPosts(filteredData)
	}

	const variants = {
		visible: (index) => ({
			opacity: 1,
			transition: {
				delay: index * 1.3,
			},
		}),
		hidden: { opacity: 0 },
	}

	return (
		<MotionComponent>

		<div className='container mx-auto lg:my-14 my-5 px-5 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>

			<div className='my-8 lg:px-5'>
				
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-5xl'>Blog</Accent>
				</h1>

				<p className='display-4 '>
					In order not to wander in the dark (as I did with some things) until I
					found a solution, I wrote some things so that one day some unknown hero
					might be helped.
				</p>
				{/* <MdSearch /> */}
				<input
					className='w-full lg:w-4/4 my-3 bg-neutral-900  px-3 py-2 rounded-md
					border border-slate-600 focus:border-lime-600 flex-grow focus:outline-none cursor-text'
					placeholder='Search...'
					value={search}
					type='search'
					onChange={handleSearchChange}
				/>

				<div className='mt-1 mb-7 lg:mb-10 lg:w-4/4'>
					{chips ? (
						chips.map((category) => (
							<span key={category.slug}>
								<a
									className='inline-flex'
									disabled={true}
									onClick={handleCategoryClick}
								>
									<span
										className={clsx(
											"flex items-center m-1 justify-cente opacity-80 text-white font-bold rounded-lg text-xs px-2 py-1 border-1 border-teal-800 bg-slate-500 hover:bg-teal-800 hover:text-white hover:cursor-pointer transition duration-500 ease-in-out",
											"" ? "" : "",
											search === category.name
												? " underline decoration-solid decoration-2	decoration-lime-400 text-lime-400 underline-offset-4 "
												: "text-white"
										)}
									>
										{category.name}
									</span>
								</a>
							</span>
						))
					) : (
						<></>
					)}
				</div>

			</div>

				<div className='lg:px-5 grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-6'>
					{foundPosts.map((post, index) => (
						// <motion.div
						// 	animate='visible'
						// 	variants={variants}
						// 	transition={{ duration: 2 }}
						// >
						<PostCard className='' key={post.props.data.slug} post={post.props} />
						// </motion.div>
					))}{" "}
				</div>


		</div>
		</MotionComponent>

	)
}

export default BlogScreen
