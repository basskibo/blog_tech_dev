import React from 'react'
import moment from 'moment'
import CategoryChip from './CategoryChip'
import ReadTime from './ReadTime'
import Image from 'next/image'
import constants from '../lib/constants'
import clsx from 'clsx'

const PostCard = ({ post }) => {
  return (
      <div
         key={post.data.slug}
         className={clsx(
           post.data.inPreparation
             ? 'text-slate-600 pointer-events-none bg-blend-hard-light bg-neutral-800 '
             : 'text-white transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow',
           'w-full  rounded-md border border-gray-600 dark:bg-dark dark:border-gray-600 overflow-hidden'
         )}>
         <a href={`/post/${post.data.slug}`}>
            <div className='relative overflow-hidden h-64 lg:h-72'>
               <Image
                  alt={post.data.featuredImage}
                  src={post.data.featuredImage}
                  blurDataURL={constants.imageBlogURI}
                  placeholder='blur'
                  layout='fill'
                  className={clsx(
                    post.data.inPreparation ? 'blur-sm' : 'blur-none'
                  )}
               />
               <div
                  className={clsx(
                    post.data.inPreparation
                      ? ' bg-gradient-to-r from-[#7928ca] to-[#ff0080] origin-top float-right mt-9 mr-9 w-72 text-center text-neutral-700 font-semibold'
                      : 'block-hidden'
                  )}
                  style={{ transform: 'translateX(50%) rotate(45deg)' }}>
                  <div className='text-sm p-1'>Comming soon</div>
               </div>
               <div className='absolute w-full pt-0 bottom-0 inset-x-0  text-white text-xs md:text-xs text-center leading-4'>
                  <CategoryChip className='my-0' categories={post.data.tags} />
               </div>
            </div>

            <div className='px-3 my-3 '>
               <h1 className='text-lg font-semibold'> {post.data.title}</h1>
               <div className='mt-3 text-slate-400 flex-row '>
                  {' '}
                  <div className='basis-1/2'>
                     <ReadTime> {post}</ReadTime>
                  </div>
                  <div className='basis-1/2'>
                     <p className='align-middle font-bold text-slate-400 mt-1'>
                        {post.data.inPreparation
                          ? ''
                          : moment(post.data.publishedAt).format(
                            'MMMM DD, YYYY'
                          )}
                     </p>
                  </div>
               </div>

               <p
                  className={clsx(
                    post.data.inPreparation
                      ? 'text-slate-500'
                      : 'text-slate-400',
                    'mt-1  text-sm italic'
                  )}>
                  {post.data.excerpt}
               </p>
            </div>
         </a>
      </div>
  )
}

export default PostCard
