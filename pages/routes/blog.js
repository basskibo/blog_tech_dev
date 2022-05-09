import React from "react"
import { BlogScreen } from "../../components"
import Accent from "../../components/custom/Accent"
import { getPostFiles } from "../../services/indexv2"
const numberPerPage = 1
import fs from "fs"
import path from "path"
import matter from "gray-matter"

import "react-loading-skeleton/dist/skeleton.css"
const loading = true

const blog = ({ posts }) => {
	return (
		// <>
		// 	{posts.length < 1 ? (
		// 		<div className='container mx-auto  my-14 px-5 sm:px-2 xs:px-3 lg:px-3 bg-gradient-to-tr text-slate-400'>
		// 			<div className='my-10'>
		// 				<h1 className='mb-5'>
		// 					<Accent className='font-extrabold text-2xl'>Blog</Accent>
		// 				</h1>
		// 				<p className='display-4'>
		// 					In order not to wander in the dark (as I did with some things) until
		// 					I found a solution, I wrote some things so that one day some unknown
		// 					hero might be helped.
		// 				</p>
		// 			</div>
		// 		</div>
		// 	) : (
				<BlogScreen posts={posts} />
		// 	)}
		// </>
	)
}

export default blog

export const getStaticProps = async () => {
	const files = getPostFiles()
	const posts = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(path.join("posts/blog", filename), "utf-8")

		let { content, data } = matter(markdownWithMeta)
		data = { ...data, slug: filename.split(".")[0] }
		// const mdxSource = await serialize(content);

		return {
			props: {
				data,
				content,
			},
		}
	})
	return {
		props: {
			posts,
		},
	}
}
