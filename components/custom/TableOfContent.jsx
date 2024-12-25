/* eslint-disable no-tabs */
import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
// import LikeButton from './LikeButton'
// const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
const anchorOffset = 75
const TableOfContent = ({ toc }) => {
  return (
		<div className='sticky md:my-5 lg:my-10 mx-auto mb-5 top-20 md:top-30 lg:top-40 max-w-md'>
			<h1 className='text-white text-xl font-bold mb-3'>Table of content</h1>
			<ul>
				{toc.map((item, index) => (
					<>
						<li className='my-1 text-slate-400' key={item.title}>
							<AnchorLink
								key={item.link}
								offset={() => anchorOffset}
								href={item.link}
								className='font-medium text-md lg:text-md hover:cursor-pointer hover:text-white hover:underline'
							>
								{index + 1}. {item.title}
							</AnchorLink>
						</li>
						{item.subheading.map((subhead, index) => (
							<li className='pl-3 text-slate-500 ' key={subhead.title}>
								<AnchorLink
									key={Math.random()}
									offset={() => anchorOffset}
									href={subhead.link}
									className='font-medium text-sm lg:text-sm pr-5 hover:text-white'
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
