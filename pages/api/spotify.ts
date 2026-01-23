// /pages/api/spotify.ts
import { createSpotifyHandler } from 'spotify-now-playing-card'

const spotifyApi = createSpotifyHandler({
	clientId: process.env.SPOTIFY_CLIENT_ID || '',
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
	refreshToken: process.env.SPOTIFY_REFRESH_TOKEN || ''
})

export default spotifyApi

