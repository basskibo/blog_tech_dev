import React from 'react'
import Accent from './custom/Accent'

const Education = () => {
  return (
    <div>
        <h1 className='mb-5'>
            <Accent className='text-3xl font-semibold'>
                {' '}
                Education and courses
            </Accent>{' '}
        </h1>
 <div className='grid gap-6 row-gap-10 lg:grid-cols-2'>
    <ol className='relative border-l border-gray-200 dark:border-gray-700'>
       <li className='ml-4 mb-10'>
          <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
          <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
          2013-Present University of Novi Sad, Faculty of Technical Sciences in Novi Sad, Department of Electrical Engineering and Computer
          </time>
          <h3 className='text-xl font-semibold text-slate-400 dark:text-white'>
             TBA
          </h3>
          <h2 className='py-1'>TBA </h2>
       </li>{' '}

    </ol>
 </div>
 </div>
  )
}

export default Education
