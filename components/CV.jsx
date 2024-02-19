import React from 'react'
import cvImage from '../public/images/cv.jpg'
import constants from '../utils/constants'
import Accent from '../components/custom/Accent'
import Image from 'next/image'

const CV = () => {
	return (
		<div>
			<h1 className='mb-5'>
				<Accent className='text-3xl font-semibold'>
					{' '}
					Curriculum vitae
				</Accent>{' '}
			</h1>
			<div className='grid gap-6 row-gap-10 lg:grid-cols-2'>
				<ol className='relative border-l border-gray-200 dark:border-gray-700'>
					<li className='ml-4 mb-10'>
						<div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
						<time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
							October 2022 ~ Present
						</time>
						<h3 className='text-xl font-semibold text-slate-400 dark:text-white'>
							CodeMeUp / ext. Truedigital
						</h3>
						<h2 className='py-1'>Web developer </h2>

						<div className='text-base font-normal text-gray-500 dark:text-gray-400'>
							<ul className='list-disc pl-5'>
								<li>Project: Developing smart tv applications based on Tizen and WebOS platforms</li>
								<li>Working on smart TV application used as streaming platform. Creating components, services, authorization, etc.
									Platform is serving LiveTV, video on demand  as well as option for renting movies. </li>
								<li>Developed and maintained a comprehensive web application back office using React.js, implementing efficient and scalable front-end solutions.
									Spearheaded the development of a React Native mobile application, ensuring cross-platform (IOS and Android) compatibility and optimal user experience.
									Collaborated closely with cross-functional teams to translate project requirements into actionable technical specifications.
								</li>
								<li>Key technologies: React, React native, Nodejs, Typescript, Tizen, WebOS, Firebase, etc.</li>
								<li>Dockerizing and creating the process of building, CI/CD, packing, deploying and  using Docker containers for the sdk usage</li>
								<li className='font-semibold'>
									Technologies used on this project
								</li>
								<div className='flex mb-2 gap-1'>
									{constants.generateIcon('SiReact')}
									{constants.generateIcon('SiTypescript')}
									{constants.generateIcon('SiJavascript')}
									{constants.generateIcon('SiIos')}
									{constants.generateIcon('SiAndroid')}
									{constants.generateIcon('SiExpress')}
									{constants.generateIcon('SiFirebase')}
									{constants.generateIcon('SiDocker')}
									{constants.generateIcon('SiJenkins')}
								</div>
							</ul>

						</div>
					</li>{' '}
					<li className='ml-4 mb-10'>
						<div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
						<time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
							March 2017 ~ October 2022
						</time>
						<h3 className='text-xl font-semibold text-slate-400 dark:text-white'>
							OBLO Living / RT-RK
						</h3>
						<h2 className='py-1'>Full stack developer, DevOps </h2>

						<div className='text-base font-normal text-gray-500 dark:text-gray-400'>
							<ul className='list-disc pl-5'>
								<li>
									Project: Developing flexible, secure, highly
									available (HA) and scalable cloud service for
									various IoT applications.
								</li>
								<li>
									Description: Working on cloud integration of smart
									devices using Zigbee, Z Wave and Wise protocol,
									scalability of the system in order to support more
									than 1milion mqtt clients (devices) with 100
									thousand of docker containers which are IOT
									virtual device gateway , maximizing application
									efficiency, data quality, scope, operability, and
									flexibility. Setting up new environments and
									working with multiple EMQX brokers, rabbitMQ and
									Redis clusters, MongoDB replication, making HA
									systems and ensuring high level of operational
									performance. Involved in writing SOW, WBS and
									designing new features.
								</li>
								<li>
									Key technologies used: MEAN stack (MongoDB,
									Express, AngularJs, Nodejs), React, MQTT broker(
									EMQX and mosca), NGINX, Docker, Redis, RabbitMQ,
									Kafka, AWS services , Jenkins, Zabbix , Ansible,
									NFS/EFS
								</li>
								<li className='font-semibold'>
									Technologies used on this project
								</li>
								<div className='flex mb-2 gap-1'>
									{constants.generateIcon('SiNodedotjs')}
									{constants.generateIcon('SiExpress')}
									{constants.generateIcon('SiMongodb')}
									{constants.generateIcon('SiRedis')}
									{constants.generateIcon('SiDocker')}
									{constants.generateIcon('SiRabbitmq')}
									{constants.generateIcon('SiAngularjs')}
									{constants.generateIcon('SiJenkins')}
									{constants.generateIcon('SiAmazonaws')}
								</div>
							</ul>
						</div>
					</li>
					<li className='ml-4 mb-10'>
						<div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
						<time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
							March 2016 ~ October 2017
						</time>
						<h3 className='text-xl font-semibold text-slate-400 dark:text-white'>
							Iguana Development
						</h3>
						<h2 className='py-1'>CEO, Full stack developer </h2>

						<div className='text-base mb-4  font-normal text-gray-500 dark:text-gray-400'>
							<ul className='list-disc pl-5'>
								<li>
									{' '}
									Project: Mass multiplayer event entertainment
									platform
								</li>
								<li>
									Description: Working on development of a web
									platform that enables the audience on sports arena
									to participate in real time events/games. Involved
									in architecture structure, scalability and
									performance due to high load of websocket
									connections.
								</li>
								<li>
									Key technologies used are Nodejs, SailsJs, MongoDB
									, Websockets (socket.io), AngularJS, AWS EC2, AWS
									S3
								</li>
								<li className='font-semibold'>
									Technologies used on this project
								</li>
								<div className='flex mb-2 gap-1'>
									{constants.generateIcon('SiNodedotjs')}
									{constants.generateIcon('SiExpress')}
									{constants.generateIcon('SiMongodb')}
									{constants.generateIcon('SiRedis')}
									{constants.generateIcon('SiAngularjs')}
									{constants.generateIcon('SiHeroku')}

								</div>
							</ul>
						</div>
						{/* <a
             href='#'

             className='pointer-events-none inline-flex items-center py-2  px-4 text-sm font-medium text-gray-900 bg-gray-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
             See project{" "}
             <svg
                className='ml-2 w-3 h-3'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                   fillRule='evenodd'
                   d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                   clipRule='evenodd'></path>
             </svg>
          </a> */}
					</li>
					<li className='mb-10 ml-4'>
						<div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
						<time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
							June 2016 ~ Oct March 2017
						</time>
						<h3 className='text-xl font-semibold text-slate-400 dark:text-white'>
							Ploush GmbH
						</h3>
						<h2 className='py-1'>Full stack developer </h2>

						<div className='text-base font-normal text-gray-500 dark:text-gray-400'>
							<ul className='list-disc pl-5'>
								<li>
									{' '}
									Project: Mass multiplayer event entertainment
									platform
								</li>
								<li>
									Description: Working on development of a web
									platform that enables the audience on sports arena
									to participate in real time events/games. Involved
									in architecture structure, scalability and
									performance due to high load of websocket
									connections.
								</li>
								<li>
									Key technologies used are Nodejs, SailsJs, MongoDB
									, Websockets (socket.io), AngularJS, AWS EC2, AWS
									S3
								</li>
								<li className='font-semibold'>
									Technologies used on this project
								</li>
								<div className='flex mb-2 gap-1'>
									{constants.generateIcon('SiNodedotjs')}
									{constants.generateIcon('SiMongodb')}
									{constants.generateIcon('SiRedis')}
									{constants.generateIcon('SiSocketdotio')}
									{constants.generateIcon('SiAngularjs')}
									{constants.generateIcon('SiAmazonaws')}

								</div>
							</ul>
						</div>
					</li>
					<li className='mb-10 ml-4'>
						<div className='absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
						<time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
							April 2015 ~ June 2016
						</time>
						<h3 className='text-xl font-semibold text-gray-500 dark:text-white'>
							Greensoft Ltd
						</h3>
						<h2 className='py-1'>
							Full stack developer, hybrid mobile development{' '}
						</h2>
						<div className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
							<ul className='list-disc pl-5'>
								<li>
									Project: Software solution specialized in managing
									agriculture production processes and all types of
									lands, Mobile agro solutions{' '}
								</li>
								<li>
									Description: Develop, maintain and support
									web/mobile application for Agronomists and owners
									of agriculture households. Analyze code for system
									testing and debugging, isolate and rectify issues.
									Developed full-stack web applications which
									processed, analyzed, and rendered data visually
									using GIS.
								</li>
								<li>
									Assignments: Implementation, unit tests,
									documentation, user manuals, deployment on AWS ●
									Technologies: Nodejs, KrakenJs, React Native,
									Sencha, Sencha Touch, PostgresQL
								</li>
								<li className='font-semibold'>
									Technologies used on this project
								</li>
								<div className='flex mb-2 gap-1'>
									{constants.generateIcon('SiNodedotjs')}
									{constants.generateIcon('SiPostgresql')}
									{constants.generateIcon('SiSencha')}
									{constants.generateIcon('SiIonic')}
								</div>
							</ul>
						</div>
					</li>
				</ol>

				<div className='relative'>
					<Image
						className='inset-0 object-cover object-bottom w-full rounded shadow-lg h-96 lg:absolute lg:h-full'
						src={cvImage}
						blurDataURL={constants.imageBlogURI}
						placeholder='blur'
						layout='fill'
						alt='Photo by <a href="https://unsplash.com/@theshubhamdhage?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Shubham Dhage</a> on <a href="https://unsplash.com/t/3d-renders?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
					/>
				</div>
			</div>
		</div>
	)
}

export default CV
