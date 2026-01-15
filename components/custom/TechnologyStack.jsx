/* eslint-disable no-tabs */
import React from 'react'
import constants from '../../lib/constants'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const BEtechArray = constants.BEtechArray
const FEtechArray = constants.FEtechArray
const ideOstechArray = constants.ideOstechArray

const TechnologyStack = () => {
	const stackVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut"
			}
		}
	}

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={stackVariants}
			className={cn(
				"space-y-8 sm:space-y-10",
				"p-6 sm:p-8 rounded-xl",
				"bg-card border border-border",
				"shadow-lg"
			)}
		>
			{/* Backend Technologies */}
			<div className="space-y-4">
				<h3 className={cn(
					"text-lg sm:text-xl font-bold",
					"text-foreground"
				)}>
					Backend Frameworks & Services
				</h3>
				<div className={cn(
					"flex flex-wrap gap-4 sm:gap-6",
					"items-center"
				)}>
					{BEtechArray.map((tech, index) => {
						const IconComponent = tech.icon
						return (
							<motion.div
								key={tech.name}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								className={cn(
									"flex flex-col items-center justify-center",
									"p-3 sm:p-4 rounded-lg",
									"bg-muted/50 hover:bg-muted",
									"border border-border hover:border-primary/50",
									"transition-all duration-200",
									"group cursor-pointer"
								)}
								title={tech.name}
							>
								{IconComponent && (
									<IconComponent className={cn(
										"h-8 w-8 sm:h-10 sm:w-10",
										"text-muted-foreground group-hover:text-primary",
										"transition-colors duration-200"
									)} />
								)}
								<span className={cn(
									"mt-2 text-xs sm:text-sm",
									"text-muted-foreground group-hover:text-foreground",
									"transition-colors duration-200",
									"text-center max-w-[80px] truncate"
								)}>
									{tech.name}
								</span>
							</motion.div>
						)
					})}
				</div>
			</div>

			{/* Frontend Technologies */}
			<div className="space-y-4">
				<h3 className={cn(
					"text-lg sm:text-xl font-bold",
					"text-foreground"
				)}>
					Frontend & Hybrid Mobile Frameworks
				</h3>
				<div className={cn(
					"flex flex-wrap gap-4 sm:gap-6",
					"items-center"
				)}>
					{FEtechArray.map((tech, index) => {
						const IconComponent = tech.icon
						return (
							<motion.div
								key={tech.name}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								className={cn(
									"flex flex-col items-center justify-center",
									"p-3 sm:p-4 rounded-lg",
									"bg-muted/50 hover:bg-muted",
									"border border-border hover:border-primary/50",
									"transition-all duration-200",
									"group cursor-pointer"
								)}
								title={tech.name}
							>
								{IconComponent && (
									<IconComponent className={cn(
										"h-8 w-8 sm:h-10 sm:w-10",
										"text-muted-foreground group-hover:text-primary",
										"transition-colors duration-200"
									)} />
								)}
								<span className={cn(
									"mt-2 text-xs sm:text-sm",
									"text-muted-foreground group-hover:text-foreground",
									"transition-colors duration-200",
									"text-center max-w-[80px] truncate"
								)}>
									{tech.name}
								</span>
							</motion.div>
						)
					})}
				</div>
			</div>

			{/* IDEs & OS */}
			<div className="space-y-4">
				<h3 className={cn(
					"text-lg sm:text-xl font-bold",
					"text-foreground"
				)}>
					IDEs & Operating Systems
				</h3>
				<div className={cn(
					"flex flex-wrap gap-4 sm:gap-6",
					"items-center"
				)}>
					{ideOstechArray.map((tech, index) => {
						const IconComponent = tech.icon
						return (
							<motion.div
								key={tech.name}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								className={cn(
									"flex flex-col items-center justify-center",
									"p-3 sm:p-4 rounded-lg",
									"bg-muted/50 hover:bg-muted",
									"border border-border hover:border-primary/50",
									"transition-all duration-200",
									"group cursor-pointer"
								)}
								title={tech.name}
							>
								{IconComponent && (
									<IconComponent className={cn(
										"h-8 w-8 sm:h-10 sm:w-10",
										"text-muted-foreground group-hover:text-primary",
										"transition-colors duration-200"
									)} />
								)}
								<span className={cn(
									"mt-2 text-xs sm:text-sm",
									"text-muted-foreground group-hover:text-foreground",
									"transition-colors duration-200",
									"text-center max-w-[80px] truncate"
								)}>
									{tech.name}
								</span>
							</motion.div>
						)
					})}
				</div>
			</div>
		</motion.div>
	)
}

export default TechnologyStack
