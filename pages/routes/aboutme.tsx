import React from 'react'
import TechnologyStack from '../../components/custom/TechnologyStack'
import CV from '../../components/CV'
import FeatureLanding from '@/components/FeatureLanding'
import SupportMe from '@/components/SupportMe'
import { ComponentHeader } from '@/components/layout/ComponentHeading'
import MotionWrapper from '@/components/layout/MotionWrapper'
import { motion } from 'framer-motion'
import { aboutMeBio } from '@/components/config/bios'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

const Bio: React.FC = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.1
			}
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut" as const
			}
		}
	}

	return (
		<div className={cn(
			"min-h-screen bg-background",
			"px-4 sm:px-6 md:px-8 lg:px-10",
			"py-8 sm:py-12 md:py-16 lg:py-20"
		)}>
			<div className="max-w-6xl mx-auto">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="space-y-12 sm:space-y-16 md:space-y-20"
				>
					{/* Header Section */}
					<motion.div variants={itemVariants} className="text-center">
						<ComponentHeader
							titlePrefix={'About '}
							title={'Me'}
							subtitle={'Full-stack developer'}
							text={'Experienced Software Developer with a demonstrated history of working in the IT industry, specializing in IoT. Skilled in JavaScript, Node.js, React, React Native, Next.js, MongoDB, Docker, and more. Programming is my passion, and I strive to learn new technologies every day.'}
						/>
					</motion.div>

					{/* Support Me & Technology Stack */}
					<motion.div
						variants={itemVariants}
						className={cn(
							"space-y-8 sm:space-y-10",
							"pb-8 sm:pb-10 md:pb-12",
							"border-b border-border"
						)}
					>
						<SupportMe />
						<TechnologyStack />
					</motion.div>

					{/* CV Section */}
					<motion.div variants={itemVariants}>
						<CV />
					</motion.div>

					{/* Feature Landing Section */}
					<motion.div variants={itemVariants}>
						<FeatureLanding />
					</motion.div>
				</motion.div>
			</div>
		</div>
	)
}

export default Bio

