import React from "react"
import { motion, LayoutGroup } from "framer-motion"

const MotionComponent = ({ children }) => {
	return (
		<motion.div animate={{ y: [30, 0, 0] }} transition={{ duration: 1 }}>
			{children}
		</motion.div>
	)
}

export default MotionComponent
