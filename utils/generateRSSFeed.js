import RSS from 'rss'
import fs from 'fs'

export default async function generateRSSFeed(allPosts) {
	// const site_url = 'https://bojanjagetic.com'
	const site_url = process.env.BASE_URL

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
			image_url: data.featuredImage,
			date: post.date,
		})
	})

	fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }))

}