import React from 'react'
import { render, screen, within, act, fireEvent } from '@testing-library/react'
import projects, { getFeaturedProjects, getSpotlightProjects } from '@/lib/projects'

vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)
vi.mock('next/image', async () => (await import('../../helpers/next-mocks')).imageMock)
vi.mock('next/router', async () => (await import('../../helpers/next-mocks')).routerMock)
vi.mock('@/components/jagetic/HeroSpotify', () => ({ default: () => <div data-testid="player" /> }))
vi.mock('../../../components/jagetic/HeroSpotify', () => ({ default: () => <div data-testid="player" /> }))

const { default: Hero } = await import('../../../components/home/Hero')
const { default: FeaturedWork } = await import('../../../components/home/FeaturedWork')
const { default: Spotlight } = await import('../../../components/home/Spotlight')
const { default: LatestPosts, canOptimize } = await import('../../../components/home/LatestPosts')
const { default: Contact } = await import('../../../components/home/Contact')
const { default: Landing } = await import('../../../components/Landing')

const featured = getFeaturedProjects()

function lastObserver () {
	return IntersectionObserver.instances[IntersectionObserver.instances.length - 1]
}

describe('Hero', () => {
	it('renders the name as a single heading with real text', () => {
		render(<Hero featured={featured} />)
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Bojan Jagetić')
	})

	it('links "See the work" to the featured section and each shipping item to its chapter', () => {
		render(<Hero featured={featured} />)
		expect(screen.getByRole('link', { name: /see the work/i })).toHaveAttribute('href', '#work')
		const nav = screen.getByRole('navigation', { name: /featured projects/i })
		const links = within(nav).getAllByRole('link')
		expect(links.map((a) => a.getAttribute('href'))).toEqual(featured.map((p) => `#work-${p.slug}`))
	})

	it('opens social links in a new tab safely and offers the CV download', () => {
		render(<Hero featured={featured} />)
		const gh = screen.getByRole('link', { name: /github/i })
		expect(gh).toHaveAttribute('target', '_blank')
		expect(gh.getAttribute('rel')).toContain('noopener')
		expect(screen.getByRole('link', { name: /cv/i })).toHaveAttribute('download')
	})

	it('hides the shipping strip when there are no featured projects', () => {
		render(<Hero featured={[]} />)
		expect(screen.queryByRole('navigation', { name: /featured projects/i })).toBeNull()
	})

	it('moves the spotlight through CSS variables without re-rendering', () => {
		const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { cb(0); return 1 })
		const { container } = render(<Hero featured={featured} />)
		const section = container.querySelector('.hero')
		section.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 100 })
		fireEvent.pointerMove(section, { clientX: 50, clientY: 25 })
		expect(section.style.getPropertyValue('--mx')).toBe('25%')
		expect(section.style.getPropertyValue('--my')).toBe('25%')
		raf.mockRestore()
	})
})

describe('FeaturedWork', () => {
	it('renders one chapter per featured project, in order, with live links', () => {
		render(<FeaturedWork projects={featured} />)
		const headings = screen.getAllByRole('heading', { level: 3 })
		expect(headings.map((h) => h.textContent)).toEqual(featured.map((p) => p.name))
		for (const p of featured) {
			const open = screen.getByRole('link', { name: new RegExp(`open ${p.name}`, 'i') })
			expect(open).toHaveAttribute('href', p.liveUrl)
			expect(open).toHaveAttribute('target', '_blank')
		}
	})

	it('links each project to its write-up', () => {
		render(<FeaturedWork projects={featured} />)
		const stories = screen.getAllByRole('link', { name: /how i built it/i })
		expect(stories.map((a) => a.getAttribute('href'))).toEqual(featured.map((p) => `/post/${p.post}`))
	})

	it('starts on the first project and switches when another chapter crosses the middle', () => {
		const { container } = render(<FeaturedWork projects={featured} />)
		const section = container.querySelector('#work')
		const screens = screen.getAllByTestId('fw-screen')
		expect(screens[0]).toHaveClass('is-on')
		expect(section.style.getPropertyValue('--p')).toBe(featured[0].color)
		expect(container.querySelector('.device-url')).toHaveTextContent('coinsel.jageticbojan.com')

		const observer = lastObserver()
		const chapter = container.querySelector(`#work-${featured[2].slug}`)
		act(() => observer.callback([{ isIntersecting: true, target: chapter }]))

		expect(screens[2]).toHaveClass('is-on')
		expect(screens[0]).toHaveClass('is-past')
		expect(screens[1]).toHaveClass('is-past')
		expect(section.style.getPropertyValue('--p')).toBe(featured[2].color)
		expect(container.querySelector('.fw-meter')).toHaveTextContent('03')
	})

	it('ignores chapters that are leaving the viewport', () => {
		const { container } = render(<FeaturedWork projects={featured} />)
		const observer = lastObserver()
		act(() => observer.callback([{ isIntersecting: false, target: container.querySelector(`#work-${featured[1].slug}`) }]))
		expect(screen.getAllByTestId('fw-screen')[0]).toHaveClass('is-on')
	})

	it('renders nothing without projects', () => {
		const { container } = render(<FeaturedWork projects={[]} />)
		expect(container).toBeEmptyDOMElement()
	})
})

describe('Spotlight', () => {
	const spot = getSpotlightProjects()

	it('shows both tools with their terminal lines and no public links', () => {
		render(<Spotlight projects={spot} />)
		for (const p of spot) {
			expect(screen.getByRole('heading', { name: p.name })).toBeInTheDocument()
			for (const line of p.terminal) expect(screen.getByText(line, { normalizer: (s) => s })).toBeInTheDocument()
		}
		expect(screen.getAllByText(/private repo/i)).toHaveLength(spot.length)
	})

	it('starts typing only once the grid is in view', () => {
		const { container } = render(<Spotlight projects={spot} />)
		const grid = container.querySelector('.spot-grid')
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
		{ slug: 'a', title: 'Post A', excerpt: 'Ex A', publishedAt: '2026-10-01', featuredImage: 'https://images.unsplash.com/x', tags: [{ slug: 'ai', name: 'ai' }], read: '5 min read' },
		{ slug: 'b', title: 'Post B', excerpt: 'Ex B', publishedAt: '2026-09-01', featuredImage: 'https://coinsel.jageticbojan.com/og', tags: [], read: null },
		{ slug: 'c', title: 'Post C', excerpt: '', publishedAt: null, featuredImage: null, tags: [] }
	]

	it('links every card to its post and shows date and reading time', () => {
		render(<LatestPosts posts={posts} />)
		expect(screen.getByRole('link', { name: /post a/i })).toHaveAttribute('href', '/post/a')
		expect(screen.getByText('Oct 1, 2026 · 5 min read')).toBeInTheDocument()
		expect(screen.getByText('Sep 1, 2026')).toBeInTheDocument()
	})

	it('falls back to "Note" when a post has no tag', () => {
		render(<LatestPosts posts={posts} />)
		expect(screen.getAllByText('Note')).toHaveLength(2)
	})

	it('renders nothing without posts', () => {
		const { container } = render(<LatestPosts posts={[]} />)
		expect(container).toBeEmptyDOMElement()
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
	it('has a mail link and the newsletter, without a fake email field', () => {
		render(<Contact />)
		expect(screen.getByRole('link', { name: /say hello/i })).toHaveAttribute('href', 'mailto:jagetic.bojan@gmail.com')
		expect(screen.getByRole('link', { name: /subscribe on substack/i }).getAttribute('href')).toMatch(/^https:\/\/bojanjagetic\.substack\.com/)
		expect(screen.queryByRole('textbox')).toBeNull()
	})
})

describe('Landing', () => {
	it('puts featured work before everything else and previews the next five projects', () => {
		const { container } = render(<Landing posts={[]} />)
		const ids = [...container.querySelectorAll('section')].map((s) => s.getAttribute('aria-label') || s.getAttribute('aria-labelledby'))
		expect(ids.slice(0, 3)).toEqual(['Introduction', 'work-title', 'spot-title'])
		const shown = new Set([...featured, ...getSpotlightProjects()].map((p) => p.slug))
		const expected = projects.filter((p) => !shown.has(p.slug)).slice(0, 5)
		const rows = container.querySelectorAll('#more-title ~ * .row, .rows .row')
		expect(rows).toHaveLength(5)
		expect([...rows].map((r) => r.querySelector('.row-name').textContent)).toEqual(expected.map((p) => p.name))
		expect(screen.getByRole('link', { name: `All ${projects.length} projects` })).toHaveAttribute('href', '/routes/projects')
	})
})
