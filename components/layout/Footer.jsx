import React from 'react'
import { SiGmail, SiTwitter, SiLinkedin, SiGithub } from 'react-icons/si'
// import ReactTooltip from 'react-tooltip'
// import Accent from '../custom/Accent'
import SpotifyCard from '../custom/SpotifyCard'

const waysToReachMe = [
  { name: 'gmail', description: 'test', externalLink: false, icon: SiGmail, href: 'mailto:jagetic.bojan@gmail.com' },
  {
    name: 'Twitter',
    description: 'test',
    externalLink: true,
    href: 'https://twitter.com/basskibo1',
    icon: SiTwitter
  },
  {
    name: 'Github',
    description: 'test',
    href: 'https://github.com/basskibo',
    externalLink: true,
    icon: SiGithub
  },
  {
    name: 'Linkedin',
    description: 'test',
    externalLink: true,
    href: 'https://linkedin.com/in/bojan-jagetic-972203106',
    icon: SiLinkedin
  }
]
const Footer = () => {
  return (
      <footer className='text-gray-400 bg-neutral-900 body-font border-t border-neutral-800 '>
         <div className='container px-5 py-4 lg:py-8 mx-auto flex items-center sm:flex-row flex-col'>
             <div className='flex-shrink-0 flex items-center'>
                 <a href='/'>
                     <img
                         className='block lg:hidden h-6 w-auto '
                         src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1666821240/igutech/logo/logo_jibobs.webp'
                         alt='Jagetic'
                     />
                     <img
                         className='hidden lg:block h-8 w-auto '
                         src='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1666821292/igutech/logo/logo-no-background_dbpm3q.svg'
                         // src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                         alt='Jagetic'
                     />
                 </a>
             </div>
            <p className='text-sm text-gray-400 sm:ml-4 sm:pl-4  sm:border-gray-800 sm:py-2 sm:mt-0 mt-4'>
               © 2022 Bojan Jagetic
               {/* <a
                  href='https://github.com/basskibo'
                  className='text-gray-500 ml-1'
                  target='_blank'
                  rel='noopener noreferrer'>
                  @basskibo
               </a> */}
            </p>
            <SpotifyCard/>

            {/* <span className='inline-flex sm:ml-auto mx-5 sm:mt-0 mt-4 justify-center sm:justify-start'><SpotifyCard /></span> */}
            <span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
               {/* <p className='text-md'>Reach me at: </p> */}
               <a
                  className='mr-3 lg:mr-5  text-gray-400  link link-underline link-underline-black hover:cursor-ne-resize items-right md:justify-right justify-right text-xs lg:text-sm'
                  href='https://app.splitbee.io/public/bojanjagetic.com'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Site Statistics
               </a>
               {/* <a
                  className='mr-3 lg:mr-5  text-gray-400  link link-underline link-underline-black hover:cursor-ne-resize items-right md:justify-right justify-right text-xs lg:text-sm'
                  href='http://docs.bojanjagetic.com'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Docs
               </a> */}
               {/* <a
                  className='mr-5 lg:mr-5 text-gray-400  link link-underline link-underline-black hover:cursor-ne-resize items-right md:justify-right justify-right text-xs lg:text-sm'
                  href='https://github.com/basskibo/blog_tech_dev'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Source Code
               </a> */}
               {waysToReachMe.map((medium, index) => (
                  <a
                     className='ml-4 text-gray-400 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
                     href={medium.href}
                     target='_blank'
                     rel='noreferrer'
                     key={medium.name}>
                     <medium.icon
                        className='text-md lg:text-lg'
                        data-tip
                        data-for={medium.name}
                     />
                     {/* <ReactTooltip
                        id={medium.name}
                        type='dark'
                        className=' bg-neutral-700'>
                        <p>
                           You can find me on <Accent>{medium.name}</Accent>
                        </p>
                     </ReactTooltip> */}
                  </a>
               ))}
            </span>
         </div>
      </footer>
  )
}

export default Footer
