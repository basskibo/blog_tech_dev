import { motion } from "framer-motion";
import { Accent } from "..";
import MotionWrapper from "./MotionWrapper";

export function ComponentHeader({ titlePrefix, title, subtitle, text, size = 'lg'}) {
	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0, transition: { type: "spring" } },
	};
	console.log('size ', size)
	return (
		<MotionWrapper>
			<motion.h1
				className={`text-center font-display text-slate-400 text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] drop-shadow-sm  md:leading-[5rem]`}
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			>
				{titlePrefix} <Accent>{title} </Accent>
			</motion.h1>
			<motion.p
				className="mt-6 text-lg md:text-lg text-slate-500 text-center"
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			> 
				{subtitle}
			</motion.p>
			<motion.div
				className="mx-auto text-sm md:text-lg  text-slate-400 mt-6 flex items-center justify-center space-x-5"
				variants={FADE_DOWN_ANIMATION_VARIANTS}
			>
				{text}
			</motion.div>
		</MotionWrapper>
	);
}