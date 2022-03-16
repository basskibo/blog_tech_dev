import React, { useState, useEffect } from "react"
import moment from "moment"
import { PostCard, Categories, Pagination, CategoryChip } from "../components"
import Accent from "./custom/Accent"
const numberPerPage = 1
import LazyLoad from "react-lazyload"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import { LazyLoadImage } from "react-lazy-load-image-component"

const BlogScreen = ({ posts }) => {
	const [chips, setchips] = useState([{ name: "test" }, { name: "test2" }])
	const [search, setSearch] = useState(null)
	const [foundPosts, setFoundPosts] = useState(posts)
	const handleSearchChange = (e) => {
		e.preventDefault()
		setSearch(e.target.value.toLowerCase())
		const filteredData = posts.filter((el) => {
			//if no input the return the original

			const data = el.props.data
			console.log(data)
			if (search === "") {
				return data
			}
			//return the item which contains the user input
			else {
				const includes =
					data.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
					data.excerpt.toLowerCase().includes(e.target.value.toLowerCase())
				console.log(includes)
				return includes
			}
		})
		setFoundPosts(filteredData)
		console.log(filteredData)
	}

	return (
		<div className='container mx-auto my-14 px-5 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>
			<div className='my-8'>
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-6xl'>Blog</Accent>
				</h1>
				<p className='display-4'>
					In order not to wander in the dark (as I did with some things) until I
					found a solution, I wrote some things so that one day some unknown hero
					might be helped.
				</p>
				<input
					className='w-full my-3 bg-neutral-900  px-3 py-2 rounded-md
					border border-slate-600 focus:border-lime-600'
					placeholder='Search...'
					onChange={handleSearchChange}
				></input>
				<CategoryChip categories={chips} />
			</div>

			<div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-6'>
				{foundPosts.map((post, index) => (
					<PostCard className='' key={post.props.data.slug} post={post.props} />
				))}
			</div>
		</div>
	)
}

export default BlogScreen
