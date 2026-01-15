import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, BookOpen, MessageSquare, Wrench, Mail } from 'lucide-react'
import Image from 'next/image'
import logoSmImg from '../../public/logo/logo_sm.webp'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

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
	const [isMobileMoreOpen, setIsMobileMoreOpen] = React.useState(false)

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
							{navigation.map((item) => (
								<Link
									key={item.name}
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
							))}

							{/* More Menu - Desktop */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className={cn(
											"px-4 py-2 rounded-md text-sm font-medium transition-colors",
											"hover:bg-accent hover:text-accent-foreground",
											"text-muted-foreground"
										)}
									>
										More
										<ChevronDown className="ml-1 h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className={cn(
									"w-[420px] p-3 shadow-2xl",
									"border-0 bg-background/95 backdrop-blur-xl"
								)}>
									<div className="grid grid-cols-2 gap-3">
										{/* Interview Quiz - Featured */}
										<DropdownMenuItem asChild className="p-0 focus:bg-transparent">
											<Link
												href="/quiz"
												className={cn(
													"group relative flex flex-col p-5 rounded-xl",
													"bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700",
													"text-white hover:from-indigo-500 hover:via-purple-500 hover:to-blue-600",
													"transition-all duration-300 cursor-pointer",
													"shadow-lg hover:shadow-xl hover:shadow-indigo-500/20",
													"hover:scale-[1.02]",
													"focus:bg-gradient-to-br focus:from-indigo-500 focus:via-purple-500 focus:to-blue-600",
													"focus:outline-none focus:ring-0"
												)}
											>
												<div className="flex items-center gap-3 mb-3">
													<div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
														<BookOpen className="h-5 w-5" />
													</div>
													<span className="font-bold text-base">Interview Quiz</span>
												</div>
												<p className="text-sm text-white/90 leading-relaxed">
													Play interactive quiz to prepare for interviews
												</p>
												<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
											</Link>
										</DropdownMenuItem>

										{/* GuestBook */}
										<DropdownMenuItem asChild className="p-0 focus:bg-transparent">
											<Link
												href="/guestbook"
												className={cn(
													"group flex flex-col p-5 rounded-xl",
													"bg-card/50 backdrop-blur-sm",
													"hover:bg-accent/50",
													"transition-all duration-300 cursor-pointer",
													"shadow-sm hover:shadow-md",
													"hover:scale-[1.02]",
													"focus:outline-none focus:ring-0"
												)}
											>
												<div className="flex items-center gap-3 mb-2">
													<div className="p-2 rounded-lg bg-primary/10 text-primary">
														<MessageSquare className="h-5 w-5" />
													</div>
													<span className="font-semibold text-foreground">GuestBook</span>
												</div>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Leave a message or suggestions
												</p>
											</Link>
										</DropdownMenuItem>

										{/* Daily Uses */}
										<DropdownMenuItem asChild className="p-0 focus:bg-transparent">
											<Link
												href="/routes/uses"
												className={cn(
													"group flex flex-col p-5 rounded-xl",
													"bg-card/50 backdrop-blur-sm",
													"hover:bg-accent/50",
													"transition-all duration-300 cursor-pointer",
													"shadow-sm hover:shadow-md",
													"hover:scale-[1.02]",
													"focus:outline-none focus:ring-0"
												)}
											>
												<div className="flex items-center gap-3 mb-2">
													<div className="p-2 rounded-lg bg-primary/10 text-primary">
														<Wrench className="h-5 w-5" />
													</div>
													<span className="font-semibold text-foreground">Daily Uses</span>
												</div>
												<p className="text-sm text-muted-foreground leading-relaxed">
													My workspace and tools
												</p>
											</Link>
										</DropdownMenuItem>

										{/* Newsletter */}
										<DropdownMenuItem asChild className="p-0 focus:bg-transparent">
											<a
												href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist"
												target="_blank"
												rel="noopener noreferrer"
												className={cn(
													"group flex flex-col p-5 rounded-xl",
													"bg-card/50 backdrop-blur-sm",
													"hover:bg-accent/50",
													"transition-all duration-300 cursor-pointer",
													"shadow-sm hover:shadow-md",
													"hover:scale-[1.02]",
													"focus:outline-none focus:ring-0"
												)}
											>
												<div className="flex items-center gap-3 mb-2">
													<div className="p-2 rounded-lg bg-primary/10 text-primary">
														<Mail className="h-5 w-5" />
													</div>
													<span className="font-semibold text-foreground">Newsletter</span>
												</div>
												<p className="text-sm text-muted-foreground leading-relaxed">
													Subscribe to stay updated
												</p>
											</a>
										</DropdownMenuItem>
									</div>
								</DropdownMenuContent>
							</DropdownMenu>
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
								
								{/* More Button - Mobile */}
								<button
									onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
									className={cn(
										"w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium transition-colors",
										"hover:bg-accent hover:text-accent-foreground",
										"text-muted-foreground"
									)}
								>
									<span>More</span>
									<ChevronDown className={cn(
										"h-4 w-4 transition-transform duration-200",
										isMobileMoreOpen && "rotate-180"
									)} />
								</button>

								{/* More Menu Items - Mobile (Collapsible) */}
								<AnimatePresence>
									{isMobileMoreOpen && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: "auto" }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.2 }}
											className="overflow-hidden"
										>
											<div className="pt-2 border-t border-border mt-2 space-y-2">
												<Link
													href="/quiz"
													onClick={() => {
														setIsMobileMenuOpen(false)
														setIsMobileMoreOpen(false)
													}}
													className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
												>
													Interview Quiz
												</Link>
												<Link
													href="/guestbook"
													onClick={() => {
														setIsMobileMenuOpen(false)
														setIsMobileMoreOpen(false)
													}}
													className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
												>
													GuestBook
												</Link>
												<Link
													href="/routes/uses"
													onClick={() => {
														setIsMobileMenuOpen(false)
														setIsMobileMoreOpen(false)
													}}
													className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
												>
													Daily Uses
												</Link>
												<a
													href="https://bojanjagetic.substack.com/?r=3kcln5&utm_campaign=pub-share-checklist"
													target="_blank"
													rel="noopener noreferrer"
													onClick={() => {
														setIsMobileMenuOpen(false)
														setIsMobileMoreOpen(false)
													}}
													className="block px-4 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
												>
													Newsletter
												</a>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.header>
		</>
	)
}

export default Header
