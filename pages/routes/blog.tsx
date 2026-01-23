import React from 'react'
import BlogScreen from '../../components/BlogScreen'
import { getPostFiles } from '../../services/indexv2'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { GetStaticProps } from 'next'

import 'react-loading-skeleton/dist/skeleton.css'
import generateRSSFeed from 'utils/generateRSSFeed'

interface BlogProps {
	posts: Array<{
		props: {
			data: any
		}
	}>
}

const blog: React.FC<BlogProps> = ({ posts }) => {
	if (typeof window !== 'undefined' && posts.length > 0) {
		localStorage.setItem('posts', JSON.stringify(posts))
	}
	return <BlogScreen posts={posts} />
}

export default blog

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
	const files = getPostFiles()

	const posts = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join('posts/blog', filename),
			'utf-8'
		)

		let { data } = matter(markdownWithMeta)
		data = {
			...data, slug: filename.split('.')[0]
		}
		// const mdxSource = await serialize(content);
		return {
			props: {
				data
			}
		}
	})
	await generateRSSFeed(posts as any)

	return {
		props: {
			posts
		}
	}
}

