import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import Accent from "./Accent"
import TestComponent from "../TestComponent"
import Image from "next/image"
import { Button, Collapse, Text } from "@nextui-org/react"
import constants from "../../lib/constants"
import { buildUrl } from "cloudinary-build-url"
import ReactPlayer from "react-player"

import slugify from "slugify"

const ResponsiveImage = (props) => (
	<div>
		<Image alt={props.alt} layout='responsive' width={12} height={5} {...props} />
		<p className='text-center'>Figure- {props.alt}</p>
	</div>
)
const VideoContext = (props) => (
	<div>
		<ReactPlayer
			url={props.url}
			playing={true}
			loop={true}
			width='100%'
			height='60%'
			muted={true}
		/>
		<p className='text-center'>Figure- {props.alt}</p>
	</div>
)

const CloudinaryContextImage = (props) => {
	const url = buildUrl(props.src, {
		cloud: {
			cloudName: "dr1sm5gnj",
		},
		// transformations: {
		// 	effect: "blur:1000",
		// 	quality: 1,
		// },
	})

	console.log(url)
	return (
		// <Image alt={props.alt} layout='responsive' width={1000} height={750} {...props} />
		<div className='my-2'>
			{" "}
			<Image
				alt={props.alt}
				layout='responsive'
				width={12}
				height={8}
				src={url}
				unoptimized={false}
				blurDataURL={constants.imageBlogURI}
				placeholder='blur'
			/>
			<p className='grid place-items-center place-content-center mt-1 italic'>
				{props.text}
			</p>
		</div>
	)
}

const parseLanguageByClass = (className) => {
	return className.split("-")[1]
}

export default {
	h1: ({ children }) => {
		return <h1 className='text-white text-3xl font-bold my-5'> {children}</h1>
	},
	h2: ({ children }) => {
		return (
			<a
				id={slugify(children, {
					lower: true,
					strict: true,
				})}
			>
				<h2 className='text-white text-3xl font-bold my-5'>
					<Accent>{children}</Accent>
				</h2>
			</a>
		)
	},
	h3: ({ children }) => {
		return (
			<a
				id={slugify(children, {
					lower: true,
					strict: true,
				})}
			>
				<h3 className='text-white text-xl font-semi-bold my-5'>{children} </h3>
			</a>
		)
	},
	Accent: ({ children }) => {
		return <Accent>{children}</Accent>
	},
	img: CloudinaryContextImage,
	CloudinaryContext: CloudinaryContextImage,
	ReactPlayer: VideoContext,
	p: ({ children }) => {
		return <p className='my-5'>{children}</p>
	},
	b: ({ children }) => {
		return <span className='font-bold'>{children}</span>
	},

	code: ({ children, className }) => {
		return (
			<SyntaxHighlighter
				language={parseLanguageByClass(className)}
				style={a11yDark}
				wrapLines={true}
				showLineNumbers={false}
				showInlineLineNumbers={true}
			>
				{children}
			</SyntaxHighlighter>
		)
	},
	a: ({ children, className, href }) => {
		return (
			<a
				className='my-3 hover:cursor-ne-resize text-lime-500 underline decoration-dotted decoration-2
            	decoration-sky-400 underline-offset-4 link link-underline link-underline-black hover:no-underline'
				href={href}
				target='_blank'
				rel='noreferrer'
			>
				{children}
			</a>
		)
	},
	ul: ({ children, className }) => {
		return <ul className='list-disc ml-10'>{children}</ul>
	},
	TestComponent: TestComponent,
	NextUIBUtton: ({ children, className, href }) => {
		return <Button>Click me</Button>
	},
	test: ({ children }) => {
		return (
			<blockquote className='mt-0 mb-4'>
				<p className='text-slate-400 mt-0'>{children}</p>
			</blockquote>
		)
	},
}
