import React from 'react'
import Accent from '../../components/custom/Accent'
import TechnologyStack from '../../components/custom/TechnologyStack'
import CV from '../../components/CV'
import FeatureLanding from '@/components/FeatureLanding'
import SupportMe from '@/components/SupportMe'
import { ComponentHeader } from '@/components/layout/ComponentHeading'
import MotionWrapper from '@/components/layout/MotionWrapper'
import {motion} from 'framer-motion'


const Bio = () => {
	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
	};
	const bio = `
		Experienced Software Developer with a demonstrated history of
		working in the IT industry and especially in IoT in the last years. 
		Developed JSON RESTful API services for new web/hybrid mobile apps, 
		including OAuth, user profiles, messages, friendship, and more (Node.js, Express, Socket). 
		Skilled in JavaScript, Node.js, Express, Sails.js, React, React Native, Next.js, AngularJS, 
		MongoDB, Redis, Docker, MQTT brokers, RabbitMQ, Firebase, Jenkins, etc. 
		Programming is my passion, and I strive to learn new things and technologies every day.
	`;

	return (
		<div className='layout mx-auto lg:my-0 my-5 py-3 sm:px-2 xs:px-3 lg:px-3  text-slate-400'>
			<div className='my-24 px-1' id="scrollableDiv">
				{/* Wrap ComponentHeader with MotionWrapper */}
				<MotionWrapper>
						<ComponentHeader
							titlePrefix={'About '}
							title={'Me'}
							subtitle={'Full-stack developer'}
							text={bio}
						/>

					<motion.div
						className='lg:px-0 py-3 mb-10 border-b border-gray-400'
						// variants={FADE_DOWN_ANIMATION_VARIANTS}
					>
						<SupportMe />
						<TechnologyStack />
					</motion.div>

					<motion.div 
					// variants={FADE_DOWN_ANIMATION_VARIANTS}
					>
						<CV />
					</motion.div>

					<motion.div
					//  variants={FADE_DOWN_ANIMATION_VARIANTS}
					 >
						<FeatureLanding />
					</motion.div>
				</MotionWrapper>

			</div>
		</div>
	);
};

export default Bio
