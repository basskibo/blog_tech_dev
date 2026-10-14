import { act, fireEvent, render, screen } from '@testing-library/react'
import PostView from '@/components/jagetic/PostView'

vi.mock('next/router', async () => (await import('../../helpers/next-mocks')).routerMock)
vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)

const data = {
	slug: 'hello',
	title: 'Hello World',
	excerpt: 'An intro',
	publishedAt: '2023-04-05',
	read: '6 min read',
	tags: [{ slug: 'js', name: 'javascript' }]
}

describe('PostView', () => {
	beforeEach(() => {
		window.localStorage.clear()
	})

	it('renders the header, excerpt and children', () => {
		render(<PostView data={data}><p>Body text</p></PostView>)
		expect(screen.getByRole('heading', { level: 1, name: 'Hello World' })).toBeInTheDocument()
		expect(screen.getByText('An intro')).toBeInTheDocument()
		expect(screen.getByText('Body text')).toBeInTheDocument()
		expect(screen.getByText('javascript')).toBeInTheDocument()
		expect(screen.getByText('Apr 5, 2023 · 6 min read')).toBeInTheDocument()
		expect(screen.getByText('6 MIN LEFT')).toBeInTheDocument()
	})

	it('links back to the blog by default and to a custom target when given', () => {
		const { unmount } = render(<PostView data={data} />)
		expect(screen.getByText('← ALL POSTS')).toHaveAttribute('href', '/routes/blog')
		unmount()
		render(<PostView data={data} backHref="/routes/libaries" backLabel="← ALL PROJECTS" />)
		expect(screen.getByText('← ALL PROJECTS')).toHaveAttribute('href', '/routes/libaries')
	})

	it('renders the "Up next" card only when nextPost is given', () => {
		const { unmount } = render(<PostView data={data} nextPost={null} />)
		expect(screen.queryByText('Up next')).toBeNull()
		unmount()
		render(<PostView data={data} nextPost={{ slug: 'next-one', title: 'Next One', tags: [] }} />)
		expect(screen.getByText('Up next')).toBeInTheDocument()
		expect(screen.getByText('Next One').closest('a')).toHaveAttribute('href', '/post/next-one')
		expect(screen.getByText('Note')).toBeInTheDocument()
	})

	it('claps increment and persist per slug', () => {
		render(<PostView data={data} />)
		const clap = screen.getByRole('button', { name: /👏/ })
		expect(clap).toHaveTextContent('👏 0')
		fireEvent.click(clap)
		fireEvent.click(clap)
		expect(clap).toHaveTextContent('👏 2')
		expect(window.localStorage.getItem('bj-clap-hello')).toBe('2')
	})

	it('restores claps and saved state from localStorage', () => {
		window.localStorage.setItem('bj-clap-hello', '7')
		window.localStorage.setItem('bj-save-hello', '1')
		render(<PostView data={data} />)
		expect(screen.getByRole('button', { name: /👏/ })).toHaveTextContent('👏 7')
		expect(screen.getByRole('button', { name: 'Saved' })).toBeInTheDocument()
	})

	it('toggles save', () => {
		render(<PostView data={data} />)
		fireEvent.click(screen.getByRole('button', { name: 'Save' }))
		expect(window.localStorage.getItem('bj-save-hello')).toBe('1')
		fireEvent.click(screen.getByRole('button', { name: 'Saved' }))
		expect(window.localStorage.getItem('bj-save-hello')).toBe('0')
		expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
	})

	it('copies the URL and shows a toast', () => {
		const writeText = vi.fn()
		Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
		render(<PostView data={data} />)
		fireEvent.click(screen.getByRole('button', { name: 'Copy link' }))
		expect(writeText).toHaveBeenCalledWith(window.location.href)
		expect(screen.getByText('Link copied')).toBeInTheDocument()
	})

	// Regression test — fixed bug (components/jagetic/PostView.jsx:~100): the toast is set but never
	// cleared — "Link copied" stays on screen forever. Fix: clear it with a
	// setTimeout (and clean up the timer on unmount).
	it('hides the toast after a few seconds', () => {
		vi.useFakeTimers()
		try {
			render(<PostView data={data} />)
			fireEvent.click(screen.getByRole('button', { name: 'Copy link' }))
			expect(screen.getByText('Link copied')).toBeInTheDocument()
			act(() => { vi.advanceTimersByTime(10000) })
			expect(screen.queryByText('Link copied')).toBeNull()
		} finally {
			vi.useRealTimers()
		}
	})

	it('updates reading progress on scroll and removes the listener on unmount', () => {
		const remove = vi.spyOn(window, 'removeEventListener')
		const { unmount } = render(<PostView data={data} />)
		const article = document.getElementById('jag-article')
		Object.defineProperty(article, 'offsetTop', { value: 0, configurable: true })
		Object.defineProperty(article, 'offsetHeight', { value: 2000 + window.innerHeight, configurable: true })
		Object.defineProperty(window, 'scrollY', { value: 1000, configurable: true })
		fireEvent.scroll(window)
		expect(screen.getByText('50')).toBeInTheDocument()
		expect(screen.getByText('3 MIN LEFT')).toBeInTheDocument()
		unmount()
		expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
		Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
	})

	it('estimates read time when data.read is missing', () => {
		render(<PostView data={{ ...data, read: undefined }} />)
		expect(screen.getByText('Apr 5, 2023 · 3 min')).toBeInTheDocument()
	})
})
