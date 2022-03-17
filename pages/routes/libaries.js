import Accent from "../../components/custom/Accent"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import LibaryCard from "../../components/LibaryCard"
import "react-loading-skeleton/dist/skeleton.css"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getLibaryFiles } from "../../services/indexv2"

const Libaries = ({ libaries }) => {
	return (
		<div className='container mx-auto my-14 px-5 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>
			<div className='my-8'>
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-5xl'>Libary</Accent>
				</h1>
				<p className='display-4'>
					Here you can find some of my simple libaries and repositories which are
					open source so feel free to use it in your projects.
				</p>
				<input
					className='w-full my-3 bg-neutral-900  px-3 py-2 rounded-md
					border border-slate-600 focus:border-lime-600'
					placeholder='Search...'
				></input>
			</div>

			<div className='grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-7'>
				{libaries.map((libary, index) => (
					// <PostCard className='' key={post.props.data.slug} post={post.props} />
					<LibaryCard libary={libary.props.data} key={libary.props.data.slug} />
				))}
			</div>
		</div>
	)
}
export default Libaries

export const getStaticProps = async () => {
	const files = getLibaryFiles()
	const libaries = files.map((filename) => {
		const markdownWithMeta = fs.readFileSync(
			path.join("posts/libaries", filename),
			"utf-8"
		)
		let { content, data } = matter(markdownWithMeta)
		data = { ...data, slug: filename.split(".")[0] }
		return {
			props: {
				data,
				content,
			},
		}
	})
	return {
		props: {
			libaries,
		},
	}
}
