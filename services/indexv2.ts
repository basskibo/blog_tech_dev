import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getPostFiles(): string[] {
	return fs.readdirSync(path.join('posts/blog'))
}

export function getLibaryFiles(): string[] {
	return fs.readdirSync(path.join('posts/libaries'))
}

export function getAllPosts(files: string[]) {
	const posts = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(path.join('posts/blog', filename), 'utf-8')

		let { data } = matter(markdownWithMeta)
		data = { ...data, slug: filename.split('.')[0] }

		return {
			data
		}
	})
	return posts
}

