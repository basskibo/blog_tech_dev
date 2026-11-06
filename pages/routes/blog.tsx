import React from 'react'
import BlogScreen from '../../components/BlogScreen'
import { getPostFiles } from '../../services/indexv2'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import 'react-loading-skeleton/dist/skeleton.css'
import generateRSSFeed from 'utils/generateRSSFeed'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

type PostFrontmatter = {
	title?: string
	excerpt?: string
	slug?: string
	featuredImage?: string
	[key: string]: unknown
}

type BlogPostProps = {
	props: {
		data: PostFrontmatter
	}
}

type BlogPageProps = {
	posts: BlogPostProps[]
}

const Blog: React.FC<BlogPageProps> = ({ posts }) => {
	if (typeof window !== 'undefined' && posts.length > 0) {
		localStorage.setItem('posts', JSON.stringify(posts))
	}
	return <BlogScreen posts={posts as any} />
}

export default Blog

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
	const files = getPostFiles()

	const posts: BlogPostProps[] = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join('posts/blog', filename),
			'utf-8'
		)

		let { data } = matter(markdownWithMeta)
		data = {
			...data,
			slug: filename.split('.')[0]
		}

		return {
			props: {
				data: data as PostFrontmatter
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


