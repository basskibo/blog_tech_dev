import React from "react"

const Footer = () => {
	return (
		<div className='w-full bg-slate-800 border-t border-slate-400 text-white  relative bottom-0'>
			{" "}
			<div className='xl:px-40 pb-7 lg:px-20 md:px-10 sm:px-5 px-10'>
				<div className='w-full pt-12 flex flex-col sm:flex-row space-y-2  justify-start'>
					<div className='w-full sm:w-1/5 pr-6 flex flex-col space-y-1'>
						<div className='w-24'>
							<svg viewBox='0 0 128 128'>
								<path
									d='M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0'
									fill='#38b2ac'
								></path>
							</svg>
						</div>

						{/* <p className="opacity-60">
              Iguana Development, Novi Sad 21000, Serbia.
            </p> */}
					</div>
					<div className='w-full sm:w-1/5 flex flex-col space-y-4'>
						<a className='opacity-60'>About</a>

						<a className='opacity-60'>Portofolio</a>
						<a className='opacity-60'>Contact</a>
					</div>
					<div className='w-full sm:w-1/5 flex flex-col space-y-4'>
						<a className='opacity-60'>Privacy Policy</a>
						<a className='opacity-60'>Terms of Service</a>
					</div>
					<div className='w-full sm:w-1/5 pt-6 flex items-end mb-1'>
						<div className='flex flex-row space-x-4'>
							<i className='fab fa-facebook-f'></i>
							<i className='fab fa-twitter'></i>
							<i className='fab fa-instagram'></i>
							<i className='fab fa-google'></i>
						</div>
					</div>
				</div>
				<div className='opacity-60 pt-2'>
					<p>© 2022 Iguana Development International.</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
