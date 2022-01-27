import Accent from "../../components/custom/Accent"

const Projects = () => {
	return (
		<div className='container mx-auto my-14 px-5 sm:px-2 xs:px-3 lg:px-5 bg-gradient-to-tr text-slate-400'>
			<div className='my-10'>
				<h1 class='mb-5'>
					<Accent className='font-extrabold text-6xl'>Projects</Accent>
				</h1>
				<p className='display-4 '>Showcase of my works on my projects</p>
				<p className=''>
					This projects consists of backend, frontend and devops parts{" "}
				</p>
				<p className=''>No projects on sight</p>
			</div>

			<div class='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 lg:gap-14 '>
				<div class='bg-sky-800 h-56 '>
					<h3>Title</h3>01
				</div>
				<div class='bg-sky-800 h-56'>02</div>
				<div class='bg-sky-800 h-56'>03</div>
				<div class=' bg-sky-800 h-56'>04</div>
				<div class='bg-sky-800 h-56'>05</div>
				<div class='bg-sky-800 h-56'>06</div>
				<div class='bg-sky-800 h-56'>07</div>
				<div class='bg-sky-800 h-56'>08</div>
				<div class=' bg-sky-800 h-56'>09</div>
			</div>
		</div>
	)
}
export default Projects
