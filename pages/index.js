import React, { useState, useEffect } from "react"
import Head from "next/head"
import { async } from "regenerator-runtime"
import { PostCard, PostWidget, Categories, Pagination } from "../components"
const numberPerPage = 1
import { getPosts } from "../services"

export default function Home({ posts }) {
	const [numberOfPages, setnumberOfPages] = useState(0)
	const postNum = posts.length
	const [numberOfPosts, setNumberOfPosts] = useState(postNum)
	const [pageNumber, setpageNumber] = useState(1)

	useEffect(() => {
		const offset = (pageNumber - 1) * numberPerPage + 1
		const calculatedPages = Math.ceil(posts.length / numberPerPage)
		setnumberOfPages(calculatedPages)
		setpageNumber(offset)
	}, [])

	return (
		<div className='container mx-auto lg:px-10 sm:px-0 xs:px-0  mb-8 bg-gradient-to-tr	'>
			<Head>
				<meta property='og:url' content='https://test.knjigaprica.com' />
				<meta property='og:type' content='site' />
				<meta property='og:title' content='Start your journey' />
				<meta
					property='og:description'
					content='Everything you need to know about Development.'
				/>
				<meta
					property='og:image'
					content='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
				/>
				<meta property='fb:app_id' content='3881343925425006' />
				<title>IguDev Tech Blog</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
				<div className='lg:col-span-8 col-span-1'>
					{posts.map((post, index) => (
						<PostCard post={post.node} key={post.title} />
					))}
					<Pagination
						pageNumber={pageNumber}
						numberOfPosts={numberOfPosts}
						numberOfPages={numberOfPages}
					/>
				</div>
				<div className='lg:col-span-4 col-span-1'>
					<div className='lg:sticky relative top-8'>
						<PostWidget />
						<Categories />
					</div>
				</div>
			</div>
		</div>
	)
}

export async function getStaticProps() {
	const posts = (await getPosts(numberPerPage)) || []
	return {
		props: { posts },
	}
}
