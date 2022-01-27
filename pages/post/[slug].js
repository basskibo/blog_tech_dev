import React from "react"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import SyntaxHighlighter from "react-syntax-highlighter"
// import { getPosts, getPostDetails } from "../../services";
import {
	PostDetail,
	Categories,
	PostWidget,
	Author,
	Comments,
	CommentsForm,
	Pagination,
} from "../../components"

// const PostDetails = ({ post }) => {
const PostDetails = ({ data, mdxSource }) => {
	console.log("!!!!! POST DETAILS!!!")

	return (
		<div className='container mx-auto sm:mt-15 lg:mt-5 sm:mt-10 lg:rounded-lg p-0 lg:p-0 text-slate-400'>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
				<div className='col-span-1 lg:col-span-8'>
					<PostDetail post={data} />
					<MDXRemote {...mdxSource} components={{ PostDetail }} />

					{/* <Author author={post.author} /> */}
					{/* <CommentsForm slug={post.slug} /> */}
					{/* <Comments slug={post.slug} /> */}
				</div>
				<div className='col-span-1 lg:col-span-4'>
					<div className='relative top-8'>
						<PostWidget
						// slug={post.slug}
						// categories={post.categories.map((category) => category.slug)}
						/>
						<Categories />
					</div>
				</div>
			</div>
		</div>
	)
	// return (

	// );
}

export default PostDetails

// export async function getStaticProps({ params }) {
//   const data = await getPostDetails(params.slug);
//   return {
//     props: { post: data },
//   };
// }

// export async function getStaticPaths() {
//   console.log("$$$$### getStaticPaths ");
//   const posts = await getPosts();

//   const bla = {
//     paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
//     fallback: false,
//   };
//   console.log(JSON.stringify(bla));
//   return bla;
// }

export const getStaticProps = async ({ params: { slug } }) => {
	console.log("#########")
	const markdownWithMeta = fs.readFileSync(
		path.join("posts/blog", slug + ".mdx"),
		"utf-8"
	)
	// const { data: frontMatter, content } = matter(markdownWithMeta)
	let { content, data } = matter(markdownWithMeta)
	data = { ...data, slug }
	const mdxSource = await serialize(content)
	console.log(data)

	return {
		props: {
			data,
			mdxSource,
		},
	}
}
export const getStaticPaths = async () => {
	const files = fs.readdirSync(path.join("posts/blog"))
	const paths = files.map((filename) => ({
		params: {
			slug: filename.replace(".mdx", ""),
		},
	}))
	console.log(paths)
	return {
		paths,
		fallback: false,
	}
}
