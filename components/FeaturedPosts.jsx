import React from "react";
import Accent from "./custom/Accent";

const FeaturedPosts = () => {
   return (
      <div>
         <section className='text-slate-400 body-font'>
            <div className='container px-5 pb-5 mx-auto my-10'>
               <div className='flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6 '>
                  <div className='p-4 md:w-1/1 lg:w-2/4 flex-auto'>
                     <div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-neutral-900 text-lime-500 mb-4 flex-shrink-0'></div>
                     <div className='flex-grow pl-6'>
                        <h1 className='text-white text-4xl title-font font-semibold mb-2'>
                           <Accent className='inline decoration-clone leading-snug dark:leading-none'>
                              Be prepared for NodeJs technical interview
                           </Accent>
                        </h1>
                        <p className='text-slate-400 my-3'>
                           Cupidatat anim exercitation adipisicing ea irure
                           fugiat cillum adipisicing aliquip est reprehenderit
                           do occaecat commodo. Nisi pariatur ut minim irure
                           labore reprehenderit ullamco sit sit pariatur ea
                           irure cillum.
                        </p>
                     </div>
                  </div>
                  <div className='p-4 md:w-1/1 lg:w-2/4 flex-auto'>
                     <div className=''>
                        <div
                           className='  mx-5 rounded-lg transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97]
					  hover:cursor-pointer transition duration-100 animate-shadow'>
                           <div className='max-w-sm rounded overflow-hidden shadow-lg border border-slate-600 '>
                              <img
                                 className='w-full h-48'
                                 src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127894/igutech/javascript-functions-thumbnail_x64lgq.jpg'
                                 alt='Sunset in the mountains'
                              />
                              <div className='px-3 py-4'>
                                 <div className='font-bold text-xl mb-2'>
                                    Post 1
                                 </div>
                                 <p className='text-gray-700 text-base'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptatibus quia, nulla!
                                    Maiores et perferendis eaque, exercitationem
                                    praesentium nihil.
                                 </p>
                              </div>
                              <div className='px-6 pt-4 pb-2'>
                                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                    #photography
                                 </span>
                                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                    #travel
                                 </span>
                                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                    #winter
                                 </span>
                              </div>
                           </div>
                        </div>
                        {/* <div
                           className='md:ml-28 absolute bottom-4  rotate-12  bg-neutral-900 rounded-lg transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97]
					  hover:cursor-pointer transition duration-100 animate-shadow'>
                           <div className='max-w-sm rounded overflow-hidden shadow-lg border border-slate-600 '>
                              <img
                                 className='w-full h-48'
                                 src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127896/igutech/node_interview_fpwmwe.jpg'
                                 alt='Sunset in the mountains'
                              />
                              <div className='px-3 py-4'>
                                 <div className='font-bold text-xl mb-2'>
                                    POst 2
                                 </div>
                                 <p className='text-gray-700 text-base'>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptatibus quia, nulla!
                                    Maiores et perferendis eaque, exercitationem
                                    praesentium nihil.
                                 </p>
                              </div>
                              <div className='px-6 pt-4 pb-2'>
                                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                    #photography
                                 </span>
                                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                    #travel
                                 </span>
                                 <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                    #winter
                                 </span>
                              </div>
                           </div>
                        </div> */}
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default FeaturedPosts;
