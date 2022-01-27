import React, { useState, useEffect } from "react"
import moment from "moment"
import { PostCard, PostWidget, Categories, Pagination } from "../components"
import Accent from "./custom/Accent"
const numberPerPage = 1

const BlogScreen = ({ posts }) => {
	console.log("#########")
	console.log(posts)
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
		<div className='container mx-auto my-14 sm:px-0 xs:px-0 lg:px-5 bg-gradient-to-tr text-slate-400'>
			<div className='my-10'>
				<h1 class='mb-5'>
					<Accent className='font-extrabold text-6xl'>Blog</Accent>
				</h1>
				<p className='display-4'>
					Thoughts, mental models, and tutorials about all kind of web development,
					devOps and hybrid mobile applications .
				</p>
			</div>

			<div class='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-14 '>
				{posts.map((post, index) => (
					<div class='w-full   text-white rounded-md border border-gray-300 dark:bg-dark dark:border-gray-600 transform-gpu scale-100 hover:scale-[1.02] active:scale-[0.97] hover:cursor-pointer transition duration-100 animate-shadow'>
						<img src={post.data.featuredImage}></img>
						<div className='p-2 my-3 ml-3'>
							<h1 className='text-xl font-semibold'>{post.data.title}</h1>
							<p className='mt-5 text-slate-400'>{post.data.excerpt}</p>
							<p className='mt-5 text-slate-400'>
								{" "}
								<span className='align-middle text-slate-200 lg:text-lg hidden lg:inline'>
									{moment(post.createdAt).format("MMMM DD, YYYY")}
								</span>
							</p>
						</div>
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
