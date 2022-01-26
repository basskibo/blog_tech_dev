import React from "react"

const Footer = () => {
	return (
		<div class='w-full bg-slate-800 border-t border-slate-400 text-white'>
			{" "}
			<div class='xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10'>
				<div class='w-full pt-12 flex flex-col sm:flex-row space-y-2  justify-start'>
					<div class='w-full sm:w-1/5 pr-6 flex flex-col space-y-1'>
						<img
							className='  w-full pl-0 ml-0 pb-5'
							src='https://gcdn.pbrd.co/images/2EwDYHdkMOwi.png?o=1'
							alt='Workflow'
						/>
						<p class='opacity-60'>Iguana Development, Novi Sad 21000, Serbia.</p>
					</div>
					<div class='w-full sm:w-1/5 flex flex-col space-y-4'>
						<a class='opacity-60'>About</a>

						<a class='opacity-60'>Portofolio</a>
						<a class='opacity-60'>Contact</a>
					</div>
					<div class='w-full sm:w-1/5 flex flex-col space-y-4'>
						<a class='opacity-60'>Privacy Policy</a>
						<a class='opacity-60'>Terms of Service</a>
					</div>
					<div class='w-full sm:w-1/5 pt-6 flex items-end mb-1'>
						<div class='flex flex-row space-x-4'>
							<i class='fab fa-facebook-f'></i>
							<i class='fab fa-twitter'></i>
							<i class='fab fa-instagram'></i>
							<i class='fab fa-google'></i>
						</div>
					</div>
				</div>
				<div class='opacity-60 pt-2'>
					<p>© 2022 Iguana Development International.</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
