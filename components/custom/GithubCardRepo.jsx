/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { GoRepo } from 'react-icons/go'
import { AiOutlineStar } from 'react-icons/ai'

const GithubCardProfile = ({ children }) => {
  const [repository, setRepository] = useState(null)

  useEffect(() => {
    const url = `https://api.github.com/repos/${children}`
    const fetchData = async () => {
      try {
        const response = await axios.get(
          url
          // , {
          // headers: {
          // Authorization: "token 6888b5336f1fbc75edb8de9961846462e0e1c218",
          // },
          // }
        )

        setRepository(response.data)
      } catch (error) {
        console.error('error', error)
      }
    }

    fetchData()
  }, [children])

  const setLanguageColor = (language) => {
    switch (language) {
      case 'TypeScript':
        return { backgroundColor: '#3178c6' }
      case 'Shell':
        return { backgroundColor: '#89e051' }
      case 'JavaScript':
        return { backgroundColor: '#f1e05a' }
      case 'HTML':
        return { backgroundColor: '#e34c26' }
      case 'CSS':
        return { backgroundColor: '#563d7c' }
      case 'Java':
        return { backgroundColor: '#b07219' }
    }
  }

  return (
      <div className='container mt-3 lg:mt-10  w-1/1  lg:w-2/3'>
         <p className='my-3'>
            You can check the code directly in the GitHub repository
         </p>
         {repository ? (
            <div
               className='border border-neutral-600 rounded-lg  p-3 '
               style={{ backgroundColor: '#22272E', color: '#768390' }}>
               <a href={repository.html_url} target='_blank' rel='noreferrer'>
                  {/* <div className='relative ...'>
                     <div className='absolute h-32 w-32 -left-0 -top-0 ...'>
                        <SiGithub className='' />
                     </div>
                  </div> */}
                  <div className='flex flex-row'>
                     <div>
                        <GoRepo className='text-xl mt-5' />
                     </div>
                     <div>
                        <p
                           className=' font-bold text-xl  py-4 pl-2'
                           style={{ color: '#539BF5' }}>
                           {/* <SiGithub className='' />  */}
                           {repository.name}
                        </p>
                     </div>

                     {/* <span className=' border  '>{repository.visibility}</span> */}
                  </div>

                  {/* <div>
                     <img
                        alt='profile avatar'
                        // layout="fill"
                        // width="50" height="50"
                        src={repository.owner.avatar_url}
                        className='w-full h-40 lg:h-64 border border-gray-400'
                     />
                  </div> */}
                  <div className=' p-2'>
                     {/* <FiMapPin className='h-full mt-0.1 inline-flex' />{" "} */}
                     <span className='font-normal text-sm'>
                        {repository.description}
                     </span>
                  </div>
                  {/* <div
                     className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2
                   sm:grid-cols-2 m-0 p-2 w-1/3'>
                     <span className=''>
                        <GoRepoForked className='h-full mt-0.1 inline-flex' />{" "}
                        <b>{repository.forks_count}</b>
                     </span>
                     <span className=''>
                        <GoEye className='h-3 mt-0.1 inline-flex' />{" "}
                        <b>{repository.watchers}</b>
                     </span>
                     <span>
                        <GoOrganization className='h-full mt-0.1 inline-flex' />{" "}
                        <b>{repository.subscribers_count}</b>
                     </span>
                  </div> */}
                  <div className='flex flex-row p-2  mt-2'>
                     <div
                        className='w-3 h-3 mt-1.5 mr-2 rounded-full '
                        style={setLanguageColor(repository.language)}></div>

                     <div className='ml-0 mr-3'>{repository.language}</div>
                     {repository.stargazers_count > 0
                       ? (
                        <div className=''>
                           <AiOutlineStar className='h-4 mt-0.1 inline-flex' />
                           <b>{repository.stargazers_count}</b>
                        </div>
                         )
                       : (
                        <></>
                         )}
                  </div>
               </a>
            </div>
         ) : (
            <></>
         )}
      </div>
  )
}

export default GithubCardProfile
