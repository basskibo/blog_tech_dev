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
				const response = await axios.get("https://api.github.com/users/basskibo", {
					headers: {
						Authorization: "token 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",
					},
				})

				const profileFetched = response.data
				console.log(profileFetched)
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
		<div className='container border-lime-700 bg-neutral-800 p-2'>
			{profile ? (
				<div>
					<p className='text-white text-lg'>{profile.login}</p>
					<img src={profile.avatar_url} className='w-full h-40' />
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
