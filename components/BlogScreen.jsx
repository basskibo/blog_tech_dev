import React, { useState } from 'react'
import Accent from './custom/Accent'
import 'react-loading-skeleton/dist/skeleton.css'
import clsx from 'clsx'
import Virtualized from './custom/Masonary'
import { ComponentHeader } from './layout/ComponentHeading'
import { generalStyles } from './config/styles'
import { Badge } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';

const getCategories = (posts) => {
	try {
		const categories = []
		posts.forEach((post) => {
			const postCategory = post.props.data.tags
			categories.push(postCategory)
		})
		const flatenedArr = categories.flat()
		// eslint-disable-next-line no-inner-declarations
		function getUniqueListBy(arr, key) {
			return [...new Map(arr.map((item) => [item[key], item])).values()]
		}
		const unique = getUniqueListBy(flatenedArr, 'name')
		return unique
	} catch (e) {
		console.error('error ', e)
		throw new Error(`Error parsing category: ${e?.message}`)
	}
}
const BlogScreen = ({ posts }) => {
	const [chips] = useState(getCategories(posts))
	const [search, setSearch] = useState('')
	const [data, setData] = useState(posts)

	const handleCategoryClick = (e) => {
		e.preventDefault()
		const selected = e.target.innerText
		if (selected === search) {
			setSearch('')
			setData(posts)
			return
		}
		setSearch(selected)
		const postsWithCategory = []

		posts.filter((el, index) => {
			// if no input the return the original
			const data = el.props.data
			if (selected === '') {
				postsWithCategory.push(posts[index])
			} else {
				// return the item which contains the user input
				data.tags.forEach((tag) => {
					if (tag.name === selected) {
						postsWithCategory.push(posts[index])
					}
				})
			}
			return true
		})

		setData(postsWithCategory)
	}

	const handleSearchChange = (e) => {
		e.preventDefault()
		setSearch(e.target.value.toLowerCase())
		const filteredData = posts.filter((el) => {
			// if no input the return the original
			const data = el.props.data
			if (search === '') {
				return data
			} else {
				const includes =
					data.title
						.toLowerCase()
						.includes(e.target.value.toLowerCase()) ||
					data.excerpt
						.toLowerCase()
						.includes(e.target.value.toLowerCase())
				return includes
			}
		})
		setData(filteredData)
	}

	const bio = `In order not to wander in the dark (as I did with some things)
					until I found a solution, I wrote some things so that one day
					some unknown hero might be helped.`

	return (
		<div className='layout mx-auto lg:my-0 my-5 py-3 sm:px-2 xs:px-3 lg:px-3  text-slate-400'>
			<div className='my-24 px-1' id="scrollableDiv">
				<ComponentHeader titlePrefix={'The '} title={'Blog'} subtitle={''} text={bio} />

				<div className='px-1'>
					<input
						className='w-full lg:w-4/4 my-3   px-3 py-2 rounded-md border border-slate-600 bg-neutral-900 flex-grow cursor-text'
						placeholder='Search...'
						value={search}
						type='search'
						onChange={handleSearchChange}
					/>
				</div>


				<div className="mt-1 mb-7 lg:mb-10 lg:w-full flex flex-wrap gap-2">
					{chips?.map((category) => (
						<Badge
							key={category.slug}
							onClick={(e) => handleCategoryClick(e)}
							variant="outline"
							color="blue"
							className={clsx(
								'cursor-pointer flex items-center px-2 py-1 transition duration-300 text-sm',
								search === category.name
									? 'bg-blue-500 text-white border-blue-600' // Highlight active
									: 'bg-transparent text-blue-500 border-blue-500 hover:bg-blue-100'
							)}
						>
							{category.name}
						</Badge>
					))}
				</div>

			</div>
			<div className=' w-full'>
				<Virtualized posts={data} type={'blog'} />

			</div>

		</div>
	)
}

export default BlogScreen
