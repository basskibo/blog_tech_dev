import React from 'react'
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import projects from '@/lib/projects'

const route = vi.hoisted(() => ({ asPath: '/' }))

vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)
vi.mock('next/router', async () => {
	const { push } = await import('../../helpers/next-mocks')
	return { useRouter: () => ({ asPath: route.asPath, pathname: route.asPath, query: {}, push, events: { on: vi.fn(), off: vi.fn() } }) }
})

const { push } = await import('../../helpers/next-mocks')
const { default: Shell, NAV, isActive, searchResults } = await import('../../../components/jagetic/Shell')

const POSTS = Array.from({ length: 10 }, (_, i) => ({ slug: `post-${i}`, title: `Docker tip ${i}`, excerpt: `Excerpt ${i}`, tag: i === 0 ? 'docker' : undefined }))

describe('NAV', () => {
	it('lists the main pages in order', () => {
		expect(NAV.map((n) => n.label)).toEqual(['Home', 'Projects', 'Blog', 'Libraries', 'About'])
		expect(NAV[0].href).toBe('/')
	})
})

describe('isActive', () => {
	it('matches home only on the exact root', () => {
		expect(isActive('/', '/')).toBe(true)
		expect(isActive('/', '/routes/blog')).toBe(false)
		expect(isActive('/', '/?x=1')).toBe(true)
		expect(isActive('/', '')).toBe(true)
		expect(isActive('/', undefined)).toBe(true)
	})

	it('matches other routes by path segment prefix', () => {
		expect(isActive('/routes/blog', '/routes/blog')).toBe(true)
		expect(isActive('/routes/blog', '/routes/blog/page-2')).toBe(true)
		expect(isActive('/routes/blog', '/routes/blogroll')).toBe(false)
		expect(isActive('/routes/blog', '/routes/projects')).toBe(false)
	})

	it('ignores the query string and hash', () => {
		expect(isActive('/routes/blog', '/routes/blog?tag=js')).toBe(true)
		expect(isActive('/routes/blog', '/routes/blog#top')).toBe(true)
		expect(isActive('/routes/blogx', '/routes/blog?x=/routes/blogx')).toBe(false)
	})
})

describe('searchResults', () => {
	it('returns every page and the first 8 posts for an empty query, but no projects', () => {
		const results = searchResults('', POSTS)
		expect(results.filter((r) => r.group === 'Pages').map((r) => r.label)).toEqual(NAV.map((n) => n.label))
		expect(results.filter((r) => r.group === 'Projects')).toEqual([])
		const posts = results.filter((r) => r.group === 'Posts')
		expect(posts).toHaveLength(8)
		expect(posts[0]).toEqual({ href: '/post/post-0', label: 'Docker tip 0', sub: 'docker', group: 'Posts' })
		expect(posts[1].sub).toBe('Post')
	})

	it('groups results as pages, then projects, then posts', () => {
		const groups = searchResults('', POSTS).map((r) => r.group)
		const order = [...new Set(groups)]
		expect(order).toEqual(['Pages', 'Posts'])
		const name = projects[0].name
		const mixed = searchResults(name.slice(0, 4), [{ slug: 's', title: `About ${name}` }]).map((r) => r.group)
		expect([...new Set(mixed)]).toEqual(['Projects', 'Posts'])
	})

	it('matches projects by name or tagline, case-insensitively, and links to the projects page', () => {
		const p = projects.find((x) => x.slug === 'coinsel')
		const results = searchResults('  COINSEL ', [])
		const work = results.filter((r) => r.group === 'Projects')
		expect(work).toEqual([{ href: '/routes/projects', label: p.name, sub: p.tagline, group: 'Projects' }])
		expect(results.filter((r) => r.group === 'Pages')).toEqual([])
	})

	it('caps projects at 5', () => {
		const work = searchResults('a', []).filter((r) => r.group === 'Projects')
		expect(work.length).toBeLessThanOrEqual(5)
		expect(work.length).toBeGreaterThan(0)
	})

	it('filters pages by label and posts by title or excerpt', () => {
		expect(searchResults('blog', []).map((r) => r.label)).toEqual(['Blog'])
		const posts = searchResults('excerpt 3', POSTS)
		expect(posts.map((r) => r.href)).toEqual(['/post/post-3'])
	})

	it('returns nothing when nothing matches', () => {
		expect(searchResults('zzzzqqq', POSTS)).toEqual([])
	})
})

describe('Shell', () => {
	let fetchMock

	beforeEach(() => {
		route.asPath = '/'
		push.mockClear()
		window.localStorage.clear()
		fetchMock = vi.fn().mockResolvedValue({ json: () => Promise.resolve({ posts: POSTS.slice(0, 2) }) })
		vi.stubGlobal('fetch', fetchMock)
	})

	afterEach(() => {
		vi.unstubAllGlobals()
	})

	const renderShell = () => render(<Shell><p>Page body</p></Shell>)
	const mainNav = () => screen.getAllByRole('navigation', { name: 'Main' })[0]

	it('renders the children inside main and the footer with a mailto link', () => {
		renderShell()
		expect(within(screen.getByRole('main')).getByText('Page body')).toBeInTheDocument()
		const footer = screen.getByRole('contentinfo')
		expect(within(footer).getByRole('link', { name: 'jagetic.bojan@gmail.com' })).toHaveAttribute('href', 'mailto:jagetic.bojan@gmail.com')
		for (const link of within(footer).getAllByRole('link').filter((a) => a.target === '_blank')) {
			expect(link.getAttribute('rel')).toContain('noopener')
		}
	})

	it('marks the active route with aria-current="page"', () => {
		route.asPath = '/routes/blog?tag=js'
		renderShell()
		const links = within(mainNav()).getAllByRole('link')
		expect(links.map((a) => a.getAttribute('href'))).toEqual(NAV.map((n) => n.href))
		const current = links.filter((a) => a.getAttribute('aria-current') === 'page')
		expect(current).toHaveLength(1)
		expect(current[0]).toHaveTextContent('Blog')
	})

	it('marks Home as current only on the root', () => {
		renderShell()
		expect(within(mainNav()).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
		expect(within(mainNav()).getByRole('link', { name: 'Blog' })).not.toHaveAttribute('aria-current')
	})

	it('toggles the mobile sheet with the menu button and closes it on Escape', () => {
		renderShell()
		expect(screen.getAllByRole('navigation', { name: 'Main' })).toHaveLength(1)
		const button = screen.getByRole('button', { name: 'Open menu' })
		expect(button).toHaveAttribute('aria-expanded', 'false')

		fireEvent.click(button)
		expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
		expect(screen.getAllByRole('navigation', { name: 'Main' })).toHaveLength(2)

		fireEvent.click(screen.getByRole('button', { name: 'Close menu' }))
		expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
		expect(screen.getAllByRole('navigation', { name: 'Main' })).toHaveLength(1)

		fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
		fireEvent.keyDown(window, { key: 'Escape' })
		expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
	})

	it('opens the search dialog with Ctrl+K, loads posts once, and closes on Escape', async () => {
		renderShell()
		expect(screen.queryByRole('dialog')).toBeNull()
		expect(fetchMock).not.toHaveBeenCalled()

		fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
		const dialog = screen.getByRole('dialog', { name: 'Search' })
		expect(dialog).toHaveAttribute('aria-modal', 'true')
		expect(within(dialog).getByRole('textbox', { name: /search pages, projects and posts/i })).toHaveFocus()
		expect(fetchMock).toHaveBeenCalledWith('/api/posts?all=1')
		expect(await within(dialog).findByText('Docker tip 0')).toBeInTheDocument()
		expect(within(dialog).getByText('Pages')).toBeInTheDocument()
		expect(within(dialog).getByText('Posts')).toBeInTheDocument()

		fireEvent.keyDown(window, { key: 'Escape' })
		expect(screen.queryByRole('dialog')).toBeNull()

		fireEvent.keyDown(window, { key: 'K', metaKey: true })
		expect(screen.getByRole('dialog', { name: 'Search' })).toBeInTheDocument()
		expect(fetchMock).toHaveBeenCalledTimes(1)
	})

	it('opens search from the header button and closes when the backdrop is clicked', async () => {
		const { container } = renderShell()
		fireEvent.click(screen.getByRole('button', { name: 'Search' }))
		const dialog = screen.getByRole('dialog', { name: 'Search' })
		await within(dialog).findByText('Docker tip 0')
		fireEvent.click(dialog)
		expect(screen.getByRole('dialog')).toBeInTheDocument()
		fireEvent.click(container.querySelector('.palette-scrim'))
		expect(screen.queryByRole('dialog')).toBeNull()
	})

	it('filters results as you type and navigates with the keyboard', async () => {
		renderShell()
		fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
		const dialog = screen.getByRole('dialog', { name: 'Search' })
		await within(dialog).findByText('Docker tip 0')
		const input = within(dialog).getByRole('textbox')

		fireEvent.change(input, { target: { value: 'docker tip' } })
		const items = within(dialog).getAllByRole('button')
		expect(items.map((b) => b.querySelector('b').textContent)).toEqual(['Docker tip 0', 'Docker tip 1'])
		expect(items[0]).toHaveClass('is-on')

		fireEvent.keyDown(input, { key: 'ArrowDown' })
		expect(items[1]).toHaveClass('is-on')
		fireEvent.keyDown(input, { key: 'ArrowDown' })
		expect(items[1]).toHaveClass('is-on')
		fireEvent.keyDown(input, { key: 'ArrowUp' })
		fireEvent.keyDown(input, { key: 'ArrowUp' })
		expect(items[0]).toHaveClass('is-on')
		fireEvent.keyDown(input, { key: 'ArrowDown' })
		fireEvent.keyDown(input, { key: 'Enter' })

		expect(push).toHaveBeenCalledWith('/post/post-1')
		expect(screen.queryByRole('dialog')).toBeNull()
	})

	it('shows an empty state when nothing matches and navigates on click', async () => {
		renderShell()
		fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
		const dialog = screen.getByRole('dialog', { name: 'Search' })
		await within(dialog).findByText('Docker tip 0')
		const input = within(dialog).getByRole('textbox')
		fireEvent.change(input, { target: { value: 'zzzzqqq' } })
		expect(within(dialog).getByText(/no matches/i)).toBeInTheDocument()
		fireEvent.keyDown(input, { key: 'Enter' })
		expect(push).not.toHaveBeenCalled()

		fireEvent.change(input, { target: { value: 'about' } })
		fireEvent.click(within(dialog).getByRole('button', { name: /about/i }))
		expect(push).toHaveBeenCalledWith('/routes/aboutme')
	})

	it('falls back to no posts when the fetch fails', async () => {
		fetchMock.mockRejectedValueOnce(new Error('offline'))
		renderShell()
		fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
		await waitFor(() => expect(fetchMock).toHaveBeenCalled())
		await act(async () => {})
		const dialog = screen.getByRole('dialog', { name: 'Search' })
		expect(within(dialog).queryByText('Posts')).toBeNull()
		expect(within(dialog).getByText('Pages')).toBeInTheDocument()
	})

	it('toggles the theme on the root and remembers it', () => {
		expect(document.startViewTransition).toBeUndefined()
		const { container } = renderShell()
		const root = container.querySelector('[data-bjw]')
		expect(root).toHaveAttribute('data-theme', 'dark')

		fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }))
		expect(root).toHaveAttribute('data-theme', 'light')
		expect(window.localStorage.getItem('bj-theme')).toBe('light')
		expect(document.body.style.backgroundColor).toBe('rgb(242, 240, 248)')

		fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }))
		expect(root).toHaveAttribute('data-theme', 'dark')
		expect(window.localStorage.getItem('bj-theme')).toBe('dark')
	})

	it('restores a saved theme and ignores invalid values', () => {
		window.localStorage.setItem('bj-theme', 'light')
		const { container, unmount } = renderShell()
		expect(container.querySelector('[data-bjw]')).toHaveAttribute('data-theme', 'light')
		unmount()

		window.localStorage.setItem('bj-theme', 'neon')
		const second = renderShell()
		expect(second.container.querySelector('[data-bjw]')).toHaveAttribute('data-theme', 'dark')
	})

	it('removes its window listeners on unmount', () => {
		const remove = vi.spyOn(window, 'removeEventListener')
		const { unmount } = renderShell()
		unmount()
		expect(remove).toHaveBeenCalledWith('keydown', expect.any(Function))
		expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
		remove.mockRestore()
	})
})
