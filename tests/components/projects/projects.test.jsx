import React from 'react'
import { render, screen, within, fireEvent, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import projects, { countByKind, getFeaturedProjects } from '@/lib/projects'

vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)
vi.mock('next/image', async () => (await import('../../helpers/next-mocks')).imageMock)
vi.mock('next/head', () => ({ default: ({ children }) => <>{children}</> }))

const { default: ProjectRow, StatusBadge } = await import('../../../components/projects/ProjectRow')
const { default: ProjectIndex } = await import('../../../components/projects/ProjectIndex')
const { default: ProjectVisual } = await import('../../../components/projects/ProjectVisual')
const { default: ProjectsPage } = await import('../../../pages/routes/projects')

const bySlug = (slug) => projects.find((p) => p.slug === slug)

describe('ProjectVisual', () => {
	it('uses the screenshot when there is one', () => {
		render(<ProjectVisual project={bySlug('coinsel')} />)
		expect(screen.getByRole('img', { name: 'Coinsel screenshot' })).toHaveAttribute('src', '/images/projects/coinsel.webp')
	})

	it('draws a coloured cover when there is no screenshot', () => {
		render(<ProjectVisual project={bySlug('singularity')} />)
		const cover = screen.getByTestId('project-cover')
		expect(cover).toHaveTextContent('Singularity')
		expect(cover.style.getPropertyValue('--p')).toBe(bySlug('singularity').color)
	})
})

describe('StatusBadge', () => {
	it.each([
		['live', 'Live', 'status-live'],
		['in development', 'In development', 'status-in-development'],
		['archived', 'Archived', 'status-archived']
	])('%s', (status, label, cls) => {
		render(<StatusBadge status={status} />)
		expect(screen.getByText(label)).toHaveClass(cls)
	})
})

describe('ProjectRow', () => {
	const renderRow = (project, props = {}) => render(
		<ul><ProjectRow project={project} rank={4} open={false} onToggle={vi.fn()} {...props} /></ul>
	)

	it('shows the zero-padded rank, name, tagline and year', () => {
		renderRow(bySlug('gameroom'))
		const button = screen.getByRole('button')
		expect(button).toHaveTextContent('04')
		expect(button).toHaveTextContent('Gameroom')
		expect(button).toHaveTextContent('Browser games, nothing to install')
		expect(button).toHaveTextContent('2026')
		expect(button).toHaveAttribute('aria-expanded', 'false')
	})

	it('keeps closed details out of the tab order and the accessibility tree', () => {
		const { container } = renderRow(bySlug('gameroom'))
		const body = container.querySelector('.row-body')
		expect(body).toHaveAttribute('inert')
		expect(body).toHaveAttribute('aria-hidden', 'true')
		expect(screen.getByRole('button')).toHaveAttribute('aria-controls', body.id)
	})

	it('calls onToggle with the slug', async () => {
		const onToggle = vi.fn()
		renderRow(bySlug('gameroom'), { onToggle })
		await userEvent.click(screen.getByRole('button'))
		expect(onToggle).toHaveBeenCalledWith('gameroom')
	})

	it('shows live and code links when open', () => {
		renderRow(bySlug('gameroom'), { open: true })
		expect(screen.getByRole('link', { name: /open app/i })).toHaveAttribute('href', bySlug('gameroom').liveUrl)
		expect(screen.getByRole('link', { name: /code/i })).toHaveAttribute('href', bySlug('gameroom').repoUrl)
	})

	it('uses the custom live label for npm packages', () => {
		renderRow(bySlug('spotify-now-playing-card'), { open: true })
		expect(screen.getByRole('link', { name: /^npm/i })).toBeInTheDocument()
	})

	it('says the project is private when there is nothing public to link', () => {
		renderRow(bySlug('singularity'), { open: true })
		expect(screen.queryByRole('link')).toBeNull()
		expect(screen.getByText(/private for now/i)).toBeInTheDocument()
	})

	it('only mounts the preview image while open', () => {
		const { rerender } = renderRow(bySlug('coinsel'))
		expect(screen.queryByRole('img', { hidden: true })).toBeNull()
		rerender(<ul><ProjectRow project={bySlug('coinsel')} rank={1} open onToggle={vi.fn()} /></ul>)
		expect(screen.getByRole('img', { name: /coinsel screenshot/i })).toBeInTheDocument()
	})

	it('reports hover for the cursor preview', () => {
		const onPeek = vi.fn()
		const { container } = renderRow(bySlug('gameroom'), { onPeek })
		fireEvent.pointerEnter(container.querySelector('li'))
		expect(onPeek).toHaveBeenLastCalledWith(bySlug('gameroom'))
		fireEvent.pointerLeave(container.querySelector('li'))
		expect(onPeek).toHaveBeenLastCalledWith(null)
	})
})

describe('ProjectIndex', () => {
	const list = projects.slice(0, 4)

	it('opens one row at a time and closes it on a second click', async () => {
		render(<ProjectIndex projects={list} />)
		const [first, second] = screen.getAllByRole('button')
		await userEvent.click(first)
		expect(first).toHaveAttribute('aria-expanded', 'true')
		await userEvent.click(second)
		expect(first).toHaveAttribute('aria-expanded', 'false')
		expect(second).toHaveAttribute('aria-expanded', 'true')
		await userEvent.click(second)
		expect(second).toHaveAttribute('aria-expanded', 'false')
	})

	it('uses rankOf for the numbers', () => {
		render(<ProjectIndex projects={list.slice(2)} rankOf={(p) => projects.indexOf(p) + 1} />)
		expect(screen.getAllByRole('button')[0]).toHaveTextContent('03')
	})

	it('moves the preview with the pointer and hides it for the open row', async () => {
		const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { cb(0); return 1 })
		const { container } = render(<ProjectIndex projects={list} />)
		const peek = container.querySelector('.peek')
		const row = container.querySelectorAll('li')[0]
		fireEvent.pointerEnter(row)
		expect(peek).toHaveClass('is-on')
		act(() => { window.dispatchEvent(new MouseEvent('pointermove', { clientX: 100, clientY: 300 })) })
		expect(peek.style.transform).toBe('translate(128px, 200px) rotate(-2deg)')
		await userEvent.click(screen.getAllByRole('button')[0])
		expect(peek).not.toHaveClass('is-on')
		fireEvent.pointerLeave(row)
		expect(peek).not.toHaveClass('is-on')
		raf.mockRestore()
	})

	it('can turn the preview off', () => {
		const { container } = render(<ProjectIndex projects={list} peek={false} />)
		expect(container.querySelector('.peek')).toBeNull()
	})
})

describe('Projects page', () => {
	const rows = () => screen.getAllByRole('button').filter((b) => b.hasAttribute('aria-expanded'))

	it('shows the three featured projects in the launcher', () => {
		render(<ProjectsPage />)
		expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument()
		expect(screen.getByText(new RegExp(`^${projects.length} things I have built`))).toBeInTheDocument()
		const tablist = screen.getByRole('tablist', { name: 'Featured projects' })
		const featured = getFeaturedProjects()
		const tabs = within(tablist).getAllByRole('tab')
		expect(tabs.map((t) => t.querySelector('.tile-name').textContent)).toEqual(featured.map((p) => p.name))
		expect(within(screen.getByRole('tabpanel')).getByRole('heading', { level: 2 })).toHaveTextContent(featured[0].name)
		// The page has its own count in the header, so the launcher shows no "All projects" tile.
		expect(screen.queryByRole('link', { name: /all projects/i })).toBeNull()
	})

	it('lists every project, ranked, under "Everything"', () => {
		render(<ProjectsPage />)
		expect(screen.getByRole('heading', { level: 2, name: 'Everything' })).toBeInTheDocument()
		expect(rows()).toHaveLength(projects.length)
		expect(rows().every((b) => b.getAttribute('aria-expanded') === 'false')).toBe(true)
		expect(rows().map((b) => b.querySelector('.row-rank').textContent))
			.toEqual(projects.map((_, i) => String(i + 1).padStart(2, '0')))
	})

	it('filters by kind and shows counts', async () => {
		render(<ProjectsPage />)
		const counts = countByKind(projects)
		const filters = screen.getByRole('group', { name: /filter projects by kind/i })
		const all = within(filters).getByRole('button', { name: new RegExp(`^All ${projects.length}$`) })
		expect(all).toHaveAttribute('aria-pressed', 'true')
		const ai = within(filters).getByRole('button', { name: new RegExp(`^AI ${counts.AI}$`) })
		await userEvent.click(ai)
		expect(ai).toHaveAttribute('aria-pressed', 'true')
		expect(all).toHaveAttribute('aria-pressed', 'false')
		expect(rows()).toHaveLength(counts.AI)
		await userEvent.click(all)
		expect(rows()).toHaveLength(projects.length)
	})

	it('keeps the global rank when filtered', async () => {
		render(<ProjectsPage />)
		await userEvent.click(screen.getByRole('button', { name: /^Game \d+$/ }))
		const rank = projects.findIndex((p) => p.kind === 'Game') + 1
		expect(rows()[0]).toHaveTextContent(String(rank).padStart(2, '0'))
	})
})
