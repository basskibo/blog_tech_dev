import React, { useEffect, useState } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import slugify from 'slugify'
import matter from 'gray-matter'
import PostDetail from '../../components/PostDetail'
import CategoryChip from '../../components/CategoryChip'

import MdxComponents from '../../components/custom/MdxComponents'
import TableOfContent from '../../components/custom/TableOfContent'
import SimiliarPosts from '@/components/SimiliarPosts'
import EmbeddedLink from '@/components/custom/EmbededLInk'
import LikeButton from '../../components/custom/LikeButton'

function getTableOfContents(content) {
	// eslint-disable-next-line prefer-regex-literals
	const regexp = new RegExp(/^(### |## )(.*)\n/, 'gm')
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

const PostDetails = ({ data, mdxSource, toc }) => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// kratko čekanje da se sve hidrira i MDX mount‑uje
		const timeout = setTimeout(() => setIsLoading(false), 400)
		return () => clearTimeout(timeout)
	}, [])

	return (
		<>
			{isLoading && (
				<div className='fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-background via-neutral-950 to-background'>
					<div className='relative flex flex-col items-center gap-4'>
						<div className='relative h-16 w-16'>
							<div className='absolute inset-0 rounded-full border-2 border-pink-500/30 border-t-transparent animate-spin-slow' />
							<div className='absolute inset-2 rounded-full border-2 border-sky-500/40 border-b-transparent animate-spin' />
							<div className='absolute inset-4 rounded-full bg-neutral-900 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.5)]'>
								<span className='h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.9)]' />
							</div>
						</div>
						<p className='text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-slate-300'>
							Loading article
						</p>
					</div>
				</div>
			)}

			<div className='layout mx-auto lg:mb-14 my-5 sm:px-2 xs:px-3 lg:px-5 text-slate-400'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-x-1 lg:gap-x-12'>
					<div className='col-span-1 lg:col-span-10'>
						<PostDetail post={data} content={mdxSource} />
						<p className='border-b mb-4 align-middle text-center text-white'></p>
						<MDXRemote {...mdxSource} components={{ ...components }} lazy />
						<div className='mb-4 lg:mb-10 w-full lg:w-auto border-b border-neutral-800'>
							<CategoryChip categories={data.tags} />
						</div>
						<SimiliarPosts tags={data?.tags} />
					</div>
					<div className='col-span-2 lg:col-span-2 justify-center items-center align-middle'>
						<TableOfContent toc={toc} />
						{/* <LikeButton /> */}
					</div>
				</div>
			</div>
		</>
	)
}

export default PostDetails

export const getStaticProps = async ({ params: { slug } }) => {
	const markdownWithMeta = fs.readFileSync(
		path.join('posts/blog', slug + '.mdx'),
		'utf-8'
	)

	let { content, data } = matter(markdownWithMeta)

	data = { ...data, slug }
	const toc = getTableOfContents(content)

	const mdxSource = await serialize(content)

	return {
		props: {
			data,
			mdxSource,
			toc
		}
	}
}
export const getStaticPaths = async () => {
	const files = fs.readdirSync(path.join('posts/blog'))
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
