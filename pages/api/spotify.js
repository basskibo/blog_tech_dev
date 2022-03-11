// /pages/api/spotify.js
import querystring from "querystring"
import axios from "axios"

console.log(process.env.BASE_URL)
const {
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
	SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
	console.log("getAccessToken")

	const response = await axios.post(
		TOKEN_ENDPOINT,
		querystring.stringify({
			grant_type: "refresh_token",
			refresh_token,
		}),
		{
			headers: {
				Authorization: `Basic ${basic}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}
	)

	console.log(response.data)

	return response.data
}

export const getNowPlaying = async () => {
	console.log("getNowPlaying")
	const { access_token } = await getAccessToken()
	console.log(access_token)
	return axios.get(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
}

export default async (_, res) => {
	const response = await getNowPlaying()
	console.log(response.data)
	if (
		response.status === 204 ||
		response.status > 400 ||
		(response.data && response.data.currently_playing_type !== "track")
	) {
		return res.status(200).json({ isPlaying: false })
	}

	const data = {
		isPlaying: response.data.is_playing,
		title: response.data.item.name,
		album: response.data.item.album.name,
		artist: response.data.item.album.artists.map((artist) => artist.name).join(", "),
		albumImageUrl: response.data.item.album.images[0].url,
		songUrl: response.data.item.external_urls.spotify,
	}

	res.status(200).json(data)
}
