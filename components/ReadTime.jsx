import React from 'react'
import { IoTimeOutline } from 'react-icons/io5'
import cslx from 'clsx'
const readingTime = require('reading-time')

const ReadTime = ({ children, className }) => {
  const stats = readingTime(JSON.stringify(children))
  return (
      <p className={cslx(className, 'inline-flex mt-1')}>
         <IoTimeOutline className='h-full pb-1 text-lg' />{' '}
         <span className='ml-2 pb-1'>{stats.text}</span>
      </p>
  )
}

export default ReadTime
