import React from "react";
import moment from "moment";
import { CategoryChip } from "./CategoryChip";
import Accent from "./custom/Accent";
import Link from "next/link";
import Image from "next/image";

const PostCard = ({ post }) => {
   console.log(post.tags);
   return (
      <div
         key={post.slug}
         className='w-full  text-white rounded-md border border-gray-600 dark:bg-dark dark:border-gray-600 transform-gpu scale-100 hover:scale-[1.02] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow'>
         <a href={`/post/${post.slug}`}>
            <div className='relative overflow-hidden h-56'>
               <Image
                  alt={post.featuredImage}
                  src={post.featuredImage}
                  blurDataURL='data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7'
                  placeholder='blur'
                  layout='fill'
                  priority
               />

               <div className='absolute w-full py-2 bottom-0 inset-x-0  text-white text-s text-center leading-4'>
                  {/* <CategoryChip className='bg-gray-400' categories={post.tags} /> */}
               </div>
            </div>
            {/* <div className='relative'>
				<img src={post.featuredImage}></img>
			</div> */}
            <div className='p-2 my-3 ml-3'>
               <h1 className='text-lg font-semibold'> {post.title}</h1>
               <p className='mt-5 text-slate-400'>
                  {" "}
                  <span className='align-middle text-slate-400 lg:text-md hidden lg:inline'>
                     {moment(post.publishedAt).format("MMMM DD, YYYY")}
                  </span>
               </p>
               <p className='mt-5 text-slate-400'>{post.excerpt}</p>
            </div>
         </a>
      </div>
   );
};

export default PostCard;
