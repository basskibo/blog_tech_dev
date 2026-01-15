import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { ComponentHeader } from "./layout/ComponentHeading";
import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";
import { dailyItems } from "./data/daily_use";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function DailyUses() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
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
		<div className={cn(
			"relative w-full min-h-screen",
			"bg-gradient-to-b from-background via-background/95 to-background/90",
			"px-4 sm:px-6 md:px-8 lg:px-10",
			"py-8 sm:py-12 md:py-16 lg:py-20"
		)}>
			{/* Background Image with Gradient Overlay */}
			<div
				className={cn(
					"absolute top-0 left-0 w-full h-96 bg-cover bg-center",
					"opacity-20"
				)}
				style={{
					backgroundImage: `url('https://res.cloudinary.com/dr1sm5gnj/image/upload/v1735136801/igutech/blogs/ai-generated-9161446_1920_hvklfn.jpg')`,
				}}
			>
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
			</div>

			{/* Content Area */}
			<div className="relative z-10 max-w-6xl mx-auto">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="space-y-12 sm:space-y-16"
				>
					{/* Header Section */}
					<motion.div variants={itemVariants} className="text-center">
						<ComponentHeader
							titlePrefix={"Daily "}
							title={"Uses"}
							subtitle={""}
							text={"A peek into my workspace and tools."}
						/>
					</motion.div>

					{/* Categories */}
					<TooltipProvider>
						<motion.div variants={itemVariants} className="space-y-12">
							{dailyItems.map((section, index) => (
								<div key={index}>
									<motion.h2 
										variants={itemVariants}
										className={cn(
											"text-2xl sm:text-3xl font-bold mb-6",
											"text-foreground"
										)}
									>
										{section.category}
									</motion.h2>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{section.entries.map((entry, idx) => (
											<motion.div
												key={idx}
												variants={itemVariants}
												whileHover={{ scale: 1.02 }}
												transition={{ duration: 0.2 }}
											>
												<Card className={cn(
													"group relative p-5 sm:p-6",
													"bg-card/50 backdrop-blur-sm border-border",
													"shadow-lg hover:shadow-xl",
													"transition-all duration-300",
													"hover:border-primary/50"
												)}>
													<div className="flex items-start justify-between gap-4">
														<div className="flex-1 min-w-0">
															<h3 className={cn(
																"text-lg sm:text-xl font-bold mb-2",
																"text-foreground",
																"group-hover:text-primary transition-colors"
															)}>
																{entry.title}
															</h3>
															<p className={cn(
																"text-sm sm:text-base leading-relaxed",
																"text-muted-foreground"
															)}>
																{entry.description}
															</p>
														</div>
														{entry.link && (
															<Tooltip>
																<TooltipTrigger asChild>
																	<Link
																		href={entry.link}
																		target="_blank"
																		rel="noopener noreferrer"
																		className={cn(
																			"flex-shrink-0 p-2 rounded-lg",
																			"text-primary hover:text-primary/80",
																			"bg-primary/10 hover:bg-primary/20",
																			"transition-all duration-200",
																			"hover:scale-110"
																		)}
																	>
																		<ExternalLink className="h-5 w-5" />
																	</Link>
																</TooltipTrigger>
																<TooltipContent 
																	className={cn(
																		"bg-popover text-popover-foreground",
																		"p-3 rounded-lg shadow-lg",
																		"border border-border"
																	)}
																>
																	<p>More info about {entry.title}</p>
																</TooltipContent>
															</Tooltip>
														)}
													</div>
												</Card>
											</motion.div>
										))}
									</div>
								</div>
							))}
						</motion.div>
					</TooltipProvider>
				</motion.div>
			</div>
		</div>
	);
}
