import React from "react"
import { SiTwitter, SiGithub } from "react-icons/si"
const FeatureLanding = () => {
	return (
		<div>
			<section className='text-slate-400 body-font bg-teal-900' id='sectionFeature'>
				<div className='container px-5 py-5 mx-auto'>
					<h1 className='sm:text-3xl text-2xl font-medium title-font text-center text-white mb-20'>
						My activity on social network
						<br className='hidden sm:block' />
						at least some of
					</h1>
					<div className='flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6'>
						<div className='p-4 md:w-1/3 flex'>
							<div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-neutral-900 text-blue-500 mb-4 flex-shrink-0'>
								<SiGithub />
							</div>
							<div className='flex-grow pl-6'>
								<h2 className='text-white text-lg title-font font-semibold mb-2'>
									Check Github repository
								</h2>
								<p className='leading-relaxed text-base mb-2'>
									Look up for more details on Github for this porfolio/blog
									website, which you are looking at currently
								</p>
								<span className='max-w-32'>
									<object
										type='image/svg+xml'
										data='https://gh-card.dev/repos/basskibo/blog_tech_dev.svg?link_target=_blank'
									></object>
								</span>
							</div>
						</div>
						<div className='p-4 md:w-1/3 flex'>
							<div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-neutral-900 text-blue-500 mb-4 flex-shrink-0'>
								<SiGithub />
							</div>
							<div className='flex-grow pl-6'>
								<h2 className='text-white text-lg title-font font-semibold mb-2'>
									My LinkedIn featured post
								</h2>
								{/* <p className='leading-relaxed text-base mb-2'>
									Aute aliqua proident sunt magna occaecat ullamco deserunt.Eu
									enim ex fugiat eiusmod qui et ut.
								</p> */}
								<iframe
									src='https://www.linkedin.com/embed/feed/update/urn:li:share:6757995941825011712'
									height='80%'
									width='100%'
									frameBorder='0'
									allowFullScreen=''
									title='Featured post'
								></iframe>
							</div>
						</div>
						<div className='p-4 md:w-1/3 flex'>
							<div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-neutral-900 text-blue-500 mb-4 flex-shrink-0'>
								<SiTwitter />
							</div>
							<div className='flex-grow pl-6'>
								<h2 className='text-white text-lg title-font font-semibold mb-2'>
									My featured tweet
								</h2>
								<a
									className='twitter-timeline'
									data-theme='dark'
									data-tweet-limit='1'
									href='https://twitter.com/basskibo1'
								>
									Tweets by @Basskibo1
								</a>{" "}
								<script
									async
									src='https://platform.twitter.com/widgets.js'
									charSet='utf-8'
								></script>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default FeatureLanding
