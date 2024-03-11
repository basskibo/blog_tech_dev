import React from 'react'
import { Accent } from '@/components/index'
import QuizComponent from '@/components/QuizComponent'

const quiz = () => {
	return (
		<div className='layout mx-auto lg:my-14 my-5 sm:px-2 xs:px-3 lg:px-5  text-slate-400'>
			<div className='my-8 '>
				<h1 className='mb-5'>
					<Accent className='font-extrabold text-5xl'>Interview Quiz</Accent>
				</h1>
				<p>
					If you want to test your knowledge in different area it is good and fun way to play quiz and test yourself. There are few fields of questions and 
					different levels of expertise so you can find questions suitable for yourself. To be honest I made this so i can reasure my knoweldge in fun and 
					also more faster way than just reading text. 
				</p>
			</div>
			<QuizComponent />
		</div>
	)
}

export default quiz