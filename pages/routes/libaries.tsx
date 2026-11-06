import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getLibaryFiles } from '../../services/indexv2'
import PostListScreen from '../../components/shared/PostListScreen'
import { libaryBio } from '@/components/config/bios'
import type { GetStaticProps } from 'next'

type LibaryFrontmatter = {
	title?: string
	slug?: string
	excerpt?: string
	description?: string
	[key: string]: unknown
}

type LibaryItem = {
	props: {
		data: LibaryFrontmatter
		content: string
	}
}

type LibariesPageProps = {
	libaries: LibaryItem[]
}

const Libaries: React.FC<LibariesPageProps> = ({ libaries }) => {
	return (
		<PostListScreen
			posts={libaries as any}
			type="libary"
			titlePrefix="Created "
			title="Libaries"
			subtitle=""
			description={libaryBio}
			showSort={true}
			sortOptions={['newest', 'oldest', 'title-asc', 'title-desc']}
		/>
	)
}
export default Libaries

export const getStaticProps: GetStaticProps<LibariesPageProps> = async () => {
	const files = getLibaryFiles()
	const libaries: LibaryItem[] = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join('posts/libaries', filename),
			'utf-8'
		)
		let { content, data } = matter(markdownWithMeta)
		data = { ...data, slug: filename.split('.')[0] }
		return {
			props: {
				data: data as LibaryFrontmatter,
				content
			}
		}
	})
	return {
		props: {
			libaries
		}
	}
}


