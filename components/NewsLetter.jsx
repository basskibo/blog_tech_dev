import React from "react";
import Accent from "./custom/Accent";

const NewsLetter = () => {
   return (
      <div className=' '>
         <div className=' lg:w-2/3  mx-auto relative border bg-neutral-900 border-neutral-700 grid grid-cols-1 lg:grid-cols-2 gap-10  p-10 lg:p-[60px] rounded-2xl'>
            <div>
               <h3 className='text-white text-3xl font-semibold'>
                  <Accent> Sign up for our newsletter</Accent>
               </h3>

               <p className='text-sm text-white mt-4'>
                  Get the best news on weelky basis! Join now and do not miss
                  it.
               </p>
            </div>

            <div>
               <div className='flex items-stretch'>
                  <input
                     type='email'
                     placeholder='Enter your email'
                     className='px-4 w-full bg-neutral-900 rounded-md border-gray-300 ring ring-gray-500 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />

                  <button className='bg-neutral-800 hover:bg-cyan-600 text-white py-3 px-5 rounded-lg font-semibold ml-4 border-4 border-white'>
                     Subscribe
                  </button>
               </div>

               <p className='text-white mt-2 text-xs'>
                  We care about your data in our
                  <a href='#' className='underline'>
                     {" "}
                     privacy policy
                  </a>
                  .
               </p>
            </div>
         </div>
      </div>
   );
};

export default NewsLetter;
