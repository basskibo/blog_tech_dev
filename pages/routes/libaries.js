import React, { useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getLibaryFiles } from '../../services/indexv2'
import Virtualized from '../../components/custom/Masonary'
import clsx from 'clsx'
import { ComponentHeader } from '@/components/layout/ComponentHeading'
import { Badge } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';
import { libaryBio } from '@/components/config/bios'

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
		<div className='layout mx-auto lg:my-0 my-5  sm:px-2 xs:px-3 lg:px-5 py-2 text-center text-slate-400'>
			<div className='my-24 lg:my-20 sm:mt-40 px-1'>
				<ComponentHeader titlePrefix={'Created '} title={'Libaries'} subtitle={''} text={libaryBio} />
				<input
					className='w-full my-3   px-3 py-2 rounded-md border border-slate-600 bg-neutral-900'
					placeholder='Search...'
					onChange={handleSearchChange}
				></input>
				<div className="mt-1 mb-7 lg:mb-10 lg:w-full flex flex-wrap gap-2">
					{chips?.map((category) => (
						<Badge
							key={category.slug}
							onClick={(e) => handleCategoryClick(e)}
							variant="outline"
							color="blue"
							className={clsx(
								'cursor-pointer flex items-center px-2 py-1 transition duration-300',
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
			<div className=' w-full mt-10'>
				<Virtualized posts={data} type={'libary'} />

			</div>
		</div>
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
