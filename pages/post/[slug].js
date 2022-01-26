import React from "react"
import { getPosts, getPostDetails } from "../../services"
import {
	PostDetail,
	Categories,
	PostWidget,
	Author,
	Comments,
	CommentsForm,
	Pagination,
} from "../../components"

const PostDetails = ({ post }) => {
	return (
		<div className=' mx-5 lg:px-10 sm:px-0 xs:px-0 mb-8 '>
			<div className='flex flex-row'>
				<div className='lg:basis-3/4 sm:basis-4/4 lg:mr-10'>
					<PostDetail post={post} />
					{/* <Author author={post.author} /> */}
					<CommentsForm slug={post.slug} />
					<Comments slug={post.slug} />
				</div>
				<div className='lg:basis-1/4  sm:basis-4/4'>
					<PostWidget
						slug={post.slug}
						categories={post.categories.map((category) => category.slug)}
					/>
					<Categories />
				</div>
			</div>
		</div>
	)
}

export default PostDetails

export async function getStaticProps({ params }) {
	const data = await getPostDetails(params.slug)
	return {
		props: { post: data },
	}
}

export async function getStaticPaths() {
	console.log("$$$$### getStaticPaths ")
	const posts = await getPosts()

	const bla = {
		paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
		fallback: false,
	}
	console.log(JSON.stringify(bla))
	return bla
}
