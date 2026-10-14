import { fireEvent, render, screen, within } from '@testing-library/react'
import BlogView from '@/components/jagetic/BlogView'

vi.mock('next/router', async () => (await import('../../helpers/next-mocks')).routerMock)
vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)

const post = (slug, publishedAt, tags = [], extra = {}) => ({
	props: { data: { slug, title: `Title ${slug}`, excerpt: `Excerpt about ${slug}`, publishedAt, tags, ...extra } }
})

const js = { slug: 'js', name: 'javascript' }
const docker = { slug: 'docker', name: 'docker' }

const POSTS = [
	post('old-js', '2020-01-01', [js]),
	post('newest-docker', '2024-05-01', [docker], { featuredImage: 'https://img/x.jpg' }),
	post('mid-js', '2022-03-03', [js, docker]),
	post('draft', '2030-01-01', [js], { inPreparation: true })
]

const links = () => screen.getAllByRole('link').map((a) => a.getAttribute('href'))

describe('BlogView', () => {
	it('lists published posts newest first, featured = newest, drafts hidden', () => {
		render(<BlogView posts={POSTS} />)
		expect(links()).toEqual(['/post/newest-docker', '/post/mid-js', '/post/old-js'])
		expect(screen.queryByText('Title draft')).toBeNull()
		expect(screen.getByText('Blog · 3 posts')).toBeInTheDocument()
		expect(within(screen.getAllByRole('link')[0]).getByText('LATEST')).toBeInTheDocument()
	})

	it('accepts the raw `data` shape and plain post objects too', () => {
		render(<BlogView posts={[{ data: { slug: 'a', title: 'A', publishedAt: '2020-01-01' } }, { slug: 'b', title: 'B', publishedAt: '2021-01-01' }]} />)
		expect(links()).toEqual(['/post/b', '/post/a'])
	})

	it('builds tag pills with counts (drafts not counted), All first', () => {
		render(<BlogView posts={POSTS} />)
		const pills = screen.getAllByRole('button').map((b) => b.textContent.replace(/\s+/g, ' ').trim())
		expect(pills[0]).toBe('All 3')
		expect(pills).toContain('javascript 2')
		expect(pills).toContain('docker 2')
	})

	it('filters by search query on title and excerpt (case-insensitive)', () => {
		render(<BlogView posts={POSTS} />)
		const input = screen.getByPlaceholderText('Search posts…')
		fireEvent.change(input, { target: { value: 'MID' } })
		expect(links()).toEqual(['/post/mid-js'])
		fireEvent.change(input, { target: { value: 'excerpt about old' } })
		expect(links()).toEqual(['/post/old-js'])
	})

	it('filters by tag and the first match becomes the featured card', () => {
		render(<BlogView posts={POSTS} />)
		fireEvent.click(screen.getByRole('button', { name: /^javascript/ }))
		expect(links()).toEqual(['/post/mid-js', '/post/old-js'])
		expect(screen.getByRole('button', { name: /^javascript/ })).toHaveClass('is-on')
		fireEvent.click(screen.getByRole('button', { name: /^All/ }))
		expect(links()).toHaveLength(3)
	})

	it('combines tag and query filters', () => {
		render(<BlogView posts={POSTS} />)
		fireEvent.click(screen.getByRole('button', { name: /^docker/ }))
		fireEvent.change(screen.getByPlaceholderText('Search posts…'), { target: { value: 'old' } })
		expect(screen.queryAllByRole('link')).toHaveLength(0)
		expect(screen.getByText('Nothing more to take away.')).toBeInTheDocument()
	})

	it('shows the empty state for no posts', () => {
		render(<BlogView posts={[]} />)
		expect(screen.getByText('Nothing more to take away.')).toBeInTheDocument()
		expect(screen.getByText('Blog · 0 posts')).toBeInTheDocument()
	})

	it('falls back to "Note" for untagged posts and formats dates', () => {
		render(<BlogView posts={[post('untagged', '2023-02-01')]} />)
		expect(screen.getByText('Note')).toBeInTheDocument()
		expect(screen.getByText(/Feb 1, 2023 · 3 min/)).toBeInTheDocument()
	})

	it('caps the tag list at 8 tags + All', () => {
		const many = Array.from({ length: 12 }, (_, i) => post(`p${i}`, `2020-01-${String(i + 1).padStart(2, '0')}`, [{ slug: `t${i}`, name: `t${i}` }]))
		render(<BlogView posts={many} />)
		expect(screen.getAllByRole('button')).toHaveLength(9)
	})
})
