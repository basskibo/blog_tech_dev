import React from "react"
// import { getPosts, getPostsWithCategory } from "../../services"
// import { getAllCategories, getCategories } from "../../services"
import { Categories, Pagination, PostCard } from "../../components"

// const PostDetails = ({ post }) => {
const PostDetails = () => {
	return <div></div>
	//<div className='container mx-auto lg:px-10 sm:px-0 xs:px-0  mb-8 '>
	// 	<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
	// 		<div className='lg:col-span-8 col-span-1'>
	// 			{post.map((p, index) => (
	// 				<PostCard post={p} key={p.title} />
	// 			))}
	// 			<Pagination pageNumber={1} numberOfPosts={post.length} numberOfPages={3} />
	// 		</div>
	// 		<div className='lg:col-span-4 col-span-1'>
	// 			<div className='lg:sticky relative top-8'>
	// 				<PostWidget />
	// 				<Categories />
	// 			</div>
	// 		</div>
	// 	</div>
	// </div>
	// )
}

export default PostDetails

// export async function getStaticProps({ params }) {
// 	const data = await getPostsWithCategory(params.slug)
// 	return {
// 		props: { post: data },
// 	}
// }

// export async function getStaticPaths() {
// 	const categories = await getCategories()
// 	const statics = {
// 		paths: categories.map(({ slug }) => ({ params: { slug } })),
// 		fallback: false,
// 	}
// 	console.log(JSON.stringify(statics))
// 	return statics
// }
