import React from 'react'
import Accent from '../components/custom/Accent'
import ActiveLink from '../components/custom/ActiveLink'
import { FeaturedPosts } from './'
import { SiGithub, SiLinkedin, SiTwitter } from 'react-icons/si'
import NewsLetter from './NewsLetter'
import { TypeAnimation } from 'react-type-animation'
import { IoCloudDownloadOutline } from "react-icons/io5"
import ParticlesBackground from './custom/ParticlesBackground'
import AnchorLinkComponent from './custom/AnchorLink'

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
				<ParticlesBackground />
				{/* <div className=''> */}
				<div className=' text-slate-200 md:px-10 px-5 '>
					{/* <MotionComponent> */}
					<div
						// className='grid place-items-left place-content-center gap-1 h-screen mx-auto lg:max-w-4xl sm:max-w-xl'>
						className='flex flex-col justify-center gap-1 h-screen mx-auto lg:max-w-4xl sm:max-w-xl'>
						<div className=' text-2xl xs:text-xl lg:text-5xl  font-bold mb-2'>
							Hello there,
							<br />
							<h1 className='text-2xl sm:text-2xl lg:text-6xl '>
								My name is{' '}
								<Accent>
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
						</div>

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

						<div className='flex flex-row mt-7 lg:mt-10  xl:grid-cols-2 sm:grid-cols-1 gap-2 text-sm sm:text-md xs:text-sm lg:text-md'>

							<ActiveLink
								data-umami-event="landing-read-blog"
								href='/routes/blog'
								name='blog'
								id='blog_post_button'
								className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-sm  shadow-neutral-800
				hover:cursor-pointer text-center text-white  border border-[#7928ca] hover:text-[#ff0080] hover:shadow-neutral-600 '>
								Read blog
							</ActiveLink>
							<ActiveLink
								data-umami-event="landing-see-bio"
								href='/routes/aboutme'
								id='aboutme_button'
								className='mt-5 px-5 lg:px-10 rounded-md  p-3 shadow-sm  shadow-neutral-800 hover:cursor-pointer text-center text-white  border border-[#7928ca] hover:text-[#ff0080] hover:shadow-neutral-500 '>
								See my bio
							</ActiveLink>
						</div>
						<div className='flex md:flex-row flex-col mt-7 lg:mt-10 gap-x-4'>
							<a
								data-umami-event="landing-lnk-linkedin-button"
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
								data-umami-event="landing-lnk-github-button"
								id='lnk-github-button'
								className='inline-flex items-center text-sm text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
								href='https://github.com/basskibo/'
								target='_blank'
								rel='noreferrer'>
								<SiGithub className='mr-1 h-4 w-4' /> basskibo
							</a>
							<a
								data-umami-event='landing-lnk-twitter-button'
								id='lnk-twitter-button'
								className='inline-flex items-center text-sm text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
								href='https://twitter.com/basskibo1'
								target='_blank'
								rel='noreferrer'>
								<SiTwitter className='mr-1 h-4 w-4 ' />
								<span className=' lg:block'>basskibo1</span>
							</a>
							<button
								data-umami-event="landing-download-cv-button"
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
				<AnchorLinkComponent/>
				{/* <SvgWave /> */}
				<FeaturedPosts />
				{/* <FeatureLanding /> */}

				<NewsLetter />
			</div>
	)
}

export default Landing
