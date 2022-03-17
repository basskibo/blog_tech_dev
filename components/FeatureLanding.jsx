import React from "react"
import { SiTwitter, SiGithub } from "react-icons/si"
import SpotifyCard from "../components/custom/SpotifyCard"
import GithubCard from "../components/custom/GithubCard"

const FeatureLanding = () => {
	return (
		<div>
			<section className='text-slate-400 body-font bg-teal-900' id='sectionFeature'>
				<div className='container px-5 pb-5 mx-auto'>
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
								<p className='text-slate-400 my-3'>
									Spotify is one of my must have applications in order to work
									properly. I made custom spotify card so you can see what I am
									currently listening to,
								</p>
								<SpotifyCard />
							</div>
						</div>
						<div className='p-4 md:w-1/3 sm:w-1/1 flex'>
							<div className='w-12 h-12 inline-flex items-center justify-center rounded-full bg-neutral-900 text-blue-500 mb-4 flex-shrink-0'>
								<SiGithub />
							</div>
							<div className='flex-grow pl-6'>
								<h2 className='text-white text-lg title-font font-semibold mb-2'>
									My LinkedIn featured post
								</h2>

								<GithubCard />
								<div
									// className='h-20 w-full'
									id='github-card'
									data-username='basskibo'
									data-max-repos='3'
									data-sort-by='stars'
									data-header-text='Most starred repositories'
								></div>
							</div>
						</div>
						<div className='p-4 md:w-1/3 sm:w-1/1 mb-5 flex'>
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
