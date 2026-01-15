import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getLibaryFiles } from '../../services/indexv2'
import PostListScreen from '../../components/shared/PostListScreen'
import { libaryBio } from '@/components/config/bios'

const Libaries = ({ libaries }) => {
	return (
		<PostListScreen
			posts={libaries}
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

export const getStaticProps = async () => {
	const files = getLibaryFiles()
	const libaries = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join('posts/libaries', filename),
			'utf-8'
		)
		let { content, data } = matter(markdownWithMeta)
		data = { ...data, slug: filename.split('.')[0] }
		return {
			props: {
				data,
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
