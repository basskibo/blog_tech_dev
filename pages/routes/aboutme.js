import React from 'react'
import Accent from '../../components/custom/Accent'
import TechnologyStack from '../../components/custom/TechnologyStack'
import CV from '../../components/CV'
import FeatureLanding from '@/components/FeatureLanding'
import SupportMe from '@/components/SupportMe'
import { ComponentHeader } from '@/components/layout/ComponentHeading'

const Bio = () => {
	const bio = `
		Experienced Software Developer with a demonstrated history of
		working in the IT industry and especially in IoT in the last years. 
		Developed JSON RESTful API services for new web/hybrid mobile apps, 
		including OAuth, user profiles, messages, friendship, and more (Node.js, Express, Socket). 
		Skilled in JavaScript, Node.js, Express, Sails.js, React, React Native, Next.js, AngularJS, 
		MongoDB, Redis, Docker, MQTT brokers, RabbitMQ, Firebase, Jenkins, etc. 
		Programming is my passion, and I strive to learn new things and technologies every day.
	`
	return (
		<div className='layout mx-auto lg:my-14 my-5 sm:px-2 xs:px-3 lg:px-5 py-5  text-slate-400'>
			<div className='my-8 '>
				<ComponentHeader titlePrefix={'About '} title={'Me'} subtitle={'Full-stack developer'} text={bio} />
				<div className='  lg:px-0 py-3 mb-10 border-b border-gray-400'>
					<SupportMe />
					<TechnologyStack />
				</div>
				<CV />
				<FeatureLanding />
				{/* <Education/> */}
			</div>
		</div>
	)
}

export default Bio
