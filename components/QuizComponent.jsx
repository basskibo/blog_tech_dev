import React, { useState } from 'react'
import { quizQuestions } from 'src/quizQuestions'
import { Accent } from '.'
import cslx from 'clsx'
import { generateRandomQuestionList } from 'utils/generalUtil'

const QuizComponent = () => {
	const [activeQuestion, setActiveQuestion] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState('')
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
	const [checked, setChecked] = useState(false)
	const [showResult, setShowResult] = useState(false)
	const [result, setResult] = useState({
		score: 0,
		correctAnswers: 0,
		wrongAnswers: 0
	})
	const { questions } = quizQuestions
	const shuffledQuestions = generateRandomQuestionList(questions) //TODO: 
	const totalQuestions = questions.length
	const { question, answers, correctAnswer } = questions[activeQuestion]

	const handleAnswer = (answer, idx ) => {
		setSelectedAnswerIndex(idx)
		setChecked(true)
		if(answer === correctAnswer){
			setSelectedAnswer(true)
			console.log('Selected correct answer !!')
		}else{
			setSelectedAnswer(false)
		}
	}
	
	const handleNextQuestion = () => {
		if(activeQuestion !== questions.length - 1){
			setActiveQuestion(activeQuestion + 1)
			setSelectedAnswerIndex(null)
		}else{
			setShowResult(true)
		}
	
	}
	return (
		<div className='flex w-full h-screen justify-center content-start items-start mx-auto lg:px-12 text-white'>
			<div className='flex flex-col border-2 px-10 max-w-full min-w-full border-neutral-800 radius border0r p-5'>
				<p className='text-4xl text-center font-bold'>
					<Accent>
						Quiz game
					</Accent>
				</p>
				<span className='divider'></span>
				<div className='flex flex-col text-center text-xl'>
					<p>Questions {activeQuestion + 1}
						<span>/{totalQuestions}</span>
					</p>
				</div>
				<div className='my-10'>
					{!showResult ?
						<div>
							<h3 className='font-bold text-center my-5 text-2xl'> {questions[activeQuestion].question}</h3>
							<div className='flex flex-col gap-5'>
								{answers.map((answer, idx) => (
									<button onClick={() => handleAnswer(answer, idx)} className={
										cslx(
											'border border-neutral-700 py-3  hover:border-indigo-900 px-5',
											selectedAnswerIndex === idx ? 'border border-amber-900 bg-neutral-800' :
									''
										)
									} id={idx}>{answer}</button>
								))}
							</div>
						
						</div>
						:
						<div>test</div>
					}
				</div>
				{checked && !showResult ? (
					<button className='border border-slate-400 py-3 hover:border-indigo-700 ' onClick={() => handleNextQuestion()}>
					{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
				</button>
				): (<button disabled className='border border-slate-400 py-3 hover:border-indigo-700 ' onClick={() => handleNextQuestion()}>
				Play Again
			</button>)}
				
			</div>

		</div>

	)
}

export default QuizComponent