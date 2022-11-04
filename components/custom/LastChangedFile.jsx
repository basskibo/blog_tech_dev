import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { GoHistory } from 'react-icons/go'

const LastChangedFile = (args) => {
  const [lastTimeChanged, setLastTimeChanged] = useState(null)
  const [changesLink, setChangesLink] = useState(null)

  useEffect(() => {
    const { fileName, type } = args
    const url = `https://api.github.com/repos/basskibo/blog_tech_dev/commits?path=posts/${type}/${fileName}`
    setChangesLink(
         `https://github.com/basskibo/blog_tech_dev/commits/main/posts/${type}/${fileName}`
    )
    const fetchFileHistory = async () => {
      try {
        const history = await axios.get(url)
        const isThereHistory =
               history.status === 200 && history.data.length > 1
                 ? history.data
                 : false
        if (isThereHistory) setLastTimeChanged(false)
        const lastUpdate = isThereHistory[0].commit.author.date
        setLastTimeChanged(lastUpdate)
      } catch (error) {
        console.log(`Error while fetching file history : ${error}`)
      }
    }
    fetchFileHistory()
  }, [])

  return (
      <div className='text-slate-400  lg:text-md sm:text-sm'>
         {lastTimeChanged
           ? (
            <p className=''>
               Last updated {moment(lastTimeChanged).format('DD.MM.YYYY')}.
               <span className='mr-3'>
                  <a
                     href={changesLink}
                     target='_blank'
                     className='ml-2 text-gray-400 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
                     rel='noreferrer'>
                     <GoHistory className='text-slate-400 h-full mt-0.1 mx-1 inline-flex' />
                     See changes
                  </a>
               </span>
            </p>
             )
           : (
            <p>Still fresh, no history for this file</p>
             )}{' '}
      </div>
  )
}

export default LastChangedFile
