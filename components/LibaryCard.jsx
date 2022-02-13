import React from "react"
import constants from "../lib/constants"
import moment from "moment"

const LibaryCard = ({ libary }) => {
	return (
		<div
			key={libary.slug}
			className='w-full  text-white rounded-md border border-gray-600 dark:bg-dark dark:border-gray-600 transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow'
		>
			<a href={`/libary/${libary.slug}`}>
				<div className='px-3 my-3 '>
					<h1 className='text-lg font-semibold'> {libary.title}</h1>
					<div className='mt-3 text-slate-400 '>
						{" "}
						<p className='align-middle font-bold text-slate-400 mt-1'>
							{moment(libary.publishedAt).format("MMMM DD, YYYY")}
						</p>
						<div className=' text-slate-400 text-sm flex mt-3'>
							{libary.technologies.map((techIcon) =>
								constants.generateIcon(techIcon)
							)}
						</div>
						<p className=' text-slate-400 text-sm italic mt-3'>
							{libary.description}
						</p>
					</div>
				</div>
			</a>
		</div>
	)
}

export default LibaryCard
