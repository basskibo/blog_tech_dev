import cslx from "clsx"
import React from "react"

// type AccentType = React.ComponentPropsWithoutRef<"span">

const Accent = ({ children, className }) => {
	return (
		<span
			className={cslx(
				className,
				"text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-lime-500 mb-5"
			)}
		>
			{children}
		</span>
	)
}

export default Accent
