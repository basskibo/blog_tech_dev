import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Cursor () {
	const ringRef = useRef(null)
	const dotRef = useRef(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (!mounted) return undefined
		const fine = window.matchMedia('(pointer: fine)').matches
		if (!fine) return undefined

		const ring = ringRef.current
		const dot = dotRef.current
		if (!ring || !dot) return undefined

		let x = -100
		let y = -100
		let rx = -100
		let ry = -100
		let frame = 0
		document.documentElement.classList.add('bj-cursor')

		// The loop only runs while the ring is catching up, then sleeps until the next move.
		const loop = () => {
			rx += (x - rx) * 0.18
			ry += (y - ry) * 0.18
			dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
			ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
			frame = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(loop) : 0
		}

		const move = (event) => {
			x = event.clientX
			y = event.clientY
			dot.style.opacity = '1'
			ring.style.opacity = '1'
			if (!frame) frame = requestAnimationFrame(loop)
		}

		const over = (event) => {
			const hot = event.target.closest('a, button, input, textarea, select, [role="button"]')
			ring.classList.toggle('is-hot', Boolean(hot))
		}

		window.addEventListener('mousemove', move, { passive: true })
		document.addEventListener('mouseover', over, { passive: true })

		return () => {
			cancelAnimationFrame(frame)
			window.removeEventListener('mousemove', move)
			document.removeEventListener('mouseover', over)
			document.documentElement.classList.remove('bj-cursor')
		}
	}, [mounted])

	if (!mounted) return null

	return createPortal(
		<>
			<div ref={ringRef} className="bj-cursor-ring" />
			<div ref={dotRef} className="bj-cursor-dot" />
		</>,
		document.body
	)
}
