import { fireEvent, render, screen, within } from '@testing-library/react'
import BlogView, { PAGE_SIZE } from '@/components/jagetic/BlogView'

vi.mock('next/router', async () => (await import('../../helpers/next-mocks')).routerMock)
vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)
vi.mock('next/image', async () => (await import('../../helpers/next-mocks')).imageMock)

const post = (slug, publishedAt, tags = [], extra = {}) => ({
	props: { data: { slug, title: `Title ${slug}`, excerpt: `Excerpt about ${slug}`, publishedAt, tags, ...extra } }
})

const js = { slug: 'js', name: 'javascript' }
const docker = { slug: 'docker', name: 'docker' }

const POSTS = [
	post('old-js', '2020-01-01', [js]),
	post('newest-docker', '2024-05-01', [docker], { featuredImage: 'https://images.unsplash.com/x', read: '7 min read' }),
	post('mid-js', '2022-03-03', [js, docker]),
	post('older-docker', '2019-01-01', [docker]),
	post('draft', '2030-01-01', [js], { inPreparation: true })
]

// n published posts, newest first by slug index.
const many = (n) => Array.from({ length: n }, (_, i) => post(`p${i}`, new Date(Date.UTC(2025, 0, n - i)).toISOString().slice(0, 10), [js]))

const search = () => screen.getByRole('textbox', { name: 'Search posts' })
const tab = (name) => within(screen.getByRole('group', { name: /filter posts by topic/i })).getByRole('button', { name: new RegExp(`^${name}`) })
const hrefs = (el) => [...el.querySelectorAll('a.post-card')].map((a) => a.getAttribute('href'))
const top = () => screen.queryByRole('region', { name: 'Latest posts' })

describe('BlogView', () => {
	it('shows the heading, the post and topic counts, and hides drafts', () => {
		render(<BlogView posts={POSTS} />)
		expect(screen.getByRole('heading', { level: 1, name: 'The blog' })).toBeInTheDocument()
		const stats = screen.getByText('Posts').closest('dl')
		expect(within(stats).getByText('4')).toBeInTheDocument()
		expect(within(stats).getByText('2')).toBeInTheDocument()
		expect(screen.queryByText('Title draft')).toBeNull()
	})

	it('puts the three newest posts on top, the first one big, and the rest below', () => {
		const { container } = render(<BlogView posts={POSTS} />)
		expect(hrefs(top())).toEqual(['/post/newest-docker', '/post/mid-js', '/post/old-js'])
		expect(top().querySelector('a.post-card').classList.contains('is-big')).toBe(true)
		expect(within(top()).getByText('Excerpt about newest-docker')).toBeInTheDocument()
		const more = screen.getByRole('region', { name: 'More posts' })
		expect(hrefs(more)).toEqual(['/post/older-docker'])
		expect(container.querySelectorAll('a.post-card')).toHaveLength(4)
	})

	it('uses the real reading time when the page passes it, and an estimate otherwise', () => {
		render(<BlogView posts={POSTS} />)
		expect(within(top()).getByText('7 min read')).toBeInTheDocument()
		const midCard = screen.getByRole('link', { name: /Title mid-js/ })
		expect(midCard.querySelector('.post-card-meta').textContent).toMatch(/min/)
	})

	it('builds topic tabs with counts, All first and pressed, capped at 8 + All', () => {
		const tags = Array.from({ length: 10 }, (_, i) => ({ slug: `t${i}`, name: `tag${i}` }))
		render(<BlogView posts={[post('a', '2024-01-01', tags), ...POSTS]} />)
		const buttons = within(screen.getByRole('group', { name: /filter posts by topic/i })).getAllByRole('button')
		expect(buttons).toHaveLength(9)
		expect(buttons[0]).toHaveTextContent(/^All\s*5$/)
		expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')
	})

	it('filtering skips the top section and shows a result count', () => {
		render(<BlogView posts={POSTS} />)
		fireEvent.click(tab('javascript'))
		expect(tab('javascript')).toHaveAttribute('aria-pressed', 'true')
		expect(top()).toBeNull()
		expect(screen.getByRole('status')).toHaveTextContent('2 posts in javascript')
		expect(hrefs(screen.getByRole('region', { name: 'Results' }))).toEqual(['/post/mid-js', '/post/old-js'])
	})

	it('searches title and excerpt, case-insensitively, and combines with the topic', () => {
		render(<BlogView posts={POSTS} />)
		fireEvent.change(search(), { target: { value: 'EXCERPT ABOUT OLD' } })
		expect(screen.getByRole('status')).toHaveTextContent('2 posts matching “EXCERPT ABOUT OLD”')
		fireEvent.click(tab('docker'))
		expect(hrefs(screen.getByRole('region', { name: 'Results' }))).toEqual(['/post/older-docker'])
		expect(screen.getByRole('status')).toHaveTextContent('1 post in docker')
	})

	it('clears the search with its button', () => {
		render(<BlogView posts={POSTS} />)
		fireEvent.change(search(), { target: { value: 'mid' } })
		fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
		expect(search()).toHaveValue('')
		expect(top()).not.toBeNull()
	})

	it('shows an empty state that resets both filters', () => {
		render(<BlogView posts={POSTS} />)
		fireEvent.click(tab('docker'))
		fireEvent.change(search(), { target: { value: 'nothing like this' } })
		expect(screen.getByText(/No posts match/)).toHaveTextContent('No posts match “nothing like this” in docker.')
		fireEvent.click(screen.getByRole('button', { name: 'Show all posts' }))
		expect(search()).toHaveValue('')
		expect(tab('All')).toHaveAttribute('aria-pressed', 'true')
		expect(top()).not.toBeNull()
	})

	it('shows posts below the top in pages, with a "Show more" button', () => {
		const n = 3 + PAGE_SIZE + 5
		const { container } = render(<BlogView posts={many(n)} />)
		const more = () => screen.getByRole('region', { name: 'More posts' })
		expect(hrefs(more())).toHaveLength(PAGE_SIZE)
		const button = screen.getByRole('button', { name: /Show more posts/ })
		expect(button).toHaveTextContent('5 left')
		fireEvent.click(button)
		expect(hrefs(more())).toHaveLength(PAGE_SIZE + 5)
		expect(screen.queryByRole('button', { name: /Show more posts/ })).toBeNull()
		expect(container.querySelectorAll('a.post-card')).toHaveLength(n)
	})

	it('changing the topic resets the page size', () => {
		render(<BlogView posts={many(3 + PAGE_SIZE * 2)} />)
		fireEvent.click(screen.getByRole('button', { name: /Show more posts/ }))
		fireEvent.click(tab('javascript'))
		expect(hrefs(screen.getByRole('region', { name: 'Results' }))).toHaveLength(PAGE_SIZE)
	})

	it('renders the empty state for no posts at all', () => {
		render(<BlogView posts={[]} />)
		expect(screen.getByText(/No posts match/)).toBeInTheDocument()
	})
})
