import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { ComponentHeader } from "./layout/ComponentHeading";
import Link from "next/link";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { dailyItems } from "./data/daily_use";

export default function DailyUses() {
	return (
		<div className="relative w-full overflow-hidden">
			{/* Full-Width Background Image with Gradient Overlay */}
			<div
				className="absolute top-0 left-0 w-full h-96 bg-cover bg-center"
				style={{
					backgroundImage: `url('https://res.cloudinary.com/dr1sm5gnj/image/upload/v1735136801/igutech/blogs/ai-generated-9161446_1920_hvklfn.jpg')`,
				}}
			>
				{/* Gradient overlay with disintegration effect */}
				<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100 mask-image mask-linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,1) 100%)"></div>
			</div>

			{/* Content Area */}
			<div className="relative z-10 layout mx-auto lg:my-14 my-5 sm:px-4 xs:px-5 lg:px-6 py-10 text-slate-400">
				{/* Header Section */}
				<div className="text-center text-white blur-none">
					<div className="blur-none">
					<ComponentHeader
						titlePrefix={"Daily "}
						title={"Uses"}
						subtitle={""}
						text={"A peek into my workspace and tools."}
					/>
					</div>
				
				</div>

				{/* Categories */}
				<TooltipProvider>
					<div className="bg-opacity-80 p-6 rounded-lg mt-16">
						{dailyItems.map((section, index) => (
							<div key={index} className="mb-8">
								<h2 className="text-3xl font-semibold text-gray-200 mb-6">{section.category}</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{section.entries.map((entry, idx) => (
										<div
											key={idx}
											className="p-6 bg-gray-900 rounded-lg shadow-2xl flex items-center justify-between transition-all duration-300 transform hover:scale-105"
										>
											<div>
												<h3 className="text-xl font-semibold text-gray-200">{entry.title}</h3>
												<p className="text-gray-400 mt-2">{entry.description}</p>
											</div>
											{entry.link ? (
												<Tooltip>
													<TooltipTrigger asChild>
														<Link
															href={entry.link}
															target="_blank"
															rel="noopener noreferrer"
															passHref
															className="text-2xl text-blue-400 transition-colors hover:text-blue-600"
														>
															<IoIosInformationCircleOutline />
														</Link>
													</TooltipTrigger>
													<TooltipContent className="bg-white text-black p-3 rounded-lg shadow-md">
														<p>More info about {entry.title}</p>
													</TooltipContent>
												</Tooltip>
											) : (
												<span className="text-gray-400"></span>
											)}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</TooltipProvider>
			</div>
		</div>
	);
}
