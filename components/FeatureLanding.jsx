import React from 'react'
import { SiGithub } from 'react-icons/si'
import { IoMdInfinite } from 'react-icons/io'
import { GithubCard } from 'github-user-repo-card'
import Accent from './custom/Accent'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Card } from './ui/card'

const FeatureLanding = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
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
				ease: "easeOut"
			}
		}
	}

	return (
		<div
			id='sectionFeature'
			className={cn(
				"relative overflow-hidden",
				"py-12 sm:py-16 md:py-20 lg:py-24"
			)}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="space-y-12"
				>
					{/* Header */}
					<motion.div variants={itemVariants} className="max-w-3xl">
						<h2 className={cn(
							"text-2xl sm:text-3xl md:text-4xl font-bold",
							"text-foreground mb-4"
						)}>
							<Accent>My Activity on Social Networks</Accent>
						</h2>
					</motion.div>

					{/* Cards */}
					<div className="grid gap-6 md:grid-cols-2">
						{/* GitHub Card */}
						<motion.div variants={itemVariants}>
							<Card className={cn(
								"p-6 sm:p-8",
								"bg-card border-border",
								"hover:shadow-xl transition-shadow duration-300"
							)}>
								<div className="flex items-center gap-3 mb-4">
									<div className={cn(
										"p-3 rounded-lg",
										"bg-primary/10 text-primary"
									)}>
										<SiGithub className="h-6 w-6" />
									</div>
									<h3 className={cn(
										"text-xl font-bold",
										"text-foreground"
									)}>
										My GitHub Profile
									</h3>
								</div>
								<p className={cn(
									"text-sm sm:text-base mb-6",
									"text-muted-foreground leading-relaxed"
								)}>
									Here you can find some basic information about my
									GitHub profile as well as seeing my{' '}
									<a
										href='https://www.jageticbojan.com/libary/github-card-npm-component'
										target='_blank'
										rel='noopener noreferrer'
										className={cn(
											"text-primary hover:text-primary/80",
											"underline underline-offset-4",
											"transition-colors duration-200"
										)}
									>
										github-user-repo-card
									</a>{' '}
									in practice. You can checkout post about it and see
									more info.
								</p>
								<div className="flex justify-center">
									<GithubCard
										name='basskibo'
										type='user'
										repository='blogtech_dev'
										height={450}
										width={300}
									/>
								</div>
							</Card>
						</motion.div>

						{/* Daily.dev Card */}
						<motion.div variants={itemVariants}>
							<Card className={cn(
								"p-6 sm:p-8",
								"bg-card border-border",
								"hover:shadow-xl transition-shadow duration-300"
							)}>
								<div className="flex items-center gap-3 mb-4">
									<div className={cn(
										"p-3 rounded-lg",
										"bg-primary/10 text-primary"
									)}>
										<IoMdInfinite className="h-6 w-6" />
									</div>
									<h3 className={cn(
										"text-xl font-bold",
										"text-foreground"
									)}>
										My Daily.dev Stats
									</h3>
								</div>
								<p className={cn(
									"text-sm sm:text-base mb-6",
									"text-muted-foreground leading-relaxed"
								)}>
									In order to be up-to-date with all the newest things
									going on in dev world, I use{' '}
									<a
										href='https://daily.dev/'
										target='_blank'
										rel='noopener noreferrer'
										className={cn(
											"text-primary hover:text-primary/80",
											"underline underline-offset-4",
											"transition-colors duration-200"
										)}
									>
										daily.dev
									</a>{' '}
									browser extension. I highly recommend you to give it
									a try.
								</p>
								<div className="flex justify-center">
									<a
										href='https://app.daily.dev/basskibo'
										target='_blank'
										rel='noopener noreferrer'
										className="block hover:scale-105 transition-transform duration-200"
									>
										<img
											src='https://api.daily.dev/devcards/cf2aab07c11a46d283d5794c5e2f23c9.png?r=979'
											width='300'
											alt="Bojan Jagetic's Dev Card"
											className="rounded-lg shadow-lg"
										/>
									</a>
								</div>
							</Card>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default FeatureLanding
