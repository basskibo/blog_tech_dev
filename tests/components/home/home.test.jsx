import React from 'react'
import { render, screen, within, act, fireEvent } from '@testing-library/react'
import projects, { getFeaturedProjects, getSpotlightProjects } from '@/lib/projects'

vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)
vi.mock('next/image', async () => (await import('../../helpers/next-mocks')).imageMock)
vi.mock('next/router', async () => (await import('../../helpers/next-mocks')).routerMock)
vi.mock('../../../components/jagetic/HeroSpotify', () => ({ default: () => <div data-testid="player" /> }))

const { default: Hero, INTRO } = await import('../../../components/home/Hero')
const { default: Bento } = await import('../../../components/home/Bento')
const { default: Marquee } = await import('../../../components/home/Marquee')
const { default: LatestPosts, PostCard, canOptimize } = await import('../../../components/home/LatestPosts')
const { default: Contact } = await import('../../../components/home/Contact')
const { default: Landing } = await import('../../../components/Landing')

const featured = getFeaturedProjects()
const tools = getSpotlightProjects()
const keepWhitespace = (s) => s

function lastObserver () {
	return IntersectionObserver.instances[IntersectionObserver.instances.length - 1]
}

describe('Hero', () => {
	const intro = () => screen.getByRole('region', { name: 'Introduction' })

	it('renders the name as the only h1 and the intro text', () => {
		render(<Hero featured={featured} />)
		const h1 = screen.getByRole('heading', { level: 1 })
		expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
		expect(within(h1).getByText('Bojan')).toBeInTheDocument()
		expect(within(h1).getByText('Jagetić')).toBeInTheDocument()
		expect(h1).toHaveTextContent('Bojan Jagetić')
		expect(screen.getByText(INTRO, { exact: false })).toBeInTheDocument()
		expect(intro()).toBeInTheDocument()
	})

	it('announces the first featured project in the "New" pill', () => {
		render(<Hero featured={featured} />)
		const pill = screen.getByRole('link', { name: `New ${featured[0].name} now has an Android app` })
		expect(pill).toHaveAttribute('href', featured[0].liveUrl)
		expect(pill).toHaveAttribute('target', '_blank')
		expect(pill.getAttribute('rel')).toContain('noopener')
	})

	it('links to the work section and the blog', () => {
		render(<Hero featured={featured} />)
		expect(screen.getByRole('link', { name: 'See my work' })).toHaveAttribute('href', '#work')
		expect(screen.getByRole('link', { name: 'Read the blog' })).toHaveAttribute('href', '/routes/blog')
	})

	it('opens social links in a new tab safely', () => {
		render(<Hero featured={featured} />)
		for (const [name, href] of [['GitHub', 'https://github.com/basskibo'], ['LinkedIn', 'https://linkedin.com/in/bojan-jagetic'], ['X', 'https://twitter.com/basskibo1']]) {
			const link = screen.getByRole('link', { name })
			expect(link).toHaveAttribute('href', href)
			expect(link).toHaveAttribute('target', '_blank')
			expect(link.getAttribute('rel')).toContain('noopener')
		}
	})

	it('offers the CV as a download and renders the Spotify player', () => {
		render(<Hero featured={featured} />)
		const cv = screen.getByRole('link', { name: 'Download CV' })
		expect(cv).toHaveAttribute('download')
		expect(cv).toHaveAttribute('href', '/Bojan_Jagetić.pdf')
		expect(screen.getByTestId('player')).toBeInTheDocument()
	})

	it('stacks three screens in a hidden 3D stage: front, right and left', () => {
		const { container } = render(<Hero featured={featured} />)
		// Only the decorative 3D stack is hidden; the radio next to it stays reachable.
		expect(container.querySelector('.hero-3d')).toHaveAttribute('aria-hidden', 'true')
		expect(container.querySelector('.hero-stage')).not.toHaveAttribute('aria-hidden')
		const color = (cls) => container.querySelector(`.screen3d.${cls}`).style.getPropertyValue('--c')
		expect(color('s-front')).toBe(featured[0].color)
		expect(color('s-right')).toBe(featured[1].color)
		expect(color('s-left')).toBe(featured[2].color)
		expect(container.querySelector('.s-front img')).toHaveAttribute('src', featured[0].image)
		expect(container.querySelector('.s-right img')).toHaveAttribute('src', featured[1].image)
		expect(container.querySelector('.s-left img')).toHaveAttribute('src', featured[2].image)
		expect(container.querySelector('.s-front .screen3d-bar span')).toHaveTextContent(featured[0].liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''))
	})

	it('shows float chips for the front and right projects', () => {
		const { container } = render(<Hero featured={featured} />)
		const chips = [...container.querySelectorAll('.float-chip small')].map((s) => s.textContent)
		expect(chips).toEqual([`${featured[0].label}, live`, `${featured[1].label}, live`])
	})

	it('renders without featured projects', () => {
		const { container } = render(<Hero />)
		expect(container.querySelector('.screen3d')).toBeNull()
		expect(screen.queryByRole('link', { name: /android app/i })).toBeNull()
		expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
	})

	describe('tilt', () => {
		let raf

		beforeEach(() => {
			raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { cb(0); return 0 })
		})

		afterEach(() => {
			raf.mockRestore()
		})

		const setup = () => {
			const { container } = render(<Hero featured={featured} />)
			const section = intro()
			section.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 100, right: 200, bottom: 100, x: 0, y: 0 })
			return { section, stage: container.querySelector('.hero-3d') }
		}

		it('tilts towards a mouse pointer via CSS variables', () => {
			const { section, stage } = setup()
			fireEvent.pointerMove(section, { pointerType: 'mouse', clientX: 150, clientY: 25 })
			expect(raf).toHaveBeenCalledTimes(1)
			expect(stage.style.getPropertyValue('--ry')).toBe('3.50deg')
			expect(stage.style.getPropertyValue('--rx')).toBe('2.50deg')

			fireEvent.pointerMove(section, { pointerType: 'mouse', clientX: 0, clientY: 100 })
			expect(stage.style.getPropertyValue('--ry')).toBe('-7.00deg')
			expect(stage.style.getPropertyValue('--rx')).toBe('-5.00deg')
		})

		it('ignores touch pointers', () => {
			const { section, stage } = setup()
			fireEvent.pointerMove(section, { pointerType: 'touch', clientX: 150, clientY: 25 })
			expect(raf).not.toHaveBeenCalled()
			expect(stage.style.getPropertyValue('--ry')).toBe('')
			expect(stage.style.getPropertyValue('--rx')).toBe('')
		})

		it('resets the tilt when the pointer leaves', () => {
			const { section, stage } = setup()
			fireEvent.pointerMove(section, { pointerType: 'mouse', clientX: 150, clientY: 25 })
			fireEvent.pointerLeave(section)
			expect(stage.style.getPropertyValue('--ry')).toBe('0deg')
			expect(stage.style.getPropertyValue('--rx')).toBe('0deg')
		})
	})
})

describe('Bento', () => {
	const cards = () => screen.getAllByRole('article')

	it('shows the "Selected work" heading, and the all-projects link only when a total is given', () => {
		const { rerender } = render(<Bento featured={featured} tools={tools} />)
		const section = screen.getByRole('region', { name: 'Selected work' })
		expect(section).toHaveAttribute('id', 'work')
		expect(screen.getByRole('heading', { level: 2, name: 'Selected work' })).toBeInTheDocument()
		expect(screen.queryByRole('link', { name: /all \d+ projects/i })).toBeNull()

		rerender(<Bento featured={featured} tools={tools} total={17} />)
		expect(screen.getByRole('link', { name: 'All 17 projects' })).toHaveAttribute('href', '/routes/projects')
	})

	it('drops the heading and labels itself when heading=false', () => {
		render(<Bento featured={featured} tools={tools} total={17} heading={false} />)
		const section = screen.getByRole('region', { name: 'Featured projects' })
		expect(section).not.toHaveAttribute('aria-labelledby')
		// A visually hidden h2 keeps the heading order intact without a visible title.
		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Featured projects')
		expect(screen.getByRole('heading', { level: 2 })).toHaveClass('sr-only')
		expect(screen.queryByRole('link', { name: /all \d+ projects/i })).toBeNull()
	})

	it('renders featured cards first (the first one big), then tool cards', () => {
		render(<Bento featured={featured} tools={tools} />)
		expect(cards().map((c) => c.getAttribute('aria-label') || within(c).getByRole('heading', { level: 3 }).textContent))
			.toEqual([...featured, ...tools].map((p) => p.name))
		expect(cards().map((c) => c.classList.contains('is-big'))).toEqual([true, false, false, false, false])
		expect(cards()[0]).toHaveAccessibleName(featured[0].name)
	})

	it('shows the tagline and full description on the big card, only the tagline on the others', () => {
		render(<Bento featured={featured} tools={tools} />)
		const [big, second, third] = cards()
		expect(within(big).getByText(featured[0].tagline)).toBeInTheDocument()
		expect(within(big).getByText(featured[0].description)).toBeInTheDocument()
		expect(within(second).getByText(featured[1].tagline)).toBeInTheDocument()
		expect(within(second).queryByText(featured[1].description)).toBeNull()
		expect(within(third).getByText(featured[2].tagline)).toBeInTheDocument()
		expect(within(third).queryByText(featured[2].description)).toBeNull()
		expect(within(big).getByAltText(`${featured[0].name} screenshot`)).toHaveAttribute('src', featured[0].image)
	})

	it('links each featured project to its live app and its story', () => {
		render(<Bento featured={featured} tools={tools} />)
		featured.forEach((p, i) => {
			const card = cards()[i]
			const open = within(card).getByRole('link', { name: `Open ${p.name}` })
			expect(open).toHaveAttribute('href', p.liveUrl)
			expect(open).toHaveAttribute('target', '_blank')
			expect(open.getAttribute('rel')).toContain('noopener')
			expect(within(card).getByRole('link', { name: 'How I built it' })).toHaveAttribute('href', `/post/${p.post}`)
		})
	})

	it('renders the tool cards with their terminal, write-up link and a private repo note', () => {
		const { container } = render(<Bento featured={featured} tools={tools} />)
		const toolCards = cards().slice(featured.length)
		expect(toolCards).toHaveLength(tools.length)
		tools.forEach((p, i) => {
			const card = toolCards[i]
			const term = card.querySelector('.term')
			expect(term).toHaveAttribute('aria-hidden', 'true')
			for (const line of p.terminal) expect(within(term).getByText(line, { normalizer: keepWhitespace })).toBeInTheDocument()
			expect(within(card).getByRole('link', { name: 'Read the write-up' })).toHaveAttribute('href', `/post/${p.post}`)
			expect(within(card).getByText('Private repo')).toBeInTheDocument()
			expect(within(card).queryByRole('link', { name: /^open/i })).toBeNull()
		})
		expect(container.querySelectorAll('.term-line.is-ok').length).toBeGreaterThan(0)
	})

	it('starts the terminals only once the grid is in view', () => {
		const { container } = render(<Bento featured={featured} tools={tools} />)
		const grid = container.querySelector('.bento')
		const observer = lastObserver()
		expect(observer.el).toBe(grid)
		expect(grid).not.toHaveClass('is-seen')
		act(() => observer.callback([{ isIntersecting: false }]))
		expect(grid).not.toHaveClass('is-seen')
		act(() => observer.callback([{ isIntersecting: true }]))
		expect(grid).toHaveClass('is-seen')
	})

	it('renders nothing without featured projects', () => {
		const { container } = render(<Bento featured={[]} tools={tools} />)
		expect(container).toBeEmptyDOMElement()
	})
})

describe('Marquee', () => {
	it('lists the tools once for assistive tech and duplicates them hidden for the loop', () => {
		const { container } = render(<Marquee />)
		const items = [...container.querySelectorAll('li')]
		expect(items.length % 2).toBe(0)
		const half = items.length / 2
		const first = items.slice(0, half)
		const second = items.slice(half)
		expect(first.every((li) => !li.hasAttribute('aria-hidden'))).toBe(true)
		expect(second.every((li) => li.getAttribute('aria-hidden') === 'true')).toBe(true)
		expect(second.map((li) => li.textContent)).toEqual(first.map((li) => li.textContent))
		expect(screen.getAllByRole('listitem')).toHaveLength(half)
		expect(screen.getByText('Next.js', { selector: 'li:not([aria-hidden])' })).toBeInTheDocument()
	})
})

describe('PostCard', () => {
	const post = { slug: 'a', title: 'Post A', excerpt: 'Ex A', publishedAt: '2026-10-01', tags: [{ slug: 'ai', name: 'ai' }], read: '5 min read', featuredImage: '/images/a.webp' }

	it('renders the cover, tag, title, date and read time', () => {
		render(<PostCard post={post} />)
		const card = screen.getByRole('link')
		expect(card).toHaveAttribute('href', '/post/a')
		expect(card).toHaveClass('post-card')
		expect(card).not.toHaveClass('is-big')
		expect(card.querySelector('img')).toHaveAttribute('src', '/images/a.webp')
		expect(within(card).getByText('ai')).toHaveClass('post-card-tag')
		expect(within(card).getByText('Post A')).toBeInTheDocument()
		const time = card.querySelector('time')
		expect(time).toHaveAttribute('dateTime', '2026-10-01')
		expect(time).toHaveTextContent('Oct 1, 2026')
		expect(within(card).getByText('5 min read')).toBeInTheDocument()
		expect(within(card).queryByText('Ex A')).toBeNull()
	})

	it('shows the excerpt only when big', () => {
		render(<PostCard post={post} big />)
		expect(screen.getByRole('link')).toHaveClass('is-big')
		expect(screen.getByText('Ex A')).toBeInTheDocument()
	})

	it('uses a plain lazy img for hosts next/image cannot optimise', () => {
		render(<PostCard post={{ ...post, featuredImage: 'https://example.com/a.jpg' }} />)
		const img = screen.getByRole('link').querySelector('img')
		expect(img).toHaveAttribute('src', 'https://example.com/a.jpg')
		expect(img).toHaveAttribute('loading', 'lazy')
	})

	it('falls back to "Note", "Undated" and no cover', () => {
		render(<PostCard post={{ slug: 'x', title: 'Solo', publishedAt: 'garbage', tags: [] }} />)
		const card = screen.getByRole('link')
		expect(card).toHaveAttribute('href', '/post/x')
		expect(within(card).getByText('Note')).toBeInTheDocument()
		expect(within(card).getByText('Undated')).toBeInTheDocument()
		expect(card.querySelector('img')).toBeNull()
		expect(card.querySelector('time')).toBeNull()
	})
})

describe('LatestPosts', () => {
	const posts = [
		{ slug: 'a', title: 'Post A', publishedAt: '2026-10-01', tags: [{ slug: 'ai', name: 'ai' }] },
		{ slug: 'b', title: 'Post B', publishedAt: '2025-09-12', tags: [{ slug: 'node' }] },
		{ slug: 'c', title: 'Post C', publishedAt: null, tags: [] },
		{ slug: 'd', title: 'Post D', publishedAt: '2024-01-01', tags: [] }
	]

	it('renders up to three cards and an "All posts" link', () => {
		const { container } = render(<LatestPosts posts={posts} />)
		expect(screen.getByRole('region', { name: 'Fresh writing' })).toBeInTheDocument()
		const cards = [...container.querySelectorAll('.post-grid > a.post-card')]
		expect(cards.map((a) => a.getAttribute('href'))).toEqual(['/post/a', '/post/b', '/post/c'])
		expect(cards.some((a) => a.classList.contains('is-big'))).toBe(false)
		expect(screen.getByRole('link', { name: 'All posts' })).toHaveAttribute('href', '/routes/blog')
		expect(screen.getByText('node')).toBeInTheDocument()
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
	it('has a mail button, the newsletter and the platforms, without a fake email field', () => {
		render(<Contact />)
		expect(screen.getByRole('heading', { level: 2, name: 'Have an idea?' })).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'jagetic.bojan@gmail.com' })).toHaveAttribute('href', 'mailto:jagetic.bojan@gmail.com')
		const substack = screen.getByRole('link', { name: 'Get new posts by email' })
		expect(substack.getAttribute('href')).toMatch(/^https:\/\/bojanjagetic\.substack\.com/)
		expect(substack).toHaveAttribute('target', '_blank')
		for (const name of ['Dev.to', 'Medium', 'Hashnode']) {
			const chip = screen.getByRole('link', { name })
			expect(chip).toHaveClass('chip')
			expect(chip).toHaveAttribute('target', '_blank')
			expect(chip.getAttribute('rel')).toContain('noopener')
		}
		expect(screen.queryByRole('textbox')).toBeNull()
	})
})

describe('Landing', () => {
	it('orders intro, marquee, work, more projects, posts and contact', () => {
		const posts = [{ slug: 'p', title: 'A post', publishedAt: '2026-01-01', tags: [] }]
		const { container } = render(<Landing posts={posts} />)
		const blocks = [...container.querySelectorAll('section, .marquee')]
			.filter((s) => !s.closest('li'))
			.map((s) => s.id === 'work' ? '#work' : s.getAttribute('aria-label') || s.getAttribute('aria-labelledby'))
		expect(blocks).toEqual(['Introduction', 'Tools I work with', '#work', 'more-title', 'posts-title', 'contact-title'])
		expect(screen.getByRole('link', { name: `New ${featured[0].name} now has an Android app` })).toBeInTheDocument()
		expect(screen.getAllByRole('article')).toHaveLength(featured.length + tools.length)
	})

	it('previews the next five projects not shown above and links to all of them', () => {
		const { container } = render(<Landing posts={[]} />)
		const shown = new Set([...featured, ...tools].map((p) => p.slug))
		const expected = projects.filter((p) => !shown.has(p.slug)).slice(0, 5)
		const rows = container.querySelectorAll('.rows .row')
		expect(rows).toHaveLength(5)
		expect([...rows].map((r) => r.querySelector('.row-name').textContent)).toEqual(expected.map((p) => p.name))
		expect([...rows].map((r) => r.querySelector('.row-rank').textContent))
			.toEqual(expected.map((p) => String(projects.indexOf(p) + 1).padStart(2, '0')))
		// One link in the bento header, one under the list.
		const all = screen.getAllByRole('link', { name: `All ${projects.length} projects` })
		expect(all).toHaveLength(2)
		for (const a of all) expect(a).toHaveAttribute('href', '/routes/projects')
		expect(container.querySelector('.more-link')).toBe(all[1])
	})

	it('hides the posts section when there are no posts', () => {
		render(<Landing posts={[]} />)
		expect(screen.queryByRole('region', { name: 'Fresh writing' })).toBeNull()
		expect(screen.getByRole('region', { name: 'Have an idea?' })).toBeInTheDocument()
	})
})
