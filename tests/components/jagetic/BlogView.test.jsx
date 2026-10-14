import { fireEvent, render, screen, within } from '@testing-library/react'
import BlogView from '@/components/jagetic/BlogView'

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
	post('newest-docker', '2024-05-01', [docker], { featuredImage: 'https://img/x.jpg' }),
	post('mid-js', '2022-03-03', [js, docker]),
	post('draft', '2030-01-01', [js], { inPreparation: true })
]

const links = () => screen.queryAllByRole('link').map((a) => a.getAttribute('href'))
const search = () => screen.getByRole('textbox', { name: 'Search posts' })
const tab = (name) => within(screen.getByRole('group', { name: /filter posts by tag/i })).getByRole('button', { name: new RegExp(`^${name}`) })
const leadPost = (container) => container.querySelector('.post-grid > a.post-card.is-big')
const cards = (container) => [...container.querySelectorAll('.post-grid > a.post-card')]

describe('BlogView', () => {
	it('lists published posts newest first, lead = newest, drafts hidden', () => {
		const { container } = render(<BlogView posts={POSTS} />)
		expect(links()).toEqual(['/post/newest-docker', '/post/mid-js', '/post/old-js'])
		expect(screen.queryByText('Title draft')).toBeNull()
		const h1 = screen.getByRole('heading', { level: 1, name: 'The blog' })
		expect(h1.querySelector('span')).toHaveTextContent('blog')
		expect(screen.getByText(/^3 posts on/)).toBeInTheDocument()

		const all = cards(container)
		expect(all.map((a) => a.getAttribute('href'))).toEqual(['/post/newest-docker', '/post/mid-js', '/post/old-js'])
		expect(all.map((a) => a.classList.contains('is-big'))).toEqual([true, false, false])

		const lead = leadPost(container)
		expect(lead).toBe(all[0])
		expect(within(lead).getByText('Title newest-docker')).toBeInTheDocument()
		expect(within(lead).getByText('Excerpt about newest-docker')).toBeInTheDocument()
		expect(within(lead).getByText('docker')).toHaveClass('post-card-tag')
		expect(lead.querySelector('img')).toHaveAttribute('src', 'https://img/x.jpg')

		// Only the big card shows its excerpt.
		expect(within(all[1]).queryByText('Excerpt about mid-js')).toBeNull()
		expect(within(all[1]).getByText('javascript')).toBeInTheDocument()
	})

	it('accepts the raw `data` shape and plain post objects too', () => {
		render(<BlogView posts={[{ data: { slug: 'a', title: 'A', publishedAt: '2020-01-01' } }, { slug: 'b', title: 'B', publishedAt: '2021-01-01' }]} />)
		expect(links()).toEqual(['/post/b', '/post/a'])
	})

	it('builds tag tabs with counts (drafts not counted), All first and pressed', () => {
		render(<BlogView posts={POSTS} />)
		const tabs = within(screen.getByRole('group', { name: /filter posts by tag/i })).getAllByRole('button')
		const labels = tabs.map((b) => b.textContent.replace(/\s+/g, ' ').trim())
		expect(labels[0]).toBe('All 3')
		expect(labels).toContain('javascript 2')
		expect(labels).toContain('docker 2')
		expect(tabs[0]).toHaveAttribute('aria-pressed', 'true')
		expect(tabs.slice(1).every((b) => b.getAttribute('aria-pressed') === 'false')).toBe(true)
	})

	it('filters by search query on title and excerpt (case-insensitive)', () => {
		render(<BlogView posts={POSTS} />)
		fireEvent.change(search(), { target: { value: 'MID' } })
		expect(links()).toEqual(['/post/mid-js'])
		fireEvent.change(search(), { target: { value: 'excerpt about old' } })
		expect(links()).toEqual(['/post/old-js'])
	})

	it('filters by tag and the first match becomes the lead post', () => {
		const { container } = render(<BlogView posts={POSTS} />)
		fireEvent.click(tab('javascript'))
		expect(links()).toEqual(['/post/mid-js', '/post/old-js'])
		expect(leadPost(container)).toHaveAttribute('href', '/post/mid-js')
		expect(tab('javascript')).toHaveAttribute('aria-pressed', 'true')
		expect(tab('All')).toHaveAttribute('aria-pressed', 'false')
		fireEvent.click(tab('All'))
		expect(links()).toHaveLength(3)
	})

	it('renders only the lead post when a single post matches', () => {
		const { container } = render(<BlogView posts={POSTS} />)
		fireEvent.change(search(), { target: { value: 'newest' } })
		expect(leadPost(container)).toHaveAttribute('href', '/post/newest-docker')
		expect(cards(container)).toHaveLength(1)
	})

	it('combines tag and query filters, and "Show all posts" resets both', () => {
		render(<BlogView posts={POSTS} />)
		fireEvent.click(tab('docker'))
		fireEvent.change(search(), { target: { value: 'old' } })
		expect(links()).toHaveLength(0)
		expect(screen.getByText(/No posts match/)).toHaveTextContent('No posts match “old” in docker.')

		fireEvent.click(screen.getByRole('button', { name: 'Show all posts' }))
		expect(search()).toHaveValue('')
		expect(tab('All')).toHaveAttribute('aria-pressed', 'true')
		expect(links()).toHaveLength(3)
		expect(screen.queryByRole('button', { name: 'Show all posts' })).toBeNull()
	})

	it('omits the tag from the empty message when filtering only by query', () => {
		render(<BlogView posts={POSTS} />)
		fireEvent.change(search(), { target: { value: 'zzz' } })
		expect(screen.getByText(/No posts match/)).toHaveTextContent('No posts match “zzz”.')
	})

	it('shows the empty state for no posts', () => {
		render(<BlogView posts={[]} />)
		expect(screen.getByText(/^0 posts on/)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Show all posts' })).toBeInTheDocument()
		expect(links()).toHaveLength(0)
	})

	it('falls back to "Note" for untagged posts and formats the lead date with an estimated read time', () => {
		const { container } = render(<BlogView posts={[post('untagged', '2023-02-01')]} />)
		expect(screen.getByText('Note')).toBeInTheDocument()
		const time = container.querySelector('time')
		expect(time).toHaveAttribute('dateTime', '2023-02-01')
		expect(time).toHaveTextContent('Feb 1, 2023')
		expect(time.parentElement).toHaveClass('post-card-meta')
		expect(within(time.parentElement).getByText('3 min')).toBeInTheDocument()
	})

	it('shows an estimated read time on every card', () => {
		const { container } = render(<BlogView posts={POSTS} />)
		const all = cards(container)
		expect(all).toHaveLength(3)
		for (const card of all) expect(card.querySelector('.post-card-meta')).toHaveTextContent('3 min')
	})

	it('caps the tag list at 8 tags + All', () => {
		const many = Array.from({ length: 12 }, (_, i) => post(`p${i}`, `2020-01-${String(i + 1).padStart(2, '0')}`, [{ slug: `t${i}`, name: `t${i}` }]))
		render(<BlogView posts={many} />)
		expect(within(screen.getByRole('group', { name: /filter posts by tag/i })).getAllByRole('button')).toHaveLength(9)
	})
})
