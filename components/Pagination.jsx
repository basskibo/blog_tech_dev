/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React from 'react'

export default function Pagination ({ numberOfPosts, pageNumber, numberOfPages }) {
  return (
		<div>
			{numberOfPosts > 0
			  ? (
				<div className=' bg-transparent max rounded-lg p-8  mb-2 '>
					<div className='flex justify-center ...'>
						<div className='py-2 px-3 leading-tight bg-slate-900 border border-sky-800 text-slate-400 rounded-lg ml-1 hover:bg-sky-800 hover:text-white hover:cursor-pointer'>
							<a className='page-link' href='#'>
								<svg
									className='w-6 h-6'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
									></path>
								</svg>
							</a>
						</div>{' '}
						<div className='py-2 px-3 leading-tight bg-slate-900 border border-sky-800 text-slate-400 rounded-lg ml-1 hover:bg-sky-800 hover:text-white hover:cursor-pointer'>
							<a className='page-link' href='#'>
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
										clipRule='evenodd'
									></path>
								</svg>
							</a>
						</div>{' '}
						<div className='py-2 px-3 leading-tight bg-slate-900 border border-sky-800 text-slate-400 rounded-lg ml-1 hover:bg-sky-800 hover:text-white hover:cursor-pointer'>
							1
						</div>{' '}
						<div className='py-2 px-3 leading-tight bg-slate-900 border border-sky-800 text-slate-400 rounded-lg ml-1 hover:bg-sky-800 hover:text-white hover:cursor-pointer'>
							2
						</div>{' '}
						<div className='py-2 px-3 leading-tight bg-slate-900 border border-sky-800 text-slate-400 rounded-lg ml-1 hover:bg-sky-800 hover:text-white hover:cursor-pointer'>
							3
						</div>{' '}
						<div className='py-2 px-3 leading-tight bg-slate-900 border border-sky-800 text-slate-400 rounded-lg ml-1 hover:bg-sky-800 hover:text-white hover:cursor-pointer'>
							<a className='page-link' href='#'>
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
										clipRule='evenodd'
									></path>
								</svg>
							</a>
						</div>{' '}
						<div className='py-2 px-3 leading-tight bg-slate-900 border border-sky-800 text-slate-400 rounded-lg ml-1 hover:bg-sky-800 hover:text-white hover:cursor-pointer'>
							<a className='page-link' href='#'>
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z'
										clipRule='evenodd'
									></path>
									<path
										fillRule='evenodd'
										d='M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z'
										clipRule='evenodd'
									></path>
								</svg>
							</a>
						</div>{' '}
					</div>
				</div>
			    )
			  : (
				<div className='container bg-sky-800 text-slate-400 items-center p-5 text-semibold'>
					{' '}
					<span>There is nothing to show! </span>
				</div>
			    )}
		</div>
  )
}
