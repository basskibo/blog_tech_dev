import React, { useState, useEffect } from "react"
import moment from "moment"
import { PostCard, PostWidget, Categories, Pagination, CategoryChip } from "../components"
import Accent from "./custom/Accent"
const numberPerPage = 1
import LazyLoad from "react-lazyload"

import { LazyLoadImage } from "react-lazy-load-image-component"

const BlogScreen = ({ posts }) => {
	const [numberOfPages, setnumberOfPages] = useState(0)
	const postNum = posts.length
	const [numberOfPosts, setNumberOfPosts] = useState(postNum)
	const [pageNumber, setpageNumber] = useState(1)

	useEffect(() => {
		const offset = (pageNumber - 1) * numberPerPage + 1
		const calculatedPages = Math.ceil(posts.length / numberPerPage)
		setnumberOfPages(calculatedPages)
		setpageNumber(offset)
	}, [])

	return (
		<div className='container mx-auto my-14 px-3 sm:px-2 xs:px-3 lg:px-3 bg-gradient-to-tr text-slate-400'>
			{/* <div className='container mx-auto my-14 sm:px-0 xs:px-0 lg:px-5 bg-gradient-to-tr text-slate-400'> */}
			<div className='my-10'>
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-6xl'>Blog</Accent>
				</h1>
				<p className='display-4'>
					Thoughts, mental models, and tutorials about all kind of web development,
					devOps and hybrid mobile applications .
				</p>
			</div>

			<div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-14 '>
				{posts.map((post, index) => (
					<div
						key={post.data.slug}
						className='w-full  text-white rounded-md border border-gray-600 dark:bg-dark dark:border-gray-600 transform-gpu scale-100 hover:scale-[1.02] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow'
					>
						<a href={`/post/${post.data.slug}`}>
							<div className='relative overflow-hidden '>
								<LazyLoadImage
									alt={post.data.title}
									src={post.data.featuredImage}
									effect='blur'
									// placeholder={"<div classname='h-46'><Text</div>"}
									placeholderSrc={post.data.featuredImage}
									height={post.data.featuredImage.height}
									width={post.data.featuredImage.width}
								/>
								{/* <LazyLoad height={200}>
									<img src={post.data.featuredImage} />
								</LazyLoad> */}

								<div className='absolute w-full py-2 bottom-0 inset-x-0  text-white text-s text-center leading-4'>
									<CategoryChip
										className='bg-gray-400'
										categories={post.data.tags}
									/>
								</div>
							</div>
							{/* <div className='relative'>
								<img src={post.data.featuredImage}></img>
							</div> */}
							<div className='p-2 my-3 ml-3'>
								<h1 className='text-xl font-semibold'>
									{" "}
									<Accent>{post.data.title}</Accent>
								</h1>
								<p className='mt-5 text-slate-400'>
									{" "}
									<span className='align-middle text-slate-200 lg:text-lg hidden lg:inline'>
										{moment(post.data.publishedAt).format("MMMM DD, YYYY")}
									</span>
								</p>
								<p className='mt-5 text-slate-400'>{post.data.excerpt}</p>
							</div>
						</a>
					</div>
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
