import React from 'react'
import Accent from './Accent'
import QouteComponent from '../QouteComponent'
import { GithubCard } from 'github-user-repo-card'
import GithubCardRepository from './GithubCardRepo'
// import Image from 'next/image'
// import constants from '../../lib/constants'
import { buildUrl } from 'cloudinary-build-url'
import ReactPlayer from 'react-player'
import ModalImage from 'react-modal-image'
import slugify from 'slugify'
import DisclosureComponent from './Disclosure'
import CodeBlock from './CodeBlock'
import EmbeddedLink from './EmbededLInk'

const VideoContext = (props) => (
	<div className='h-96 '>
		<ReactPlayer
			url={props.url}
			playing={true}
			loop={true}
			controls={true}
			// width='100%'
			// height='100%'
			muted={true}
		/>
		<p className='text-center '>{props.alt}</p>
	</div>
)

const CloudinaryContextImage = (props) => {
	const url = buildUrl(props.src, {
		cloud: {
			cloudName: 'dr1sm5gnj'
		}
		// transformations: {
		// effect: "blur:1000",
		// quality: 1,
		// },
	})

	return (
		// <Image alt={props.alt} layout='responsive' width={1000} height={750} {...props} />
		<div className='my-2 '>
			{' '}
			<ModalImage
				small={url}
				large={url}
				hideDownload={false}
				hideZoom={true}
				showRotate={true}
				alt={props.alt}
			/>
			{/* <img
            alt={props.alt}
            // layout='responsive'
            // width={14}
            // height={8}
            src={url}
            // unoptimized={false}
            // blurDataURL={constants.imageBlogURI}
            placeholder='blur'
            className='w-full'
         /> */}
			<p className='grid place-items-center place-content-center mt-1 italic'>
				{props.text}
			</p>
		</div>
	)
}

const MdxComponents =  {
	h1: ({ children }) => {
		return (
			<h1 className='text-white text-3xl font-bold my-5'> {children}</h1>
		)
	},
	h2: ({ children }) => {
		return (
			<a
				id={slugify(children, {
					lower: true,
					strict: true
				})}>
				<h2 className='text-white text-2xl font-bold my-5'>
					{children}
				</h2>
			</a>
		)
	},
	h3: ({ children }) => {
		return (
			<a
				id={slugify(children, {
					lower: true,
					strict: true
				})}>
				<h3 className='text-gray-200 text-xl font-semi-bold my-5'>
					{children}{' '}
				</h3>
			</a>
		)
	},
	h4: ({ children }) => {
		return (
			<a
				id={slugify(children, {
					lower: true,
					strict: true
				})}>
				<h3 className='text-gray-200 text-lg font-semi-bold my-5'>
					{children}{' '}
				</h3>
			</a>
		)
	},
	Accent: ({ children }) => {
		return <Accent>{children}</Accent>
	},
	Adjusted: ({ children }) => {
		return (
			<code
				className='bg-neutral-800 text-bolder border-rounder-lg px-1  mr-1  font-mono
         hover:underline decoration-indigo-500 border border-neutral-700 rounded-md'>
				<Accent> `{children}`</Accent>
			</code>
		)
	},
	img: CloudinaryContextImage,
	CloudinaryContext: CloudinaryContextImage,
	ReactPlayer: VideoContext,
	p: ({ children }) => {
		return (
			<p className='my-5 ml-1 text-md leading-relaxed      '>{children}</p>
		)
	},
	b: ({ children }) => {
		return <b className='font-bold text-white '>{children}</b>
	},
	code: ({ children, className }) => {
		return (<CodeBlock code={children} className={className} />	)
	},
	a: ({ children, className, href }) => {
		return (
			<a
				className='my-3 hover:cursor-ne-resize text-jade10 underline decoration-dotted decoration-2
            decoration-sky-400 underline-offset-4 link link-underline link-underline-black hover:no-underline'
				href={href}
				target='_blank'
				rel='noreferrer'>
				{children}
			</a>
		)
	},
	ulSm: ({ children, className }) => {
		return <ul className='grid grid-cols-2 list-disc ml-10'>{children}</ul>
	},
	ulLg: ({ children, className }) => {
		return <ul className=' list-disc ml-10'>{children}</ul>
	},
	olLg: ({ children, className }) => {
		return <ul className=' list-decimal ml-10'>{children}</ul>
	},
	QouteComponent,

	test: ({ children }) => {
		return (
			<blockquote className='mt-0 mb-4'>
				<p className='text-slate-400 mt-0'>{children}</p>
			</blockquote>
		)
	},
	GithubCardRepo: ({ children }) => {
		const splitted = children.split('/')
		const username = splitted[0]
		const repo = splitted[1]
		return (
			<div className=''>
				<p className='py-5'>
					Checkout repository <b>{children}</b> on Github directly
				</p>
				<GithubCard
					name={username || 'basskibo'}
					type='repo'
					repository={repo}
					width='700'
					height='200'
				/>
			</div>
		)
	},
	GithubCardRepository,
	NewLine: () => {
		return <div className='my-5'> </div>
	},
	Iframe: ({ url, title, className }) => {
		return (
			<iframe
				src={url}
				className='w-full h-96 min-h-full'
				title={title}
				allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
				sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'></iframe>
		)
	},
	table: ({ header, content, genericData }) => {
		console.log(content)
		return (
			<table className="table-auto  w-full xl:w-3/4 border border-neutral-700 ">
				<thead className='bg-neutral-800 '>
					<tr >
						{header.map((head) => (
							<th key={head} className='p-3 font-bold'>{head}</th>
						))}
					</tr>
				</thead>
				<tbody className='text-center'>
					{content.map((rowData, i) => (
						<tr key={rowData} >
							{rowData.map(data => (
								<td className='p-3 border border-neutral-700' key={data}>{data}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		)
	},
	Disclosure: ({ question, answer, children, defaultOpen }) => {
		return (
			<DisclosureComponent props={{ question, children, defaultOpen }} />
		)
	},
	EmbeddedLink: EmbeddedLink
}


export default MdxComponents