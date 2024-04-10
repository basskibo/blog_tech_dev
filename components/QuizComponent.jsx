import React, { useState } from 'react'
import { nodeQuestions } from 'src/quizQuestions'
import { Accent } from '.'
import cslx from 'clsx'
// import { generateRandomQuestionList } from 'utils/generalUtil'
import { IoReload, IoWarningOutline } from "react-icons/io5";
import { Chart } from "react-google-charts";
// import { MdFullscreen } from "react-icons/md";
import { RiFullscreenFill, RiFullscreenExitLine } from "react-icons/ri";

const QuizComponent = ({ selectedQuiz }) => {
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
	const [isFullScreen, setIsFullScreen] = useState(false);
	const { questions, title, level } = nodeQuestions
	// const shuffledQuestions = generateRandomQuestionList(questions) 
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

	const toggleFullScreen = () => {
		const quizDiv = document.getElementById('quizComponent');

		if (quizDiv) {
			if (!isFullScreen) {
				if (quizDiv.requestFullscreen) {
					quizDiv.requestFullscreen();
				} else if (quizDiv.mozRequestFullScreen) {
					quizDiv.mozRequestFullScreen();
				} else if (quizDiv.webkitRequestFullscreen) {
					quizDiv.webkitRequestFullscreen();
				} else if (quizDiv.msRequestFullscreen) {
					quizDiv.msRequestFullscreen();
				}
				setIsFullScreen(true);
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
				setIsFullScreen(false);
			}
		}
	};


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


	return (
		<div className='flex w-full lg:w-3/4 h-screen justify-center content-start items-start  text-white'>
			{!selectedQuiz ? <div className='flex flex-row gap-2 justify-center items-center align-middle'>
				<IoWarningOutline size={'2rem'} />
				<h3 className='text-2xl'>Please select category of quiz you want to play</h3>
			</div>
				: <div id='quizComponent' className='flex flex-col border-2 lg:px-5 max-w-full min-w-full border-neutral-800 radius border0r p-5'>
					<div className='flex flex-row-reverse'>
						<button onClick={toggleFullScreen} className='transform hover:scale-[1.14] transition-all  hover:cursor-pointer hover:text-[#ff0080]'>
							{isFullScreen ? <RiFullscreenExitLine size={'1.5rem'} /> : <RiFullscreenFill size={'1.5rem'} />}

						</button>
					</div>
					{!showResult && <>
						<p className='text-4xl text-center font-bold'>
							<Accent>
								{title} {level} Quiz
							</Accent>
						</p>
						<span className='divider'></span>
						<div className='flex flex-col text-center text-xl'>
							<p>Questions {activeQuestion + 1}
								<span>/{totalQuestions}</span>
							</p>
						</div>
					</>
					}
					<div className='my-10'>
						{!showResult ?
							<div>
								<h3 className='font-bold text-center my-5 text-2xl'> {question}</h3>
								<div className='grid grid-cols-2 grid-rows-2 gap-5'>
									{answers.map((answer, idx) => (
										<button key={idx} onClick={() => handleAnswer(answer, idx)} className={
											cslx(
												'border border-neutral-700 py-3 text-sm hover:border-indigo-900 px-5',
												selectedAnswerIndex === idx ? 'border border-amber-900 bg-neutral-800' :
													''
											)
										} id={idx}>{answer}</button>
									))}
								</div>

							</div> :
							<Result result={result} totalQuestions={totalQuestions} handlePlayAgain={handlePlayAgain} />
						}
					</div>
					<div className='flex justify-center '>
						{checked ? (
							<button className='border w-1/2 border-slate-400  py-3 hover:border-indigo-700 ' onClick={() => handleNextQuestion()}>
								{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
							</button>
						) : (!checked && !showResult) ? (
						<button disabled className='border w-1/2 border-slate-400 disabled:text-slate-400 py-3 hover:border-indigo-700 ' onClick={handlePlayAgain}>
							{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
						</button>) : <></>}
					</div>
				</div>}


		</div>

	)
}

const Result = ({ result, totalQuestions, handlePlayAgain }) => {
	const options = {
		// title: "Popularity of Types of Pizza",
		legend: "none",
		backgroundColor: { fill: 'transparent', color: '#fff' },
		pieHole: 0.4,
		sliceVisibilityThreshold: 0.2, // 20%
	};

	const calculateScorePercentage = () => {
		const score = result.score / (totalQuestions * 5) * 100
		return score.toFixed(1)
	}

	return (
		<div className='align-middle items-center justify-between'>

			<p className='text-4xl text-center font-bold'>
				<Accent>
					Test Completed
				</Accent>
			</p>

			<span className='flex flex-col lg:flex-row justify-center align-middle items-center gap-5'>
				<div className='flex flex-col  justify-evenly items-start'>
					<h3 className='text-3xl font-bold'>Results: <Accent>{result.score} points </Accent></h3>
					<h3 className='text-3xl '>Overall:  <span className='font-bold font-3xl'>{calculateScorePercentage()}% </span></h3>
					{/* <span className='border-3 border-b-slate-200'/> */}
					<p className='text-lg  mt-2'>Total questions: <span className='font-semibold'>{totalQuestions} </span></p>
					<p className='text-lg font-semibold text-green-700'>Correct answers: {result.correctAnswers}</p>
					<p className='text-lg font-semibold text-red-700'>Wrong answers: {result.wrongAnswers}</p>
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
						height={"400px"}
					/>
				</div>
			</span>


			<div className='flex flex-row justify-around'>
				<button className='flex flex-row w-96 justify-center items-center gap-5 px-5 align-middle border border-slate-400 py-3 hover:border-indigo-700 ' onClick={handlePlayAgain}>
					<IoReload />
					Play again

				</button>
			</div>

		</div>
	)
}

export default QuizComponent