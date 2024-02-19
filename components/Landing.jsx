import React from 'react'
import Accent from '../components/custom/Accent'
import ActiveLink from '../components/custom/ActiveLink'
import { FeaturedPosts } from './'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si'
import NewsLetter from './NewsLetter'
import { TypeAnimation } from 'react-type-animation'
import { IoCloudDownloadOutline } from "react-icons/io5"

const Landing = () => {
	const handleDownload = () => {
		// Creating a hidden link element
		const link = document.createElement('a');
		link.href = '/Bojan_Jagetić.pdf'; // Replace with the actual path to your PDF file
		link.download = 'Bojan_Jagetić.pdf'; // Specify the name for the downloaded file
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		// Change 'file.pdf' to the path of your file
		// window.open('/Bojan_Jagetić.pdf', '_blank');
	}

	return (
		<div className='bg-gradient-to-b from-neutral-900  to-[#7928ca] '>
			{/* <div className=''> */}
			<div className=' text-slate-200 md:px-10 px-5  '>
				{/* <MotionComponent> */}
				<div
					className='grid place-items-left place-content-center gap-1 h-screen mx-auto lg:max-w-4xl sm:max-w-xl'>
					<h1 className=' text-2xl xs:text-2xl lg:text-5xl  font-bold mb-2'>
						Hello there,
						<br />
						<h1 className='text-2xl sm:text-2xl lg:text-6xl '>
							My name is{' '}
							<Accent className=''>
								<TypeAnimation
									sequence={[
										700,
										'Jagetic', // Types 'One'
										2000, // Waits 1s
										'Bojan Jagetic', // Deletes 'One' and types 'Two'
										() => {
											console.log('Done typing!') // Place optional callbacks anywhere in the array
										}
									]}
									wrapper='Accent'
									cursor={true}
									speed={25}
									repeat={0}
									className='break-words'
									style={{ fontSize: '1em' }}
								/>
							</Accent>
						</h1>
					</h1>

					<div className='lg:mt-5'>
						<p className='font-bold mb-1 lg:hidden text-md xs:text-md'>
							Writing code is my obsession as well as constant
							self-improvement, I have developed many web applications
							and platforms from scratch in my spare time (when I&apos;m
							not coding). Accustomed to using extensive tech stack
							because I love challenging and complex projects.
						</p>
						<p className='font-bold mb-1 hidden lg:block text-md'>
							Writing code is my obsession as well as constant
							self-improvement, I have developed many web applications
							and platforms from scratch in my spare time (when I&apos;m
							not coding). Accustomed to using extensive tech stack
							because I love challenging and complex projects.
						</p>
					</div>

					<div className='mt-7 lg:mt-10  xl:grid-cols-2 sm:grid-cols-1 gap-2 text-sm sm:text-md xs:text-sm lg:text-md'>

						<ActiveLink
							href='/routes/blog'
							name='blog'
							id='blog_post_button'
							className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-800
               hover:cursor-pointer text-center text-white  border border-[#7928ca] hover:text-[#ff0080] hover:shadow-neutral-500 '>
							Read blog
						</ActiveLink>
						<ActiveLink
							href='/routes/aboutme'
							id='aboutme_button'
							className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-800 hover:cursor-pointer text-center text-white  border border-[#7928ca] hover:text-[#ff0080] hover:shadow-neutral-500 '>
							See my bio
						</ActiveLink>
					</div>
					<div className='mt-7 lg:mt-10 flex gap-x-4'>
						<a
							id='lnk-linkedin-button'
							className='inline-flex items-center text-sm text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
							href='https://linkedin.com/in/bojan-jagetic-972203106'
							target='_blank'
							rel='noreferrer'>
							<SiLinkedin className='mr-1 h-4 w-4' />
							<span className='hidden lg:block'>Bojan Jagetic</span>
							<span className='lg:hidden '>B.Jagetic</span>
						</a>
						<a
							id='lnk-github-button'
							className='inline-flex items-center text-sm text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
							href='https://github.com/basskibo/'
							target='_blank'
							rel='noreferrer'>
							<SiGithub className='mr-1 h-4 w-4' /> basskibo
						</a>
						<a
							id='lnk-twitter-button'
							className='inline-flex items-center text-sm text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
							href='https://twitter.com/basskibo1'
							target='_blank'
							rel='noreferrer'>
							<SiTwitter className='mr-1 h-4 w-4 ' />
							<span className=' lg:block'>basskibo1</span>
						</a>
						<button
							onClick={handleDownload}
							id='download_button'
							className='inline-flex items-center text-sm text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
						// className='mt-5 flex justify-center items-center content-center gap-2 px-5 lg:px-10 rounded-md  p-3 shadow-md  shadow-neutral-800 hover:cursor-pointer text-center text-white  border border-[#7928ca] hover:text-[#ff0080] hover:shadow-neutral-500 '
						>
							<IoCloudDownloadOutline className='mr-1 h-4 w-4 ' />
							Download CV
						</button>
					</div>
				</div>
				{/* </MotionComponent> */}
			</div>
			<AnchorLink
				id='btn-anchor-linkg'
				href='#featuredPostsSection'
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
			{/* <FeatureLanding /> */}
			<FeaturedPosts />
			<NewsLetter />
		</div>
	)
}

export default Landing
