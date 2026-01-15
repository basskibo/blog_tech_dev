import React from 'react'
	import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

const CategoryChip = ({ categories, className }) => {
	if (!categories || categories.length === 0) {
		return null
	}

	return (
		<div className={cn("flex flex-wrap gap-1.5", className)}>
			{categories.map((category) => (
				<Badge
					key={category.slug || category.name}
					variant="secondary"
					className={cn(
						"text-xs font-medium",
						"bg-secondary/50 text-secondary-foreground",
						"border border-border/50",
						"hover:bg-secondary hover:border-border",
						"transition-all duration-200",
						"cursor-default"
					)}
				>
					#{category.name}
				</Badge>
			))}
		</div>
	)
}

export default CategoryChip
