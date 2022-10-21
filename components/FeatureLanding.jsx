import React from "react";
import { SiTwitter, SiGithub, SiSpotify } from "react-icons/si";
import { IoMdInfinite } from "react-icons/io";
import SpotifyCard from "../components/custom/SpotifyCard";
// import GithubCardProfile from "../components/custom/GithubCardProfile";
import { GithubCard } from "github-user-repo-card";
import Link from "./custom/ActiveLink";

import Accent from "./custom/Accent";

const FeatureLanding = () => {
   return (
      <div id='sectionFeature' >
         {/* <motion.div
				initial='offscreen'
				whileInView='onscreen'
				viewport={{ once: true, amount: 0.8 }}
				transition={{ duration: 2 }}
			> */}
         <section className='text-slate-300 body-font bg-teal-900 teal-hero-bg '>
            {/* <motion.div variants={cardVariants}> */}
            <div className='container px-5 pb-5 mx-auto'>
               <h1 className='text-xl font font-bold tracking-tight text-gray-900 sm:text-4xl mb-10'>
                  <Accent>My activity on social networks </Accent>
                  <br className='hidden sm:block' />
                  at least some of it
               </h1>
               <div className='flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6'>
                  <div className='p-2  md:w-1/1 xl:w-2/6 flex'>
                     <div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-neutral-900 text-lime-500 mb-4 flex-shrink-0'>
                        <SiSpotify />
                     </div>
                     <div className='flex-grow pl-2 pt-2'>
                        <h2 className='text-white text-lg title-font font-semibold mb-2'>
                           Currently listening on spotify
                        </h2>
                        <p className=' my-3 text-sm'>
                           Spotify is one of my must have applications in order
                           to work properly. I made custom spotify card so you
                           can see what I am currently listening to,
                        </p>
                        <SpotifyCard />
                     </div>
                  </div>
                  <div className='p-2  md:w-1/1 xl:w-2/6 flex'>
                     <div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-neutral-900 text-white mb-4 flex-shrink-0'>
                        <SiGithub />
                     </div>
                     <div className='flex-grow pl-2 pt-2'>
                        <h2 className='text-white text-lg title-font font-semibold mb-2'>
                           My Github profile
                        </h2>
                        <p className='my-3 text-sm'>
                           Here you can find some basic information about my
                           GitHub profile as well as seeing my  <a
                           className='my-3 hover:cursor-ne-resize text-lime-500 underline decoration-dotted decoration-2
                              decoration-sky-400 underline-offset-4 link link-underline link-underline-black hover:no-underline'
                           href="https://www.bojanjagetic.com/libary/github-card-npm-component"
                           target='_blank'
                           rel='noreferrer'>
                           github-user-repo-card 
                        </a> in practice. You can checkout post about it and see more info.
                        </p>
                        <div className="flex-auto xl:px-10">
                        <GithubCard name="basskibo" type="user" repository="blogtech_dev"  height={478}/>

                        </div>
                     </div>
                  </div>
                  <div className='p-2  md:w-1/1 xl:w-2/6 flex'>
                     <div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-neutral-900 text-neutral-300 mb-4 flex-shrink-0'>
                        <IoMdInfinite />
                     </div>
                     <div className='flex-grow pl-2 pt-2'>
                        <h2 className='text-white text-lg title-font font-semibold mb-2'>
                           My deaily.dev stats
                        </h2>
                        <p className='my-3 text-sm'>
                           In order to be up-to-date with all the newest things
                           going on in dev world, I use{" "}
                           <a
                              href='https://daily.dev/'
                              className='my-3 hover:cursor-ne-resize text-lime-500 underline decoration-dotted decoration-2
            	decoration-sky-400 underline-offset-4 link link-underline link-underline-black hover:no-underline'
                              target='_blank'
                              rel='noreferrer'>
                              daily.dev{" "}
                           </a>{" "}
                           browser extension. I highly recommend you to give it
                           a try.
                        </p>
                        <a href='https://app.daily.dev/basskibo'>
                           <img
                              src='https://api.daily.dev/devcards/cf2aab07c11a46d283d5794c5e2f23c9.png?r=979'
                              width='350'
                              alt="Bojan Jagetic's Dev Card"
                           />
                        </a>
                        {/* <a
                           className='twitter-timeline'
                           data-theme='dark'
                           data-tweet-limit='1'
                           href='https://twitter.com/basskibo1'>
                           Tweets by @Basskibo1
                        </a>{" "}
                        <script
                           async
                           src='https://platform.twitter.com/widgets.js'
                           charSet='utf-8'></script> */}
                     </div>
                  </div>
               </div>
            </div>
            {/* </motion.div> */}
         </section>
         {/* </motion.div> */}
      </div>
   );
};

export default FeatureLanding;
