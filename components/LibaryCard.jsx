import React from 'react'
import constants from '../lib/constants'
import moment from 'moment'
import clsx from 'clsx'
import { SiGithub } from 'react-icons/si'

const LibaryCard = ({ libary }) => {
  return (
      <div
         key={libary.slug}
         className={clsx(
           libary.inPreparation
             ? 'text-slate-600 pointer-events-none bg-neutral-800 '
             : 'text-white transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow',
           'w-full  py-3 px-2 text-white  shadow-lg shadow-neutral-800 rounded-md border border-gray-600 dark:bg-dark dark:border-neutral-700 transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow overflow-hidden'
         )}>
         <a href={`/libary/${libary.slug}`}>
            {libary.inPreparation
              ? (
               <div
                  className=' bg-gradient-to-r from-[#7928ca] to-[#ff0080] origin-top float-right mt-6 mr-6 w-36 text-center text-neutral-700 font-semibold'
                  style={{ transform: 'translateX(54%) rotate(50deg)' }}>
                  <div className='text-xs py-1'>Comming soon</div>
               </div>
                )
              : (
               <div className='origin-top float-right mt-4 mr-2 w-8 text-right text-slate-200 '>
                  <SiGithub className='mr-0 pr-0 text-xl text-right content-end '></SiGithub>
               </div>
                )}

            <div className='px-3 my-3 '>
               <div className='mt-3 text-slate-400 '>
                  <h1 className='text-lg font-bold  whitespace-normal break-normal'>
                     {' '}
                     {libary.title}
                  </h1>

                  <p className='align-middle  text-slate-400 mt-1'>
                     {moment(libary.publishedAt).format('MMMM DD, YYYY')}
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
