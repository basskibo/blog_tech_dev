import React from 'react'
import { generalStyles, generalTheme } from './config/styles'

const CategoryChip = ({ categories }) => {
	return (
		<div className='my-2'>
			{categories
				? (
					categories.map((category) => (
						<span key={'JSON.stringify(category.slug)'} className='inline-flex'>
							<span
								className={`flex items-center mx-1 justify-cente opacity-70 text-white font-semibold rounded-lg
									2xl:text-xs text-xs px-2 py-1 border-1 border-${generalStyles.defaultBorder} bg-${generalStyles.third} hover:bg-${generalStyles.mainColor} hover:text-white hover:font-bold hover:cursor-pointer
									transition duration-500 ease-in-out backdrop-blur-2xl ml-0`}>
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
