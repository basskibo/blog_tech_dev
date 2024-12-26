/* eslint-disable no-tabs */
import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
const anchorOffset = 75
const TableOfContent = ({ toc }) => {
	return (
		<div className='fixed top-1/2 left-2/2 transform -translate-x-2/2 -translate-y-1/2 flex flex-col ml-20'>
			<h1 className='text-white text-start text-xl font-bold mb-3'>Table of content</h1>
			<ul className=''>
				{toc.map((item, index) => (
					<>
						<li className='my-1 text-slate-400' key={item.title}>
							<AnchorLink
								key={item.link}
								offset={() => anchorOffset}
								href={item.link}
								className='font-medium text-md lg:text-md hover:cursor-pointer hover:text-sky-400 hover:underline'
							>
								{index + 1}. {item.title}
							</AnchorLink>
						</li>
						{item.subheading.map((subhead, index) => (
							<li className='pl-3 text-slate-500 block' key={subhead.title}>
								<AnchorLink
									key={Math.random()}
									offset={() => anchorOffset}
									href={subhead.link}
									className='font-medium text-sm lg:text-sm pr-5 hover:text-sky-600'
								>
									{subhead.title}
								</AnchorLink>
							</li>
						))}
					</>
				))}
			</ul>
			{/* <LikeButton/> */}
		</div>
	)
}

export default TableOfContent
