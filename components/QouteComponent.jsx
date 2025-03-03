import React from 'react'

export default function QouteComponent ({ children }) {
  return (
      <div className='prose lg:max-w-full'>
         <blockquote className='mt-0 mb-2  bg-black backdrop-blur-lg rounded-lg p-4'>
            <span className='text-slate-400 mt-0 italic'>{children}</span>
         </blockquote>
      </div>
  )
}
