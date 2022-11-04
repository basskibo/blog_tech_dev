import React from 'react'
import { HiOutlineEye } from 'react-icons/hi'

const FeaturedPosts = () => (
   <div className='relative bg-neutral-900 overflow-hidden md:p-5'>
      <div className='pt-16 pb-40 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-32'>
         <div className='relative max-w-7xl mx-auto px-4 lg:px-0 sm:static'>
            <div className='sm:max-w-lg'>
               <h1 className='text-xl font font-bold tracking-tight text-white sm:text-4xl'>
                  Popular posts
                  {/* <Accent> posts</Accent> */}
                  {/* Popular posts */}
               </h1>
               <p className='mt-4 text-md text-slate-400'>
                  Dive into the sea of interesting topics and technologies.
                  There is a number of topics I tried to cover, so please be my
                  guest and checkout, I hope there is something for everyone
               </p>
            </div>
            <div className='flex gap-6 flex-col md:flex-row mt-10'>
               <a
                  className='transform hover:scale-[1.02] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-[#7928ca] to-[#ff0080]'
                  href='post/javascript-class-fundamentals'>
                  <div className='flex flex-col justify-between h-full bg-neutral-900  rounded-lg p-4'>
                     <div className='flex flex-col md:flex-row justify-between'>
                        <h4 className='text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight'>
                           Javascript className fundamentals
                        </h4>
                     </div>
                     <div className='flex items-center text-gray-800 dark:text-gray-200 capsize'>
                        <HiOutlineEye className='text-xl' />
                        <span className='ml-2 align-baseline capsize'>
                           10,250
                        </span>
                     </div>
                  </div>
               </a>
               <a
                  className='transform hover:scale-[1.02] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-b p-1 from-[#ff0080]  to-[#7928ca]'
                  href='/post/nodejs-interview'>
                  <div className='flex flex-col justify-between h-full bg-neutral-900  rounded-lg p-4'>
                     <div className='flex flex-col md:flex-row justify-between'>
                        <h4 className='text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight'>
                           Node.js Developer Technical Interview (Basic)
                        </h4>
                     </div>
                     <div className='flex items-center text-gray-800 dark:text-gray-200 capsize'>
                        <HiOutlineEye className='text-xl' />
                        <span className='ml-2 align-baseline capsize'>
                           13,325
                        </span>
                     </div>
                  </div>
               </a>
               <a
                  className='transform hover:scale-[1.02] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-[#ff0080] to-[#7928ca]'
                  href='/post/databases-simple'>
                  <div className='flex flex-col justify-between h-full bg-neutral-900  rounded-lg p-4'>
                     <div className='flex flex-col md:flex-row justify-between'>
                        <h4 className='text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight'>
                           SQL vs NoSQL
                        </h4>
                     </div>
                     <div className='flex items-center text-gray-800 dark:text-gray-200 capsize'>
                        <HiOutlineEye className='text-xl' />
                        <span className='ml-2 align-baseline capsize'>
                           8,326
                        </span>
                     </div>
                  </div>
               </a>
            </div>
         </div>
      </div>
   </div>
)

export default FeaturedPosts
