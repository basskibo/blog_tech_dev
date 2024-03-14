import fs from 'fs'
import matter from 'gray-matter'
import { getPostFiles } from 'services/indexv2'
import path from 'path'

export default async function handler(req, res) {
	const files = getPostFiles()

	
	const posts = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join('posts/blog', filename),
			'utf-8'
		)

		let { data } = matter(markdownWithMeta)
		data = { ...data, slug: filename.split('.')[0] }

		return data
	})

	const similiarPosts = selectRandomNumberOfPosts(posts, 3)

	return res.status(200).send({ similiarPosts })
}

function selectRandomNumberOfPosts(array, count) {
	const result = [];
	const totalElements = array.length;

	// Ensure count is not greater than total number of elements in the array
	count = Math.min(count, totalElements);

	while (result.length < count) {
		const randomIndex = Math.floor(Math.random() * totalElements);
		const randomElement = array[randomIndex];

		if (!result.includes(randomElement)) {
			result.push(randomElement);
		}
	}

	return result;
}
