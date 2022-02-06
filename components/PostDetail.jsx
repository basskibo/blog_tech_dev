import React from "react";
import moment from "moment";
import CategoryChip from "./CategoryChip";
import Image from "next/image";

import constants from "../lib/constants";

import {
   EmailShareButton,
   EmailIcon,
   FacebookShareButton,
   FacebookIcon,
   TwitterShareButton,
   TwitterIcon,
   RedditShareButton,
   RedditIcon,
} from "react-share";

const PostDetail = ({ post }) => {
   return (
      <div className='container mx-auto px-5 shadow-lg lg:rounded-lg lg:p-0 pb-12 mb-8 lg:mt-5 sm:mt-10 xs:mt-10'>
         <div className='flex justify-center mb-8 w-full pt-5 lg:pt-1 mt-0 lg:mt-0'>
            <h1 className='lg:text-5xl text-xl lg:mb-5 text-semibold text-white font-bold'>
               {post.title}
            </h1>
         </div>
         <div className='relative  md-6 h-80  '>
            <Image
               src={post.featuredImage}
               alt={post.title}
               blurDataURL={constants.imageBlogURI}
               placeholder='blur'
               layout='fill'
               priority
               className=' object-cover h-full w-full '
            />
         </div>
         <div className='px-4 lg:px-0'>
            <div className='flex justify-center text-slate-400 mb-6 mt-6 w-full'>
               <div className='flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
                  {/* <img
							alt={post.author}
							height='30px'
							width='30px'
							// className="align-middle rounded-full"
							className='inline-block h-8 w-8 rounded-full ring-2 ring-orange-600'
							src={post.author}
						/> */}
                  <p className='inline align-middle text-slate-400 ml-2 lg:text-lg sm:text-md'>
                     {post.author}
                  </p>
               </div>
               <div className='flex items-center  mb-4 lg:mb-0 w-full lg:w-auto lg:mr-8 sm:mr-3'>
                  {/* <p className="align-middle mr-2">Publish: </p> */}
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     className='h-6 w-6 inline mr-2 text-sky-800'
                     fill='none'
                     viewBox='0 0 24 24'
                     stroke='currentColor'>
                     <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                     />
                  </svg>
                  <span className='align-middle text-slate-400 lg:text-lg hidden lg:inline'>
                     {moment(post.createdAt).format("MMM DD, YYYY")}
                  </span>
                  <span className='align-middle text-slate-400 lg:text-lg lg:hidden sm:inline'>
                     {moment(post.createdAt).format("DD.MM.YYYY")}
                  </span>
               </div>
               <div className='flex items-center lg:text-lg mb-4 lg:mb-0 w-full lg:w-auto lg:mr-8 sm:mr-1 ml-5 text-slate-400'>
                  <span className='mr-2 hidden lg:inline'>Share: </span>
                  <FacebookShareButton
                     className='mr-2'
                     quote={"This is only a test"}
                     url={`https://igutech.vercel.app/post/${post.slug}`}
                     hashtag={"#iguana #iguanadevelopment"}>
                     <FacebookIcon size={32} rounded='true' />
                  </FacebookShareButton>
                  <TwitterShareButton
                     className='mr-2'
                     url={`https://igutech.vercel.app/post/${post.slug}`}>
                     <TwitterIcon size={32} rounded='true' />
                  </TwitterShareButton>
                  <EmailShareButton
                     className='mr-2 hidden lg:inline'
                     url={`https://igutech.vercel.app/post/${post.slug}`}>
                     <EmailIcon size={32} rounded='true' />
                  </EmailShareButton>
                  <RedditShareButton
                     className='mr-2 hidden lg:inline'
                     url={`https://igutech.vercel.app/post/${post.slug}`}>
                     <RedditIcon size={32} rounded='true' />
                  </RedditShareButton>
               </div>{" "}
            </div>
         </div>
      </div>
   );
};

export default PostDetail;
