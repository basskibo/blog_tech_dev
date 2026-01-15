import React from 'react'
import Accent from './custom/Accent'
import { SiPatreon, SiBuymeacoffee } from "react-icons/si"
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const SupportMe = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={cn(
				"space-y-6",
				"p-6 sm:p-8 rounded-xl",
				"bg-card border border-border",
				"shadow-lg"
			)}
		>
			<h3 className={cn(
				"text-xl sm:text-2xl font-bold",
				"text-foreground mb-4"
			)}>
				Support My Work
			</h3>
			<p className={cn(
				"text-base sm:text-lg",
				"text-muted-foreground leading-relaxed"
			)}>
				If you like what I do, in order to be updated with the latest posts
				and to vote for new content, please feel free to donate whatever amount you like.
			</p>

			<div className="flex flex-col sm:flex-row gap-4 mt-6">
				<Button
					asChild={true}
					variant="default"
					size="lg"
					href="https://www.patreon.com/bePatron?u=67759634"
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						"w-full sm:w-auto",
						"bg-gradient-to-r from-orange-600 to-pink-600",
						"hover:from-orange-500 hover:to-pink-500",
						"text-white font-semibold shadow-lg",
						"transition-all duration-300 hover:scale-105",
						"border-0"
					)}
				>
					<>
						<SiPatreon className="mr-2 h-5 w-5" />
						Become a Patron
					</>
				</Button>
				<Button
					asChild={true}
					variant="outline"
					size="lg"
					href="https://www.buymeacoffee.com/basskibo"
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						"w-full sm:w-auto",
						"border-2 border-amber-500/50",
						"bg-amber-500/10 text-amber-400",
						"hover:bg-amber-500/20 hover:border-amber-500",
						"font-semibold shadow-lg",
						"transition-all duration-300 hover:scale-105"
					)}
				>
					<>
						<SiBuymeacoffee className="mr-2 h-5 w-5" />
						Buy me a coffee
					</>
				</Button>
			</div>
		</motion.div>
	)
}

export default SupportMe
