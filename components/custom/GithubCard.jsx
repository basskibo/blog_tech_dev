import React, { useState, useEffect } from "react"
import axios from "axios"

const GithubCard = () => {
	const [profile, setProfile] = useState(null)

	// Similar to componentDidMount and componentDidUpdate:
	useEffect(async () => {
		// Update the document title using the browser API
		const profileFetched = await axios.get("https://api.github.com/users/basskibo")
		console.log(profileFetched)
		setProfile(profileFetched.data)
	}, [])
	console.log("#$$$$$$$$$$$$$$$$$$$$$")
	return <div>TEst</div>
}

export default GithubCard
