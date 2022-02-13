import React, { useState, useEffect } from "react"
import moment from "moment"
import { PostCard, Categories, Pagination, CategoryChip } from "../components"
import Accent from "./custom/Accent"
const numberPerPage = 1
import LazyLoad from "react-lazyload"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import { LazyLoadImage } from "react-lazy-load-image-component"

const BlogScreen = ({ posts }) => {
	return (
		<div className='container mx-auto my-14 px-5 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>
			<div className='my-8'>
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-6xl'>Blog</Accent>
				</h1>
				<p className='display-4'>
					Thoughts, mental models, and tutorials about all kind of web development,
					devOps and hybrid mobile applications .
				</p>
				<input
					className='w-full my-3 bg-neutral-900  px-3 py-2 rounded-md
					border border-slate-600 focus:border-sky-400'
					placeholder='Search...'
				></input>
			</div>

			<div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-7'>
				{posts.map((post, index) => (
					<PostCard className='' key={post.props.data.slug} post={post.props} />
				))}
			</div>
		</div>
	)
}

// {
/* <div className="container mx-auto sm:px-0 xs:px-0 lg:px-5 mb-8 bg-gradient-to-tr">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
  <div className="lg:col-span-8 col-span-1">
    {posts.map((post, index) => (
      <PostCard post={post.data} key={post.title} />
    ))}
    <Pagination
      pageNumber={pageNumber}
      numberOfPosts={numberOfPosts}
      numberOfPages={numberOfPages}
    />
  </div>
  <div className="lg:col-span-4 col-span-1">
    <div className="top-8">
      <PostWidget />
      <Categories />
    </div>
  </div>
</div>
</div> */
// }

export default BlogScreen
