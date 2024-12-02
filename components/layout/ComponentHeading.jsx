import { motion } from "framer-motion";
import { Accent } from "..";

export function ComponentHeader({ titlePrefix, title, subtitle, text, size = 'lg'}) {
	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0, transition: { type: "spring" } },
	};
	return (
		<motion.div
			initial="hidden"
			animate="show"
			viewport={{ once: true }}
			variants={{
				hidden: {},
				show: {
					transition: {
						staggerChildren: 0.15,
					},
				},
			}}
		>
			<motion.h1
				className={`text-center font-display text-slate-400  text-${size === 'lg' ? '5xl': '3xl'} font-bold tracking-[-0.02em] drop-shadow-sm md:text-${size === 'lg' ? '7xl' : '6xl'} md:leading-[5rem]`}
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			>
				{titlePrefix} <Accent>{title} </Accent>
			</motion.h1>
			<motion.p
				className="mt-6 text-slate-500 text-center md:text-2xl"
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			>
				{subtitle}
			</motion.p>
			<motion.div
				className="mx-auto text-slate-400 mt-6 flex items-center justify-center space-x-5"
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			>
				{text}
			</motion.div>
		</motion.div>
	);
}