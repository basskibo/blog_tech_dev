import { FaBeer } from "react-icons/fa";
import Accent from "../../components/custom/Accent";
import TechnologyStack from "../../components/custom/TechnologyStack";
import Image from "next/image";

const Bio = () => {
   return (
      <div className='container mx-auto my-14 px-3 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>
         <div className='my-10'>
            <div className=' px-5 py-3 mb-10 border-b border-gray-400'>
               <h1 className='mb-5'>
                  <Accent className='font-extrabold text-6xl'>About</Accent>
               </h1>
               <p className='mb-10'>
                  Adipisicing sunt veniam do non consequat commodo sint nisi
                  aliquip ad non cillum nisi. Id ipsum mollit ad velit tempor
                  laboris. Aute non dolore adipisicing sint dolore nisi
                  excepteur occaecat. Elit duis enim duis dolor tempor enim est
                  labore occaecat. Exercitation laborum occaecat elit culpa esse
                  excepteur.Cupidatat duis in nulla eu eu. Magna laboris fugiat
                  excepteur in elit qui irure sit aliquip. Dolore adipisicing
                  laborum sunt fugiat enim occaecat reprehenderit cupidatat
                  irure laborum et id dolore.
               </p>
               <TechnologyStack />
            </div>

            <div className='grid gap-6 row-gap-10 lg:grid-cols-2'>
               <ol className='relative border-l border-gray-200 dark:border-gray-700'>
                  <li className='mb-10 ml-4'>
                     <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                     <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                        April 2015 ~ June 2016
                     </time>
                     <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        94a3b8 Application UI code in Tailwind CSS
                     </h3>
                     <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
                        Get access to over 20+ pages including a dashboard
                        layout, charts, kanban board, calendar, and pre-order
                        E-commerce &amp; Marketing pages.
                     </p>
                     <a
                        href='#'
                        className='inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
                        Learn more{" "}
                        <svg
                           className='ml-2 w-3 h-3'
                           fill='currentColor'
                           viewBox='0 0 20 20'
                           xmlns='http://www.w3.org/2000/svg'>
                           <path
                              fillRule='evenodd'
                              d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                              clipRule='evenodd'></path>
                        </svg>
                     </a>
                  </li>
                  <li className='mb-10 ml-4'>
                     <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                     <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                        June 2016 ~ Oct March 2017
                     </time>
                     <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        Marketing UI design in Figma
                     </h3>
                     <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                        All of the pages and components are first designed in
                        Figma and we keep a parity between the two versions even
                        as we update the project.
                     </p>
                  </li>
                  <li className='ml-4 mb-10'>
                     <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                     <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                        March 2016 ~ October 2017
                     </time>
                     <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        Iguana Development CEO
                     </h3>
                     <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                        Get started with dozens of web components and
                        interactive elements built on top of Tailwind CSS.
                     </p>
                  </li>
                  <li className='ml-4'>
                     <div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
                     <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
                        March 2017 ~ Present
                     </time>
                     <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                        E-Commerce UI code in Tailwind CSS
                     </h3>
                     <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                        Get started with dozens of web components and
                        interactive elements built on top of Tailwind CSS.
                     </p>
                  </li>
               </ol>

               <div className='relative'>
                  <Image
                     className='inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full'
                     src='https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260'
                     alt=''
                     layout='fill'
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Bio;
