import React from "react"
import Accent from "../components/custom/Accent"
import ActiveLink from "../components/custom/ActiveLink"
import DeathStar from "../public/images/dt_star.svg"
import DeathStarAnakin from "../public/images/launch.svg"
import { FeatureLanding } from "./"
import AnchorLink from "react-anchor-link-smooth-scroll"
import SvgWave from "./layout/SvgWave"
import { SiGithub, SiLinkedin } from "react-icons/si"
import Image from "next/image"

const Landing = () => {
	const handleClick = (e) => {
		e.preventDefault()
		router.push(href)
	}
	return (
		// <div className='bg-gradient-to-r from-purple-900 to-indigo-900 '>
		// <div className='bg-gradient-to-r from-amber-800 to-lime-900 '>
		<div className=''>
			<div className='h-screen text-slate-200  mx-5 pack-train'>
				<div
					className='grid place-items-left place-content-center gap-1 h-screen
				lg:mx-80 '
				>
					<h1
						className=' text-3xl xs:text-2xl lg:text-5xl  font-bold mb-2
					 '
					>
						Hello there,
						<br />
						<Accent className='text-3xl sm:text-3xl lg:text-6xl '>
							My name is Bojan{" "}
						</Accent>
					</h1>
					<p className='font-bold mb-1 lg:hidden text-lg lg:text-3xl'>
						Writing code is my obsession as well as constant self-improvement, I
						have developed many web applications and platforms from scratch in my
						spare time (when I&apos;m not coding). Accustomed to using extensive
						tech stack because I love challenging and complex projects.
					</p>
					<p className='font-bold mb-1  hidden lg:block text-lg'>
						Writing code is my obsession as well as constant self-improvement, I
						have developed many web applications and platforms from scratch in my
						spare time (when I&apos;m not coding). Accustomed to using extensive
						tech stack because I love challenging and complex projects.
					</p>
					{/* <DeathStar className='md:h-64 lg:h-96 w-80' /> */}

					<div className='mt-5  lg:mt-7 inline-grid xl:grid-cols-2 sm:grid-cols-1 gap-2 text-sm sm:text-md xs:text-sm lg:text-md'>
						<ActiveLink
							href='/routes/blog'
							name='blog'
							className='mt-5  rounded-md  p-3 shadow-md  shadow-neutral-800
                  hover:shadow-slate-800 hover:cursor-pointer text-center text-white  border border-lime-500
				  '
						>
							Read blog
						</ActiveLink>
						<ActiveLink
							href='/routes/aboutme'
							className='mt-5  rounded-md  p-3 shadow-md shadow-neutral-800
                  hover:shadow-slate-800 hover:cursor-pointer text-center  border border-lime-500'
						>
							Check my bio
						</ActiveLink>
					</div>

					<div className='mt-5 lg:mt-7 flex gap-x-4'>
						<a
							className='inline-flex  text-lg text-slate-300 hover:underline link link-underline link-underline-black
							 hover:cursor-ne-resize'
							href='https://github.com/basskibo/'
							target='_blank'
							rel='noreferrer'
						>
							<SiGithub className='mr-2 h-6 w-6' /> basskibo
						</a>

						<a
							className='inline-flex text-lg text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
							href='https://linkedin.com/in/bojan-jagetic-972203106'
							target='_blank'
							rel='noreferrer'
						>
							<SiLinkedin className='mr-2 h-6 w-6' />
							<span className='hidden lg:block'>Bojan Jagetic</span>
							<span className='lg:hidden lg'>B.Jagetic</span>
						</a>
					</div>
				</div>
			</div>

			<AnchorLink
				href='#sectionFeature'
				aria-label='Scroll down'
				className=' absolute bottom-0 text-white left-1/2 -translate-x-1/2 md:bottom-10 rounded-md transition-colors cursor-pointer hover:text-primary-300 focus-visible:text-primary-300 animate-bounce'
			>
				<svg
					className='w-6 h-6'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fillRule='evenodd'
						d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
						clipRule='evenodd'
					></path>
				</svg>
			</AnchorLink>
			<SvgWave />

			<FeatureLanding />
		</div>
	)
}

export default Landing
