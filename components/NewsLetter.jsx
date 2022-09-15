import React from "react";
import Accent from "./custom/Accent";

const NewsLetter = () => {
   return (
      <div className=' '>
         <div className=' lg:w-2/3  mx-auto relative border bg-neutral-900 border-neutral-700 grid grid-cols-1 lg:grid-cols-2 gap-10  p-10 lg:p-[60px] rounded-2xl'>
            <div>
               <h3 className='text-white text-4xl font-semibold'>
                  <Accent> Sign up for newsletter</Accent>
               </h3>

               <p className='text-sm text-white mt-4'>
                  if you liked what you read and want to read a lot of similar
                  content, subscribe to the mailing list and receive an email on
                  a weekly/monthly basis.
               </p>
            </div>

            <div>
               <div className='flex items-stretch'>
                  {/* <input
                     type='email'
                     placeholder='Enter your email'
                     className='px-4 w-full bg-neutral-900 rounded-md border-gray-300 ring ring-gray-500 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  /> */}
                  <input
                     className=' w-4/4 my-3 bg-neutral-900  px-3 py-2 rounded-md
					border border-slate-600 focus:border-lime-600 flex-grow focus:outline-none cursor-text'
                     placeholder='Enter your email'
                     value={""}
                     type='search'
                     // onChange={handleSearchChange}
                  />
                  <button
                     className=' ml-2  w-4/4 my-3 rounded-md  shadow-md  shadow-neutral-700
                  hover:cursor-pointer text-center text-white  border border-lime-500 hover:text-lime-600 hover:shadow-neutral-500'>
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
