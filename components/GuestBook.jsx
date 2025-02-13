import Giscus from '@giscus/react';
import React from 'react'
import { ComponentHeader } from './layout/ComponentHeading';

const GuestBook = () => {
	return (
		<div className="relative w-full overflow-hidden">
			{/* Full-Width Background Image with Gradient Overlay */}
			<div
				className="absolute top-0 left-0 w-full h-96 bg-cover bg-center"
				style={{
					backgroundImage: `url('https://res.cloudinary.com/dr1sm5gnj/image/upload/v1739441148/igutech/henry-be-lc7xcWebECc-unsplash_yezycg.jpg')`,
				}}
			>
				{/* Gradient overlay with disintegration effect */}
				<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100 mask-image mask-linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%)"></div>
			</div>

			{/* Content Area */}
			<div className="relative z-10 layout mx-auto lg:my-14 my-5 sm:px-4 xs:px-5 lg:px-6 py-10 text-slate-400">
				{/* Header Section */}
				<div className="text-center text-white blur-none mb-10">
					<div className="blur-none">
						<ComponentHeader
							titlePrefix={"Guest "}
							title={"Book"}
							subtitle={""}
							text={"Leave a message, question , appreciation, or suggestions below. If you have any question feel free to ask :) "}
						/>
					</div>

				</div>

				<Giscus
					id="giscus-comments"
					repo="basskibo/blog_tech_dev"
					repoId="R_kgDOGqrOnQ"
					categoryId="DIC_kwDOGqrOnc4COCwF"
					mapping="pathname"
					strict="0"
					reactionsEnabled="1"
					emitMetadata="0"
					inputPosition="bottom"
					theme="dark"
					lang="en"
					loading="lazy"
					crossorigin="anonymous"
				/>
			</div>
		</div>
	);
}

export default GuestBook