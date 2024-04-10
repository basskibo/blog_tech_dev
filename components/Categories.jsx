/* eslint-disable no-tabs */
import React, { useState, useEffect } from 'react'
import CategoryChip from './CategoryChip'

import { getCategories } from '../services'

const Categories = () => {
	const [categories, setCategories] = useState([])

	useEffect(() => {
		getCategories().then((newCategories) => setCategories(newCategories))
	}, [])

	return (
		<div className='bg-slate-900 border border-sky-900 shadow-lg rounded-lg p-8 mb-8'>
			<h3 className='text-xl mb-8 font-semibold border-b pb-4 text-white'>
				Categories
			</h3>
			<CategoryChip categories={categories} />
		</div>
	)
}

export default Categories
