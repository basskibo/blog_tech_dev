import React, { useState, useEffect } from "react"
import axios from "axios"
import { FiUsers, FiMapPin } from "react-icons/fi"
import { RiGitRepositoryCommitsLine, RiGitRepositoryPrivateLine } from "react-icons/ri"

const GithubCard = () => {
	const [profile, setProfile] = useState(null)

	useEffect(() => {
		const url = "https://api.adviceslip.com/advice"

		const fetchData = async () => {
			try {
				const profileInLocaleStorage = localStorage.getItem("profile")
				console.log(profileInLocaleStorage)
				let profileFetched
				if (!profileInLocaleStorage) {
					const response = await axios.get(
						"https://api.github.com/users/basskibo"
						// , {
						// 	headers: {
						// 		Authorization: "token 6888b5336f1fbc75edb8de9961846462e0e1c218",
						// 	},
						// }
					)
					localStorage.setItem("profile", JSON.stringify(response.data))

					console.log(response)
					profileFetched = response.data
					console.log(profileFetched)
				} else {
					profileFetched = JSON.parse(profileInLocaleStorage)
					console.log("postoji vec")
				}
				setProfile(profileFetched)
			} catch (error) {
				console.log("error", error)
			}
		}

		const existingProfile = window.localStorage.getItem("github_profile")

		if (!existingProfile) {
			fetchData()
		} else {
			setProfile(existingProfile)
		}
	}, [])

	return (
		<div className='container  border bg-neutral-800 p-5 rounded-lg'>
			{profile ? (
				<div>
					<p className='text-white font-extrabold text-xl mb-3'>@{profile.login}</p>
					<img
						src={profile.avatar_url}
						className='w-full h-40 border border-gray-400'
					/>
					<div className='  mt-1'>
						<FiUsers className='h-full mt-0.1 inline-flex' />{" "}
						<span className='mx-3'>
							Following <b>{profile.following}</b>
						</span>
						<span>
							Followers <b>{profile.followers}</b>
						</span>
					</div>
					<div className='  mt-1'>
						<FiMapPin className='h-full mt-0.1 inline-flex' />{" "}
						<span className='mx-3'>{profile.location}</span>
					</div>
					<div className='  mt-1'>
						<RiGitRepositoryCommitsLine className='h-full mt-0.1 inline-flex' />{" "}
						<span className='mx-3'>
							Public repositories <b>{profile.public_repos}</b>
						</span>
					</div>
					<div className='  mt-1'>
						<RiGitRepositoryPrivateLine className='h-full mt-0.1 inline-flex' />{" "}
						<span className='mx-3'>
							Private repositories <b>{profile.total_private_repos}</b>
						</span>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default GithubCard
