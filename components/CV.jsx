import React from 'react'
import cvImage from '../public/images/cv.jpg'
import constants from '../utils/constants'
import Accent from '../components/custom/Accent'
import Image from 'next/image'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

const CV = () => {
	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = '/Bojan_Jagetić.pdf';
		link.download = 'Bojan_Jagetić.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	const timelineItems = [
		{
			period: 'October 2022 ~ Present',
			company: 'CodeMeUp / ext. Truedigital',
			role: 'Web developer',
			description: [
				'Project: Developing smart tv applications based on Tizen and WebOS platforms, hospitality project',
				'Spearheaded the development of a hospitality platform using Node.js, Java, and AI technologies, ensuring robust backend services and smooth integration of AI-driven features.',
				'Implemented microservices architecture to support AI-enhanced features like dynamic content recommendations, reservation management, and predictive analytics.',
				'Developed scalable and highly available backend services on AWS, focusing on EC2, S3, and CloudWatch for operational efficiency.',
				'Collaborated on AI model deployment, ensuring seamless integration into the cloud infrastructure.',
				'Worked on the frontend using React.js, creating responsive and dynamic user interfaces for client-side applications, ensuring seamless user experience across different devices.',
				'Developed and maintained mobile applications using React Native, enhancing cross-platform compatibility for iOS and Android.',
				'Key technologies: React, React native, Nodejs, Typescript, Tizen, WebOS, Firebase, etc.',
				'Dockerizing and creating the process of building, CI/CD, packing, deploying and using Docker containers for the sdk usage'
			],
			technologies: ['SiNodedotjs', 'SiExpress', 'SiReact', 'SiTypescript', 'SiDocker', 'SiJenkins']
		},
		{
			period: 'March 2017 ~ October 2022',
			company: 'OBLO Living / RT-RK',
			role: 'Full stack developer, DevOps',
			description: [
				'Project: Developing flexible, secure, highly available (HA) and scalable cloud service for various IoT applications.',
				'Working on cloud integration of smart devices using Zigbee, Z Wave and Wise protocol, scalability of the system in order to support more than 1milion mqtt clients (devices) with 100 thousand of docker containers which are IOT virtual device gateway, maximizing application efficiency, data quality, scope, operability, and flexibility.',
				'Setting up new environments and working with multiple EMQX brokers, rabbitMQ and Redis clusters, MongoDB replication, making HA systems and ensuring high level of operational performance.',
				'Involved in writing SOW, WBS and designing new features.',
				'Key technologies used: MEAN stack (MongoDB, Express, AngularJs, Nodejs), React, MQTT broker(EMQX and mosca), NGINX, Docker, Redis, RabbitMQ, Kafka, AWS services, Jenkins, Zabbix, Ansible, NFS/EFS'
			],
			technologies: ['SiNodedotjs', 'SiExpress', 'SiMongodb', 'SiRedis', 'SiDocker', 'SiRabbitmq', 'SiAngularjs', 'SiJenkins', 'SiAmazonaws']
		},
		{
			period: 'March 2016 ~ October 2017',
			company: 'Iguana Development',
			role: 'CEO, Full stack developer',
			description: [
				'Project: Mass multiplayer event entertainment platform',
				'Working on development of a web platform that enables the audience on sports arena to participate in real time events/games.',
				'Involved in architecture structure, scalability and performance due to high load of websocket connections.',
				'Key technologies used are Nodejs, SailsJs, MongoDB, Websockets (socket.io), AngularJS, AWS EC2, AWS S3'
			],
			technologies: ['SiNodedotjs', 'SiExpress', 'SiMongodb', 'SiRedis', 'SiAngularjs', 'SiHeroku']
		},
		{
			period: 'June 2016 ~ March 2017',
			company: 'Ploush GmbH',
			role: 'Full stack developer',
			description: [
				'Project: Mass multiplayer event entertainment platform',
				'Working on development of a web platform that enables the audience on sports arena to participate in real time events/games.',
				'Involved in architecture structure, scalability and performance due to high load of websocket connections.',
				'Key technologies used are Nodejs, SailsJs, MongoDB, Websockets (socket.io), AngularJS, AWS EC2, AWS S3'
			],
			technologies: ['SiNodedotjs', 'SiMongodb', 'SiRedis', 'SiSocketdotio', 'SiAngularjs', 'SiAmazonaws']
		},
		{
			period: 'April 2015 ~ June 2016',
			company: 'Greensoft Ltd',
			role: 'Full stack developer, hybrid mobile development',
			description: [
				'Project: Software solution specialized in managing agriculture production processes and all types of lands, Mobile agro solutions',
				'Develop, maintain and support web/mobile application for Agronomists and owners of agriculture households.',
				'Analyze code for system testing and debugging, isolate and rectify issues.',
				'Developed full-stack web applications which processed, analyzed, and rendered data visually using GIS.',
				'Assignments: Implementation, unit tests, documentation, user manuals, deployment on AWS',
				'Technologies: Nodejs, KrakenJs, React Native, Sencha, Sencha Touch, PostgresQL'
			],
			technologies: ['SiNodedotjs', 'SiPostgresql', 'SiSencha', 'SiIonic']
		}
	]

	return (
		<div className="space-y-8">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<h2 className={cn(
					"text-2xl sm:text-3xl font-bold",
					"text-foreground"
				)}>
					<Accent>Curriculum Vitae</Accent>
				</h2>
				<Button
					onClick={handleDownload}
					variant="outline"
					size="lg"
					data-umami-event="aboutme-cv-btn-clicked"
					className={cn(
						"w-full sm:w-auto",
						"border-2 border-primary/50",
						"bg-primary/10 text-primary",
						"hover:bg-primary/20 hover:border-primary",
						"font-semibold shadow-lg",
						"transition-all duration-300 hover:scale-105"
					)}
				>
					<Download className="mr-2 h-4 w-4" />
					Download PDF
				</Button>
			</div>

			<div className='grid gap-8 lg:grid-cols-2'>
				{/* Timeline */}
				<div className="space-y-8">
					{timelineItems.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className={cn(
								"relative pl-8 pb-8",
								"border-l-2 border-border"
							)}
						>
							{/* Timeline dot */}
							<div className={cn(
								"absolute -left-[9px] top-0",
								"w-4 h-4 rounded-full",
								"bg-primary border-4 border-background",
								"shadow-lg"
							)} />

							{/* Content */}
							<div className={cn(
								"space-y-3",
								"p-4 sm:p-6 rounded-lg",
								"bg-card border border-border",
								"hover:shadow-lg transition-shadow duration-200"
							)}>
								<time className={cn(
									"block text-sm font-medium",
									"text-muted-foreground"
								)}>
									{item.period}
								</time>
								<h3 className={cn(
									"text-xl font-bold",
									"text-foreground"
								)}>
									{item.company}
								</h3>
								<h4 className={cn(
									"text-base font-semibold",
									"text-primary"
								)}>
									{item.role}
								</h4>
								<ul className={cn(
									"space-y-2 text-sm",
									"text-muted-foreground",
									"list-disc list-inside"
								)}>
									{item.description.map((desc, i) => (
										<li key={i}>{desc}</li>
									))}
								</ul>
								{item.technologies && (
									<div className="flex flex-wrap gap-2 mt-4">
										{item.technologies.map((tech, i) => (
											<div key={i} className="text-2xl">
												{constants.generateIcon(tech)}
											</div>
										))}
									</div>
								)}
							</div>
						</motion.div>
					))}
				</div>

				{/* Image */}
				<div className={cn(
					"relative rounded-xl overflow-hidden",
					"border border-border",
					"shadow-lg",
					"lg:sticky lg:top-20",
					"h-[400px] sm:h-[500px] lg:h-[calc(100vh-5rem)]"
				)}>
					<Image
						className="object-cover"
						src={cvImage}
						blurDataURL={constants.imageBlogURI}
						placeholder="blur"
						fill
						alt="Bojan Jagetic CV"
						sizes="(max-width: 1024px) 100vw, 50vw"
					/>
				</div>
			</div>
		</div>
	)
}

export default CV
