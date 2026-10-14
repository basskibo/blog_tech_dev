import { cn } from '@/lib/utils'
import React from 'react'

const Accent = ({ children, className }) => {
	return (
		<strong className={cn('font-bold', className)} style={{ color: 'var(--accT)' }}>
			{children}
		</strong>
	)
}

export default Accent
