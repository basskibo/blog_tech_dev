import React from 'react'
import { Disclosure } from '@headlessui/react'
import { HiChevronUp } from 'react-icons/hi'

export default function Example ({ props }) {
  const { question, children } = props
  return (
        <div className="w-full  pt-2">
            <div className=" w-full  rounded-2xl bg-neutral-900 p-2">
                <Disclosure >
                    {({ open }) => (
                        <>
                            <Disclosure.Button as={'h3'} className="flex w-full justify-between rounded-lg bg-neutral-700 backdrop-blur-xl p-4 py-2 text-left text-md font-medium text-white hover:cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                {/* <span className='text-lg'> */}
                                    {question}
                                {/* </span> */}
                                <HiChevronUp
                                    className={`${open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-white text-lg`}
                                />
                            </Disclosure.Button>
                            {/* <Transition
                                enter="transition duration-200 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-200 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            > */}
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-slate-400">
                                    {children}
                                </Disclosure.Panel>
                            {/* </Transition> */}
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
  )
}
