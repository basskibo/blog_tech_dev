import React from 'react'
import axios from 'axios'
import { SiSpotify } from 'react-icons/si'
import Accent from './Accent'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

const SpotifyCard = () => {
  const { data, error } = useSWR('api/spotify', fetcher)
  if (error) {
    // TODO Make notification dialog popup
    console.log(error)
  }

  return (
      <div className='text-slate-400 bg-neutral-900 border border-neutral-600 rounded-lg w-7/8'>
         <a
            target='_blank'
            rel='noreferrer'
            href={
               data?.isPlaying
                 ? data.songUrl
                 : 'https://open.spotify.com/user/4g1ztvqi3z5mf0uqx87bz9exk'
            }
            className='relative flex  items-center space-x-2 py-4 pl-2 transition-shadow hover:shadow-md'>
            <div className='w-18'>
               {data?.isPlaying
                 ? (
                  <img
                     className='w-12 shadow-sm'
                     src={data?.albumImageUrl}
                     alt={data?.album}
                  />
                   )
                 : (
                  <SiSpotify size={64} color={'#1ED760'} />
                   )}
            </div>

            <div className='flex-1'>
               <p className='component text-xs'>
                  {data?.isPlaying ? 'Currently listening:' : ''}
               </p>
               <p className='component font-bold text-md w-48 lg:w-72 truncate'>
                  {data?.isPlaying
                    ? (
                     <Accent>{data.title}</Accent>
                      )
                    : (
                        'Currently not listening'
                      )}
               </p>
               <p className='font-dark text-sm text-semibold'>
                  {data?.isPlaying ? `Artist: ${data.artist}` : 'Spotify'}
               </p>
               <p className='font-dark text-xs text-semibold truncate'>
                  {data?.isPlaying ? `Album: ${data.album}` : ''}
               </p>
            </div>
            <div className='absolute right-1.5 top-1.5'>
               {data?.isPlaying
                 ? (
                  <SiSpotify size={20} color={'#1ED760'} />
                   )
                 : (
                  <></>
                   )}
            </div>
         </a>
      </div>
  )
}

export default SpotifyCard
