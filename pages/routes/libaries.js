import React, { useState } from 'react'
import Accent from '../../components/custom/Accent'
// import LibaryCard from '../../components/LibaryCard'
import 'react-loading-skeleton/dist/skeleton.css'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getLibaryFiles } from '../../services/indexv2'
import Virtualized from '../../components/custom/Masonary'
import clsx from 'clsx'

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
		throw new Error(`Error parsing category: ${e.message}`)
	}
}

const Libaries = ({ libaries }) => {
	const [chips] = useState(getCategories(libaries))
	const [search, setSearch] = useState('')
	const [data, setData] = useState(libaries)
	console.log('chips', chips)

	const handleCategoryClick = (e) => {
		e.preventDefault()
		const selected = e.target.innerText
		if (selected === search) {
			setSearch('')
			setData(libaries)
			return
		}
		setSearch(selected)
		const postsWithCategory = []

		libaries.filter((el, index) => {
			// if no input the return the original
			const data = el.props.data
			if (selected === '') {
				postsWithCategory.push(libaries[index])
			} else {
				// return the item which contains the user input
				data.tags.forEach((tag) => {
					if (tag.name === selected) {
						postsWithCategory.push(libaries[index])
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
		const filteredData = libaries.filter((el) => {
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
		// <MotionComponent>
		<div className='layout mx-auto lg:my-14 my-5  sm:px-2 xs:px-3 lg:px-5 py-3 text-center text-slate-400'>
			<div className='my-8 px-1'>
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-5xl'>Libary</Accent> ({data?.length})
				</h1>
				<p className='display-4 px-1'>
					Here you can find some of my simple libaries and repositories
					which are open source so feel free to use it in your projects.
				</p>
				<input
					className='w-full my-3 bg-neutral-900  px-3 py-2 rounded-md border border-slate-600 focus:border-lime-600'
					placeholder='Search...'
					onChange={handleSearchChange}
				></input>
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
												'flex items-center m-1 justify-cente opacity-80 text-white font-bold  rounded-lg text-sm px-2 py-2 border-1 border-teal-700 bg-[#7928ca] hover:bg-[#ff0080] hover:text-white hover:cursor-pointer transition duration-500 ease-in-out', '' ? '' : '',
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
				<Virtualized posts={data} type={'libary'} />

			</div>
		</div>
		// </MotionComponent>
	)
}
export default Libaries

export const getStaticProps = async () => {
	const files = getLibaryFiles()
	const libaries = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join('posts/libaries', filename),
			'utf-8'
		)
		let { content, data } = matter(markdownWithMeta)
		data = { ...data, slug: filename.split('.')[0] }
		return {
			props: {
				data,
				content
			}
		}
	})
	return {
		props: {
			libaries
		}
	}
}
