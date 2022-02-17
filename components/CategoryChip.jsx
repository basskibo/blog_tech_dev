import React from "react"
import Link from "next/link"

const CategoryChip = ({ categories }) => {
	return (
		<div className='my-5'>
			{categories ? (
				categories.map((category) => (
					<span key={category.slug}>
						<a className='inline-flex' disabled={true}>
							<span className=' flex items-center m-1 justify-cente opacity-80 text-white rounded-full text-sm px-3 py-1 border-2 border-teal-800 text-slate-400 hover:bg-teal-800 hover:text-white hover:cursor-pointer transition duration-500 ease-in-out'>
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
