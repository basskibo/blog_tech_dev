import React, { useState } from 'react'
import Accent from './custom/Accent'
import 'react-loading-skeleton/dist/skeleton.css'
import clsx from 'clsx'
import Virtualized from './custom/Masonary'

const getCategories = (posts) => {
	try {
		const categories = []
		console.log(posts)
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
	// const [items, setItems] = useState(foundPosts.slice(0, currentIndex))
	// const [featuredPost, setfeaturedPost] = useState(posts[9])

	// const fetchMoreData = () => {
	//   if (items.length >= foundPosts.length) {
	//     sethasMore(false)
	//   } else {
	//     if ((currentIndex + pointer) > lastIndex) {
	//       pointer = lastIndex - currentIndex
	//     }
	//     const nextIndex = currentIndex + pointer
	//     const newData = foundPosts.slice(currentIndex, nextIndex)
	//     setTimeout(() => {
	//       setItems(
	//         items.concat(newData)
	//       )
	//       setCurrentIndex(nextIndex)
	//     }, 1000)
	//   }
	// }

	// const findFeaturedPost = () => {
	//   posts.forEach(post => {
	//     const { data } = post.props
	//     if (data.featuredPost) {
	//       setfeaturedPost(data)
	//     }
	//   })
	// }

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

	return (
		<div className='layout mx-auto lg:my-14 my-5 py-3 sm:px-2 xs:px-3 lg:px-3  text-slate-400'>
			<div className='my-8 px-1' id="scrollableDiv">
				<h1 className='mb-5 text-center'>
					<Accent className='font-extrabold text-5xl'>Blog </Accent>
					({data?.length})
				</h1>

				<p className='display-4 px-1'>
					In order not to wander in the dark (as I did with some things)
					until I found a solution, I wrote some things so that one day
					some unknown hero might be helped.
				</p>
				{/* <MdSearch /> */}
				<div className='px-1'>
					<input
						className='w-full lg:w-4/4 my-3 bg-neutral-900  px-3 py-2 rounded-md border border-slate-600  flex-grow cursor-text'
						placeholder='Search...'
						value={search}
						type='search'
						onChange={handleSearchChange}
					/>
				</div>

				<div className='mt-1 mb-7 lg:mb-10 lg:w-4/4'>
					{chips
						? (
							chips.map((category) => (
								<span key={category.slug}>
									<a
										className='inline-flex'
										disabled={true}
										onClick={handleCategoryClick}>
										<span
											className={clsx(
												// eslint-disable-next-line no-constant-condition
												'flex items-center m-1 justify-cente opacity-80 text-white font-bold rounded-lg text-xs px-2 py-1 border-1 border-teal-700 bg-[#7928ca] hover:bg-[#ff0080] hover:text-white hover:cursor-pointer transition duration-500 ease-in-out', '' ? '' : '',
												search === category.name
													? ' underline decoration-solid decoration-2 bg-[#ff0080]  underline-offset-4 '
													: 'text-white'
											)}>
											{category.name}
										</span>
									</a>
								</span>
							))
						)
						: (
							<></>
						)}
				</div>
			</div>
			<div className=' w-full'>
				<Virtualized posts={data} type={'blog'} />

			</div>

		</div>
	)
}

export default BlogScreen
