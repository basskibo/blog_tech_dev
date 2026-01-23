interface PostData {
	tags: Array<{ name: string; [key: string]: any }>;
}

interface Post {
	props: {
		data: PostData;
	};
}

export const getCategories = (posts: Post[]): Array<{ name: string; [key: string]: any }> => {
	try {
		const categories: Array<{ name: string; [key: string]: any }> = []
		posts.forEach((post) => {
			const postCategory = post.props.data.tags
			categories.push(...postCategory)
		})
		const flatenedArr = categories.flat()
		// eslint-disable-next-line no-inner-declarations
		function getUniqueListBy(arr: Array<{ name: string; [key: string]: any }>, key: string) {
			return [...new Map(arr.map((item) => [item[key], item])).values()]
		}
		const unique = getUniqueListBy(flatenedArr, 'name')
		return unique
	} catch (e: any) {
		console.error('error ', e)
		throw new Error(`Error parsing category: ${e?.message}`)
	}
}

