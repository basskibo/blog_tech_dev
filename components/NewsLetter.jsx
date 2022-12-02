import React, { useState, Fragment } from 'react'
import Accent from './custom/Accent'
import { Dialog, Transition } from '@headlessui/react'
import { MdWavingHand } from 'react-icons/md'
import { SiHashnode } from 'react-icons/si'
import axios from 'axios'

const NewsLetter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setemail] = useState('')
  const [validationError, setValidationError] = useState(false)

  function closeModal () {
    setemail('')
    setIsOpen(false)
  }

  function openModal () {
    const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/
    if (regex.test(email)) {
      setIsOpen(true)
      saveSubscriber(email)
      setValidationError(false)
    } else {
      setValidationError(true)
    }
  }

  function handleChange (e) {
    console.log(e.target.value)
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
      <div className='bg-neutral-900 pb-10 md:p-5'>
         <div className='relative max-w-7xl mx-auto sm:px-4 lg:px-0 sm:static'>
            <div className=' grid place-items-left place-content-center xs:mx-2 xs:px-3 mx-auto relative xl:border bg-neutral-900 xl:border-neutral-700   grid-cols-1 lg:grid-cols-2 gap-10 p-10 lg:p-[60px] rounded-2xl'>

               <div>
                  <h3 className='text-white text-4xl font-semibold'>
                         Get in touch
                  </h3>

                  <p className='text-sm text-white mt-4'>
                     <Accent className='font-bold'>Dont be shy</Accent>, if you have some great idea or project you wish to get done feel free to contact me
                  </p>
                  <a className='transform hover:scale-[1.02] transition-all ml-0 xs:ml-0 p-2 w-2/4 my-3 md:w-1/4 md:py-3 rounded-md  shadow-sm  shadow-neutral-700 flex flex-row m-2
            hover:cursor-pointer text-center text-white  border border-[#7928ca]  hover:text-[#ff0080] hover:shadow-neutral-500'
                  href="mailto:jagetic.bojan@gmail.com">
                     <span className='basis-3/4 md:text-sm '>Say hello</span>
                     <MdWavingHand className='text-xl mx-1 px-0 basis-1/4 text-amber-400' />
                  </a>
               </div>
               <div>
                  <h3 className='text-white text-4xl font-semibold'>
                         Blogging
                  </h3>

                  <p className='text-sm text-white mt-4'>
                     I have been writing blogs as well on <Accent className='font-bold'>hashnode</Accent>, I try to keep content up to date with my personal blog
                  </p>
                  <a className='transform hover:scale-[1.02] transition-all ml-0 xs:ml-0 p-2 w-2/4 my-3 md:w-1/4 md:py-3 rounded-md  shadow-sm  shadow-neutral-700 flex flex-row m-2
            hover:cursor-pointer text-center text-white  border border-[#7928ca]  hover:text-[#ff0080] hover:shadow-neutral-500'
                  href="https://hashnode.bojanjagetic.com/" target='_blank' rel='noreferrer'>
                     <span className='basis-3/4 md:text-sm '>Read</span>
                     <SiHashnode className='text-xl mx-1 px-0 basis-1/4 text-[#2962FF]' />
                  </a>
               </div>
               <div>
                  <h3 className='text-white text-4xl font-semibold'>
                     Sign up for <Accent> newsletter</Accent>
                  </h3>

                  <p className='text-sm text-white mt-4'>
                     if you liked what you read and want to read a lot of
                     similar content, subscribe to the mailing list and receive
                     an email on a weekly/monthly basis.
                  </p>
               </div>
               <div>
                  <div className=' items-stretch grid'>
                     {/* <input
                     type='email'
                     placeholder='Enter your email'
                     className='px-4 w-full bg-neutral-900 rounded-md border-gray-300 ring ring-gray-500 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  /> */}
                     <input
                        className='w-4/4 lg:w-3/4 my-3 bg-neutral-900 text-white  px-3 py-2 rounded-md border border-slate-600 focus:border-[#7928ca] flex-grow focus:outline-none cursor-text'
                        placeholder='Enter your email'
                        value={email}
                        onChange={handleChange}
                        type='email'
                        // onChange={handleSearchChange}
                     />
                     <button
                        type='button'
                        data-splitbee-event="Subscribe Newsletter"
                        onClick={openModal}
                        disabled={!email}
                        className='transform hover:scale-[1.02] transition-all md:w-1/4 ml-0 xs:ml-0 p-2 w-4/4 my-3 lg:w-1/4 rounded-md  shadow-sm  shadow-neutral-700
                  hover:cursor-pointer text-center text-white  border border-[#7928ca]  hover:text-[#ff0080] hover:shadow-neutral-500'>
                        Subscribe
                     </button>
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
                           <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-900  border border-neutral-700 p-6 text-left align-middle shadow-xl transition-all'>
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
                                       className='inline-flex justify-center rounded-md border border-transparent bg-neutral-900 text-sm text-white p-3'
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
