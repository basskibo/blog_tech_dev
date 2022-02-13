import React from "react"

const FeatureLanding = () => {
	return (
		<div>
			<section className='text-slate-400 body-font bg-neutral-900' id='sectionFeature'>
				<div className='container px-5 py-24 mx-auto'>
					<h1 className='sm:text-3xl text-2xl font-medium title-font text-center text-white mb-20'>
						Raw Denim Heirloom Man Braid
						<br className='hidden sm:block' />
						Selfies Wayfarers
					</h1>
					<div className='flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6'>
						<div className='p-4 md:w-1/3 flex'>
							<div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4 flex-shrink-0'>
								<svg
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									className='w-6 h-6'
									viewBox='0 0 24 24'
								>
									<path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
								</svg>
							</div>
							<div className='flex-grow pl-6'>
								<h2 className='text-white text-lg title-font font-semibold mb-2'>
									Shooting Stars
								</h2>
								<p className='leading-relaxed text-base'>
									Blue bottle crucifix vinyl post-ironic four dollar toast vegan
									taxidermy. Gastropub indxgo juice poutine, ramps microdosing
									banh mi pug VHS try-hard ugh iceland kickstarter tumblr
									live-edge tilde.
								</p>
								<a className='mt-3 text-blue-500 inline-flex items-center'>
									Learn More
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-4 h-4 ml-2'
										viewBox='0 0 24 24'
									>
										<path d='M5 12h14M12 5l7 7-7 7'></path>
									</svg>
								</a>
							</div>
						</div>
						<div className='p-4 md:w-1/3 flex'>
							<div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4 flex-shrink-0'>
								<svg
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									className='w-6 h-6'
									viewBox='0 0 24 24'
								>
									<circle cx='6' cy='6' r='3'></circle>
									<circle cx='6' cy='18' r='3'></circle>
									<path d='M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12'></path>
								</svg>
							</div>
							<div className='flex-grow pl-6'>
								<h2 className='text-white text-lg title-font font-semibold mb-2'>
									The Catalyzer
								</h2>
								<p className='leading-relaxed text-base'>
									Blue bottle crucifix vinyl post-ironic four dollar toast vegan
									taxidermy. Gastropub indxgo juice poutine, ramps microdosing
									banh mi pug VHS try-hard ugh iceland kickstarter tumblr
									live-edge tilde.
								</p>
								<a className='mt-3 text-blue-500 inline-flex items-center'>
									Learn More
									<svg
										fill='none'
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-4 h-4 ml-2'
										viewBox='0 0 24 24'
									>
										<path d='M5 12h14M12 5l7 7-7 7'></path>
									</svg>
								</a>
							</div>
						</div>
						<div className='p-4 md:w-1/3 flex'>
							<div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4 flex-shrink-0'>
								<svg
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									className='w-6 h-6'
									viewBox='0 0 24 24'
								>
									<path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'></path>
									<circle cx='12' cy='7' r='4'></circle>
								</svg>
							</div>
							<div className='flex-grow pl-6'>
								<h2 className='text-white text-lg title-font font-semibold mb-2'>
									My latest tweet
								</h2>
								<blockquote
									className='twitter-tweet'
									data-dnt='true'
									data-theme='dark'
								>
									<p lang='en' dir='ltr'>
										Day #33 of{" "}
										<a href='https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw'>
											#100DaysOfCode
										</a>{" "}
										Starting from day #33 due to creating twitter account at
										this moment 😀Short retrospective, started working on my
										personal blog/portfolio website, which is made in Nextjs,
										React, Tailwindcss. In the meantime,I made simple ubuntu
										essential shell script⬇️
									</p>
									&mdash; basskibo (@basskibo1){" "}
									<a href='https://twitter.com/basskibo1/status/1492849074780921859?ref_src=twsrc%5Etfw'>
										February 13, 2022
									</a>
								</blockquote>{" "}
								<script
									async
									src='https://platform.twitter.com/widgets.js'
									charset='utf-8'
								></script>
								{/* <blockquote
									class='twitter-tweet'
									data-lang='en'
									data-dnt='true'
									data-theme='dark'
								>
									<p lang='en' dir='ltr'>
										Day #33 of{" "}
										<a href='https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw'>
											#100DaysOfCode
										</a>{" "}
										Starting from day #33 due to creating twitter account at
										this moment 😀Short retrospective, started working on my
										personal blog/portfolio website, which is made in Nextjs,
										React, Tailwindcss. In the meantime,I made simple ubuntu
										essential shell script⬇️
									</p>
									&mdash; basskibo (@basskibo1){" "}
									<a href='https://twitter.com/basskibo1/status/1492849074780921859?ref_src=twsrc%5Etfw'>
										February 13, 2022
									</a>
								</blockquote>{" "}
								<script
									async
									src='https://platform.twitter.com/widgets.js'
									charset='utf-8'
								></script> */}
								{/* <p className='leading-relaxed text-base'>
                           Blue bottle crucifix vinyl post-ironic four dollar
                           toast vegan taxidermy. Gastropub indxgo juice
                           poutine, ramps microdosing banh mi pug VHS try-hard
                           ugh iceland kickstarter tumblr live-edge tilde.
                        </p>
                        <a className='mt-3 text-blue-500 inline-flex items-center'>
                           Learn More
                           <svg
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              className='w-4 h-4 ml-2'
                              viewBox='0 0 24 24'>
                              <path d='M5 12h14M12 5l7 7-7 7'></path>
                           </svg>
                        </a> */}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default FeatureLanding
