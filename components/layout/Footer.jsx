import React from "react";
import { SiGmail, SiTwitter, SiLinkedin, SiGithub } from "react-icons/si";
import ReactTooltip from "react-tooltip";
import Accent from "../custom/Accent";

const waysToReachMe = [
   { name: "gmail", description: "test", externalLink: false, icon: SiGmail },
   {
      name: "Twitter",
      description: "test",
      externalLink: true,
      href: "https://twitter.com/basskibo1",
      icon: SiTwitter,
   },
   {
      name: "Github",
      description: "test",
      href: "https://github.com/basskibo",
      externalLink: true,
      icon: SiGithub,
   },
   {
      name: "Linkedin",
      description: "test",
      externalLink: true,
      href: "https://linkedin.com/in/bojan-jagetic-972203106",
      icon: SiLinkedin,
   },
];
const Footer = () => {
   return (
      <footer className='text-gray-400 bg-neutral-900 body-font border-t border-neutral-800 '>
         <div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col'>
            <a className='flex title-font font-medium items-center md:justify-start justify-center text-white'>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='w-10 h-10 text-white p-2 bg-indigo-500 rounded-full'
                  viewBox='0 0 24 24'>
                  <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
               </svg>
               <span className='ml-3 text-xl'>Tailblocks</span>
            </a>
            <p className='text-sm text-gray-400 sm:ml-4 sm:pl-4  sm:border-gray-800 sm:py-2 sm:mt-0 mt-4'>
               © 2022 Bojan Jagetic —
               <a
                  href='https://github.com/basskibo'
                  className='text-gray-500 ml-1'
                  target='_blank'
                  rel='noopener noreferrer'>
                  @basskibo
               </a>
            </p>

            {/* <span className='inline-flex sm:ml-auto mx-5 sm:mt-0 mt-4 justify-center sm:justify-start'>
					<SpotifyCard />
				</span> */}
            <span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
               {/* <p className='text-md'>Reach me at: </p> */}

               <a
                  className='mr-5 lg:mr-5 text-gray-400  link link-underline link-underline-black hover:cursor-ne-resize
					items-right md:justify-right justify-right text-sm'
                  href='https://blogtech-umami.herokuapp.com/share/9QUfQNmS/blogtech_vercel'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Site Statistics
               </a>
               <a
                  className='mr-5 lg:mr-5 text-gray-400  link link-underline link-underline-black hover:cursor-ne-resize
					items-right md:justify-right justify-right text-sm'
                  href='https://github.com/basskibo/blog_tech_dev'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Source Code
               </a>
               {waysToReachMe.map((medium, index) => (
                  <a
                     className='ml-4 text-gray-400 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
                     href={medium.href}
                     target='_blank'
                     rel='noreferrer'
                     key={medium.name}>
                     <medium.icon
                        className='text-lg'
                        data-tip
                        data-for={medium.name}
                     />
                     <ReactTooltip
                        id={medium.name}
                        type='dark'
                        className=' bg-neutral-700'>
                        <h1>
                           You can find me on <Accent>{medium.name}</Accent>
                        </h1>
                     </ReactTooltip>
                  </a>
               ))}
            </span>
         </div>
      </footer>
   );
};

export default Footer;
