import React from 'react'

const CategoryChip = ({ categories }) => {
	return (
		<div className='my-2'>
			{categories
				? (
					categories.map((category) => (
						<span key={category.slug} className='inline-flex'>
							<span
								className=' flex items-center mx-1 justify-cente opacity-70 text-white font-semibold rounded-lg
									2xl:text-xs text-xs px-2 py-1 border-1 border-teal-400 bg-teal-900 hover:bg-teal-500 hover:text-white hover:font-bold hover:cursor-pointer
									transition duration-500 ease-in-out backdrop-blur-2xl ml-0'>
								#{category.name}
							</span>
						</span>
					))
				)
				: (
					<></>
				)}
		</div>
	)
}

export default CategoryChip
