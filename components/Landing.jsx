import React from "react";
import Accent from "../components/custom/Accent";
import ActiveLink from "../components/custom/ActiveLink";
import DeathStar from "../public/images/dt_star.svg";
// import DeathStarAnakin from "../public/images/ds.png";
import { FeatureLanding } from "./";
import Image from "next/image";

const Landing = () => {
   const handleClick = (e) => {
      console.log(e);
      e.preventDefault();
      router.push(href);
   };
   return (
      <div className='bg-gradient-to-r from-purple-900 to-indigo-900 '>
         <main className='h-full flex py-10 items-center px-6 lg:px-32 text-white relative overflow-hidden'>
            <section className='w-full  xl:w-8/12'>
               <span className='font-bold uppercase tracking-widest'>
                  Part of Iguana Dev
               </span>
               <h1 className='text-3xl lg:text-5xl font-bold mb-2 text-pink-500'>
                  Welcome
                  <br />
                  My name is Bojan{" "}
               </h1>
               <p className='font-bold mb-1 w-full'>Welcome to my site</p>
               <p>
                  Lorem ipsum dolor sit amet...Officia et incididunt nulla
                  reprehenderit velit ut incididunt labore esse pariatur
                  consequat eiusmod incididunt. Enim laboris velit qui laborum
                  aliquip. In labore labore nulla nostrud magna anim tempor et
                  qui pariatur Lorem. Qui id enim non eiusmod deserunt labore.
               </p>
               <div className='mt-5 lg:mt-7'>
                  <ActiveLink
                     href='/routes/blog'
                     name='blog'
                     className='mt-5 border border-slate-400 p-3 shadow-lg shadow-slate-600
                  hover:shadow-slate-800 hover:cursor-pointer'>
                     Read blog
                  </ActiveLink>
                  <ActiveLink
                     href='/routes/projects'
                     className='mt-5 border border-slate-400 p-3 shadow-lg shadow-slate-600 ml-5
                  hover:shadow-slate-800 hover:cursor-pointer'>
                     Checkout my projects
                  </ActiveLink>
               </div>
            </section>
            {/* <Image
               className='relative'
               src={DeathStarAnakin}
               alt='Death star pic'
            /> */}
            <DeathStar className='md:h-64 lg:h-96 w-80' />
         </main>
         <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
            <path
               fill='#0f172a'
               fillOpacity='1'
               d='M0,160L30,165.3C60,171,120,181,180,176C240,171,300,149,360,138.7C420,128,480,128,540,154.7C600,181,660,235,720,234.7C780,235,840,181,900,176C960,171,1020,213,1080,224C1140,235,1200,213,1260,218.7C1320,224,1380,256,1410,272L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z'></path>
         </svg>
         <a
            href='#sectionFeature'
            aria-label='Scroll down'
            className='absolute bottom-2 text-white left-1/2 -translate-x-1/2 md:bottom-10 rounded-md transition-colors cursor-pointer hover:text-primary-300 focus-visible:text-primary-300 animate-bounce'>
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
         </a>
         <FeatureLanding />
      </div>
   );
};

export default Landing;
