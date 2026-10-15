import React from 'react'
import BlogScreen from '../../components/BlogScreen'
import { getPostFiles } from '../../services/indexv2'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import generateRSSFeed from 'utils/generateRSSFeed'

const blog = ({ posts }) => {
	return <BlogScreen posts={posts} />
}

export default blog

export const getStaticProps = async () => {
	const files = getPostFiles()

	const posts = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join('posts/blog', filename),
			'utf-8'
		)

		const parsed = matter(markdownWithMeta)
		const data = {
			...parsed.data, slug: filename.split('.')[0], read: readingTime(parsed.content).text
		}
		// const mdxSource = await serialize(content);
		return {
			props: {
				data
			}
		}
	})
	await generateRSSFeed(posts.filter((post) => !post.props.data.inPreparation))

	return {
		props: {
			posts
		}
	}
}
