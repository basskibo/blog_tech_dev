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

          {/* <div className='text-base font-normal text-gray-500 dark:text-gray-400'>
             <ul className='list-disc pl-5'>
                <li>Project: Developing smart tv applications based on Tizen and WebOS platforms</li>
                <li>Working on smart TV application used as streaming platform. Creating components, services, authorization, etc. Platform is serving LiveTV, video on demand  as well as option for renting movies. </li>
                <li>Key technologies: React, Typescript, NestJS, Tizen, WebOS, Firebase, etc.</li>
                <li className='font-semibold'>
                Technologies used on this project
                </li>
                <div className='flex mb-2 gap-1'>
                    {constants.generateIcon('SiReact')}
                    {constants.generateIcon('SiTypescript')}
                    {constants.generateIcon('SiNestjs')}
                    {constants.generateIcon('SiFirebase')}
                </div>
             </ul>

          </div> */}
       </li>{' '}

    </ol>

    {/* <div className='relative'>
       <Image
          className='inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full'
          src={cvImage}
          blurDataURL={constants.imageBlogURI}
          placeholder='blur'
          layout='fill'
          alt='Photo by <a href="https://unsplash.com/@theshubhamdhage?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Shubham Dhage</a> on <a href="https://unsplash.com/t/3d-renders?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
       />
    </div> */}
 </div>
 </div>
  )
}

export default Education
