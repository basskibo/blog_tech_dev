import React from "react"
import {
	SiFacebook,
	SiTwitter,
	SiLinkedin,
	SiReddit,
	SiTelegram,
	SiViber,
} from "react-icons/si"
import {
	TelegramShareButton,
	EmailIcon,
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	LinkedinShareButton,
	ViberShareButton,
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
				<SiFacebook className='hover:text-blue-700' size={24} rounded='true' />
			</FacebookShareButton>
			<TwitterShareButton
				className='mr-3'
				title={post.title}
				via='IguDev'
				hashtag={post.tags}
				url={`https://igutech.vercel.app/post/${post.slug}`}
			>
				<SiTwitter className='hover:text-sky-400' size={24} rounded='true' />
			</TwitterShareButton>
			<LinkedinShareButton
				title={post.title}
				summary={post.excerpt}
				source='IguTech'
				className='mr-3 '
				url={`https://igutech.vercel.app/post/${post.slug}`}
			>
				<SiLinkedin className='hover:text-blue-500' size={24} rounded='true' />
			</LinkedinShareButton>
			<ViberShareButton
				className='mr-3'
				title={post.title}
				url={`https://igutech.vercel.app/post/${post.slug}`}
			>
				<SiViber className='hover:text-violet-700' size={24} rounded='true' />
			</ViberShareButton>
			<TelegramShareButton
				className='mr-3'
				title={post.title}
				url={`https://igutech.vercel.app/post/${post.slug}`}
			>
				<SiTelegram className='hover:text-sky-700' size={24} rounded='true' />
			</TelegramShareButton>
		</div>
	)
}

export default SocialNetworkSHare
