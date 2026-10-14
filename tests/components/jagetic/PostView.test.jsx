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
	let writeText

	beforeEach(() => {
		writeText = vi.fn()
		Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('renders the header, excerpt and children', () => {
		const { container } = render(<PostView data={data}><p>Body text</p></PostView>)
		expect(screen.getByRole('heading', { level: 1, name: 'Hello World' })).toBeInTheDocument()
		expect(screen.getByText('Bojan Jagetić')).toBeInTheDocument()
		const time = container.querySelector('time')
		expect(time).toHaveAttribute('dateTime', '2023-04-05')
		expect(time).toHaveTextContent('Apr 5, 2023')
		expect(screen.getByText('6 min read')).toBeInTheDocument()
		expect(screen.getByText('javascript')).toBeInTheDocument()
		expect(screen.getByText('An intro')).toBeInTheDocument()
		expect(screen.getByText('Body text').closest('article')).toHaveAttribute('id', 'jag-article')
	})

	it('omits the date, excerpt and figure when they are missing and falls back to "Note"', () => {
		const { container } = render(<PostView data={{ slug: 'bare', title: 'Bare', tags: [] }} />)
		expect(container.querySelector('time')).toBeNull()
		expect(container.querySelector('.post-excerpt')).toBeNull()
		expect(container.querySelector('figure')).toBeNull()
		expect(screen.getByText('Note')).toBeInTheDocument()
	})

	it('renders the featured image in a figure', () => {
		const { container } = render(<PostView data={{ ...data, featuredImage: 'https://img/cover.jpg' }} />)
		expect(container.querySelector('figure img')).toHaveAttribute('src', 'https://img/cover.jpg')
	})

	it('links back to the blog by default and to a custom target when given', () => {
		const { unmount } = render(<PostView data={data} />)
		expect(screen.getByRole('link', { name: 'All posts' })).toHaveAttribute('href', '/routes/blog')
		unmount()
		render(<PostView data={data} backHref="/routes/libaries" backLabel="All libraries" />)
		expect(screen.getByRole('link', { name: 'All libraries' })).toHaveAttribute('href', '/routes/libaries')
	})

	it('renders the "Read next" link only when nextPost is given', () => {
		const { unmount } = render(<PostView data={data} nextPost={null} />)
		expect(screen.queryByText('Read next')).toBeNull()
		unmount()
		const { container } = render(<PostView data={data} nextPost={{ slug: 'next-one', title: 'Next One', featuredImage: 'https://img/n.jpg' }} />)
		const next = screen.getByRole('link', { name: /read next/i })
		expect(next).toHaveAttribute('href', '/post/next-one')
		expect(next).toHaveTextContent('Next One')
		expect(container.querySelector('.next-post img')).toHaveAttribute('src', 'https://img/n.jpg')
	})

	it('copies the URL and shows a status toast', () => {
		render(<PostView data={data} />)
		expect(screen.queryByRole('status')).toBeNull()
		fireEvent.click(screen.getByRole('button', { name: 'Copy link' }))
		expect(writeText).toHaveBeenCalledWith(window.location.href)
		expect(screen.getByRole('status')).toHaveTextContent('Link copied')
	})

	it('hides the toast after 2.4 seconds', () => {
		vi.useFakeTimers()
		render(<PostView data={data} />)
		fireEvent.click(screen.getByRole('button', { name: 'Copy link' }))
		act(() => { vi.advanceTimersByTime(2399) })
		expect(screen.getByRole('status')).toHaveTextContent('Link copied')
		act(() => { vi.advanceTimersByTime(1) })
		expect(screen.queryByRole('status')).toBeNull()
	})

	it('still shows the toast when the clipboard API is unavailable', () => {
		Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
		render(<PostView data={data} />)
		fireEvent.click(screen.getByRole('button', { name: 'Copy link' }))
		expect(screen.getByRole('status')).toHaveTextContent('Link copied')
	})

	it('estimates read time when data.read is missing', () => {
		render(<PostView data={{ ...data, read: undefined }} />)
		expect(screen.getByText('3 min')).toBeInTheDocument()
	})
})
