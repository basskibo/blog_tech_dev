import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MdxComponents from '../../components/custom/MdxComponents'
import PostView from '@/components/jagetic/PostView'
import readingTime from 'reading-time'

const components = {
	h1: MdxComponents.h1,
	h2: MdxComponents.h2,
	h3: MdxComponents.h3,
	CloudinaryImage: MdxComponents.img,
	p: MdxComponents.p,
	b: MdxComponents.b,
	Adjusted: MdxComponents.Adjusted,
	Link: MdxComponents.a,
	code: MdxComponents.code,
	Accent: MdxComponents.Accent,
	QouteComponent: MdxComponents.QouteComponent,
	LgList: MdxComponents.ulLg,
	LgNumberList: MdxComponents.olLg,
	SmList: MdxComponents.ulSm,
	GithubCard: MdxComponents.GithubCard,
	test: MdxComponents.test,
	ReactPlayer: MdxComponents.ReactPlayer,
	GithubCardRepo: MdxComponents.GithubCardRepo,
	NewLine: MdxComponents.NewLine,
	Iframe: MdxComponents.Iframe,
	Table: MdxComponents.table,
	Disclosure: MdxComponents.Disclosure,
	EmbeddedLink: MdxComponents.EmbeddedLink,
	HighlightBox: MdxComponents.HighlightBox
}

const PostDetails = ({ data, mdxSource, nextPost }) => {
	return (
		<PostView data={data} nextPost={nextPost}>
			<MDXRemote {...mdxSource} components={{ ...components }} lazy />
		</PostView>
	)
}

export default PostDetails

export const getStaticProps = async ({ params: { slug } }) => {
	const markdownWithMeta = fs.readFileSync(
		path.join('posts/blog', slug + '.mdx'),
		'utf-8'
	)

	let { content, data } = matter(markdownWithMeta)

	data = { ...data, slug, read: readingTime(content).text }
	const mdxSource = await serialize(content)

	const files = fs.readdirSync(path.join('posts/blog')).filter((filename) => filename.endsWith('.mdx'))
	const siblings = files.map((filename) => {
		const raw = fs.readFileSync(path.join('posts/blog', filename), 'utf-8')
		const parsed = matter(raw)
		return { ...parsed.data, slug: filename.replace(/\.mdx$/, '') }
	}).filter((post) => !post.inPreparation)
	siblings.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
	const index = siblings.findIndex((post) => post.slug === slug)
	const next = siblings[index + 1] || siblings[0]
	const nextPost = next && next.slug !== slug
		? { slug: next.slug, title: next.title, excerpt: next.excerpt || '', tags: next.tags || [], featuredImage: next.featuredImage || '' }
		: null

	return {
		props: {
			data,
			mdxSource,
			nextPost
		}
	}
}
export const getStaticPaths = async () => {
	const files = fs.readdirSync(path.join('posts/blog')).filter((filename) => filename.endsWith('.mdx'))
	const paths = files.map((filename) => ({
		params: {
			slug: filename.replace(/\.mdx$/, '')
		}
	}))

	return {
		paths,
		fallback: false
	}
}
