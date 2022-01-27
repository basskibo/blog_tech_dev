import React from "react"
import moment from "moment"
import CategoryChip from "./CategoryChip"
// const readingTime = require("reading-time");
// const stats = readingTime(
//   "$$51 5125 21 51258125 218 5y2185 128h5 129h59 125h12958 h21h hfhadfuiahfuashfsuahfusaihfaiushfusahfuisahfhsuahfusahu fs  hsaufhuashu hf uhfash fh sfhs ahfuhuashf uhas"
// );
// console.log(stats);
import {
	EmailShareButton,
	EmailIcon,
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	RedditShareButton,
	RedditIcon,
} from "react-share"

const PostDetail = ({ post }) => {
	console.log("##########>>>>>>>")
	console.log(post)

	// return (
	// 	<div className='text-white'>
	// 		<h1>TEST!@!!@@@</h1>
	// 	</div>
	// )

	// const PostDetail = ({ post }) => {
	// 	const getContentFragment = (index, text, obj, type) => {
	// 		let modifiedText = text
	// 		if (obj) {
	// 			if (obj.bold) {
	// 				modifiedText = <b key={index}>{text}</b>
	// 			}

	// 			if (obj.italic) {
	// 				modifiedText = <em key={index}>{text}</em>
	// 			}

	// 			if (obj.underline) {
	// 				modifiedText = <u key={index}>{text}</u>
	// 			}
	// 		}

	// 		switch (type) {
	// 			case "heading-three":
	// 				return (
	// 					<h3 key={index} className='lg:text-xl text-white font-semibold mb-4'>
	// 						{modifiedText.map((item, i) => (
	// 							<React.Fragment key={i}>{item}</React.Fragment>
	// 						))}
	// 					</h3>
	// 				)
	// 			case "paragraph":
	// 				return (
	// 					<p key={index} className='mb-8 lg:text-size-sm text-slate-400'>
	// 						{modifiedText.map((item, i) => (
	// 							<React.Fragment key={i}>{item}</React.Fragment>
	// 						))}
	// 					</p>
	// 				)
	// 			case "heading-one":
	// 				return (
	// 					<h1 key={index} className='lg:text-2xl font-semibold text-white mb-4'>
	// 						{modifiedText.map((item, i) => (
	// 							<React.Fragment key={i}>{item}</React.Fragment>
	// 						))}
	// 					</h1>
	// 				)
	// 			case "heading-two":
	// 				return (
	// 					<h2 key={index} className='lg:text-2xl text-white font-semibold mb-4'>
	// 						{modifiedText.map((item, i) => (
	// 							<React.Fragment key={i}>{item}</React.Fragment>
	// 						))}
	// 					</h2>
	// 				)

	// 			case "heading-four":
	// 				return (
	// 					<h4 key={index} className='lg:text-lg text-white font-semibold mb-4'>
	// 						{modifiedText.map((item, i) => (
	// 							<React.Fragment key={i}>{item}</React.Fragment>
	// 						))}
	// 					</h4>
	// 				)
	// 			case "image":
	// 				return (
	// 					<img
	// 						key={index}
	// 						alt={obj.title}
	// 						height={obj.height}
	// 						width={obj.width}
	// 						src={obj.src}
	// 					/>
	// 				)
	// 			default:
	// 				return modifiedText
	// 		}
	// 	}

	return (
		<div className='bg-slate-900 shadow-lg lg:rounded-lg lg:p-0 pb-12 mb-8 lg:mt-5 sm:mt-10 xs:mt-10'>
			<div className='flex justify-center mb-8 w-full pt-5 lg:pt-1 mt-0 lg:mt-0'>
				<h1 className='lg:text-5xl text-xl lg:mb-5 text-semibold text-white font-bold'>
					{post.title}
				</h1>
			</div>
			<div className='relative overflow-hidden shadow-md md-6  aspect-square '>
				<img
					src={post.featuredImage}
					alt={post.title}
					className=' object-cover h-full w-full '
				/>
			</div>
			<div className='px-4 lg:px-0'>
				<div className='flex justify-center text-slate-400 mb-6 mt-6 w-full'>
					<div className='flex items-center  mb-4 lg:mb-0 w-full lg:w-auto mr-8'>
						{/* <img
							alt={post.author}
							height='30px'
							width='30px'
							// className="align-middle rounded-full"
							className='inline-block h-8 w-8 rounded-full ring-2 ring-orange-600'
							src={post.author}
						/> */}
						<p className='inline align-middle text-slate-400 ml-2 lg:text-lg sm:text-md'>
							{post.author}
						</p>
					</div>
					<div className='flex items-center  mb-4 lg:mb-0 w-full lg:w-auto lg:mr-8 sm:mr-3'>
						{/* <p className="align-middle mr-2">Publish: </p> */}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 inline mr-2 text-sky-800'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
							/>
						</svg>
						<span className='align-middle text-slate-400 lg:text-lg hidden lg:inline'>
							{moment(post.createdAt).format("MMM DD, YYYY")}
						</span>
						<span className='align-middle text-slate-400 lg:text-lg lg:hidden sm:inline'>
							{moment(post.createdAt).format("DD.MM.YYYY")}
						</span>
					</div>

					<div className='flex items-center lg:text-lg mb-4 lg:mb-0 w-full lg:w-auto lg:mr-8 sm:mr-1 ml-5 text-slate-400'>
						<span className='mr-2 hidden lg:inline'>Share: </span>
						<FacebookShareButton
							className='mr-2'
							quote={"This is only a test"}
							url={`https://igutech.vercel.app/post/${post.slug}`}
							hashtag={"#iguana #iguanadevelopment"}
						>
							<FacebookIcon size={32} rounded={true} />
						</FacebookShareButton>
						<TwitterShareButton
							className='mr-2'
							url={`https://igutech.vercel.app/post/${post.slug}`}
						>
							<TwitterIcon size={32} rounded={true} />
						</TwitterShareButton>
						<EmailShareButton
							className='mr-2 hidden lg:inline'
							url={`https://igutech.vercel.app/post/${post.slug}`}
						>
							<EmailIcon size={32} rounded={true} />
						</EmailShareButton>
						<RedditShareButton
							className='mr-2 hidden lg:inline'
							url={`https://igutech.vercel.app/post/${post.slug}`}
						>
							<RedditIcon size={32} rounded={true} />
						</RedditShareButton>
					</div>
				</div>
				{/* 
				{post.content.raw.children.map((typeObj, index) => {
					const children = typeObj.children.map((item, itemindex) =>
						getContentFragment(itemindex, item.text, item)
					)

					return getContentFragment(index, children, typeObj, typeObj.type)
				})} */}
			</div>
			<span>
				<svg
					width='1890'
					height='1344'
					viewBox='0 0 1890 1344'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					class='absolute bottom-0 right-10 translate-y-[97%] transform-gpu w-[calc(25%-3rem)] md:w-[500px] 2xl:w-[700px] z-[-1] opacity-70 dark:opacity-30'
				>
					<path
						d='M473 468V757.944L709 639.944V351.5M473 468L237 351.5M473 468L709 351.5M473 468V756.444L237 874.444M473 468L237 352L1 468M473 468L237 584.5M709 351.5L473 235.5L237 351.5M709 351.5V641.444M709 351.5L473 235L709 119L945 235L709 351.5ZM237 351.5V118M237 584.5V874.444M237 584.5L1 468M237 874.444L1 756.444V468M237 118L473 2L709 118L473 234.5L237 118ZM1181 587V352M1181 352L945 236L709 352M1181 352L945 468.5M709 352V640.444L892.5 729.5M709 352L945 468.5M945 468.5V701.5M1417 990.944V702.5M1417 702.5L1181 586.5L945 702.5L1181 819M1417 702.5L1181 819M1417 702.5V992.444M1417 702.5L1181 586L1417 470L1653 586L1417 702.5ZM1181 819L945 703L709 819M1181 819L945 935.5M945 935.5V1225.44L709 1107.44V819M945 935.5L709 819M1181 1052.5V1342.44M1181 1052.5L945 936M1181 1052.5L1417 936M1181 1342.44L1417 1224.44V936M1181 1342.44L945 1224.44V936M1417 936L1181 820L945 936M1653 819.5V1109.44M1653 819.5L1417 703M1653 819.5L1889 703M1653 1109.44L1889 991.444V703M1653 1109.44L1417 991.444V703M1889 703L1653 587L1417 703'
						stroke='url(#paint0_linear_606_425)'
						stroke-width='2'
					></path>
					<defs>
						<linearGradient
							id='paint0_linear_606_425'
							x1='1888.85'
							y1='711.272'
							x2='752.465'
							y2='-321.779'
							gradientUnits='userSpaceOnUse'
						>
							<stop
								class='text-primary-400 dark:text-primary-400'
								stop-color='grey'
							></stop>
							<stop
								class='text-primary-300 dark:text-primary-300'
								offset='0.5'
								stop-color='white'
							></stop>
							<stop
								class='text-primary-300 dark:text-primary-200'
								offset='1'
								stop-color='white'
							></stop>
						</linearGradient>
					</defs>
				</svg>
			</span>
			<div className='mb-4 lg:mb-0 w-full lg:w-auto lg:mr-8 sm:mr-3'>
				<p className='border-b pb-5 pt-5 mb-4 align-middle text-center text-white'>
					{" "}
				</p>
				<span className='pt-5 mt-5 '>
					<CategoryChip categories={post.tags} />
				</span>
			</div>
		</div>
	)
}

export default PostDetail
