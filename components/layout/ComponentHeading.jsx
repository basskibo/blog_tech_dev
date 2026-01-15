import { motion } from "framer-motion";
import Accent from "../custom/Accent";
import MotionWrapper from "./MotionWrapper";
import { cn } from "@/lib/utils";

export function ComponentHeader({ titlePrefix, title, subtitle, text, size = 'lg'}) {
	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -20 },
		show: { 
			opacity: 1, 
			y: 0, 
			transition: { 
				type: "spring",
				stiffness: 100,
				damping: 15
			} 
		},
	};

	const FADE_UP_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: 20 },
		show: { 
			opacity: 1, 
			y: 0, 
			transition: { 
				type: "spring",
				stiffness: 100,
				damping: 15,
				delay: 0.1
			} 
		},
	};

	return (
		<MotionWrapper>
			<div className="space-y-4 sm:space-y-6">
				{/* Main Heading */}
				<motion.h1
					className={cn(
						"text-center font-display text-foreground",
						"text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
						"font-bold tracking-tight",
						"leading-[1.1]",
						"drop-shadow-sm"
					)}
					variants={FADE_DOWN_ANIMATION_VARIANTS}
				>
					{titlePrefix} <Accent>{title}</Accent>
				</motion.h1>

				{/* Subtitle */}
				{subtitle && (
					<motion.p
						className={cn(
							"text-center text-muted-foreground",
							"text-lg sm:text-xl md:text-2xl",
							"font-medium"
						)}
						variants={FADE_UP_ANIMATION_VARIANTS}
					> 
						{subtitle}
					</motion.p>
				)}

				{/* Description Text */}
				{text && (
					<motion.p
						className={cn(
							"mx-auto text-center text-muted-foreground",
							"text-base sm:text-lg md:text-xl",
							"leading-relaxed",
							"max-w-3xl",
							"mt-4 sm:mt-6"
						)}
						variants={FADE_UP_ANIMATION_VARIANTS}
					>
						{text}
					</motion.p>
				)}
			</div>
		</MotionWrapper>
	);
}