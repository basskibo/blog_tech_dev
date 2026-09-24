import React, { useEffect, useRef } from 'react'

export default function Cursor () {
	const ringRef = useRef(null)
	const dotRef = useRef(null)

	useEffect(() => {
		const fine = window.matchMedia('(pointer: fine)').matches
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		if (!fine || reduce) return undefined

		const ring = ringRef.current
		const dot = dotRef.current
		if (!ring || !dot) return undefined

		let x = -100
		let y = -100
		let rx = -100
		let ry = -100
		let frame = 0
		document.documentElement.classList.add('bj-cursor')

		const move = (event) => {
			x = event.clientX
			y = event.clientY
			dot.style.opacity = '1'
			ring.style.opacity = '1'
		}

		const loop = () => {
			rx += (x - rx) * 0.18
			ry += (y - ry) * 0.18
			dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
			ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
			frame = requestAnimationFrame(loop)
		}

		const over = (event) => {
			const hot = event.target.closest('a, button, input, textarea, select, [role="button"]')
			ring.classList.toggle('is-hot', Boolean(hot))
		}

		window.addEventListener('mousemove', move)
		document.addEventListener('mouseover', over)
		frame = requestAnimationFrame(loop)

		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener('mousemove', move)
			document.removeEventListener('mouseover', over)
			document.documentElement.classList.remove('bj-cursor')
		}
	}, [])

	return (
		<>
			<div ref={ringRef} className="bj-cursor-ring" />
			<div ref={dotRef} className="bj-cursor-dot" />
		</>
	)
}
