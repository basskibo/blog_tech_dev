import React from 'react'
import TechnologyStack from '../../components/custom/TechnologyStack'
import CV from '../../components/CV'
import FeatureLanding from '@/components/FeatureLanding'
import SupportMe from '@/components/SupportMe'
import { ComponentHeader } from '@/components/layout/ComponentHeading'
import MotionWrapper from '@/components/layout/MotionWrapper'
import { motion } from 'framer-motion'
import { aboutMeBio } from '@/components/config/bios'


const Bio = () => {
	const FADE_DOWN_ANIMATION_VARIANTS = {
		hidden: { opacity: 0, y: -10 },
		show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.8 } },
	};


	return (
		<div className='layout mx-auto lg:my-0 my-5 py-3 sm:px-2 xs:px-3 lg:px-3 text-sm md:text-md text-slate-400'>
			<div className='my-24 px-1' id="scrollableDiv">
				<MotionWrapper>
					<ComponentHeader
						titlePrefix={'About '}
						title={'Me'}
						subtitle={'Full-stack developer'}
						text={aboutMeBio}
					/>

					<motion.div
						className='lg:px-0 py-3 mb-10 border-b border-gray-400'
					>
						<SupportMe />
						<TechnologyStack />
					</motion.div>

					<motion.div>
						<CV />
					</motion.div>

					<motion.div>
						<FeatureLanding />
					</motion.div>
				</MotionWrapper>

			</div>
		</div>
	);
};

export default Bio
