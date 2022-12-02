import React from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

function ActiveLink ({ children, href, className, id }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    marginTop: 5 /*  */
  }

  const handleClick = (e) => {
    e.preventDefault()

    router.push(href)
  }

  const test = (router) => {
    try {
      if (router.asPath === href) {
        return true
      }

      const routeSplitted = router.asPath.split('/')
      const hrefSplitted = href.split('/')

      if (routeSplitted[1] === 'post' && hrefSplitted[2] === 'blog') {
        return true
      }
      if (routeSplitted[1] === 'libary' && hrefSplitted[2] === 'libaries') {
        return true
      }
      return false
    } catch (exc) {
      console.log(exc)
    }
  }

  return (
      <a
         id={id}
         href={href}
         onClick={handleClick}
         style={style}
         data-splitbee-event={`Click ${id}`}
         className={clsx(
           'font-semibold',
           className || '',
           test(router)
             ? ' underline decoration-solid decoration-2decoration-[#ff0080] underline-offset-4 '
             : 'text-white'
         )}>
         {children}
      </a>
  )
}

export default ActiveLink
