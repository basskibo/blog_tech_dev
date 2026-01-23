'use client'
import React, { Fragment, useState } from 'react'
import QuizComponent from '@/components/QuizComponent'
import DifficultyBar from '@/components/custom/DIfficultyBar';
import { mongodbQuestions, nodeQuestions, reactQuestions } from '../../src/quizQuestions';
import { ComponentHeader } from '@/components/layout/ComponentHeading';
import { motion, AnimatePresence } from 'framer-motion';

interface Quiz {
	id: string
	name: string
	level: string
	difficulty: string | number
	icon?: React.ComponentType<{ size?: string }>
	questions?: any[]
}

const Quiz: React.FC = () => {
	const [selectedQuiz, setSelectedQuiz] = useState<string>('')
	const [showConfirmRestart, setShowConfirmRestart] = useState(false);
	const [isOpen, setIsOpen] = useState(false)

	const quizes: Quiz[] = [
		...(nodeQuestions as Quiz[]),
		...(reactQuestions as Quiz[]),
		...(mongodbQuestions as Quiz[])
	];

	const handleCategoryChange = (e: React.MouseEvent) => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	const handleResetQuiz = () => {
		setSelectedQuiz('')
		setIsOpen(false)
	}

	const handlePlayAgain = () => {
		setSelectedQuiz('')
		setShowConfirmRestart(false)
	}

	const bio = `If you want to test your knowledge in different area it is good and fun way to play quiz and test yourself. There are few fields of questions and
					different levels of expertise so you can find questions suitable for yourself. To be honest I made this so i can reasure my knoweldge in fun and
					also more faster way than just reading text.`
	return (
		<div className='layout mx-auto  my-48 lg:mt-24 px-1  sm:px-2 xs:px-3 lg:px-5 py-3 text-center text-slate-400'>
			<div className='my-24 lg:my-4 px-1' id="scrollableDiv">

				<ComponentHeader titlePrefix={'Interactive'} title={'Quiz'} subtitle={'Test your knowledge'} text={bio} />
				<div className='my-8 '>
				</div>
			</div>
			{selectedQuiz &&
				<div className='flex  flex-col lg:flex-row gap-10'>
					<div className='flex flex-col w-full lg:w-1/4 border p-2 border-neutral-800'>
						<h3 className='text-white text-2xl '>Categories</h3>
						<ul className='flex flex-col gap-5 mt-5'>
							{quizes.map((quiz) => {
								const IconComponent = quiz?.icon
								return (
									<li onClick={handleCategoryChange} key={quiz.id} className='disabled flex flex-row gap-2 text-lg items-center hover:underline hover:cursor-pointer hover:text-[#ff0080]'>
										{IconComponent && <IconComponent size="2rem" />}{quiz.name} <span className=' text-end self-auto p-1 rounded-lg text-slate-600 text-sm'>{quiz.level}</span>
									</li>
								)
							})}
						</ul>
					</div>
					<QuizComponent selectedQuiz={selectedQuiz} setSelectedQuiz={setSelectedQuiz} onRequestRestart={() => setShowConfirmRestart(true)} />

				</div>
			}
			{!selectedQuiz &&
				<div className=''>
					<h2 className='text-2xl text-slate-200 my-5'>Choose category to play</h2>
					<div className='grid  bg-grid-white/[0.05] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
						{quizes.map((quiz) => {
							const IconComponent = quiz?.icon
							return (
								<div key={quiz.id} onClick={() => setSelectedQuiz(quiz.id)} className='border bg-neutral-800 rounded-md border-neutral-800 px-5 py-10 space-y-2 flex flex-col justify-center items-center align-middle  
								transform hover:scale-[1.05] transition-all  hover:cursor-pointer hover:text-[#ff0080] hover:border-blue10'>
									<p className='flex flex-row text-lg justify-center items-center align-middle gap-1 text-white'>
										{IconComponent && <IconComponent size="2rem" />}{quiz.name}
									</p>
									<DifficultyBar level={quiz.difficulty} />
									<p className='flex flex-row text-sm justify-center items-center align-middle text-slate-400'>Difficulty: {quiz?.level} </p>
								</div>
							)
						})}
					</div>
				</div>
			}
			{showConfirmRestart && (
				<div className="fixed inset-0 flex items-center justify-center blur-sm grayscale   bg-opacity-50">
					<div className=" p-5 rounded shadow-lg">
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
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40'
							onClick={closeModal}
						/>

						{/* Modal */}
						<div className='fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4'>
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.3, ease: 'easeOut' }}
								className='w-full max-w-md transform overflow-hidden rounded-2xl border border-neutral-700 p-6 text-left align-middle shadow-xl bg-neutral-900'
								onClick={(e) => e.stopPropagation()}
							>
								<h3 className='text-lg font-medium leading-6 text-white mb-2'>
									Leave Quiz
								</h3>
								<div className='mt-2'>
									<p className='text-sm text-slate-400'>
										By leaving this page you active quiz session will be closed.
										You confirm to leave current quiz and go back to quiz selector?
									</p>
								</div>
								<div className='w-full flex flex-row-reverse mt-4'>
									<div className='flex gap-2'>
										<button
											type='button'
											className='rounded-md border border-transparent text-sm text-white px-4 py-2 hover:bg-neutral-800 transition-colors'
											onClick={closeModal}>
											Cancel
										</button>
										<button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent text-sm text-white px-4 py-2 bg-gradient-to-r from-[#7928ca] to-[#ff0080] hover:opacity-90 transition-opacity'
											onClick={handleResetQuiz}>
											Confirm
										</button>
									</div>
								</div>
							</motion.div>
						</div>
					</>
				)}
			</AnimatePresence>

		</div>
	)
}

export default Quiz

