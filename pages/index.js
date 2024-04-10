/* eslint-disable no-sequences */
/* eslint-disable no-undef */
import React from 'react'
import Head from 'next/head'
import Landing from '../components/Landing'
// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'

export default function Home() {
	// const [numberOfPages, setnumberOfPages] = useState(0)
	// const postNum = posts.length
	// const [numberOfPosts, setNumberOfPosts] = useState(postNum)
	// const [pageNumber, setpageNumber] = useState(1)
	// // console.log(posts);
	// useEffect(() => {
	// const offset = (pageNumber - 1) * numberPerPage + 1
	// const calculatedPages = Math.ceil(posts.length / numberPerPage)
	// setnumberOfPages(calculatedPages)
	// setpageNumber(offset)
	// }, [])

	return (
		// <div className='container mx-auto sm:px-5 sm:mx-5 xs:px-5'>
		<div>
			<Head>
				<meta property='og:url' content='https://bojanjagetic.com/' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Bojan Jagetic Blog' />
				<meta property="og:site_name" content="Blogtech" />
				<meta property="og:locale" content="en_US" />

				<meta
					property='og:description'
					content='Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.'
				/>
				<meta
					property='og:image'
					content='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127896/igutech/undersstanding_mnfh3n.jpg'
				/>
				<meta property='fb:app_id' content='3881343925425006' />
				<title>Bojan Jagetic</title>
				<link rel='icon' href='/favicon.ico' />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" />
				<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff"></meta>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
				<link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"></link>
				{/* <meta name="viewport" content="initial-scale=1, viewport-fit=cover" /> */}
				{/* <script async defer data-website-id="ad2da36d-df11-4b49-a551-6aea0bf95f30" src="https://blogtech-umami.herokuapp.com/umami.js"></script> */}
				{/* <script async src="https://cdn.splitbee.io/sb.js"></script> */}
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3181880928286370"
					crossOrigin="anonymous"></script>

			</Head>
			{/* <div className='text-center mt-10 mb-10  text-white'> */}
			<Landing />
			{/* </div> */}
		</div>
	)
}

// export const getStaticProps = async () => {
// const files = fs.readdirSync(path.join('posts/blog'))
// const posts = files.map((filename) => {
//   const markdownWithMeta = fs.readFileSync(
//     path.join('posts/blog', filename),
//     'utf-8'
//   )
//   const { data: postData } = matter(markdownWithMeta)
//   const data = { ...postData, slug: filename.split('.')[0] }
//   return {
//     data
//   }
// })
// return {
//   props: {
//     posts
//   }
// }
// }
