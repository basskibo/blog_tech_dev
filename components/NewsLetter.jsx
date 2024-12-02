import React, { useState, Fragment } from 'react'
import Accent from './custom/Accent'
import { Dialog, Transition } from '@headlessui/react'
import { MdWavingHand } from 'react-icons/md'
import { SiHashnode, SiDevdotto, SiMedium } from 'react-icons/si'
import axios from 'axios'
import ActiveLink from './custom/ActiveLink'
import { generalStyles } from './config/styles'
import clsx from 'clsx'

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
		<div className='  relative bg-black  overflow-hidden  md:p-10'>
			{/* <div className='bg-gradient-to-b from-neutral-900  to-[#7928ca]  md:p-5'> */}
			<div className='relative max-w-7xl mx-auto sm:px-4 lg:px-0 sm:static'>
				<div className=' grid place-items-left place-content-center xs:mx-2 xs:px-3 mx-auto relative xl:border  xl:border-neutral-800   grid-cols-1 lg:grid-cols-2 gap-10 p-10 lg:p-[60px] rounded-2xl'>

					<div>
						<h2 className='text-white text-4xl font-semibold'>
							Get in touch
						</h2>

						<p className='text-sm text-white mt-4'>
							<Accent className='font-bold'>Dont be shy</Accent>, if you have some great idea or project you wish to get done feel free to contact me
						</p>
						<a data-umami-event={'say-hello-click'}
							className='transform hover:scale-[1.02] transition-all ml-0 xs:ml-0 p-2 w-2/4 my-3 md:w-1/4 md:py-3 rounded-md  shadow-sm  shadow-neutral-700 flex flex-row m-2
            hover:cursor-pointer text-center text-white  border border-[#7928ca]  hover:text-[#ff0080] hover:shadow-neutral-500'
							href="mailto:jagetic.bojan@gmail.com">
							<span className='basis-3/4 md:text-sm '>Say hello</span>
							<MdWavingHand className='text-xl mx-1 px-0 basis-1/4 text-amber-400' />
						</a>
					</div>
					<div>
						<h2 className='text-white text-4xl font-semibold'>
							Blogging
						</h2>

						<p className='text-sm text-white mt-4'>
							I have been writing blogs as well on <Accent className='font-bold'>Dev.to, Medium</Accent> and <Accent className='font-bold'>Hashnode</Accent>, I try to keep content up to date with my personal blog
						</p>
						<div className='flex flex-col xl:flex-row'>
							<a data-umami-event={'newslatter-devto-click'}
								className={clsx(generalStyles.buttonBordered,'ml-0 xs:ml-0 p-2 w-2/4 my-3 md:w-1/4 md:py-3 rounded-md  shadow-sm flex flex-row m-2')  }

								href="https://dev.to/basskibo" target='_blank' rel='noreferrer'>
								<span className='basis-3/4 md:text-sm '>Dev.to</span>
								<SiDevdotto className='text-xl mx-1 px-0 basis-2/4 text-[#fff]' />
							</a>
							<a data-umami-event={'newslatter-hashnode-click'} className='transform hover:scale-[1.02] transition-all ml-0 xs:ml-0 p-2 w-2/4 my-3 md:w-1/4 md:py-3 rounded-md  shadow-sm  shadow-neutral-700 flex flex-row m-2
               hover:cursor-pointer text-center text-white  border border-[#7928ca]  hover:text-[#ff0080] hover:shadow-neutral-500'
								href="https://hashnode.bojanjagetic.com/" target='_blank' rel='noreferrer'>
								<span className='basis-3/4 md:text-sm '>Hashnode</span>
								<SiHashnode className='text-xl mx-1 px-0 basis-1/4 text-[#2962FF]' />
							</a>
							<a data-umami-event={'newslatter-medium-click'} className='transform hover:scale-[1.02] transition-all ml-0 xs:ml-0 p-2 w-2/4 my-3 md:w-1/4 md:py-3 rounded-md  shadow-sm  shadow-neutral-700 flex flex-row m-2
               hover:cursor-pointer text-center text-white  border border-[#7928ca]  hover:text-[#ff0080] hover:shadow-neutral-500'
								href="https://medium.com/@jagetic.bojan" target='_blank' rel='noreferrer'>
								<span className='basis-3/4 md:text-sm '>Medium</span>
								<SiMedium className='text-xl mx-1 px-0 basis-1/4 text-[#cecece]' />
							</a>
						</div>
					</div>
					<div>
						<h2 className='text-white text-4xl font-semibold'>
							Sign up for <Accent> newsletter</Accent>
						</h2>

						<p className='text-sm text-white mt-4'>
							if you liked what you read and want to read a lot of
							similar content, subscribe to the mailing list and receive
							an email on a weekly/monthly basis.
						</p>
					</div>
					<div>
						<div className=' items-stretch grid'>
							<a
								data-umami-event={'newslatter-subscribe-click'}
								data-splitbee-event="Subscribe Newsletter"
								target="_blank"
								rel="noreferrer"
								href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist"
								disabled={!email}
								className='transform hover:scale-[1.02] transition-all md:w-1/4 ml-0 xs:ml-0 p-2 w-4/4 my-3 lg:w-1/4 rounded-md  shadow-sm  shadow-neutral-700 hover:cursor-pointer text-center text-white  border border-[#7928ca]  hover:text-[#ff0080] hover:shadow-neutral-500'>
							Subscribe on newslatter
							</a>
						</div>

						{validationError
							? (
								<p className='text-red-700 mt-2 font-semibold  text-md'>
									Email format is wrong, please try again
								</p>
							)
							: (
								<></>
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
