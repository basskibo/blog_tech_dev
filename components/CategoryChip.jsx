import React from 'react'

const CategoryChip = ({ categories }) => {
  return (
      <div className='my-2'>
         {categories
           ? (
               categories.map((category) => (
               <span key={category.slug} className='inline-flex'>
                  {/* <a className='inline-flex' disabled={true}> */}
                     <span
                        className=' flex items-center mx-1 justify-cente opacity-70 text-white font-bold rounded-lg
2xl:text-xs text-xs px-2 py-1 border-1 border-teal-800 bg-teal-900 hover:bg-teal-800 hover:text-white hover:cursor-pointer
transition duration-500 ease-in-out backdrop-blur-2xl'>
                        {category.name}
                     </span>
                  {/* </a> */}
               </span>
               ))
             )
           : (
            <></>
             )}
      </div>
  )
}

export default CategoryChip
