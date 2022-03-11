import React, { useState, useEffect } from "react"
import axios from "axios"
import { SiSpotify } from "react-icons/si"

const fetchCurent = async () => {
	const result = await axios(`${process.env.BASE_URL}/api/spotify`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
	console.log(result.data)
	return result.data
}

const SpotifyCard = () => {
	const [song, setSong] = useState({})

	useEffect(() => {
		fetchCurent().then((result) => setSong(result))
	}, [])

	return (
		<div className='text-slate-400'>
			<a
				target='_blank'
				rel='noreferrer'
				href={
					song?.isPlaying
						? song.songUrl
						: "https://open.spotify.com/user/4g1ztvqi3z5mf0uqx87bz9exk"
				}
				className='relative flex w-50 items-center space-x-4 rounded-md border p-5 transition-shadow hover:shadow-md'
			>
				<div className='w-18'>
					{song?.isPlaying ? (
						<img
							className='w-16 shadow-sm'
							src={song?.albumImageUrl}
							alt={song?.album}
						/>
					) : (
						<SiSpotify size={64} color={"#1ED760"} />
					)}
				</div>

				<div className='flex-1'>
					<p className='component text-sm'>
						{song?.isPlaying ? "Currently listening:" : ""}
					</p>
					<p className='component font-bold text-lg'>
						{song?.isPlaying ? `${song.title}` : "Not Listening"}
					</p>
					<p className='font-dark text-sm text-semibold'>
						{song?.isPlaying ? `Artist: ${song.artist}` : "Spotify"}
					</p>
					<p className='font-dark text-sm text-semibold'>
						{song?.isPlaying ? `Album: ${song.album}` : ""}
					</p>
				</div>
				<div className='absolute right-1.5 bottom-1.5'>
					<SiSpotify size={20} color={"#1ED760"} />
				</div>
			</a>
		</div>
	)
}

export default SpotifyCard
