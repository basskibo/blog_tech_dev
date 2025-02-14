import React, { useState } from 'react';
import { allQuizes } from 'src/quizQuestions';
import { Accent } from '.';
import cslx from 'clsx';
import { IoWarningOutline } from "react-icons/io5";
import { RiFullscreenFill, RiFullscreenExitLine } from "react-icons/ri";
import { findById, getRandomQuestions } from 'utils/generalUtil';
import Chart from 'react-google-charts';
import { HomeIcon, RefreshIcon, ShareIcon } from '@heroicons/react/solid';

const QuizComponent = ({ selectedQuiz, setSelectedQuiz, onRequestRestart }) => {
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
	const [checked, setChecked] = useState(false);
	const [showResult, setShowResult] = useState(false);
	const [result, setResult] = useState({
		score: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
	});
	const [isFullScreen, setIsFullScreen] = useState(false);
	const { questions, name, level } = findById(allQuizes, selectedQuiz);
	const totalQuestions = 10;

	const [randomQuestions] = useState(() => getRandomQuestions(questions, totalQuestions));

	const { question, answers, correctAnswer } = randomQuestions[activeQuestion];

	const handleAnswerSelection = (idx) => {
		setSelectedAnswerIndex(idx);
		setChecked(false); // Reset checked state when selecting a new answer
	};

	const handleCheckAnswer = () => {
		if (selectedAnswerIndex === null) return; // No answer selected

		const isCorrect = answers[selectedAnswerIndex] === correctAnswer;

		setChecked(true);

		if (isCorrect) {
			setResult((prev) => ({
				...prev,
				score: prev.score + 5,
				correctAnswers: prev.correctAnswers + 1,
			}));
		} else {
			setResult((prev) => ({
				...prev,
				wrongAnswers: prev.wrongAnswers + 1,
			}));
		}
	};

	const handleNextQuestion = () => {
		setSelectedAnswerIndex(null);
		setChecked(false);

		if (activeQuestion < randomQuestions.length - 1) {
			setActiveQuestion((prev) => prev + 1);
		} else {
			setShowResult(true);
		}
	};

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

	const handlePlayAgain = () => {
		setResult({
			score: 0,
			correctAnswers: 0,
			wrongAnswers: 0,
		});
		setSelectedAnswerIndex(null);
		setActiveQuestion(0);
		setChecked(false);
		setShowResult(false);
	};

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
		<div className=' lg:my-0 my-5 sm:px-2 xs:px-3 lg:px-3  text-slate-400'>
			<div className=' px-1' >
				{!selectedQuiz ? (
					<div className='flex flex-row gap-2 justify-center items-center align-middle'>
						<IoWarningOutline size={'2rem'} />
						<h3 className='text-2xl'>Please select the category of the quiz you want to play</h3>
					</div>
				) : (
					<div id='quizComponent' className='flex flex-col border-2 space-y-2 lg:px-5 max-w-full min-w-full border-neutral-800 radius border0r p-5'>
						{!showResult &&
							<div>
								<div className='flex flex-row-reverse'>
									<button
										onClick={toggleFullScreen}
										className='transform hover:scale-[1.14] transition-all  hover:cursor-pointer hover:text-violet10'
									>
										{isFullScreen ? (
											<RiFullscreenExitLine size={'1.5rem'} />
										) : (
											<RiFullscreenFill size={'1.5rem'} />
										)}
									</button>
								</div>
								<h3 className='text-2xl'>
									{activeQuestion + 1} / {totalQuestions}
								</h3>
								<h4 className='text-2xl mb-8'>{question}</h4>
								<div className='flex flex-col gap-3'>
									{answers.map((answer, idx) => (
										<button
											key={idx}
											onClick={() => handleAnswerSelection(idx)}
											className={cslx(
												'px-3 py-4 rounded-lg border hover:bg-slate-800 transition-all',
												checked && selectedAnswerIndex === idx
													? (answers[selectedAnswerIndex] === correctAnswer ? 'bg-grass11' :
														'bg-tomato11') : !checked && selectedAnswerIndex === idx ? 'border-violet10'
														: 'border-neutral-700'
											)}
											disabled={checked} // Disable answer buttons after checking
										>
											{answer}
										</button>
									))}
								</div>
								<div className='flex flex-col'>
									<button
										onClick={checked ? handleNextQuestion : handleCheckAnswer}
										className={cslx(
											'mt-10 py-5 px-10 border border-slate-500 text-white rounded-lg hover:border-violet10  hover: hover:text-violet10',
											selectedAnswerIndex === null && !checked ? 'disabled  text-slate-500' : ''
										)}
										disabled={selectedAnswerIndex === null && !checked}
									>
										{checked ? 'Next' : 'Check'}
									</button>
									{checked && (
										<p className={`mt-2 text-lg ${checked && answers[selectedAnswerIndex] === correctAnswer ? 'text-grass11' : 'text-tomato11'}`}>
											{answers[selectedAnswerIndex] === correctAnswer ? 'Correct!' : 'Incorrect!'}
										</p>
									)}
								</div>
							</div>
						}
						{showResult && (
							<div className='flex flex-col justify-center items-center align-middle'>


								<span className='flex flex-col lg:flex-row justify-center align-middle items-center gap-5'>
									<div className='flex flex-col  justify-evenly items-start gap-2'>
										<p className='text-2xl text-left lg:text-4xl underline'>
											Your final score is <strong>{result.score}</strong> / {totalQuestions * 5} pts.
										</p>
										<h3 className='text-xl lg:text-3xl font-bold'>Results: <Accent>{result.score} points </Accent></h3>
										<h3 className='text-xl lg:text-3xl '>Overall:  <span className='font-bold font-3xl'>{calculateScorePercentage()}% </span></h3>
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
								<div className='inline-flex'>
									<div className='flex flex-row gap-2 items-center '>
										<button
											onClick={handlePlayAgain}
											className=' transform hover:scale-[1.05] transition-all  hover:cursor-pointer hover:text-[#ff0080] hover: border-none py-5 px-20'
										>
											Play Again
											<RefreshIcon />
										</button>
									</div>

									<button
										onClick={() => setSelectedQuiz(false)}
										className='transform hover:scale-[1.05] transition-all  hover:cursor-pointer hover:text-[#ff0080] hover: border-none py-5 px-20'
									>
										Go Back
										<HomeIcon />
									</button>
									{/* <button
									onClick={() => setSelectedQuiz(false)}
									className='transform hover:scale-[1.05] transition-all  hover:cursor-pointer hover:text-[#ff0080] hover: border-none py-5 px-20'
								>
									Share
									<ShareIcon />
								</button> */}
								</div>

							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default QuizComponent;
