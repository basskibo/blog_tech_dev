import React from 'react'

export default function QouteComponent ({ children }) {
  return (
      <div className='prose lg:max-w-full'>
         <blockquote className='mt-0 mb-4 bg-neutral-800 backdrop-blur-lg rounded-lg p-2'>
            <span className='text-slate-400 mt-0'>{children}</span>
         </blockquote>
      </div>
  )
}
