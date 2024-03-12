import React, { useState } from 'react'
import { Accent } from '@/components/index'
import QuizComponent from '@/components/QuizComponent'
import { IoLogoNodejs, IoLogoJavascript } from "react-icons/io";
import { MdArchitecture, MdOutlineDesignServices } from "react-icons/md";
import { IoLogoReact } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import { SiMongodb, SiMysql } from "react-icons/si";

const quiz = () => {
	const [selectedQuiz, setSelectedQuiz] = useState('')
	const quizes = [
		{ name: 'NodeJs', level: 'Senior', id: 'node', icon: <IoLogoNodejs size={'2rem'} /> },
		{ name: 'NodeJs', level: 'Junior', id: 'node', icon: <IoLogoNodejs size={'2rem'} /> },
		{ name: 'Javascript', level: 'Senior', id: 'js', icon: <IoLogoJavascript size={'2rem'} /> },
		{ name: 'React', level: 'Senior', id: 'react', icon: <IoLogoReact size={'2rem'} /> },
		{ name: 'Software Architecture', level: 'Senior', id: 'arch', icon: <MdArchitecture size={'2rem'} /> },
		{ name: 'Design Patterns', level: 'Senior', id: 'dp', icon: <MdOutlineDesignServices size={'2rem'} /> },
		{ name: 'MongoDB', level: 'Senior', id: 'mongodb', icon: <SiMongodb size={'2rem'} /> },
		{ name: 'Mysql', level: 'Senior', id: 'mysql', icon: <SiMysql size={'2rem'} /> },
		{ name: 'Random', level: 'Senior', id: 'random', icon: <FaRandom size={'2rem'} /> },
	]

	const handleCategorySelect = (e) => {
		alert('Still in development..')
		return
		const selectedCategory = e.target.outerText
		setSelectedQuiz(selectedCategory)
		console.log(selectedCategory)
	}
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
			{selectedQuiz &&
				<div className='flex  flex-col lg:flex-row gap-10'>
					<div className='flex flex-col w-full lg:w-1/4 border p-2 border-neutral-800'>
						<h3 className='text-white text-2xl '>Test categories</h3>
						<ul className='flex flex-col gap-5 mt-5'>
							{quizes.map((quiz) => (
								<li onClick={handleCategorySelect} key={quiz.id} className='flex flex-row gap-2 items-center hover:underline hover:cursor-pointer hover:text-[#ff0080]'>
									{quiz?.icon}{quiz.name}
								</li>
							))}
						</ul>
					</div>
					<QuizComponent selectedQuiz={selectedQuiz} />

				</div>
			}
			{!selectedQuiz &&
				<div>
					<h2 className='text-2xl text-slate-200 my-5'>Choose category to play</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
						{quizes.map((quiz) => (
							<div key={quiz.id} onClick={handleCategorySelect} className='border border-neutral-800 px-5 py-10 flex flex-col justify-center items-center align-middle  
							transform hover:scale-[1.00] transition-opacity  hover:cursor-pointer hover:text-[#ff0080] hover:border-[#ff0080]'>
								<p className='flex flex-row text-lg justify-center items-center align-middle gap-1 text-white'>{quiz?.icon}{quiz.name} </p>
								<p className='flex flex-row text-sm justify-center items-center align-middle text-slate-400'>Level: {quiz?.level} </p>
							</div>
						))}
					</div>
				</div>
			}

		</div>
	)
}

export default quiz