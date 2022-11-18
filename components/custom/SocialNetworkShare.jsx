import React from 'react'
import {
  SiFacebook,
  SiTwitter,
  SiLinkedin,
  SiReddit,
  SiTelegram,
  SiViber
} from 'react-icons/si'
import {
  TelegramShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  ViberShareButton
} from 'react-share'

const SocialNetworkSHare = ({ post, type }) => {
  return (
      <div>
         <FacebookShareButton
            className='mr-3 '
            quote={post.excerpt}
            imageUrl={post.featuredImage}
            url={`https://bojanjagetic.com/${type}/${post.slug}`}
            // hashtag={"#iguana #iguanadevelopment"}
         >
            <SiFacebook
               className='hover:text-blue-700 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
               size={22}
               rounded='true'
            />
         </FacebookShareButton>
         <TwitterShareButton
            className='mr-3'
            title={post.title}
            media={post.featuredImage}
            via='basskibo1'
            hashtags={post.tags.map((tag, index) => (
              tag.name
            ))}
            // hashtag={(post.tags)}
            url={`https://bojanjagetic.com/${type}/${post.slug}`}>
            <SiTwitter
               className='hover:text-sky-400 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
               size={22}
               rounded='true'
            />
         </TwitterShareButton>
         <LinkedinShareButton
            title={post.title}
            summary={post.excerpt}
            source={`https://bojanjagetic.com/${type}/${post.slug}`}
            className='mr-3 '
            imageUrl={post.featuredImage}
            url={`https://bojanjagetic.com/${type}/${post.slug}`}>
            <SiLinkedin
               className='hover:text-blue-500 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
               size={22}
               rounded='true'
            />
         </LinkedinShareButton>
         <RedditShareButton
            title={post.title}
            summary={post.excerpt}
            source={`https://bojanjagetic.com/${type}/${post.slug}`}
            className='mr-3 '
            media={post.featuredImage}
            url={`https://bojanjagetic.com/${type}/${post.slug}`}>
            <SiReddit
               className='hover:text-orange-700 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
               size={22}
               rounded='true'
            />
         </RedditShareButton>
         <ViberShareButton
            className='mr-3'
            title={post.title}
            media={post.featuredImage}
            url={`https://bojanjagetic.com/${type}/${post.slug}`}>
            <SiViber
               className='hover:text-violet-700 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
               size={22}
               rounded='true'
            />
         </ViberShareButton>
         <TelegramShareButton
            className='mr-3'
            title={post.title}
            media={post.featuredImage}
            url={`https://bojanjagetic.com/${type}/${post.slug}`}>
            <SiTelegram
               className='hover:text-sky-700 hover:underline link link-underline link-underline-black hover:cursor-ne-resize'
               size={22}
               rounded='true'
            />
         </TelegramShareButton>
      </div>
  )
}

export default SocialNetworkSHare
