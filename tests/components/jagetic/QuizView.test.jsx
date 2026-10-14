// @vitest-environment node
// Runs in node + hand-installed jsdom: see tests/helpers/manual-dom.js.
import { fireEvent, render, within } from '@testing-library/react'
import { installDom } from '../../helpers/manual-dom'

installDom()
const screen = within(document.body)

vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)
// QuizView imports the bare 'src/quizQuestions' (jsconfig baseUrl); use small
// deterministic decks instead of the real banks.
vi.mock('src/quizQuestions', () => {
	const icon = <svg data-testid="deck-icon" />
	const q = (id, question, answers, correctAnswer) => ({ id, question, answers, correctAnswer })
	return {
		nodeQuestions: [{
			id: 'node', name: 'Nodejs', icon, level: 'Junior', difficulty: 2,
			questions: [
				q(1, 'What is Node?', ['A runtime', 'A browser'], 'A runtime'),
				q(2, 'npm stands for?', ['Node package manager', 'Nice pear mango'], 'Node package manager'),
				q(3, 'Event loop is?', ['Single threaded', 'Magic'], 'Single threaded')
			]
		}],
		reactQuestions: [{ id: 'react', name: 'React', icon, level: 'Senior', difficulty: 5, questions: [q(1, 'JSX is?', ['Syntax', 'DB'], 'Syntax')] }],
		mongodbQuestions: [],
		aiQuestions: []
	}
})

const { default: QuizView } = await import('@/components/jagetic/QuizView')

const startNode = () => fireEvent.click(screen.getByRole('button', { name: /Nodejs/ }))

describe('QuizView', () => {
	it('lists every deck with level, question count and difficulty', () => {
		render(<QuizView />)
		expect(screen.getByRole('button', { name: /Nodejs/ })).toHaveTextContent('Junior')
		expect(screen.getByRole('button', { name: /Nodejs/ })).toHaveTextContent('3 QUESTIONS')
		expect(screen.getByRole('button', { name: /React/ })).toHaveTextContent('1 QUESTIONS')
	})

	it('starts a deck at question 1', () => {
		render(<QuizView />)
		startNode()
		expect(screen.getByText('What is Node?')).toBeInTheDocument()
		expect(screen.getByText('01 / 03')).toBeInTheDocument()
		expect(screen.queryByRole('button', { name: 'Next' })).toBeNull()
	})

	it('locks answers after picking and reveals Next', () => {
		render(<QuizView />)
		startNode()
		fireEvent.click(screen.getByRole('button', { name: /A browser/ }))
		expect(screen.getByRole('button', { name: /A runtime/ })).toBeDisabled()
		expect(screen.getByRole('button', { name: /A browser/ })).toBeDisabled()
		expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
	})

	it('scores correct answers and shows the result screen', () => {
		render(<QuizView />)
		startNode()
		fireEvent.click(screen.getByRole('button', { name: /A runtime/ }))
		fireEvent.click(screen.getByRole('button', { name: 'Next' }))
		expect(screen.getByText('02 / 03')).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: /Nice pear mango/ }))
		fireEvent.click(screen.getByRole('button', { name: 'Next' }))
		fireEvent.click(screen.getByRole('button', { name: /Single threaded/ }))
		fireEvent.click(screen.getByRole('button', { name: 'See score' }))
		expect(screen.getByText('CORRECT')).toBeInTheDocument()
		expect(screen.getByText('/3').parentElement).toHaveTextContent('2/3')
		expect(screen.getByText('Room to take away.')).toBeInTheDocument()
	})

	it('says "Sharp." for a perfect score and "Try again" restarts at 0', () => {
		render(<QuizView />)
		fireEvent.click(screen.getByRole('button', { name: /React/ }))
		fireEvent.click(screen.getByRole('button', { name: /Syntax/ }))
		fireEvent.click(screen.getByRole('button', { name: 'See score' }))
		expect(screen.getByText('Sharp.')).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: 'Try again' }))
		expect(screen.getByText('JSX is?')).toBeInTheDocument()
		expect(screen.getByText('01 / 01')).toBeInTheDocument()
	})

	it('"Change deck" and "Other deck" return to the deck list', () => {
		render(<QuizView />)
		startNode()
		fireEvent.click(screen.getByRole('button', { name: 'Change deck' }))
		expect(screen.getByText(/How well do you know/)).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: /React/ }))
		fireEvent.click(screen.getByRole('button', { name: /Syntax/ }))
		fireEvent.click(screen.getByRole('button', { name: 'See score' }))
		expect(screen.getByText('Read the blog →')).toHaveAttribute('href', '/routes/blog')
		fireEvent.click(screen.getByRole('button', { name: 'Other deck' }))
		expect(screen.getByText(/How well do you know/)).toBeInTheDocument()
	})

	it('tilts a deck card on pointer move and resets on leave', () => {
		render(<QuizView />)
		const card = screen.getByRole('button', { name: /Nodejs/ })
		card.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100 })
		fireEvent.pointerMove(card, { clientX: 100, clientY: 0 })
		expect(card.style.transform).toContain('rotateY(4deg)')
		fireEvent.pointerLeave(card)
		expect(card.style.transform).toBe('none')
	})
})

describe('QuizView with the real question banks', () => {
	it('every real deck question has its correct answer among the options', async () => {
		const real = await vi.importActual('src/quizQuestions')
		const decks = [...real.nodeQuestions, ...real.reactQuestions, ...real.mongodbQuestions, ...real.aiQuestions]
		expect(decks.length).toBeGreaterThan(0)
		const problems = []
		for (const deck of decks) {
			const ids = new Set()
			for (const q of deck.questions) {
				if (!q.answers.includes(q.correctAnswer)) problems.push(`${deck.id}#${q.id}: correct answer not in options`)
				if (new Set(q.answers).size !== q.answers.length) problems.push(`${deck.id}#${q.id}: duplicate answers (React keys collide)`)
				if (ids.has(q.id)) problems.push(`${deck.id}#${q.id}: duplicate question id`)
				ids.add(q.id)
			}
		}
		expect(problems).toEqual([])
	})
})
