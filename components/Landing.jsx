import React from "react";
import Accent from "../components/custom/Accent";

const Landing = () => {
   return (
      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
         <div className='flex flex-col items-center justify-between w-full mb-10 lg:flex-row'>
            <div className='mb-16 lg:mb-0 lg:max-w-lg lg:pr-5'>
               <div className='max-w-xl mb-6'>
                  <h2 className='font-sans text-3xl font-bold tracking-tight text-slate-400 sm:text-4xl sm:leading-none max-w-lg mb-6'>
                     Hello there
                     <br className='hidden md:block' />
                     you can call me{" "}
                     <Accent className='text-5xl'> Bojan </Accent>
                  </h2>
                  <p className='text-slate-400 text-base md:text-lg'>
                     Sed ut perspiciatis unde omnis iste natus error sit
                     voluptatem accusantium doloremque laudantium, totam rem
                     aperiam, eaque ipsa quae. explicabo.
                  </p>
               </div>
               <div className='flex items-center space-x-3'>
                  <a
                     href='/'
                     className='w-32 transition duration-300 hover:shadow-lg'>
                     <img
                        src='https://kitwind.io/assets/kometa/app-store.png'
                        className='object-cover object-top w-full h-auto mx-auto'
                        alt=''
                     />
                  </a>
                  <a
                     href='/'
                     className='w-32 transition duration-300 hover:shadow-lg'>
                     <img
                        src='https://kitwind.io/assets/kometa/google-play.png'
                        className='object-cover object-top w-full h-auto mx-auto'
                        alt=''
                     />
                  </a>
               </div>
            </div>
            <div className='flex items-center justify-center lg:w-1/2'>
               <div className='w-2/5'>
                  <img
                     className='object-cover'
                     src='https://kitwind.io/assets/kometa/one-girl-phone.png'
                     alt=''
                  />
               </div>
               <div className='w-5/12 -ml-16 lg:-ml-16 rotate-12'>
                  <img
                     className='object-cover'
                     src='https://kitwind.io/assets/kometa/two-girls-phone.png'
                     alt=''
                  />
               </div>
            </div>
         </div>
         <a
            href='#'
            aria-label='Scroll down'
            className='flex animate-bounce items-center justify-center w-12 h-12 mx-auto text-slate-400 
			hover:text-sky-8 hover:border-deep-purple-accent-400 duration-300
			 transform  hover:shadow hover:scale-110'>
            <svg
               class='w-6 h-6'
               fill='currentColor'
               viewBox='0 0 20 20'
               xmlns='http://www.w3.org/2000/svg'>
               <path
                  fill-rule='evenodd'
                  d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
                  clip-rule='evenodd'></path>
            </svg>
         </a>
      </div>
   );
};

export default Landing;
