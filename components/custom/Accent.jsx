import { cn } from '@/lib/utils'
import React from 'react'

const Accent = ({ children, className }) => {
	return (
		<span
			className={cn(
				'text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary',
				'font-bold',
				className
			)}
		>
			{children}
		</span>
	)
}

export default Accent
