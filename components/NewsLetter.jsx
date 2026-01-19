import React, { useState, Fragment } from 'react'
import Accent from './custom/Accent'
import { Dialog, Transition } from '@headlessui/react'
import { MdWavingHand } from 'react-icons/md'
import { SiHashnode, SiDevdotto, SiMedium } from 'react-icons/si'
import axios from 'axios'
import ActiveLink from './custom/ActiveLink'
import { IoNewspaperOutline } from 'react-icons/io5'

const NewsLetter = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [email, setemail] = useState('')
	const [validationError, setValidationError] = useState(false)

	function closeModal() {
		setemail('')
		setIsOpen(false)
	}

	function openModal() {

	}

	function handleChange(e) {
		setemail(e.target.value)
		// setIsOpen(true)
	}

	const saveSubscriber = async (subEmail) => {
		const url = '/api/subscribers'
		await axios(url, {
			method: 'POST',
			data: { email: subEmail },
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
	return (
		<div className='relative bg-black overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 safe-top safe-bottom'>
			<div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 sm:static'>
				<div className='grid place-items-left place-content-center mx-auto relative xl:border xl:border-neutral-800/50 grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 p-6 sm:p-8 lg:p-12 xl:p-[60px] rounded-2xl bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm'>

					<div className='space-y-4 sm:space-y-5'>
						<h2 className='text-white text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent'>
							Get in touch
						</h2>

						<p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
							<Accent className='font-bold text-primary-400'>Dont be shy</Accent>, if you have some great idea or project you wish to get done feel free to contact me
						</p>
						<a data-umami-event={'say-hello-click'}
							className='group relative inline-flex items-center justify-center gap-2 mt-4 sm:mt-5 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white
               bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400
               shadow-lg shadow-primary-500/20 hover:shadow-primary-400/40
               transform hover:scale-[1.02] active:scale-[0.98]
               transition-all duration-200 ease-out
               border border-primary-400/30 hover:border-primary-400/50'
							href="mailto:jagetic.bojan@gmail.com">
							<span>Say hello</span>
							<MdWavingHand className='text-xl sm:text-2xl text-amber-300 group-hover:animate-bounce' />
						</a>
					</div>
					<div className='space-y-4 sm:space-y-5'>
						<h2 className='text-white text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent'>
							Blogging
						</h2>

						<p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
							I have been writing blogs as well on <Accent className='font-bold text-primary-400'>Dev.to, Medium</Accent> and <Accent className='font-bold text-primary-400'>Hashnode</Accent>, I try to keep content up to date with my personal blog
						</p>
						<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-5'>
							<a data-umami-event={'newslatter-devto-click'}
								className='group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl font-medium text-sm sm:text-base text-white
               bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800
               border border-gray-700/50 hover:border-gray-600
               shadow-lg hover:shadow-xl
               transform hover:scale-[1.02] active:scale-[0.98]
               transition-all duration-200 ease-out'
								href="https://dev.to/basskibo" target='_blank' rel='noreferrer'>
								<SiDevdotto className='text-lg sm:text-xl text-white' />
								<span>Dev.to</span>
							</a>
							<a data-umami-event={'newslatter-hashnode-click'} 
								className='group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl font-medium text-sm sm:text-base text-white
               bg-gradient-to-br from-indigo-900/50 to-indigo-800/50 hover:from-indigo-800/60 hover:to-indigo-700/60
               border border-indigo-700/50 hover:border-indigo-600
               shadow-lg hover:shadow-xl shadow-indigo-500/10
               transform hover:scale-[1.02] active:scale-[0.98]
               transition-all duration-200 ease-out'
								href="https://hashnode.jageticbojan.com/" target='_blank' rel='noreferrer'>
								<SiHashnode className='text-lg sm:text-xl text-[#2962FF]' />
								<span>Hashnode</span>
							</a>
							<a data-umami-event={'newslatter-medium-click'} 
								className='group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-6 py-3 rounded-xl font-medium text-sm sm:text-base text-white
               bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-gray-900
               border border-gray-800/50 hover:border-gray-700
               shadow-lg hover:shadow-xl
               transform hover:scale-[1.02] active:scale-[0.98]
               transition-all duration-200 ease-out'
								href="https://medium.com/@jagetic.bojan" target='_blank' rel='noreferrer'>
								<SiMedium className='text-lg sm:text-xl text-white' />
								<span>Medium</span>
							</a>
						</div>
					</div>
					<div className='space-y-4 sm:space-y-5'>
						<h2 className='text-white text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent'>
							Sign up for <Accent className='text-primary-400'>newsletter</Accent>
						</h2>

						<p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
							if you liked what you read and want to read a lot of
							similar content, subscribe to the mailing list and receive
							an email on a weekly/monthly basis.
						</p>
					</div>
					<div className='flex flex-col items-start'>
						<a
							data-umami-event={'newslatter-subscribe-click'}
							className='group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white
               bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400
               shadow-lg shadow-secondary-500/20 hover:shadow-secondary-400/40
               transform hover:scale-[1.02] active:scale-[0.98]
               transition-all duration-200 ease-out
               border border-secondary-400/30 hover:border-secondary-400/50'
							href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist"
							target='_blank' rel='noreferrer'>
							<IoNewspaperOutline className='text-xl sm:text-2xl text-white group-hover:rotate-12 transition-transform' />
							<span>Subscribe on newsletter</span>
						</a>
						{validationError && (
							<p className='text-red-400 mt-3 font-semibold text-sm'>
								Email format is wrong, please try again
							</p>
						)}
					</div>
				</div>
				<Transition appear show={isOpen} as={Fragment}>
					<Dialog as='div' className='relative z-10' onClose={closeModal}>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'>
							<div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md' />
						</Transition.Child>

						<div className='fixed inset-0 overflow-y-auto'>
							<div className='flex min-h-full items-center justify-center p-4 text-center'>
								<Transition.Child
									as={Fragment}
									enter='ease-out duration-300'
									enterFrom='opacity-0 scale-95'
									enterTo='opacity-100 scale-100'
									leave='ease-in duration-200'
									leaveFrom='opacity-100 scale-100'
									leaveTo='opacity-0 scale-95'>
									<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl   border border-neutral-700 p-6 text-left align-middle shadow-xl transition-all'>
										<Dialog.Title
											as='h3'
											className='text-lg font-medium leading-6 text-white'>
											Subscription successful
										</Dialog.Title>
										<div className='mt-2'>
											<p className='text-sm text-slate-400'>
												Your subscription has been successfully
												submitted for email <b>{email}</b>. We
												strive to fight against data and privacy
												abuse, so please confirm your email.
											</p>
										</div>

										<div className='mt-4'>
											<span className='bg-gradient-to-r p-[2px]  from-[#7928ca] to-[#ff0080]'>
												<button
													type='button'
													className='inline-flex justify-center rounded-md border border-transparent  text-sm text-white p-3'
													onClick={closeModal}>
													Got it, thanks!
												</button>
											</span>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			</div>
		</div>
	)
}

export default NewsLetter
