import React from "react";
import Accent from "./custom/Accent";
import ActiveLink from "./custom/ActiveLink";
import { HiOutlineEye } from "react-icons/hi";

const FeaturedPosts = () => (
   <div className='relative bg-neutral-900 overflow-hidden '>
      <div className='pt-16 pb-40 sm:pt-24 sm:pb-20 lg:pt-40 lg:pb-48'>
         <div className='relative max-w-7xl mx-auto px-4 lg:px-0 sm:static'>
            <div className='sm:max-w-lg'>
               <h1 className='text-xl font font-bold tracking-tight text-white sm:text-4xl'>
                  {/* <Accent>Popular posts</Accent> */}
                  Popular posts
               </h1>
               <p className='mt-4 text-md text-slate-400'>
                  Dive into the sea of interesting topics and technologies.
                  There is a number of topics I tried to cover, so please be my
                  guest and checkout, I hope there is something for everyone
               </p>
            </div>
            <div className='flex gap-6 flex-col md:flex-row mt-10'>
               <a
                  className='transform hover:scale-[1.01] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-[#7928ca] to-[#ff0080]'
                  href='post/javascript-className-fundamentals'>
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
                  className='transform hover:scale-[1.01] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'
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
                  className='transform hover:scale-[1.01] transition-all rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1 from-lime-500 via-[#b5d855] to-teal-700'
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
            {/* <div className='hidden lg:inline'>
           <div className='mt-10'>
              <div
                 aria-hidden='true'
                 className='pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full'>
                 <div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                    <div className='flex items-center space-x-6 lg:space-x-8'>
                       <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8 '>
                          <div
                             className='w-56 h-full rounded-lg shadow-lg shadow-neutral-700 flex  relative overflow-hidden sm:opacity-0 lg:opacity-100
                              ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125'>
                             <img
                                src='https://res.cloudinary.com/dr1sm5gnj/image/upload/q_10/v1648038409/igutech/software-architecture_ygnkun.jpg'
                                alt=''
                                className='w-full h-full object-center object-cover
                                '
                             />
                          </div>
                          <div className='w-56 h-full rounded-lg shadow-lg shadow-neutral-700   flex  relative  overflow-hidden'>
                             <img
                                src='https://res.cloudinary.com/dr1sm5gnj/image/upload/q_10/v1655215250/igutech/sharon-mccutcheon-BucjGtyv58A-unsplash_elrktb.jpg'
                                alt=''
                                className='w-full h-full object-center object-cover '
                             />
                          </div>
                       </div>
                       <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                          <div className='w-56 h-full rounded-lg shadow-lg shadow-neutral-700  flex  relative overflow-hidden'>
                             <img
                                src='https://res.cloudinary.com/dr1sm5gnj/image/upload/q_10/v1645140440/igutech/tobias-fischer-PkbZahEG2Ng-unsplash_i3cx8b.jpg'
                                alt=''
                                className='w-full h-full object-center object-cover'
                             />
                          </div>
                          <div className='w-56 h-full rounded-lg shadow-lg shadow-neutral-700   flex  relative overflow-hidden'>
                             <img
                                src='https://res.cloudinary.com/dr1sm5gnj/image/upload/q_10/v1655307056/igutech/ian-taylor-jOqJbvo1P9g-unsplash_m38gg0.jpg'
                                alt=''
                                className='w-full h-full object-center object-cover'
                             />
                          </div>
                          <div className='w-56 h-full rounded-lg shadow-lg shadow-neutral-700   flex  relative overflow-hidden'>
                             <img
                                src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127897/igutech/nodejs_zqmmvh.jpg'
                                alt=''
                                className='w-full h-full object-center object-cover'
                             />
                          </div>
                       </div>
                       <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                          <div className='w-56 h-full rounded-lg shadow-lg shadow-neutral-700   flex  relative overflow-hidden'>
                             <img
                                src='https://res.cloudinary.com/dr1sm5gnj/image/upload/q_10/v1645127896/igutech/undersstanding_mnfh3n.jpg'
                                alt=''
                                className='w-full h-full object-center object-cover'
                             />
                          </div>
                          <div className='w-56 h-full rounded-lg shadow-lg shadow-neutral-700   flex  relative overflow-hidden'>
                             <img
                                src='https://res.cloudinary.com/dr1sm5gnj/image/upload/q_10/v1645178807/igutech/pankaj-patel-1IW4HQuauSU-unsplash_cfqcs3.jpg'
                                alt=''
                                className='w-full h-full object-center object-cover'
                             />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
    

              <ActiveLink
                 href='/routes/blog'
                 name='blog'
                 id='rb_button'
                 className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-700 text-sm
           hover:cursor-pointer text-center text-white  border border-lime-500 hover:text-lime-600 hover:shadow-neutral-500'>
                 Go to recent posts
              </ActiveLink>
      
           </div>
        </div> */}
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
