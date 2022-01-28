import React, { useState, useRef, useEffect } from "react"
import { Switch } from "@headlessui/react"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "#0f172a",
	border: "2px solid #000",
	color: "white",
	boxShadow: 24,
	p: 4,
}

import { submitComment } from "../services"

const CommentsForm = ({ slug }) => {
	const [error, setError] = useState(false)
	const [localStorage, setLocalStorage] = useState(null)
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)
	const [checked, setEnabled] = useState(false)

	const commentEl = useRef()
	const nameEl = useRef()
	const emailEl = useRef()
	const storeDataEl = useRef()

	useEffect(() => {
		nameEl.current.value = window.localStorage.getItem("name")
		emailEl.current.value = window.localStorage.getItem("email")
	}, [])

	const handleCommentSubmition = () => {
		console.log("Handling button click!!")
		setError(false)
		setShowSuccessMessage(false)
		const { value: comment } = commentEl.current
		const { value: name } = nameEl.current
		const { value: email } = emailEl.current

		if (!comment || !name || !email) {
			setError(true)

			return
		}
		const commentObj = {
			name,
			email,
			comment,
			slug,
		}

		if (checked) {
			window.localStorage.setItem("email", email)
			window.localStorage.setItem("name", name)
		} else {
			window.localStorage.removeItem("name", name)
			window.localStorage.removeItem("email", email)
		}

		submitComment(commentObj).then((res) => {
			setShowSuccessMessage(true)
			commentEl.current.value = ""
			emailEl.current.value = ""
			nameEl.current.value = ""
			setTimeout(() => {
				setShowSuccessMessage(false)
			}, 10000)
		})
	}
	return (
		<div className='bg-slate-900 shadow-lg rounded-lg p-8 pb-12 mb-8'>
			<h3 className='text-xl mb-8 text-white font-semibold border-b pb-4'>
				Leave you comment
			</h3>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
				<input
					type='text'
					ref={nameEl}
					className='py-2 p-4 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-slate-700'
					placeholder='Name'
					name='name'
				/>
				<input
					type='text'
					ref={emailEl}
					className='py-2 p-4 mt-2 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-slate-700'
					placeholder='Email'
					name='email'
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<textarea
					ref={commentEl}
					className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-slate-700'
					placeholder='Comment'
					name='comment'
				></textarea>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2  mb-4 ml-1'>
				<div>
					<Switch
						checked={checked}
						onChange={setEnabled}
						ref={storeDataEl}
						className={`${
							checked ? "bg-sky-800" : "bg-slate-400"
						} relative inline-flex items-center h-4 rounded-full w-11`}
					>
						<span className='sr-only'>Enable notifications</span>
						<span
							className={`${
								checked ? "translate-x-6" : "translate-x-1"
							} inline-block w-3 h-3  bg-white rounded-full`}
						/>
					</Switch>
					<label className='text-white pl-2 text-sm w-full' htmlFor='storeData'>
						Remember my name and email for next time I comment
					</label>
				</div>
			</div>
			{error && <p className='text-lg text-red-500'>*All fields are required</p>}
			{showSuccessMessage && (
				<p className='text-lg text-green-500'>
					Your comment was successfully submitted , please wait while admin approves
					it.
				</p>
			)}
			<div className='mt-8'>
				<button onClick={handleCommentSubmition}>
					<a className='inline-flex  hover:text-sky-800 hover:cursor-pointer text-slate-400 hover:text-semibold'>
						<span className='h-12 flex items-center mt-3 justify-center uppercase font-semibold px-5 border-2 border-sky-800'>
							Submit
						</span>
						<span className='h-12 flex items-center mt-3 justify-center uppercase font-semibold px-2 border-2 border-sky-800 '>
							<svg
								className='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
									clipRule='evenodd'
								></path>
							</svg>
						</span>
					</a>
				</button>
			</div>
		</div>
	)
}

export default CommentsForm
