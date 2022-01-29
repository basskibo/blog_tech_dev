import React, { useContext, useEffect, Fragment } from "react";
import Link from "next/link";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon, LoginIcon } from "@heroicons/react/outline";
import DisclocureButton from "./DisclocureButton";
import ActiveLink from "./custom/ActiveLink";
import { useRouter } from "next/router";

const navigation = [
   { name: "Home", href: "/", current: true },
   { name: "Blog", href: "/routes/blog", current: false },

   { name: "Projects", href: "/routes/projects", current: false },
   { name: "Libaries", href: "/routes/libaries", current: false },
   { name: "About", href: "/routes/aboutme", current: false },
];

function classNames(...classes) {
   return classes.filter(Boolean).join(" ");
}

const Header = ({ href }) => {
   const router = useRouter();
   const style = {
      marginRight: 10,
      color: router.asPath === href ? "red" : "black",
   };

   const handleClick = (e) => {
      console.log(e);
      e.preventDefault();
      router.push(href);
   };

   return (
      <div className='sticky top-0 z-50 absolute bg-slate-800'>
         <Disclosure
            as='nav'
            className=' border-b-2 border-slate-400 lg:pb-1 text-white lg:mb-3 lg:pt-1'>
            {({ open }) => (
               <>
                  <div className=' max-w-10xl mx-auto px-2 sm:px-6 lg:px-8'>
                     <div className='relative flex items-center justify-between h-16'>
                        <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                           {/* Mobile menu button*/}
                           <Disclosure.Button className='inline-flex absolute items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white absolute'>
                              <span className='sr-only'>Open main menu</span>
                              {open ? (
                                 <XIcon
                                    className='block h-6 w-6'
                                    aria-hidden='true'
                                 />
                              ) : (
                                 <MenuIcon
                                    className='block h-6 w-6'
                                    aria-hidden='true'
                                 />
                              )}
                           </Disclosure.Button>
                        </div>
                        <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                           <div className='flex-shrink-0 flex items-center'>
                              <a href='/'>
                                 <img
                                    className='block lg:hidden h-8 w-auto'
                                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                                    alt='Workflow'
                                 />
                                 <img
                                    className='hidden lg:block h-8 w-auto'
                                    src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                                    alt='Workflow'
                                 />
                              </a>
                           </div>
                           <div className='hidden sm:block sm:ml-6'>
                              <div className='flex space-x-4'>
                                 {/* <DisclocureButton /> */}
                                 {navigation.map((item) => (
                                    <ActiveLink
                                       key={item.name}
                                       href={item.href}>
                                       {item.name}
                                    </ActiveLink>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 xs:hidden'>
                           <div className='text-center hidden lg:inline'>
                              <Link href={`/`}>
                                 <a className='inline-flex'>
                                    <span className='h-9 mb-3 flex items-center mt-3 justify-center  font-semibold px-5 border-2 border-sky-800 text-slate-400 hover:bg-sky-800 hover:text-white hover:cursor-pointer transition duration-500 ease-in-out'>
                                       Get started
                                       <span className='ml-2'>
                                          <svg
                                             className='w-6 h-6'
                                             fill='none'
                                             stroke='currentColor'
                                             viewBox='0 0 24 24'
                                             xmlns='http://www.w3.org/2000/svg'>
                                             <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'></path>
                                          </svg>
                                       </span>
                                    </span>
                                 </a>
                              </Link>
                           </div>
                           {/* 
                           <button
                              type='button'
                              className='bg-gray-800 p-1 rounded-full text-gray-400 ml-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                              <span className='sr-only'>
                                 View notifications
                              </span>
                              <BellIcon
                                 className='h-6 w-6'
                                 aria-hidden='true'
                              />
                           </button> */}
                           {/* Profile dropdown */}
                           {/* <Menu as='div' className='ml-3 relative'>
                              <div>
                                 <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                                    <span className='sr-only'>
                                       Open user menu
                                    </span>
                                    <img
                                       className='h-8 w-8 rounded-full'
                                       src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                       alt=''
                                    />
                                 </Menu.Button>
                              </div>
                              <Transition
                                 as={Fragment}
                                 enter='transition ease-out duration-100'
                                 enterFrom='transform opacity-0 scale-95'
                                 enterTo='transform opacity-100 scale-100'
                                 leave='transition ease-in duration-75'
                                 leaveFrom='transform opacity-100 scale-100'
                                 leaveTo='transform opacity-0 scale-95'>
                                 <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                                    <Menu.Item>
                                       {({ active }) => (
                                          <a
                                             href='#'
                                             className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                             )}>
                                             Your Profile
                                          </a>
                                       )}
                                    </Menu.Item>
                                    <Menu.Item>
                                       {({ active }) => (
                                          <a
                                             href='#'
                                             className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                             )}>
                                             Settings
                                          </a>
                                       )}
                                    </Menu.Item>
                                    <Menu.Item>
                                       {({ active }) => (
                                          <a
                                             href='#'
                                             className={classNames(
                                                active ? "bg-gray-100" : "",
                                                "block px-4 py-2 text-sm text-gray-700"
                                             )}>
                                             Sign out
                                          </a>
                                       )}
                                    </Menu.Item>
                                 </Menu.Items>
                              </Transition>
                           </Menu> */}
                        </div>
                     </div>
                  </div>

                  <Disclosure.Panel className='sm:hidden'>
                     <div className='px-2 pt-2 pb-3 space-y-1'>
                        {navigation.map((item) => (
                           <ActiveLink key={item.name} href={item.href}>
                              {item.name}
                           </ActiveLink>
                        ))}
                     </div>
                  </Disclosure.Panel>
               </>
            )}
         </Disclosure>
      </div>
   );
};

export default Header;
