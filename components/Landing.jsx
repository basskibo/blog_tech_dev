import React from "react"
import Accent from "../components/custom/Accent"
import ActiveLink from "../components/custom/ActiveLink"
import DeathStar from "../public/images/dt_star.svg"
// import DeathStarAnakin from "../public/images/ds.png";
import { FeatureLanding } from "./"
import AnchorLink from "react-anchor-link-smooth-scroll"

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
		<div className='bg-teal-900 '>
			<main className='h-full flex py-3 md:py-2 xl:py-12 lg:py-10  px-6 lg:px-32 text-slate-200 '>
				<section className='w-full xl:mx-10 xl:w-10/12'>
					{/* <span className='font-bold border p-1 mb-2 border-lime-600 uppercase tracking-widest sm:text-xl xs:text-lg lg:text-xl'>
                  Part of Iguana
               </span> */}
					<h1 className=' sm:text-xl xs:text-lg lg:text-5xl font-bold mb-2 '>
						Hello there,
						<br />
						{/* <Accent>My name is Bojan Jagetic </Accent> */}
						<Accent className='text-2xl sm:text-3xl lg:text-6xl'>
							{" "}
							My name is Bojan{" "}
						</Accent>
					</h1>
					<p className='font-bold mb-1 w-full block lg:hidden text-sm'>
						Writing code is my obsession as well as constant self-improvement, I
						have developed many web applications and platforms from scratch in my
						spare time (when I&apos;m not coding). Accustomed to using extensive
						tech stack because I love challenging and complex projects.
					</p>
					<p className='font-bold mb-1 w-full hidden lg:block'>
						Writing code is my obsession as well as constant self-improvement, I
						have developed many web applications and platforms from scratch in my
						spare time (when I&apos;m not coding). Accustomed to using extensive
						tech stack because I love challenging and complex projects.
					</p>

					<div className='mt-5 lg:mt-7 inline-grid xl:grid-cols-2 sm:grid-cols-1 gap-2 text-sm sm:text-md xs:text-sm lg:text-md'>
						<ActiveLink
							href='/routes/blog'
							name='blog'
							className='mt-5 bg-neutral-800 border border-slate-400 p-3 shadow-lg shadow-neutral-800
                  hover:shadow-slate-800 hover:cursor-pointer'
						>
							<Accent>Read blog </Accent>
						</ActiveLink>
						<ActiveLink
							href='/routes/projects'
							className='mt-5 border bg-neutral-800 border-slate-400 p-3 shadow-lg shadow-neutral-800
                  hover:shadow-slate-800 hover:cursor-pointer'
						>
							<Accent>Checkout my projects</Accent>
						</ActiveLink>
					</div>
					<div className='mt-5 lg:mt-7 flex gap-x-4'>
						<a
							className='inline-flex text-lg text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
							href='https://github.com/basskibo/'
							target='_blank'
							rel='noreferrer'
						>
							<SiGithub className='mr-2 h-6 w-6' /> basskibo
						</a>

						<a
							className='inline-flex text-lg text-slate-300 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
							href='https://linkedin.com/in/Bojan Jagetic-jagetic-972203106'
							target='_blank'
							rel='noreferrer'
						>
							<SiLinkedin className='mr-2 h-6 w-6' />
							<span className='hidden lg:block'>Bojan Jagetic</span>
							<span className='lg:hidden lg'>B.Jagetic</span>
						</a>
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
					fill='#171717'
					fillOpacity='1'
					d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
				></path>
			</svg>
			<AnchorLink
				href='#sectionFeature'
				aria-label='Scroll down'
				className='hidden lg:block absolute bottom-0 text-white left-1/2 -translate-x-1/2 md:bottom-10 rounded-md transition-colors cursor-pointer hover:text-primary-300 focus-visible:text-primary-300 animate-bounce'
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
			<FeatureLanding />
		</div>
	)
}

export default Landing
