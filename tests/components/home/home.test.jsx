import React from 'react'
import { render, screen, within, act, fireEvent } from '@testing-library/react'
import projects, { getFeaturedProjects, getSpotlightProjects } from '@/lib/projects'

vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)
vi.mock('next/image', async () => (await import('../../helpers/next-mocks')).imageMock)
vi.mock('next/router', async () => (await import('../../helpers/next-mocks')).routerMock)
vi.mock('@/components/jagetic/HeroSpotify', () => ({ default: () => <div data-testid="player" /> }))
vi.mock('../../../components/jagetic/HeroSpotify', () => ({ default: () => <div data-testid="player" /> }))

const { default: Hero, INTRO } = await import('../../../components/home/Hero')
const { default: Launcher } = await import('../../../components/home/Launcher')
const { default: Spotlight } = await import('../../../components/home/Spotlight')
const { default: LatestPosts, GuideRow, canOptimize } = await import('../../../components/home/LatestPosts')
const { default: Contact } = await import('../../../components/home/Contact')
const { default: Landing } = await import('../../../components/Landing')

const featured = getFeaturedProjects()

function lastObserver () {
	return IntersectionObserver.instances[IntersectionObserver.instances.length - 1]
}

describe('Hero', () => {
	it('renders the name as the only h1 and the intro text', () => {
		render(<Hero />)
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bojan Jagetić')
		expect(screen.getByText(INTRO)).toBeInTheDocument()
		expect(screen.getByRole('region', { name: 'Introduction' })).toBeInTheDocument()
	})

	it('opens social chips in a new tab safely', () => {
		render(<Hero />)
		for (const [name, href] of [[/github/i, 'https://github.com/basskibo'], [/linkedin/i, 'https://linkedin.com/in/bojan-jagetic'], [/^x$/i, 'https://twitter.com/basskibo1']]) {
			const link = screen.getByRole('link', { name })
			expect(link).toHaveAttribute('href', href)
			expect(link).toHaveAttribute('target', '_blank')
			expect(link.getAttribute('rel')).toContain('noopener')
		}
	})

	it('offers the CV as a download and renders the Spotify player', () => {
		render(<Hero />)
		const cv = screen.getByRole('link', { name: /cv/i })
		expect(cv).toHaveAttribute('download')
		expect(cv).toHaveAttribute('href', '/Bojan_Jagetić.pdf')
		expect(screen.getByTestId('player')).toBeInTheDocument()
	})
})

describe('Launcher', () => {
	const tabs = () => screen.getAllByRole('tab')
	const panel = () => screen.getByRole('tabpanel')

	function stubLayout (nodes) {
		nodes.forEach((node, i) => {
			Object.defineProperty(node, 'offsetLeft', { configurable: true, get: () => i * 100 + 10 })
			Object.defineProperty(node, 'offsetTop', { configurable: true, get: () => 5 })
			Object.defineProperty(node, 'offsetWidth', { configurable: true, get: () => 90 + i })
			Object.defineProperty(node, 'offsetHeight', { configurable: true, get: () => 60 })
		})
	}

	it('renders one tab per project and starts on the first', () => {
		render(<Launcher projects={featured} />)
		const list = screen.getByRole('tablist', { name: 'Featured projects' })
		expect(within(list).getAllByRole('tab').map((t) => t.querySelector('.tile-name').textContent)).toEqual(featured.map((p) => p.name))
		expect(tabs()[0]).toHaveAttribute('aria-selected', 'true')
		expect(tabs()[1]).toHaveAttribute('aria-selected', 'false')
		expect(panel()).toHaveAttribute('aria-labelledby', tabs()[0].id)
		expect(tabs()[0]).toHaveAttribute('aria-controls', panel().id)
	})

	it('shows the selected project details in the panel', () => {
		render(<Launcher projects={featured} />)
		const p = featured[0]
		const view = within(panel())
		expect(view.getByRole('heading', { level: 2 })).toHaveTextContent(p.name)
		expect(view.getByText(p.tagline)).toBeInTheDocument()
		expect(view.getByText(p.description)).toBeInTheDocument()
		expect(view.getAllByRole('listitem').map((li) => li.textContent)).toEqual(p.highlights)
		const open = view.getByRole('link', { name: `Open ${p.name}` })
		expect(open).toHaveAttribute('href', p.liveUrl)
		expect(open).toHaveAttribute('target', '_blank')
		expect(open.getAttribute('rel')).toContain('noopener')
		expect(view.getByRole('link', { name: 'How I built it' })).toHaveAttribute('href', `/post/${p.post}`)
	})

	it('shows the GitHub link only for projects with a repo', () => {
		render(<Launcher projects={featured} />)
		const withRepo = featured.findIndex((p) => p.repoUrl)
		expect(within(panel()).queryByRole('link', { name: /source code on github/i })).toBeNull()
		fireEvent.click(tabs()[withRepo])
		const gh = within(panel()).getByRole('link', { name: `${featured[withRepo].name} source code on GitHub` })
		expect(gh).toHaveAttribute('href', featured[withRepo].repoUrl)
	})

	it('selects on click and on mouse hover, but not on touch hover', () => {
		const { container } = render(<Launcher projects={featured} />)
		fireEvent.click(tabs()[2])
		expect(tabs()[2]).toHaveAttribute('aria-selected', 'true')
		expect(within(panel()).getByRole('heading', { level: 2 })).toHaveTextContent(featured[2].name)
		expect(container.querySelector('.launch').style.getPropertyValue('--p')).toBe(featured[2].color)

		fireEvent.pointerEnter(tabs()[1], { pointerType: 'touch' })
		expect(tabs()[2]).toHaveAttribute('aria-selected', 'true')

		fireEvent.pointerEnter(tabs()[1], { pointerType: 'mouse' })
		expect(tabs()[1]).toHaveAttribute('aria-selected', 'true')
		expect(within(panel()).getByRole('heading', { level: 2 })).toHaveTextContent(featured[1].name)
	})

	it('only marks the selected screenshot as visible', () => {
		render(<Launcher projects={featured} />)
		fireEvent.click(tabs()[1])
		const screens = screen.getAllByTestId('launch-screen')
		expect(screens.map((s) => s.classList.contains('is-on'))).toEqual([false, true, false])
		expect(screen.getByAltText(`${featured[1].name} screenshot`)).toBeInTheDocument()
	})

	it('uses a roving tabIndex', () => {
		render(<Launcher projects={featured} />)
		expect(tabs().map((t) => t.tabIndex)).toEqual([0, -1, -1])
		fireEvent.click(tabs()[1])
		expect(tabs().map((t) => t.tabIndex)).toEqual([-1, 0, -1])
	})

	it('moves selection and focus with the arrow keys, Home and End, wrapping around', () => {
		render(<Launcher projects={featured} />)
		const press = (key) => fireEvent.keyDown(document.activeElement === document.body ? tabs()[0] : document.activeElement, { key })
		const selected = () => tabs().findIndex((t) => t.getAttribute('aria-selected') === 'true')

		tabs()[0].focus()
		press('ArrowRight')
		expect(selected()).toBe(1)
		expect(tabs()[1]).toHaveFocus()
		press('ArrowDown')
		expect(selected()).toBe(2)
		press('ArrowRight')
		expect(selected()).toBe(0)
		expect(tabs()[0]).toHaveFocus()
		press('ArrowLeft')
		expect(selected()).toBe(2)
		expect(tabs()[2]).toHaveFocus()
		press('ArrowUp')
		expect(selected()).toBe(1)
		press('Home')
		expect(selected()).toBe(0)
		press('End')
		expect(selected()).toBe(featured.length - 1)
		expect(tabs()[featured.length - 1]).toHaveFocus()
	})

	it('ignores other keys', () => {
		render(<Launcher projects={featured} />)
		const event = fireEvent.keyDown(tabs()[0], { key: 'a' })
		expect(event).toBe(true)
		expect(tabs()[0]).toHaveAttribute('aria-selected', 'true')
	})

	it('positions a single focus ring over the selected tile and moves it', () => {
		const { rerender } = render(<Launcher projects={featured} />)
		stubLayout(tabs())
		// Re-measure now that the tiles have a layout.
		act(() => { window.dispatchEvent(new Event('resize')) })
		rerender(<Launcher projects={featured} />)

		const ring = () => screen.getByTestId('focus-ring')
		expect(screen.getAllByTestId('focus-ring')).toHaveLength(1)
		expect(ring()).toHaveAttribute('aria-hidden', 'true')
		expect(ring().style.transform).toBe('translate(10px, 5px)')
		expect(ring().style.width).toBe('90px')
		expect(ring().style.height).toBe('60px')

		fireEvent.click(tabs()[2])
		expect(ring().style.transform).toBe('translate(210px, 5px)')
		expect(ring().style.width).toBe('92px')
	})

	it('removes its resize listener on unmount', () => {
		const remove = vi.spyOn(window, 'removeEventListener')
		const { unmount } = render(<Launcher projects={featured} />)
		unmount()
		expect(remove).toHaveBeenCalledWith('resize', expect.any(Function))
		remove.mockRestore()
	})

	it('links to all projects with the total only when given', () => {
		const { rerender } = render(<Launcher projects={featured} />)
		expect(screen.queryByRole('link', { name: /all projects/i })).toBeNull()
		rerender(<Launcher projects={featured} total={17} />)
		const all = screen.getByRole('link', { name: /all projects/i })
		expect(all).toHaveAttribute('href', '/routes/projects')
		expect(all).toHaveTextContent('17')
	})

	it('renders nothing without projects', () => {
		const { container } = render(<Launcher projects={[]} />)
		expect(container).toBeEmptyDOMElement()
	})
})

describe('Spotlight', () => {
	const spot = getSpotlightProjects()

	it('shows the Workshop section with both tools, their terminal lines and no public links', () => {
		render(<Spotlight projects={spot} />)
		expect(screen.getByRole('heading', { level: 2, name: 'Workshop' })).toBeInTheDocument()
		for (const p of spot) {
			expect(screen.getByRole('heading', { level: 3, name: p.name })).toBeInTheDocument()
			for (const line of p.terminal) expect(screen.getByText(line, { normalizer: (s) => s })).toBeInTheDocument()
		}
		expect(screen.getAllByText(/private repo/i)).toHaveLength(spot.length)
		expect(screen.getAllByRole('link', { name: /read the write-up/i }).map((a) => a.getAttribute('href')))
			.toEqual(spot.filter((p) => p.post).map((p) => `/post/${p.post}`))
	})

	it('starts typing only once the grid is in view', () => {
		const { container } = render(<Spotlight projects={spot} />)
		const grid = container.querySelector('.spot-grid')
		expect(grid).not.toHaveClass('is-seen')
		act(() => lastObserver().callback([{ isIntersecting: false }]))
		expect(grid).not.toHaveClass('is-seen')
		act(() => lastObserver().callback([{ isIntersecting: true }]))
		expect(grid).toHaveClass('is-seen')
	})

	it('renders nothing for an empty list', () => {
		const { container } = render(<Spotlight projects={[]} />)
		expect(container).toBeEmptyDOMElement()
	})
})

describe('LatestPosts', () => {
	const posts = [
		{ slug: 'a', title: 'Post A', excerpt: 'Ex A', publishedAt: '2026-10-01', tags: [{ slug: 'ai', name: 'ai' }], read: '5 min read' },
		{ slug: 'b', title: 'Post B', excerpt: 'Ex B', publishedAt: '2025-09-12', tags: [{ slug: 'node' }], read: null },
		{ slug: 'c', title: 'Post C', excerpt: '', publishedAt: null, tags: [] }
	]

	it('renders a dated list linking each row to its post', () => {
		render(<LatestPosts posts={posts} />)
		expect(screen.getByRole('heading', { level: 2, name: 'Writing' })).toBeInTheDocument()
		const items = within(screen.getByRole('list')).getAllByRole('listitem')
		expect(items).toHaveLength(3)
		expect(within(items[0]).getByRole('link')).toHaveAttribute('href', '/post/a')
		expect(screen.getByRole('link', { name: /all posts/i })).toHaveAttribute('href', '/routes/blog')
	})

	it('shows a machine-readable date, the tag and the read time', () => {
		const { container } = render(<LatestPosts posts={posts} />)
		const times = container.querySelectorAll('time')
		expect([...times].map((t) => t.getAttribute('dateTime'))).toEqual(['2026-10-01', '2025-09-12'])
		expect(times[0]).toHaveTextContent('Oct 1')
		expect(times[0]).toHaveTextContent('2026')
		expect(times[1]).toHaveTextContent('Sep 12')
		expect(screen.getByText('ai')).toBeInTheDocument()
		expect(screen.getByText('node')).toBeInTheDocument()
		expect(screen.getByText('5 min read')).toBeInTheDocument()
		expect(screen.getByText('Ex A')).toBeInTheDocument()
	})

	it('marks undated posts and falls back to "Note" for untagged ones', () => {
		render(<LatestPosts posts={posts} />)
		expect(screen.getByText('Undated')).toBeInTheDocument()
		expect(screen.getAllByText('Note')).toHaveLength(1)
	})

	it('GuideRow works on its own', () => {
		render(<ul><GuideRow post={{ slug: 'x', title: 'Solo', publishedAt: 'garbage', tags: [] }} /></ul>)
		expect(screen.getByRole('link', { name: /solo/i })).toHaveAttribute('href', '/post/x')
		expect(screen.getByText('Undated')).toBeInTheDocument()
	})

	it('renders nothing without posts', () => {
		expect(render(<LatestPosts posts={[]} />).container).toBeEmptyDOMElement()
		expect(render(<LatestPosts />).container).toBeEmptyDOMElement()
	})

	it('only sends allowed hosts through next/image', () => {
		expect(canOptimize('/images/x.webp')).toBe(true)
		expect(canOptimize('https://res.cloudinary.com/a.jpg')).toBe(true)
		expect(canOptimize('https://bucket.s3.amazonaws.com/a.jpg')).toBe(true)
		expect(canOptimize('https://coinsel.jageticbojan.com/og')).toBe(false)
		expect(canOptimize('nope')).toBe(false)
		expect(canOptimize(null)).toBe(false)
	})
})

describe('Contact', () => {
	it('has a mail link, the newsletter and the platforms, without a fake email field', () => {
		render(<Contact />)
		expect(screen.getByRole('heading', { level: 2, name: 'Have an idea?' })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: /say hello/i })).toHaveAttribute('href', 'mailto:jagetic.bojan@gmail.com')
		expect(screen.getByRole('link', { name: /subscribe on substack/i }).getAttribute('href')).toMatch(/^https:\/\/bojanjagetic\.substack\.com/)
		for (const name of ['Dev.to', 'Medium', 'Hashnode']) {
			expect(screen.getByRole('link', { name })).toHaveAttribute('target', '_blank')
		}
		expect(screen.queryByRole('textbox')).toBeNull()
	})
})

describe('Landing', () => {
	it('orders intro, featured launcher, workshop, more projects, posts and contact', () => {
		const posts = [{ slug: 'p', title: 'A post', publishedAt: '2026-01-01', tags: [] }]
		const { container } = render(<Landing posts={posts} />)
		const ids = [...container.querySelectorAll('section')]
			.filter((s) => !s.closest('li'))
			.map((s) => s.getAttribute('aria-label') || s.getAttribute('aria-labelledby'))
		expect(ids).toEqual(['Introduction', 'Featured projects', 'spot-title', 'more-title', 'posts-title', 'contact-title'])
		expect(screen.getByRole('link', { name: /all projects/i })).toHaveTextContent(String(projects.length))
	})

	it('previews the next five projects not shown above', () => {
		const { container } = render(<Landing posts={[]} />)
		const shown = new Set([...featured, ...getSpotlightProjects()].map((p) => p.slug))
		const expected = projects.filter((p) => !shown.has(p.slug)).slice(0, 5)
		const rows = container.querySelectorAll('.rows .row')
		expect(rows).toHaveLength(5)
		expect([...rows].map((r) => r.querySelector('.row-name').textContent)).toEqual(expected.map((p) => p.name))
		expect([...rows].map((r) => r.querySelector('.row-rank').textContent))
			.toEqual(expected.map((p) => String(projects.indexOf(p) + 1).padStart(2, '0')))
		expect(screen.getByRole('link', { name: `All ${projects.length} projects` })).toHaveAttribute('href', '/routes/projects')
	})
})
