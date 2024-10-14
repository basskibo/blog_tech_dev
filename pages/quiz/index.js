'use client'
import React from 'react'
import { Accent } from '@/components/index'
import QuizComponent from '@/components/QuizComponent'
import { IoLogoNodejs, IoLogoJavascript } from "react-icons/io";
import { MdArchitecture, MdOutlineDesignServices } from "react-icons/md";
import { IoLogoReact } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import { SiMongodb, SiMysql } from "react-icons/si";
import DifficultyBar from '@/components/custom/DIfficultyBar';
import { mongodbQuestions, nodeQuestions, reactQuestions } from 'src/quizQuestions';

const Quiz = () => {
	const [selectedQuiz, setSelectedQuiz] = React.useState('')
	const [showConfirmRestart, setShowConfirmRestart] = React.useState(false); 

	const quizes = [
		...nodeQuestions,
		...reactQuestions,
		...mongodbQuestions
	];

	const handleSidebarCategorySelect = (e) => {
		alert('Still in development..')
	
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
						<h3 className='text-white text-2xl '>Categories</h3>
						<ul className='flex flex-col gap-5 mt-5'>
							{quizes.map((quiz) => (
								<li  onClick={() => setSelectedQuiz(quiz.id)} key={quiz.id} className='disabled flex flex-row gap-2 items-center hover:underline hover:cursor-pointer hover:text-[#ff0080]'>
									{quiz?.icon}{quiz.name}
									<span>{quiz.id}</span>
								</li>
							))}
						</ul>
					</div>
					<QuizComponent selectedQuiz={selectedQuiz} setSelectedQuiz={setSelectedQuiz} onRequestRestart={() => setShowConfirmRestart(true)}/>

				</div>
			}
			{!selectedQuiz &&
				<div className=''>
					<h2 className='text-2xl text-slate-200 my-5'>Choose category to play</h2>
					<div className='grid  bg-grid-white/[0.05] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
						{quizes.map((quiz) => (
							<div key={quiz.id} onClick={() => setSelectedQuiz(quiz.id)} className='border bg-neutral-800 rounded-md border-neutral-800 px-5 py-10 space-y-2 flex flex-col justify-center items-center align-middle  
							transform hover:scale-[1.05] transition-all  hover:cursor-pointer hover:text-[#ff0080] hover:border-[#ff0080]'>
								<p className='flex flex-row text-lg justify-center items-center align-middle gap-1 text-white'>{quiz?.icon}{quiz.name} </p>
								<DifficultyBar level={quiz.difficulty}/>
								<p className='flex flex-row text-sm justify-center items-center align-middle text-slate-400'>Difficulty: {quiz?.level} </p>
							</div>
						))}
					</div>
				</div>
			}
			{showConfirmRestart && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-5 rounded shadow-lg">
						<h3 className="text-lg font-semibold">Confirm Restart</h3>
						<p>Are you sure you want to restart the quiz?</p>
						<div className="mt-4 flex justify-end">
							<button
								className="bg-red-500 text-white px-4 py-2 rounded mr-2"
								onClick={() => {
									setShowConfirmRestart(false);
									handlePlayAgain();
								}}
							>
								Yes, Restart
							</button>
							<button
								className="bg-gray-300 text-black px-4 py-2 rounded"
								onClick={() => setShowConfirmRestart(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

		</div>
	)
}

export default Quiz