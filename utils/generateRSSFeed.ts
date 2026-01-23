// @ts-ignore
import RSS from 'rss'
import fs from 'fs'

interface Post {
	props: {
		data: {
			title: string
			excerpt?: string
			slug: string
			featuredImage?: string
			publishedAt?: string | Date
			createdAt?: string | Date
		}
	}
	date?: string | Date
}

export default async function generateRSSFeed(allPosts: Post[]): Promise<void> {
	// Use environment variable if available, otherwise use the correct domain
	const site_url = process.env.BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://jageticbojan.com'

	const feedOptions = {
		title: 'Bojanjagetic Blog Post | RSS Feed',
		description: 'Welcome to this blog posts!',
		site_url,
		feed_url: `${site_url}/rss.xml`,
		image_url: `${site_url}/logo.png`,
		pubDate: new Date(),
		copyright: `All rights reserved ${new Date().getFullYear()}, © 2022 Bojan Jagetic`,

	}

	const feed = new RSS(feedOptions)

	allPosts.map((post) => {
		const {props} = post
		const {data} = props
		feed.item({
			title: data.title,
			description: data.excerpt,
			url: `${site_url}/post/${data.slug}`,
			guid: `${site_url}/post/${data.slug}`,
			image_url: data.featuredImage,
			date: post.date || data.publishedAt || data.createdAt,
		})
	})

	fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }))

}

