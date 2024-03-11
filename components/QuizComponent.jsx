import React, { useState } from 'react'
import { nodeQuestions } from 'src/quizQuestions'
import { Accent } from '.'
import cslx from 'clsx'
import { generateRandomQuestionList } from 'utils/generalUtil'
import { IoReload } from "react-icons/io5";
import { Chart } from "react-google-charts";

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
	const { questions } = nodeQuestions
	const shuffledQuestions = generateRandomQuestionList(questions) //TODO: 
	const totalQuestions = questions.length
	const { question, answers, correctAnswer } = questions[activeQuestion]

	const handleAnswer = (answer, idx) => {
		setSelectedAnswerIndex(idx)
		setChecked(true)
		if (answer === correctAnswer) {
			setSelectedAnswer(true)
			console.log('Selected correct answer !!')
		} else {
			setSelectedAnswer(false)
		}
	}

	// Calculate score and increment to next question
	const handleNextQuestion = () => {
		setSelectedAnswerIndex(null)

		setResult((prev) =>
			selectedAnswer ? {
				...prev, score: prev?.score + 5,
				correctAnswers: prev?.correctAnswers + 1,
			} : {
				...prev,
				wrongAnswers: prev?.wrongAnswers + 1,

			}
		)

		if (activeQuestion !== questions.length - 1) {
			setActiveQuestion((prev) => prev + 1)
		} else {
			setActiveQuestion(0)
			setShowResult(true)
		}
		setChecked(false)
	}


	const handlePlayAgain = () => {
		debugger
		setResult({
			score: 0,
			correctAnswers: 0,
			wrongAnswers: 0
		})
		setSelectedAnswer('')
		setSelectedAnswerIndex(null)
		setActiveQuestion(0)
		setChecked(false)
		setShowResult(false)
	}
	const options = {
		title: "Popularity of Types of Pizza",
		legend: "none",
		backgroundColor: { fill:'transparent' },
		pieHole: 0.4,
		sliceVisibilityThreshold: 0.2, // 20%
		
	};

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
							<h3 className='font-bold text-center my-5 text-2xl'> {question}</h3>
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
						<div className='flex flex-row gap-5 align-middle items-center justify-between'>
							<div className='flex flex-col'>
								<h3 className='text-2xl font-bold'>Results: {result.score} points</h3>
								<h3 className='text-2xl font-bold'>Overall: {result.score / 25 * 100}%</h3>
								{/* <span className='border-3 border-b-slate-200'/> */}
								<p className='text-lg font-semibold '>Total questions answered: {totalQuestions}</p>
								<p className='text-lg font-semibold text-green-800'>Correct answers: {result.correctAnswers}</p>
								<p className='text-lg font-semibold text-red-800'>Wrong answers: {result.wrongAnswers}</p>
							</div>
							<div className='flex flex-col'>
								<Chart
									chartType="PieChart"
									data={[
										["Answers", "Number"],
										["Correct Answers", result.correctAnswers],
										["Wrong Answers", result.wrongAnswers],
									]}
									options={options}
									width={"100%"}
									height={"350px"}
								/>
							</div>
							<button className='flex flex-row justify-center items-center gap-5 px-5 align-middle border border-slate-400 py-3 hover:border-indigo-700 ' onClick={handlePlayAgain}>
								<IoReload />
								Play again

							</button>

						</div>
					}
				</div>

				{checked ? (
					<button className='border border-slate-400 py-3 hover:border-indigo-700 ' onClick={() => handleNextQuestion()}>
						{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
					</button>
				) : (!checked && !showResult) ? (<button disabled className='border border-slate-400 py-3 hover:border-indigo-700 ' onClick={handlePlayAgain}>
					{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
				</button>) : <></>}

			</div>

		</div>

	)
}

export default QuizComponent