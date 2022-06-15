import React from "react"
import Link from "next/link"

const CategoryChip = ({ categories }) => {
	console.log(categories)
	return (
		<div className='my-2'>
			{categories ? (
				categories.map((category) => (
					<span key={category.slug}>
						<a className='inline-flex' disabled={true}>
							<span
								className=' flex items-center mx-1 justify-cente opacity-70 text-white font-bold rounded-lg
							 text-sm px-2 py-1 border-1 border-teal-800 bg-slate-500 hover:bg-teal-800 hover:text-white hover:cursor-pointer
							  transition duration-500 ease-in-out'
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
	)
}

export default CategoryChip
