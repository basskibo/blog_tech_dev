'use client'
import React, { Fragment, useState } from 'react'
import { Accent } from '@/components/index'
import QuizComponent from '@/components/QuizComponent'
import { IoLogoNodejs, IoLogoJavascript } from "react-icons/io";
import { MdArchitecture, MdOutlineDesignServices } from "react-icons/md";
import { IoLogoReact } from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import { SiMongodb, SiMysql } from "react-icons/si";
import DifficultyBar from '@/components/custom/DIfficultyBar';
import { mongodbQuestions, nodeQuestions, reactQuestions } from 'src/quizQuestions';
import { Dialog, Transition } from '@headlessui/react';
import { ComponentHeader } from '@/components/layout/ComponentHeading';

const Quiz = () => {
	const [selectedQuiz, setSelectedQuiz] = useState('')
	const [showConfirmRestart, setShowConfirmRestart] = useState(false); 
	const [isOpen, setIsOpen] = useState(false)

	const quizes = [
		...nodeQuestions,
		...reactQuestions,
		...mongodbQuestions
	];

	const handleCategoryChange = (e) => {
		setIsOpen(true)
    
	}
	
	const closeModal = () => {
		setIsOpen(false)
	}
	
	const handleResetQuiz = () => {
		setSelectedQuiz('')
		setIsOpen(false)
	}

	const bio = `If you want to test your knowledge in different area it is good and fun way to play quiz and test yourself. There are few fields of questions and
					different levels of expertise so you can find questions suitable for yourself. To be honest I made this so i can reasure my knoweldge in fun and
					also more faster way than just reading text.`
	return (
		<div className='layout mx-auto lg:my-14 my-5 sm:px-2 xs:px-3 lg:px-5 py-3 text-center text-slate-400'>
			<ComponentHeader titlePrefix={'Interactive'} title={'Quiz'} subtitle={'Test your knowledge'} text={bio}/>
			<div className='my-8 '>

			</div>
			{selectedQuiz &&
				<div className='flex  flex-col lg:flex-row gap-10'>
					<div className='flex flex-col w-full lg:w-1/4 border p-2 border-neutral-800'>
						<h3 className='text-white text-2xl '>Categories</h3>
						<ul className='flex flex-col gap-5 mt-5'>
							{quizes.map((quiz) => (
								<li  onClick={handleCategoryChange} key={quiz.id} className='disabled flex flex-row gap-2 text-lg items-center hover:underline hover:cursor-pointer hover:text-[#ff0080]'>
									{quiz?.icon}{quiz.name} <span className=' text-end self-auto p-1 rounded-lg text-slate-600 text-sm'>{quiz.level}</span>
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
							transform hover:scale-[1.05] transition-all  hover:cursor-pointer hover:text-[#ff0080] hover:border-blue10'>
								<p className='flex flex-row text-lg justify-center items-center align-middle gap-1 text-white'>{quiz?.icon}{quiz.name} </p>
								<DifficultyBar level={quiz.difficulty}/>
								<p className='flex flex-row text-sm justify-center items-center align-middle text-slate-400'>Difficulty: {quiz?.level} </p>
							</div>
						))}
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
			<Transition appear show={isOpen} as={Fragment}>
					<Dialog as='div' className='relative z-10' onClose={closeModal}>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'>
							<div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md' />
						</Transition.Child>

						<div className='fixed inset-0 overflow-y-auto'>
							<div className='flex min-h-full items-center justify-center p-4 text-center'>
								<Transition.Child
									as={Fragment}
									enter='ease-out duration-300'
									enterFrom='opacity-0 scale-95'
									enterTo='opacity-100 scale-100'
									leave='ease-in duration-200'
									leaveFrom='opacity-100 scale-100'
									leaveTo='opacity-0 scale-95'>
									<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl   border border-neutral-700 p-6 text-left align-middle shadow-xl transition-all'>
										<Dialog.Title
											as='h3'
											className='text-lg font-medium leading-6 text-white'>
											Leave Quiz
										</Dialog.Title>
										<div className='mt-2'>
											<p className='text-sm text-slate-400'>
												By leaving this page you active quiz session will be closed.
												You confirm to leave currenct quiz and go back to quiz selector ?
											</p>
										</div>
										<div className='w-full flex flex-row-reverse  '>
										<div className='mt-4 '>
											<span className='  items-center justify-center  bg-gradient-to-r p-[2px]  from-[#7928ca] to-[#ff0080]'>
												<button
													type='button'
													className='text-end rounded-md border border-transparent  text-sm text-white p-3'
													onClick={closeModal}>
													Cancel
												</button>
												<button
													type='button'
													className='inline-flex justify-center rounded-md border border-transparent  text-sm text-white p-3'
													onClick={handleResetQuiz}>
													Confirm
												</button>
											</span>
										</div>
										</div>
								
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>

		</div>
	)
}

export default Quiz