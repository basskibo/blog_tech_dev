import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Image from 'next/image'
import ReadTime from './ReadTime'
import constants from '../lib/constants'
import SocialNetworkShare from './custom/SocialNetworkShare'
import LastChangedFile from './custom/LastChangedFile'
import { BsEye } from 'react-icons/bs'
import axios from 'axios'
import CountUp from 'react-countup'

const PostDetail = ({ post, content }) => {
  const [views, setviews] = useState(0)

  useEffect(() => {
    getViews(post)
  }, [])
  const getViews = async (data) => {
    console.log('fetching api views')
    const url = '/api/views'
    const result = await axios(url, {
      method: 'POST',
      params: { title: data.title, description: data.excerpt, slug: `post/${data.slug}` },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setviews(result.data.views)
  }
  const generateCreditImageUrl = () => {
    return `https://unsplash.com/@${post.imageCreditUsername}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`
  }

  return (
      <div className=' mx-auto  lg:rounded-lg lg:p-0 lg:mt-5 sm:mt-10 xs:mt-10'>
         <div className='flex justify-left mb-8 w-full pt-5 lg:pt-1 mt-0 lg:mt-0'>
            <h1 className='lg:text-4xl text-xl lg:my-5 text-semibold text-white font-bold'>
               {post.title}
            </h1>
         </div>
         <div className='relative overflow-hidden  md-6 h-96'>
            <Image
               src={post.featuredImage}
               alt={post.title}
               blurDataURL={constants.imageBlogURI}
               placeholder='blur'
               layout='fill'
               priority
               className='object-cover rounded-lg'
            />
            <div className='absolute w-full  bottom-0 inset-x-0  text-white font- float-right text-xs md:text-xs text-right leading-4 py-2 px-4 flex flex-row-reverse '>
               <div className=' backdrop-filter backdrop-blur-3xl p-2'>
               Photo by <a href={generateCreditImageUrl()} target="_blank" rel='noreferrer'>
                  {post.imageCreditUser}</a> on <a target="_blank" rel='noreferrer' href="https://unsplash.com/s/photos/blog?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
               </div>
            </div>
         </div>
         {/* <div className='relative  md-6 h-96  '>

         </div> */}
         <div className='lg:px-0 prose 2xl:text-md xl:text-sm'>
            <div className=' text-slate-400 mb-6 my-6 w-full'>
               <div className='flex-1  mb-2 w-full lg:w-auto '>
                  <p className='text-slate-400  '>
                     Writen on{' '}
                     <span className='font-semibold hidden lg:inline'>
                        {moment(post.publishedAt).format('MMMM DD, YYYY')}
                     </span>{' '}
                     <span className='font-semibold lg:hidden inline'>
                        {moment(post.publishedAt).format('DD.MM.YYYY')}
                     </span>{' '}
                     by <span className='font-semibold'>{post.author}</span>
                  </p>
                  <LastChangedFile fileName={`${post.slug}.mdx`} type='blog' />
               </div>

               <span className='flex mb-2'>
                  <ReadTime className=' w-28  flex-initial  lg:text-md sm:text-sm'>
                     {content.compiledSource}
                  </ReadTime>
                  <div
                              className='w-1 h-1 mt-3 mr-6 rounded-full flex-initial'
                              style={{ backgroundColor: '#FFF' }}></div>
                  <div className=' w-28  flex-initial   lg:text-md sm:text-sm'>
                     <p className="inline-flex mt-1">
                        <BsEye className='h-full mt-0.5 text-lg' />{' '}
                        <span className='ml-2 pb-1'><CountUp end={views}/> views</span>
                     </p>
                  </div>
               </span>
               {/* <ReadTime className='sm:flex-1 mb-4 lg:w-auto  2xl:text-md xl:text-sm'>
                  {content.compiledSource}
               </ReadTime> */}
               <blockquote className='mt-0 mb-4'>
                  <p className='text-slate-400 mt-0'>{post.excerpt}</p>
               </blockquote>

               <div className='flex flex-inline mb-2'>
                  {/* <span className='lg:text-lg sm:text-md mr-3 p-0'>Share: </span> */}
                  <span className='mr-2 font-semibold'>Share:</span>

                  <SocialNetworkShare post={post} type={'post'} />
               </div>
            </div>
         </div>
      </div>
  )
}

export default PostDetail
