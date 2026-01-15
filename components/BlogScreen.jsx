import React from 'react'
import PostListScreen from './shared/PostListScreen'
import { blogScreenBio } from './config/bios'

const BlogScreen = ({ posts }) => {
	return (
		<PostListScreen
			posts={posts}
			type="blog"
			titlePrefix="The "
			title="Blog"
			subtitle=""
			description={blogScreenBio}
			showSort={true}
			sortOptions={['newest', 'oldest', 'title-asc', 'title-desc']}
		/>
	)
}

export default BlogScreen
