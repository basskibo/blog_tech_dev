import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import Accent from "./Accent"
import TestComponent from "../TestComponent"
import Image from "next/image"
import { Button, Collapse, Text } from "@nextui-org/react"

import slugify from "slugify"

const ResponsiveImage = (props) => (
	<div>
		<Image alt={props.alt} layout='responsive' width={12} height={5} {...props} />
		<p className='text-center'>Figure- {props.alt}</p>
	</div>
)

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
				<h2 className='text-white text-2xl font-bold my-5'> {children}</h2>
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
				<h3 className='text-white text-xl font-semi-bold my-5'> {children}</h3>
			</a>
		)
	},
	Accent: ({ children }) => {
		return <Accent>{children}</Accent>
	},
	img: ResponsiveImage,
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
		return (
			<ul className='list-disc ml-10'>
				<li>{children}</li>
			</ul>
		)
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
