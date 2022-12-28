import cslx from 'clsx'
import React from 'react'

// type AccentType = React.ComponentPropsWithoutRef<"span">

const Accent = ({ children, className }) => {
  return (
      <span
         className={cslx(
           className,
           // "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-lime-500 mb-5"
           'text-transparent bg-clip-text font-bold bg-gradient-to-r from-[#9046da] to-[#ff0080] mb-5' // potential main color
           // "text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-teal-600 mb-5"
         )}>
         {children}
      </span>
  )
}

export default Accent
