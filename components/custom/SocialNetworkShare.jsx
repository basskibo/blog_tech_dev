import React from "react"
import { SiFacebook, SiTwitter, SiLinkedin, SiReddit, SiTelegram } from "react-icons/si"
import {
	TelegramShareButton,
	EmailIcon,
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	LinkedinShareButton,
	TwitterIcon,
	RedditButton,
	RedditIcon,
} from "react-share"

const SocialNetworkSHare = ({ post }) => {
	return (
		<div>
			<FacebookShareButton
				className='mr-3 '
				quote={post.excerpt}
				url={`https://igutech.vercel.app/post/${post.slug}`}
				// hashtag={"#iguana #iguanadevelopment"}
			>
				<SiFacebook size={24} rounded='true' />
			</FacebookShareButton>
			<TwitterShareButton
				className='mr-3'
				title={post.title}
				via='IguDev'
				hashtag={post.tags}
				url={`https://igutech.vercel.app/post/${post.slug}`}
			>
				<SiTwitter size={24} rounded='true' />
			</TwitterShareButton>
			<LinkedinShareButton
				title={post.title}
				summary={post.excerpt}
				source='IguTech'
				className='mr-3 '
				url={`https://igutech.vercel.app/post/${post.slug}`}
			>
				<SiLinkedin size={24} rounded='true' />
			</LinkedinShareButton>
			<TelegramShareButton
				className='mr-3'
				url={`https://igutech.vercel.app/post/${post.slug}`}
			>
				<SiTelegram size={24} rounded='true' />
			</TelegramShareButton>
		</div>
	)
}

export default SocialNetworkSHare
