import React from "react";
import Accent from "./custom/Accent";
import ActiveLink from "./custom/ActiveLink";
import { HiOutlineEye } from "react-icons/hi";

const FeaturedPosts = () => (
   <div className='relative bg-neutral-900 overflow-hidden '>
      <div className='pt-16 pb-40 sm:pt-24 sm:pb-20 lg:pt-20 lg:pb-32'>
         <div className='relative max-w-7xl mx-auto px-4 lg:px-0 sm:static'>
            <div className='sm:max-w-lg'>
               <h1 className='text-xl font font-bold tracking-tight text-white sm:text-4xl'>
                  Popular <Accent> posts</Accent>
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
);

//    return (
//       <div>
//          <section className='text-slate-400 body-font'>
//             <div className='container px-5 pb-5 mx-auto my-10'>
//                <div className='flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 '>
//                   <div className='p-4 md:w-1/1 lg:w-2/4 flex-auto'>
//                      <div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-neutral-900 text-lime-500 mb-4 flex-shrink-0'></div>
//                      <div className='flex-grow pl-6'>
//                         <h1 className='text-white text-4xl title-font font-semibold mb-2'>
//                            <Accent className='inline decoration-clone leading-snug dark:leading-none'>
//                               Be prepared for NodeJs technical interview
//                            </Accent>
//                         </h1>
//                         <p className='text-slate-400 my-3'>
//                            Cupidatat anim exercitation adipisicing ea irure
//                            fugiat cillum adipisicing aliquip est reprehenderit
//                            do occaecat commodo. Nisi pariatur ut minim irure
//                            labore reprehenderit ullamco sit sit pariatur ea
//                            irure cillum.
//                         </p>
//                      </div>
//                   </div>
//                   <div className='p-4 md:w-1/1 lg:w-2/4 flex-auto'>
//                      <div className=''>
//                         <div
//                            className='  mx-5 rounded-lg transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97]
// 					  hover:cursor-pointer transition duration-100 animate-shadow'>
//                            <div className='max-w-sm rounded overflow-hidden shadow-lg border border-slate-600 '>
//                               <img
//                                  className='w-full h-48'
//                                  src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127894/igutech/javascript-functions-thumbnail_x64lgq.jpg'
//                                  alt='Sunset in the mountains'
//                               />
//                               <div className='px-3 py-4'>
//                                  <div className='font-bold text-xl mb-2'>
//                                     Post 1
//                                  </div>
//                                  <p className='text-gray-700 text-base'>
//                                     Lorem ipsum dolor sit amet, consectetur
//                                     adipisicing elit. Voluptatibus quia, nulla!
//                                     Maiores et perferendis eaque, exercitationem
//                                     praesentium nihil.
//                                  </p>
//                               </div>
//                               <div className='px-6 pt-4 pb-2'>
//                                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
//                                     #photography
//                                  </span>
//                                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
//                                     #travel
//                                  </span>
//                                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
//                                     #winter
//                                  </span>
//                               </div>
//                            </div>
//                         </div>
//                         {/* <div
//                            className='md:ml-28 absolute bottom-4  rotate-12  bg-neutral-900 rounded-lg transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97]
// 					  hover:cursor-pointer transition duration-100 animate-shadow'>
//                            <div className='max-w-sm rounded overflow-hidden shadow-lg border border-slate-600 '>
//                               <img
//                                  className='w-full h-48'
//                                  src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127896/igutech/node_interview_fpwmwe.jpg'
//                                  alt='Sunset in the mountains'
//                               />
//                               <div className='px-3 py-4'>
//                                  <div className='font-bold text-xl mb-2'>
//                                     POst 2
//                                  </div>
//                                  <p className='text-gray-700 text-base'>
//                                     Lorem ipsum dolor sit amet, consectetur
//                                     adipisicing elit. Voluptatibus quia, nulla!
//                                     Maiores et perferendis eaque, exercitationem
//                                     praesentium nihil.
//                                  </p>
//                               </div>
//                               <div className='px-6 pt-4 pb-2'>
//                                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
//                                     #photography
//                                  </span>
//                                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
//                                     #travel
//                                  </span>
//                                  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
//                                     #winter
//                                  </span>
//                               </div>
//                            </div>
//                         </div> */}
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </section>
//       </div>
//    );
// };

export default FeaturedPosts;
