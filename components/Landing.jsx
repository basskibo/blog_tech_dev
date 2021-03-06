import React from "react";
import Accent from "../components/custom/Accent";
import ActiveLink from "../components/custom/ActiveLink";
import { FeatureLanding, FeaturedPosts, HighlightPost } from "./";
// import { FeaturedPosts } from "./FeaturedPosts";
import AnchorLink from "react-anchor-link-smooth-scroll";
import SvgWave from "./layout/SvgWave";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import MotionComponent from "./custom/MotionComponent";
const Landing = () => {
   const handleClick = (e) => {
      e.preventDefault();
      router.push(href);
   };
   return (
      // <div className='bg-gradient-to-r from-purple-900 to-indigo-900 '>
      // <div className='bg-gradient-to-r from-amber-800 to-lime-900 '>
      <div className=''>
         <div className=' text-slate-200 md:px-10 px-5  hero-bg '>
            <MotionComponent>
               <div
                  className='grid place-items-left place-content-center gap-1 h-screen
					mx-auto lg:max-w-4xl sm:max-w-xl'>
                  <h1 className=' text-3xl xs:text-2xl lg:text-5xl  font-bold mb-2'>
                     Hello there,
                     <br />
                     <span className='text-3xl sm:text-3xl lg:text-6xl '>
                        My name is <Accent>Bojan</Accent>
                     </span>
                  </h1>

                  <div className='lg:mt-5'>
                     <p className='font-bold mb-1 lg:hidden text-md xs:text-md'>
                        Writing code is my obsession as well as constant
                        self-improvement, I have developed many web applications
                        and platforms from scratch in my spare time (when
                        I&apos;m not coding). Accustomed to using extensive tech
                        stack because I love challenging and complex projects.
                     </p>
                     <p className='font-bold mb-1  hidden lg:block text-lg'>
                        Writing code is my obsession as well as constant
                        self-improvement, I have developed many web applications
                        and platforms from scratch in my spare time (when
                        I&apos;m not coding). Accustomed to using extensive tech
                        stack because I love challenging and complex projects.
                     </p>
                  </div>
                  <div className='mt-7  lg:mt-10  xl:grid-cols-2 sm:grid-cols-1 gap-2 text-sm sm:text-md xs:text-sm lg:text-md'>
                     <ActiveLink
                        href='/routes/blog'
                        name='blog'
                        id='rb_button'
                        className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-700
                  hover:cursor-pointer text-center text-white  border border-lime-500 hover:text-lime-600 hover:shadow-neutral-500'>
                        Read blog
                     </ActiveLink>
                     <ActiveLink
                        href='/routes/aboutme'
                        id='am_button'
                        className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-700
							hover:cursor-pointer text-center text-white  border border-lime-500 hover:text-lime-600 hover:shadow-neutral-500'>
                        See my bio
                     </ActiveLink>
                  </div>
                  <div className='mt-7 lg:mt-10 flex gap-x-4'>
                     <a
                        id='lnk-github-button'
                        className='inline-flex  text-lg text-slate-300 hover:underline link link-underline link-underline-black
							 hover:cursor-ne-resize'
                        href='https://github.com/basskibo/'
                        target='_blank'
                        rel='noreferrer'>
                        <SiGithub className='mr-2 h-6 w-6' /> basskibo
                     </a>
                     <a
                        id='lnk-linkedin-button'
                        className='inline-flex text-lg text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
                        href='https://linkedin.com/in/bojan-jagetic-972203106'
                        target='_blank'
                        rel='noreferrer'>
                        <SiLinkedin className='mr-2 h-6 w-6' />
                        <span className='hidden lg:block'>Bojan Jagetic</span>
                        <span className='lg:hidden '>B.Jagetic</span>
                     </a>
                  </div>
               </div>
            </MotionComponent>
         </div>
         <AnchorLink
            id='btn-anchor-linkg'
            href='#sectionFeature'
            aria-label='Scroll down'
            className=' absolute hidden md:inline bottom-5 text-white left-1/2 -translate-x-1/2 md:bottom-5 rounded-md transition-colors cursor-pointer hover:text-primary-300 focus-visible:text-primary-300 animate-bounce'>
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
         <SvgWave />
         <FeatureLanding />

         <div className='bg-teal-900'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
               <path
                  fill='#171717'
                  fillOpacity='1'
                  d='M0,192L48,197.3C96,203,192,213,288,224C384,235,480,245,576,240C672,235,768,213,864,176C960,139,1056,85,1152,90.7C1248,96,1344,160,1392,192L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
            </svg>
         </div>
         <HighlightPost />
         {/* <FeaturedPosts /> */}
      </div>
   );
};

export default Landing;
