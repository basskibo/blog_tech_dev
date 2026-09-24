import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import slugify from 'slugify'
import matter from 'gray-matter'
import MdxComponents from '../../components/custom/MdxComponents'
import PostView from '@/components/jagetic/PostView'

function getTableOfContents(content) {
	const reg = /^(### |## )(.*)\n/
	const regexp = new RegExp(reg, 'gm')
	const headings = [...content.matchAll(regexp)]

	const tableOfContents = []

	let lastElType
	if (headings.length) {
		headings.forEach((heading) => {
			const headingText = heading[2].trim()
			const headingType = heading[1].trim() === '##' ? 'h2' : 'h3'
			const headingLink = slugify(headingText, {
				lower: true,
				strict: true
			})

			lastElType = headingType
			const head = {
				title: headingType === 'h2' ? headingText : `${headingText}`,
				headerType: headingType,
				subheading: [],
				link: `#${headingLink}`
			}
			if (headingType === 'h3') {
				// let lastEl = tableOfContents.at(-1) // vercel does not support .at method currently
				const lastEl = tableOfContents[tableOfContents.length - 1]
				if (lastElType === 'h2') {
					tableOfContents.pop()
					lastEl.subheading.push(head)
					tableOfContents.push(lastEl)
				} else {
					tableOfContents.pop()
					lastEl.subheading.push(head)
					tableOfContents.push(lastEl)
				}
			} else {
				tableOfContents.push(head)
			}
		})
	}
	return tableOfContents
}

const components = {
	h1: MdxComponents.h1,
	h2: MdxComponents.h2,
	h3: MdxComponents.h3,
	img: MdxComponents.img,
	CloudinaryImage: MdxComponents.img,
	ReactPlayer: MdxComponents.ReactPlayer,
	p: MdxComponents.p,
	a: MdxComponents.a,
	code: MdxComponents.code,
	LgList: MdxComponents.ulLg,
	SmList: MdxComponents.ulSm,
	Link: MdxComponents.a,
	b: MdxComponents.b,
	Accent: MdxComponents.Accent,
	NewLine: MdxComponents.NewLine,
	Adjusted: MdxComponents.Adjusted,
	QouteComponent: MdxComponents.QouteComponent,
	GithubCardRepo: MdxComponents.GithubCardRepo,
	GithubCardRepository: MdxComponents.GithubCardRepository,
	EmbeddedLink: MdxComponents.EmbeddedLink
}

const LibaryDetails = ({ data, mdxSource }) => {
	return (
		<PostView data={data} backHref="/routes/libaries" backLabel="← ALL PROJECTS">
			<MDXRemote {...mdxSource} components={{ ...components }} lazy />
		</PostView>
	)
}

export default LibaryDetails

export const getStaticProps = async ({ params: { slug } }) => {
	const markdownWithMeta = fs.readFileSync(
		path.join('posts/libaries', slug + '.mdx'),
		'utf-8'
	)

	let { content, data } = matter(markdownWithMeta)

	data = { ...data, slug }
	const toc = getTableOfContents(content)
	// console.log(process.env.ENVIRONMENT)
	const mdxSource = await serialize(content)

	// }
	// data = { ...data, views }
	return {
		props: {
			data,
			mdxSource,
			toc
		}
	}
}

export const getStaticPaths = async () => {
	const files = fs.readdirSync(path.join('posts/libaries'))
	const paths = files.map((filename) => ({
		params: {
			slug: filename.replace('.mdx', '')
		}
	}))

	return {
		paths,
		fallback: false
	}
}

// LibaryDetails.propTypes = {
//    firstname: PropTypes.string.isRequired
//  }
