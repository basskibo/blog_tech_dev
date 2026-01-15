export const getCategories = (posts) => {
	try {
		const categories = []
		posts.forEach((post) => {
			const postCategory = post.props.data.tags
			categories.push(postCategory)
		})
		const flatenedArr = categories.flat()
		// eslint-disable-next-line no-inner-declarations
		function getUniqueListBy(arr, key) {
			return [...new Map(arr.map((item) => [item[key], item])).values()]
		}
		const unique = getUniqueListBy(flatenedArr, 'name')
		return unique
	} catch (e) {
		console.error('error ', e)
		throw new Error(`Error parsing category: ${e?.message}`)
	}
}

