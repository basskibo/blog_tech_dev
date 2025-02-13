import React from 'react'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import ActiveLink from '../custom/ActiveLink'
import Image from 'next/image'
import logoSmImg from '../../public/logo/logo_sm.webp'
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { CaretDownIcon, DividerVerticalIcon } from "@radix-ui/react-icons";
import clsx from 'clsx'
import { generalStyles, generalTheme } from '../config/styles'

const navigation = [
	{ name: 'Home', href: '/', current: true },
	{ name: 'Blog', href: '/routes/blog', current: false },
	{ name: 'Libary', href: '/routes/libaries', current: false },
	{ name: 'About', href: '/routes/aboutme', current: false }
]


const Header = () => {
	const [isScrolled, setIsScrolled] = React.useState(false);
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			// Check if the user has scrolled down from the top
			setIsScrolled(window.scrollY > 10);
		};

		// Listen to the scroll event
		window.addEventListener('scroll', handleScroll);

		// Cleanup event listener on component unmount
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Dynamic class for the menu
	const menuClass = classNames(
		"top-0 z-50 pt-6 flex w-full justify-center fixed inset-x-0 transition-opacity duration-500",
		{
			'opacity-100 pointer-events-auto': !isScrolled,
			'opacity-0 pointer-events-none': isScrolled,
		}
	);

	return (
		<>
			<NavigationMenu.Root className={clsx(menuClass)}>
				<NavigationMenu.List className="center m-0 flex list-none rounded-md  p-2 shadow-[0_2px_10px] bg-neutral-800/60 backdrop-filter backdrop-blur-lg bg-opacity-70 shadow-blackA4">
					{navigation.map((item) => (
						<NavigationMenu.Item key={item.name}>
							<NavigationMenu.Link
								className={generalStyles.getHeaderStyle()}
								href={item.href}
							>
								{item.name}
							</NavigationMenu.Link>
						</NavigationMenu.Item>
					))}


					{/* <NavigationMenu.Item>
						<NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-0.5 rounded px-3 py-2 text-[15px] font-medium leading-none text-mauve8 outline-none  focus:shadow-[0_0_0_2px] focus:shadow-violet7">
							Projects{" "}
							<CaretDownIcon
								className="relative top-px text-mauve10 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
								aria-hidden
							/>
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className="absolute left-0 top-0 w-full sm:w-auto">
							<ul className="m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
								<ListItem
									title="Introduction"
									href="/primitives/docs/overview/introduction"
								>
									Build high-quality, accessible design systems and web apps.
								</ListItem>
								<ListItem
									title="Getting started"
									href="/primitives/docs/overview/getting-started"
								>
									A quick tutorial to get you up and running with Radix
									Primitives.
								</ListItem>
								<ListItem title="Styling" href="/primitives/docs/guides/styling">
									Unstyled and compatible with any styling solution.
								</ListItem>
								<ListItem
									title="Animation"
									href="/primitives/docs/guides/animation"
								>
									Use CSS keyframes or any animation library of your choice.
								</ListItem>
								<ListItem
									title="Accessibility"
									href="/primitives/docs/overview/accessibility"
								>
									Tested in a range of browsers and assistive technologies.
								</ListItem>
								<ListItem
									title="Releases"
									href="/primitives/docs/overview/releases"
								>
									Radix Primitives releases and their changelogs.
								</ListItem>
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item> */}

					<div className="w-px pt-2 bg-neutral-700 h-100%"></div>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger
							className={classNames(
								"block select-none rounded-md p-3 text-[13px] lg:text-[15px] leading-none no-underline outline-none transition-colors hover:bg-gray-800 focus:shadow-[0_0_0_2px] focus:shadow-violet7",
								"group flex select-none items-center justify-between gap-0.5 px-3 py-1 sm:text-[13px] lg:text-[17px] font-medium leading-none text-mauve9 outline-none"
							)}>
							More{" "}
							<CaretDownIcon
								className="relative top-px text-mauve9 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
								aria-hidden
							/>
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className={classNames(
							"absolute bg-gray-900 left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto",
							// { 'hidden': !isMenuOpen }
						)}>
							<ul className="one m-0 grid list-none gap-x-2.5 p-[12px] sm:w-[500px] sm:grid-cols-[0.75fr_1fr]">
								<li className="row-span-3 grid">
									<NavigationMenu.Link asChild>
										<a
											className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-600 to-blue-700 p-[20px] no-underline outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet7"
											href="/quiz"
										>
											<Image
												className=' h-30 w-30 items-center align-middle '
												src={logoSmImg}
												width={30}
												height={30}
												priority={true}
												alt='Jagetic'
											/>
											<div className="mb-[7px] mt-4 text-[18px] font-medium leading-[1.2] text-white">
												Interview Quiz
											</div>
											<p className="text-[14px] leading-[1.3] text-mauve7">
												Play interactive quiz, where you can prepare for interview,remember forgoten knowledge or learn.
											</p>
										</a>
									</div>
									<div className='hidden sm:block sm:ml-6'>
										<div className='flex space-x-5'>
											{navigation.map((item) => (
												<ActiveLink
													key={item.name}
													href={item.href}
													id={`${item.name}_header_button`}
													data-splitbee-event={`Header clicked ${item.name}_header_button`}
												>
													{item.name}
												</ActiveLink>
											))}
										</div>
									</div>
								</div>
								<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 xs:hidden'>
									{/* <div className='text-center hidden lg:inline'>
                              <Link href={`/`}>
                                 <a className='inline-flex'>
                                    <span className='h-9 mb-3 flex items-center mt-3 justify-center  font-semibold px-5 border-2 border-lime-800 text-slate-400 hover:bg-sky-800 hover:text-white hover:cursor-pointer transition duration-500 ease-in-out'>
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
                           </div> */}
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

								<ListItem href="/guestbook" title="GuestBook" className="text-sky-600">
									Leave a message, appreciation, or suggestions
								</ListItem>
								<ListItem href="/routes/uses" title="Daily Uses">
									A peek of my workspace and tools.
								</ListItem>
								<ListItem href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist" target="__blank" title="Newsletter">
									Subscribe to my newslatter and be up to date
								</ListItem>
							</ul>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
					{/* <NavigationMenu.Indicator className="top-full z-10 flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
						<div className="relative top-[70%] size-2.5 rotate-45 rounded-tl-sm bg-white" />
					</NavigationMenu.Indicator> */}
				</NavigationMenu.List>

				<div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
					<NavigationMenu.Viewport className="relative mt-2.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md bg-white transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
				</div>
			</NavigationMenu.Root>
		</>

	);
};

const ListItem = React.forwardRef(
	({ className, children, title, ...props }, forwardedRef) => (
		<li>
			<NavigationMenu.Link asChild>
				<a
					className={classNames(
						"block select-none rounded-md p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-gray-800 focus:shadow-[0_0_0_2px] focus:shadow-violet7",
						className,
					)}
					{...props}
					ref={forwardedRef}
				>
					<div className="mb-[5px] font-medium leading-[1.2] text-sky-600">
						{title}
					</div>
					<p className="leading-[1.4] text-mauve11">{children}</p>
				</a>
			</NavigationMenu.Link>
		</li>
	),
);

ListItem.displayName = 'ListItem';

export default Header
