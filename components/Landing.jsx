import React from "react";
import Accent from "../components/custom/Accent";
import ActiveLink from "../components/custom/ActiveLink";
import { FeatureLanding, FeaturedPosts, HighlightPost } from "./";
// import { FeaturedPosts } from "./FeaturedPosts";
import AnchorLink from "react-anchor-link-smooth-scroll";
import SvgWave from "./layout/SvgWave";
import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";
import MotionComponent from "./custom/MotionComponent";
import NewsLetter from "./NewsLetter";
import { TypeAnimation } from "react-type-animation";

const Landing = () => {
   const handleClick = (e) => {
      e.preventDefault();
      router.push(href);
   };
   return (
      <div className='bg-gradient-to-b from-neutral-900  to-[#7928ca] '>
         {/* <div className=''> */}
         <div className=' text-slate-200 md:px-10 px-5  '>
            {/* <MotionComponent> */}
            <div
               className='grid place-items-left place-content-center gap-1 h-screen
					mx-auto lg:max-w-4xl sm:max-w-xl'>
               <h1 className=' text-3xl xs:text-2xl lg:text-5xl  font-bold mb-2'>
                  Hello there,
                  <br />
                  <span className='text-3xl sm:text-3xl lg:text-6xl '>
                     My name is{" "}
                     <Accent>
                        <TypeAnimation
                           sequence={[
                              700,
                              "Jagetic", // Types 'One'
                              2000, // Waits 1s
                              "Bojan Jagetic", // Deletes 'One' and types 'Two'
                              () => {
                                 console.log("Done typing!"); // Place optional callbacks anywhere in the array
                              },
                           ]}
                           wrapper='Accent'
                           cursor={true}
                           speed={20}
                           repeat={0}
                           // className='text-transparent bg-clip-text bg-gradient-to-r from-[#7928ca] to-[#ff0080] mb-5'
                           style={{ fontSize: "1em" }}
                        />
                     </Accent>
                  </span>
               </h1>

               <div className='lg:mt-5'>
                  <p className='font-bold mb-1 lg:hidden text-md xs:text-md'>
                     Writing code is my obsession as well as constant
                     self-improvement, I have developed many web applications
                     and platforms from scratch in my spare time (when I&apos;m
                     not coding). Accustomed to using extensive tech stack
                     because I love challenging and complex projects.
                  </p>
                  <p className='font-bold mb-1  hidden lg:block text-md'>
                     Writing code is my obsession as well as constant
                     self-improvement, I have developed many web applications
                     and platforms from scratch in my spare time (when I&apos;m
                     not coding). Accustomed to using extensive tech stack
                     because I love challenging and complex projects.
                  </p>
               </div>

               <div className='mt-7  lg:mt-10  xl:grid-cols-2 sm:grid-cols-1 gap-2 text-sm sm:text-md xs:text-sm lg:text-md'>
                  {/* <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-lime-500 to-teal-700 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Green to blue
                  </span>
               </button>
               <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group 
               hover:animate-bounce bg-gradient-to-br from-lime-500 to-teal-700 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Green to blue
                  </span>
               </button> */}
                  <ActiveLink
                     href='/routes/blog'
                     name='blog'
                     id='rb_button'
                     className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-800
               hover:cursor-pointer text-center text-white  border border-[#7928ca] hover:text-[#ff0080] hover:shadow-neutral-500 '>
                     Read blog
                  </ActiveLink>
                  <ActiveLink
                     href='/routes/aboutme'
                     id='am_button'
                     className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-800
							hover:cursor-pointer text-center text-white  border border-[#7928ca] hover:text-[#ff0080] hover:shadow-neutral-500 '>
                     See my bio
                  </ActiveLink>
               </div>
               <div className='mt-7 lg:mt-10 flex gap-x-4'>
                  <a
                     id='lnk-linkedin-button'
                     className='inline-flex text-sm text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
                     href='https://linkedin.com/in/bojan-jagetic-972203106'
                     target='_blank'
                     rel='noreferrer'>
                     <SiLinkedin className='mr-1 h-4 w-4' />
                     <span className='hidden lg:block'>Bojan Jagetic</span>
                     <span className='lg:hidden '>B.Jagetic</span>
                  </a>
                  <a
                     id='lnk-github-button'
                     className='inline-flex  text-sm text-slate-300 hover:underline link link-underline link-underline-black
							 hover:cursor-ne-resize'
                     href='https://github.com/basskibo/'
                     target='_blank'
                     rel='noreferrer'>
                     <SiGithub className='mr-1 h-4 w-4' /> basskibo
                  </a>
                  <a
                     id='lnk-twitter-button'
                     className='inline-flex text-sm text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
                     href='https://twitter.com/basskibo1'
                     target='_blank'
                     rel='noreferrer'>
                     <SiTwitter className='mr-1 h-4 w-4 ' />
                     <span className=' lg:block'>basskibo1</span>
                  </a>
               </div>
            </div>
            {/* </MotionComponent> */}
         </div>
         <AnchorLink
            id='btn-anchor-linkg'
            href='#sectionFeature'
            aria-label='Scroll down'
            className=' absolute hidden md:inline bottom-5 text-white left-1/2 -translate-x-1/2 md:bottom-5 
            rounded-md transition-colors cursor-pointer hover:text-primary-300 focus-visible:text-primary-300 animate-bounce'>
            <svg
               className='w-6 h-6'
               fill='currentColor'
               viewBox='0 0 20 20'
               xmlns='http://www.w3.org/2000/svg'>
               <path
                  fillRule='evenodd'
                  d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
                  clipRule='evenodd'></path>
            </svg>
         </AnchorLink>
         {/* <SvgWave /> */}
         <FeatureLanding />

         <FeaturedPosts />

         <NewsLetter />
      </div>
   );
};

export default Landing;
