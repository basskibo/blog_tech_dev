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
							className={`group flex select-none items-center justify-between gap-0.5 rounded px-3 py-1 text-[17px] font-medium leading-none text-mauve9 outline-none`}
							onClick={(event) => {
								event.preventDefault(); // Prevent default behavior
								// Toggle the menu open/close state here if needed
							}}
						>
							More{" "}
							<CaretDownIcon
								className="relative top-px text-mauve9 transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
								aria-hidden
							/>
						</NavigationMenu.Trigger>
						<NavigationMenu.Content className="absolute bg-gray-900 left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
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
									</NavigationMenu.Link>
								</li>

								<ListItem href="/quiz" title="Quiz" className="text-sky-600">
									Play interview quiz and test your knowledge in desired field
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
