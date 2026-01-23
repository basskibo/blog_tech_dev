import React from 'react'
import { SpotifyCard as SpotifyNowPlayingCard } from 'spotify-now-playing-card'
import 'spotify-now-playing-card/dist/styles.css'

const SpotifyCard: React.FC = () => {
  return (
    <div className='xs:w-full w-5/8 mx-5 my-2'>
      <SpotifyNowPlayingCard
        apiUrl="/api/spotify"
        fallbackUrl="https://open.spotify.com/user/4g1ztvqi3z5mf0uqx87bz9exk"
        className="border border-neutral-800 rounded-lg"
        styles={{
          container: 'text-slate-400 bg-transparent',
          title: 'font-bold text-md',
          artist: 'text-sm text-semibold',
          album: 'text-xs text-semibold'
        }}
        showAlbum={true}
        notPlayingText="Currently not listening"
        refreshInterval={30000}
        variant="default"
      />
    </div>
  )
}

export default SpotifyCard

