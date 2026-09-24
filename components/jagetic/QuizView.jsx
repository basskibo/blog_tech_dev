import React, { useState } from 'react'
import Link from 'next/link'
import { nodeQuestions, reactQuestions, mongodbQuestions, aiQuestions } from 'src/quizQuestions'

const DECKS = [...nodeQuestions, ...reactQuestions, ...mongodbQuestions, ...aiQuestions]

const GRADIENTS = {
	Nodejs: 'linear-gradient(145deg, #6ee7a8, #14783c)',
	React: 'linear-gradient(145deg, #9be7ff, #087ea4)',
	MongoDB: 'linear-gradient(145deg, #6dffb0, #00684a)',
	AI: 'linear-gradient(145deg, #ddd6fe, #38bdf8)'
}

function DeckCard ({ item, onStart }) {
	const [tilt, setTilt] = useState(null)

	const move = (event) => {
		const rect = event.currentTarget.getBoundingClientRect()
		setTilt({
			x: (event.clientX - rect.left) / rect.width - 0.5,
			y: (event.clientY - rect.top) / rect.height - 0.5
		})
	}

	return (
		<button
			type="button"
			onClick={onStart}
			onPointerMove={move}
			onPointerLeave={() => setTilt(null)}
			className="bj-card"
			style={{
				textAlign: 'left',
				padding: 32,
				borderRadius: 34,
				minHeight: 280,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				gap: 22,
				background: 'var(--bg2)',
				color: 'var(--ink)',
				position: 'relative',
				overflow: 'hidden',
				transform: tilt ? `perspective(1200px) rotateX(${-tilt.y * 8}deg) rotateY(${tilt.x * 8}deg)` : 'none',
				transition: 'transform .35s cubic-bezier(.2,.8,.2,1)'
			}}
		>
			<span style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: tilt ? `radial-gradient(320px circle at ${(tilt.x + 0.5) * 100}% ${(tilt.y + 0.5) * 100}%, rgba(255,255,255,.18), transparent 60%)` : 'transparent' }} />
			<span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
				<span className="bj-mono" style={{ fontSize: 11, fontWeight: 600, padding: '7px 11px', borderRadius: 99, background: 'var(--acc)', color: '#0b0c10' }}>{item.level}</span>
				<span className="bj-mono" style={{ fontSize: 12, color: 'var(--mut)' }}>{item.questions.length} QUESTIONS</span>
			</span>
			<span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16 }}>
				<span style={{ width: 58, height: 58, flex: 'none', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: GRADIENTS[item.name] || GRADIENTS.AI, color: '#0b1220' }}>{item.icon}</span>
				<span style={{ font: "800 42px/1 'Bricolage Grotesque',sans-serif", letterSpacing: '-.05em' }}>{item.name}</span>
			</span>
			<span style={{ display: 'flex', gap: 5, position: 'relative' }}>
				{Array.from({ length: 5 }).map((_, i) => (
					<span key={i} style={{ width: 34, height: 7, borderRadius: 4, background: i < item.difficulty ? 'var(--acc)' : 'var(--line)' }} />
				))}
			</span>
			<span style={{ color: 'var(--accT)', fontWeight: 600, position: 'relative' }}>Start →</span>
		</button>
	)
}

export default function QuizView () {
	const [deck, setDeck] = useState(null)
	const [index, setIndex] = useState(0)
	const [picked, setPicked] = useState(null)
	const [score, setScore] = useState(0)
	const [done, setDone] = useState(false)

	const start = (item) => {
		setDeck(item)
		setIndex(0)
		setPicked(null)
		setScore(0)
		setDone(false)
	}

	if (!deck) {
		return (
			<div className="bj-screen bj-in">
				<div className="bj-kicker">Quiz</div>
				<h1 className="bj-display" style={{ fontSize: 'clamp(52px, 7vw, 100px)' }}>How well do you know <span className="bj-serif">it?</span></h1>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 20, marginTop: 48 }}>
					{DECKS.map((item) => (
						<DeckCard key={item.id} item={item} onStart={() => start(item)} />
					))}
				</div>
			</div>
		)
	}

	const questions = deck.questions
	if (done) {
		return (
			<div className="bj-screen bj-in">
				<div className="bj-kicker">Quiz · {deck.name}</div>
				<div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap', padding: 'clamp(28px, 4vw, 56px)', borderRadius: 40, border: '1px solid var(--line)', background: 'var(--bg2)' }}>
					<div style={{ width: 220, height: 220, borderRadius: '50%', background: `conic-gradient(var(--acc) ${(score / questions.length) * 360}deg, var(--line) 0)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<div style={{ width: 184, height: 184, borderRadius: '50%', background: 'var(--bg2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
							<span style={{ font: "800 64px/1 'Bricolage Grotesque',sans-serif" }}>{score}<span style={{ fontSize: 26, color: 'var(--mut)' }}>/{questions.length}</span></span>
							<span className="bj-mono" style={{ fontSize: 11, color: 'var(--mut)', marginTop: 6 }}>CORRECT</span>
						</div>
					</div>
					<div>
						<div className="bj-serif" style={{ fontSize: 48, color: 'var(--ink)' }}>{score / questions.length > 0.7 ? 'Sharp.' : 'Room to take away.'}</div>
						<div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
							<button type="button" onClick={() => start(deck)} style={{ height: 52, padding: '0 26px', borderRadius: 99, border: 'none', background: 'var(--acc)', color: '#0b0c10', fontWeight: 700 }}>Try again</button>
							<button type="button" onClick={() => setDeck(null)} style={{ height: 52, padding: '0 26px', borderRadius: 99, border: '1px solid var(--line)', background: 'transparent', color: 'var(--ink)' }}>Other deck</button>
							<Link href="/routes/blog" style={{ height: 52, padding: '0 26px', borderRadius: 99, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', fontWeight: 600 }}>Read the blog →</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const question = questions[index]
	const next = () => {
		if (picked === question.correctAnswer) setScore((n) => n + 1)
		setPicked(null)
		if (index + 1 >= questions.length) setDone(true)
		else setIndex((n) => n + 1)
	}

	return (
		<div className="bj-screen bj-in">
			<div className="bj-kicker">Quiz</div>
			<h1 className="bj-display" style={{ fontSize: 'clamp(42px, 5vw, 72px)' }}>{deck.name} <span className="bj-serif">{deck.level}</span></h1>
			<div style={{ marginTop: 48, borderRadius: 40, border: '1px solid var(--line)', background: 'var(--bg2)', padding: 'clamp(28px, 4vw, 56px)' }}>
				<div style={{ display: 'flex', gap: 6, marginBottom: 30 }}>
					{questions.map((q, i) => <span key={q.id} style={{ flex: 1, height: 6, borderRadius: 3, background: i <= index ? 'var(--acc)' : 'var(--line)' }} />)}
				</div>
				<div className="bj-mono" style={{ fontSize: 12, letterSpacing: '.12em', color: 'var(--mut)' }}>{String(index + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}</div>
				<div style={{ font: "700 clamp(28px, 3vw, 42px)/1.1 'Bricolage Grotesque',sans-serif", letterSpacing: '-.035em', margin: '14px 0 30px' }}>{question.question}</div>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 12 }}>
					{question.answers.map((answer, i) => {
						const chosen = picked === answer
						const correct = picked && answer === question.correctAnswer
						const wrong = chosen && answer !== question.correctAnswer
						return (
							<button key={answer} type="button" disabled={!!picked} onClick={() => setPicked(answer)} style={{ textAlign: 'left', padding: '20px 22px', borderRadius: 22, border: `1.5px solid ${correct ? 'var(--acc)' : wrong ? 'var(--err)' : 'var(--line)'}`, background: correct ? 'color-mix(in srgb, var(--acc) 18%, transparent)' : 'transparent', color: 'var(--ink)', display: 'grid', gridTemplateColumns: '28px 1fr', gap: 8 }}>
								<span className="bj-mono" style={{ fontSize: 12, opacity: 0.7 }}>{String.fromCharCode(65 + i)}</span>
								<span>{answer}</span>
							</button>
						)
					})}
				</div>
				<div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
					{picked && <button type="button" onClick={next} style={{ height: 54, padding: '0 28px', borderRadius: 99, border: 'none', background: 'var(--inv)', color: 'var(--invInk)', fontWeight: 700, animation: 'bjIn .35s both' }}>{index + 1 === questions.length ? 'See score' : 'Next'}</button>}
					<button type="button" onClick={() => setDeck(null)} style={{ height: 54, padding: '0 22px', borderRadius: 99, border: '1px solid var(--line)', background: 'transparent', color: 'var(--mut)' }}>Change deck</button>
				</div>
			</div>
		</div>
	)
}
