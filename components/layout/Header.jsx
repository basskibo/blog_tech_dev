import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import logoSmImg from '../../public/logo/logo_sm.webp'
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { CaretDownIcon } from "@radix-ui/react-icons"

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Blog', href: '/routes/blog' },
	{ name: 'Libary', href: '/routes/libaries' },
	{ name: 'About', href: '/routes/aboutme' }
]

const Header = () => {
	const router = useRouter()
	const [isScrolled, setIsScrolled] = React.useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const isActive = (href) => {
		if (href === '/') {
			return router.asPath === '/'
		}
		return router.asPath.startsWith(href)
	}

	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.3 }}
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top",
					isScrolled
						? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
						: "bg-transparent"
				)}
			>
				<nav className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 lg:h-20">
						{/* Logo */}
						<Link href="/" className="flex items-center space-x-2">
							<Image
								src={logoSmImg}
								width={32}
								height={32}
								alt="Bojan Jagetic"
								className="rounded"
								priority
							/>
							<span className="hidden sm:inline-block text-lg font-semibold text-foreground">
								Bojan Jagetic
							</span>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center space-x-1">
							<NavigationMenu.Root>
								<NavigationMenu.List className="flex items-center space-x-1">
									{navigation.map((item) => (
										<NavigationMenu.Item key={item.name}>
											<NavigationMenu.Link asChild>
												<Link
													href={item.href}
													className={cn(
														"px-4 py-2 rounded-md text-sm font-medium transition-colors",
														"hover:bg-accent hover:text-accent-foreground",
														isActive(item.href)
															? "bg-accent text-accent-foreground"
															: "text-muted-foreground"
													)}
												>
													{item.name}
												</Link>
											</NavigationMenu.Link>
										</NavigationMenu.Item>
									))}

									{/* More Menu */}
									<NavigationMenu.Item>
										<NavigationMenu.Trigger className="group flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
											More
											<CaretDownIcon className="relative top-px transition-transform duration-200 group-data-[state=open]:-rotate-180" />
										</NavigationMenu.Trigger>
										<NavigationMenu.Content className="absolute left-0 top-full mt-2 w-full sm:w-auto">
											<div className="bg-popover border rounded-lg shadow-lg p-2 min-w-[280px] sm:min-w-[400px]">
												<div className="grid gap-1 sm:grid-cols-2">
													<NavigationMenu.Link asChild>
														<Link
															href="/quiz"
															className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 text-white hover:from-indigo-500 hover:to-blue-600 transition-colors"
														>
															<div className="flex items-center gap-2 mb-2">
																<Image
																	src={logoSmImg}
																	width={24}
																	height={24}
																	alt="Quiz"
																	className="rounded"
																/>
																<span className="font-semibold">Interview Quiz</span>
															</div>
															<p className="text-sm text-white/90">
																Play interactive quiz to prepare for interviews
															</p>
														</Link>
													</NavigationMenu.Link>
													<NavigationMenu.Link asChild>
														<Link
															href="/guestbook"
															className="p-4 rounded-lg hover:bg-accent transition-colors"
														>
															<div className="font-medium text-foreground mb-1">GuestBook</div>
															<p className="text-sm text-muted-foreground">
																Leave a message or suggestions
															</p>
														</Link>
													</NavigationMenu.Link>
													<NavigationMenu.Link asChild>
														<Link
															href="/routes/uses"
															className="p-4 rounded-lg hover:bg-accent transition-colors"
														>
															<div className="font-medium text-foreground mb-1">Daily Uses</div>
															<p className="text-sm text-muted-foreground">
																My workspace and tools
															</p>
														</Link>
													</NavigationMenu.Link>
													<NavigationMenu.Link asChild>
														<a
															href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist"
															target="_blank"
															rel="noopener noreferrer"
															className="p-4 rounded-lg hover:bg-accent transition-colors"
														>
															<div className="font-medium text-foreground mb-1">Newsletter</div>
															<p className="text-sm text-muted-foreground">
																Subscribe to stay updated
															</p>
														</a>
													</NavigationMenu.Link>
												</div>
											</div>
										</NavigationMenu.Content>
									</NavigationMenu.Item>
								</NavigationMenu.List>

								<div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
									<NavigationMenu.Viewport className="relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-lg transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
								</div>
							</NavigationMenu.Root>
						</div>

						{/* Mobile Menu Button */}
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</nav>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
						>
							<div className="container mx-auto px-4 py-4 space-y-2">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										onClick={() => setIsMobileMenuOpen(false)}
										className={cn(
											"block px-4 py-2 rounded-md text-base font-medium transition-colors",
											"hover:bg-accent hover:text-accent-foreground",
											isActive(item.href)
												? "bg-accent text-accent-foreground"
												: "text-muted-foreground"
										)}
									>
										{item.name}
									</Link>
								))}
								<div className="pt-2 border-t border-border mt-2">
									<Link
										href="/quiz"
										onClick={() => setIsMobileMenuOpen(false)}
										className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									>
										Interview Quiz
									</Link>
									<Link
										href="/guestbook"
										onClick={() => setIsMobileMenuOpen(false)}
										className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									>
										GuestBook
									</Link>
									<Link
										href="/routes/uses"
										onClick={() => setIsMobileMenuOpen(false)}
										className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									>
										Daily Uses
									</Link>
									<a
										href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist"
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => setIsMobileMenuOpen(false)}
										className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									>
										Newsletter
									</a>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.header>
		</>
	)
}

export default Header
