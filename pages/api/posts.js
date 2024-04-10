import fs from 'fs'
import matter from 'gray-matter'
import { getPostFiles } from 'services/indexv2'
import path from 'path'

export default async function handler(req, res) {
	const files = getPostFiles()
	const projectRoot = findProjectRoot(process.cwd())
	console.log('project >>>> ', process.cwd())
	console.log('Project root:', projectRoot)
	const posts = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join(`${process.cwd()}/posts/blog`, filename),
			'utf-8'
		)
		let { data } = matter(markdownWithMeta)
		data = { ...data, slug: filename.split('.')[0] }
		return data
	})

	const similiarPosts = selectRandomNumberOfPosts(posts, 3)
	return res.status(200).send({ similiarPosts })
}


function findProjectRoot(currentDir) {
	if (fs.existsSync(path.join(currentDir, 'package.json'))) {
		return currentDir
	}

	// If not found, move one directory up
	const parentDir = path.resolve(currentDir, '..')

	// If parent directory is the same as current directory, we've reached the root
	if (parentDir === currentDir) {
		throw new Error('Project root not found')
	}

	// Recursively check in the parent directory
	return findProjectRoot(parentDir)
}


function selectRandomNumberOfPosts(array, count) {
	const result = []
	const totalElements = array.length
	count = Math.min(count, totalElements)
	while (result.length < count) {
		const randomIndex = Math.floor(Math.random() * totalElements)
		const randomElement = array[randomIndex]
		if (!result.includes(randomElement) && !randomElement.inPreparation) {
			result.push(randomElement)
		}
	}

	return result
}
