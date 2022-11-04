/* eslint-disable no-tabs */
import React from 'react'
import { motion } from 'framer-motion'

const cardVariants = {
  offscreen: {
    y: 30
  },
  onscreen: {
    y: 0,

    transition: { type: 'spring', bounce: 0.4, duration: 1 }
  }
}
const MotionComponent = ({ children }) => {
  return (
		// <motion.div animate={{ y: [30, 0, 0] }} transition={{ duration: 1 }}>
		<motion.div className="card-container"
		initial="offscreen"
		whileInView="onscreen"
		viewport={{ once: true, amount: 0.8 }}
			>
				<motion.div className="card" variants={cardVariants}>
				{children}
      </motion.div>
		</motion.div>
  )
}

export default MotionComponent
