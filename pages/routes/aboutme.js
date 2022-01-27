import { FaBeer } from "react-icons/fa"
import Accent from "../../components/custom/Accent"

const Bio = () => {
	return (
		<div className='container mx-auto my-14 sm:px-0 xs:px-0 lg:px-5 bg-gradient-to-tr text-slate-400'>
			<div className='my-10'>
				<h1 class=' mb-7'>
					<Accent className='font-extrabold text-6xl'>About me</Accent>
				</h1>
				<p className='display-4 '>
					Hello there, my name is{" "}
					<Accent className='text-xl  font-bold'>Bojan Jagetic</Accent>
				</p>
				<p className=''>
					This projects consists of backend, frontend and devops parts{" "}
				</p>
				<p className=''>No projects on sight</p>
			</div>
		</div>
	)
}

export default Bio
