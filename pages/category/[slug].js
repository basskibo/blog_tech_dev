import React from "react"
import { getPosts, getPostsWithCategory } from "../../services"
import { getAllCategories, getCategories } from "../../services"
import { Categories, PostWidget, Pagination, PostCard } from "../../components"

const PostDetails = ({ post }) => {
	return (
		<div className='flex mx-auto lg:px-10 sm:px-0 xs:px-0  mb-8 '>
			<div className='flex flex-row '>
				<div className='basis-3/4'>
					{post.map((p, index) => (
						<PostCard post={p} key={p.title} />
					))}
					<Pagination pageNumber={1} numberOfPosts={post.length} numberOfPages={3} />
				</div>
				<div className='basis-1/4'>
					<div className='lg:sticky relative top-8'>
						<PostWidget />
						<Categories />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PostDetails

export async function getStaticProps({ params }) {
	const data = await getPostsWithCategory(params.slug)
	return {
		props: { post: data },
	}
}

export async function getStaticPaths() {
	const categories = await getCategories()
	const statics = {
		paths: categories.map(({ slug }) => ({ params: { slug } })),
		fallback: false,
	}
	console.log(JSON.stringify(statics))
	return statics
}
