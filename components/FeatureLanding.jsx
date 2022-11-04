import React from 'react'
import { SiGithub, SiSpotify } from 'react-icons/si'
import { IoMdInfinite } from 'react-icons/io'
import SpotifyCard from '../components/custom/SpotifyCard'
// import GithubCardProfile from "../components/custom/GithubCardProfile";
import { GithubCard } from 'github-user-repo-card'

const FeatureLanding = () => {
  return (
      <div
         id='sectionFeature'
         className='relative bg-neutral-900 overflow-hidden md:p-5'>
         <div className='pt-16 pb-32 sm:pt-24 sm:pb-20 lg:pt-20 lg:pb-32'>
            <div className='relative max-w-7xl mx-auto px-4 lg:px-0 sm:static'>
               <div className='sm:max-w-lg'>
                  <h1 className='text-xl font font-bold tracking-tight text-white sm:text-4xl'>
                     My activity on social networks
                     {/* <Accent>social networks</Accent> */}
                  </h1>
                  {/* <p className='mt-4 text-md text-slate-400'>
                     Dive into the sea of interesting topics and technologies.
                     There is a number of topics I tried to cover, so please be
                     my guest and checkout, I hope there is something for
                     everyone
                  </p> */}
               </div>
               <div className='flex gap-6 flex-col md:flex-row mt-10'>
                  <div className=''>
                     <div className='items-center justify-center rounded-full bg-neutral-900 text-lime-500 p-1 text-3xl'>
                        <SiSpotify />
                     </div>
                     <div className='flex-grow pl-2 pt-2'>
                        <h2 className='text-slate-300 text-lg title-font font-semibold mb-2'>
                           Currently listening on spotify
                        </h2>
                        <p className=' my-3 text-sm text-slate-400'>
                           Spotify is one of my must have applications in order
                           to work properly. I made custom spotify card so you
                           can see what I am currently listening to,
                        </p>
                        <SpotifyCard />
                     </div>
                  </div>
                  <div className=''>
                     <div className='items-center justify-center rounded-full bg-neutral-900 text-white p-1 text-3xl'>
                        <SiGithub />
                     </div>
                     <div className='flex-grow pl-2 pt-2'>
                        <h2 className='text-slate-300 text-lg title-font font-semibold mb-2'>
                           My Github profile
                        </h2>
                        <p className='my-3 text-sm text-slate-400'>
                           Here you can find some basic information about my
                           GitHub profile as well as seeing my{' '}
                           <a
                              className='my-3 hover:cursor-ne-resize text-[#ff0080] underline decoration-dotted decoration-2
                              decoration-sky-400 underline-offset-4 link link-underline link-underline-black hover:no-underline'
                              href='https://www.bojanjagetic.com/libary/github-card-npm-component'
                              target='_blank'
                              rel='noreferrer'>
                              github-user-repo-card
                           </a>{' '}
                           in practice. You can checkout post about it and see
                           more info.
                        </p>
                        <div className='flex-auto xl:px-10'>
                           <GithubCard
                              name='basskibo'
                              type='user'
                              repository='blogtech_dev'
                              // height={478}
                           />
                        </div>
                     </div>
                  </div>
                  <div className=''>
                     <div className='items-left justify-left rounded-full bg-neutral-900 text-gray-400 p-1 text-3xl'>
                        <IoMdInfinite />
                     </div>
                     <div className='flex-grow pl-2 pt-2'>
                        <h2 className='text-slate-300 text-lg title-font font-semibold mb-2'>
                           My deaily.dev stats
                        </h2>
                        <p className='my-3 text-sm text-slate-400'>
                           In order to be up-to-date with all the newest things
                           going on in dev world, I use{' '}
                           <a
                              href='https://daily.dev/'
                              className='my-3 hover:cursor-ne-resize text-[#ff0080] underline decoration-dotted decoration-2 decoration-sky-400 underline-offset-4 link link-underline link-underline-black hover:no-underline'
                              target='_blank'
                              rel='noreferrer'>
                              daily.dev{' '}
                           </a>{' '}
                           browser extension. I highly recommend you to give it
                           a try.
                        </p>
                        <a href='https://app.daily.dev/basskibo'>
                           <img
                              src='https://api.daily.dev/devcards/cf2aab07c11a46d283d5794c5e2f23c9.png?r=979'
                              width='300'
                              alt="Bojan Jagetic's Dev Card"
                           />
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
  )
}

export default FeatureLanding
