import React from 'react'
import { motion } from 'framer-motion'

const MotionWrapper = ({ children, variants }) => {
	const defaultVariants = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.5 } },
	};

	return (
		<motion.div
			initial="hidden"
			animate="show"
			viewport={{ once: true }}
			variants={variants || defaultVariants}
		>
			{children}
		</motion.div>
	);
};


export default MotionWrapper