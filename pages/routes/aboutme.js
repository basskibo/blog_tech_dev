import React from 'react'
import Accent from '../../components/custom/Accent'
import TechnologyStack from '../../components/custom/TechnologyStack'
import CV from '../../components/CV'
import FeatureLanding from '@/components/FeatureLanding'
import SupportMe from '@/components/SupportMe'

const Bio = () => {
	return (
		<div className='layout mx-auto lg:my-14 my-5 sm:px-2 xs:px-3 lg:px-5  text-slate-400'>
			<div className='my-8 '>
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-5xl'>About</Accent>
				</h1>
				{/* <MotionComponent> */}
				<div className='  lg:px-0 py-3 mb-10 border-b border-gray-400'>
					<p className='mb-5'>
						Experienced Software Developer with a demonstrated history of
						working in the IT industry and especially in IOT in the last
						years. Developed JSON RESTfull API services for new web/
						hybrid mobile apps , including OAuth, users profiles,
						messages, friendship and etc(Node.js, express, socket).
						Skilled in JavaScript, NodeJS, Express, Sails.js, React, React
						native, NextJs, AngularJS, MongoDB, Redis, Docker, MQTT
						brokers, RabbitMQ,Firebase, Jenkins, etc.. Programming is my passion
						and I tend to learn everyday new things and new technologies.
					</p>
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
