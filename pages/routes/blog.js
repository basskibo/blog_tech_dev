import React from 'react'
import { BlogScreen } from '../../components'
import { getPostFiles } from '../../services/indexv2'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import 'react-loading-skeleton/dist/skeleton.css'

const blog = ({ posts }) => {
  if (typeof window !== 'undefined' && posts.length > 0) {
    localStorage.setItem('posts', JSON.stringify(posts))
  }
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

    let { content, data } = matter(markdownWithMeta)
    data = { ...data, slug: filename.split('.')[0] }
    // const mdxSource = await serialize(content);
    return {
      props: {
        data,
        content
      }
    }
  })
  return {
    props: {
      posts
    }
  }
}
