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
		<div className='container mx-auto sm:mt-15 lg:mt-5 sm:mt-10 lg:rounded-lg p-0 lg:p-0 '>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
				<div className='col-span-1 lg:col-span-8'>
					<PostDetail post={post} />
					{/* <Author author={post.author} /> */}
					<CommentsForm slug={post.slug} />
					<Comments slug={post.slug} />
				</div>
				<div className='col-span-1 lg:col-span-4'>
					<div className='relative lg:sticky top-8'>
						<PostWidget
							slug={post.slug}
							categories={post.categories.map((category) => category.slug)}
						/>
						<Categories />
					</div>
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
