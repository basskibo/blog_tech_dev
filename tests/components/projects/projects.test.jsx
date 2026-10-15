import React from 'react'
import { render, screen, within, fireEvent } from '@testing-library/react'
import projects, { countByKind, getFeaturedProjects, getSpotlightProjects } from '@/lib/projects'

vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)
vi.mock('next/image', async () => (await import('../../helpers/next-mocks')).imageMock)
vi.mock('next/head', () => ({ default: ({ children }) => <>{children}</> }))

const { default: ProjectCard, StatusBadge } = await import('../../../components/projects/ProjectCard')
const { default: ProjectVisual } = await import('../../../components/projects/ProjectVisual')
const { default: ProjectsPage } = await import('../../../pages/routes/projects')

const bySlug = (slug) => projects.find((p) => p.slug === slug)

describe('ProjectVisual', () => {
	it('uses the screenshot when there is one', () => {
		render(<ProjectVisual project={bySlug('coinsel')} />)
		expect(screen.getByRole('img', { name: 'Coinsel screenshot' })).toHaveAttribute('src', '/images/projects/coinsel.webp')
	})

	it('draws a quiet cover with initials when there is no screenshot', () => {
		render(<ProjectVisual project={bySlug('github-top-languages')} />)
		const cover = screen.getByTestId('project-cover')
		// The name is right below the cover in the card, so the cover only carries initials.
		expect(cover).not.toHaveTextContent('GitHub Top Languages')
		expect(cover.querySelector('.cover-mark')).toHaveTextContent('GT')
		expect(cover.querySelector('.cover-mark')).toHaveAttribute('aria-hidden', 'true')
		expect(cover.style.getPropertyValue('--p')).toBe(bySlug('github-top-languages').color)
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

describe('ProjectCard', () => {
	it('shows rank, status, kind, year, name, tagline and description', () => {
		const p = bySlug('gameroom')
		render(<ProjectCard project={p} rank={6} />)
		const card = screen.getByRole('article', { name: p.name })
		expect(card).toHaveTextContent('#06')
		expect(card).toHaveTextContent('Live')
		expect(card).toHaveTextContent(p.kind)
		expect(card).toHaveTextContent(String(p.year))
		expect(card).toHaveTextContent(p.tagline)
		expect(card).toHaveTextContent(p.description)
	})

	it('links the name to the live app and adds a separate code link', () => {
		const p = bySlug('gameroom')
		render(<ProjectCard project={p} />)
		const name = screen.getByRole('link', { name: p.name })
		expect(name).toHaveAttribute('href', p.liveUrl)
		expect(name).toHaveAttribute('target', '_blank')
		expect(name.getAttribute('rel')).toContain('noopener')
		expect(screen.getByRole('link', { name: `${p.name} source code on GitHub` })).toHaveAttribute('href', p.repoUrl)
		expect(screen.getByText('Open app')).toBeInTheDocument()
	})

	it('links to the code when there is no live app, without a duplicate code button', () => {
		const p = bySlug('network-arp-scanner')
		render(<ProjectCard project={p} />)
		expect(screen.getByRole('link', { name: p.name })).toHaveAttribute('href', p.repoUrl)
		expect(screen.getByText('View code')).toBeInTheDocument()
		expect(screen.queryByRole('link', { name: /source code on GitHub/ })).toBeNull()
	})

	it('uses the npm label for packages', () => {
		render(<ProjectCard project={bySlug('spotify-now-playing-card')} />)
		expect(screen.getByText('npm')).toBeInTheDocument()
	})

	it('says the project is private when there is nothing public to open', () => {
		const p = bySlug('singularity')
		render(<ProjectCard project={p} />)
		expect(screen.queryByRole('link')).toBeNull()
		expect(screen.getByRole('heading', { name: p.name })).toBeInTheDocument()
		expect(screen.getByText(/Private for now/)).toBeInTheDocument()
	})

	it('shows at most three technologies and how many more there are', () => {
		const p = bySlug('coinsel')
		render(<ProjectCard project={p} />)
		const tech = within(screen.getByRole('list', { name: 'Built with' })).getAllByRole('listitem').map((li) => li.textContent)
		expect(tech).toEqual([...p.tech.slice(0, 3), `+${p.tech.length - 3}`])
	})

	it('omits the rank when none is given', () => {
		const { container } = render(<ProjectCard project={bySlug('gameroom')} />)
		expect(container.querySelector('.pcard-rank')).toBeNull()
	})
})

describe('Projects page', () => {
	const cards = () => within(screen.getByRole('region', { name: 'Everything' })).queryAllByRole('article')
	const search = () => screen.getByRole('textbox', { name: 'Search projects' })

	it('shows the title, the project and live counts, and the featured bento', () => {
		render(<ProjectsPage />)
		expect(screen.getByRole('heading', { level: 1, name: 'Things I ship' })).toBeInTheDocument()
		const stats = screen.getByText('Projects', { selector: 'dt' }).closest('dl')
		expect(within(stats).getByText(String(projects.length))).toBeInTheDocument()
		expect(within(stats).getByText(String(projects.filter((p) => p.status === 'live').length))).toBeInTheDocument()

		const bento = screen.getByRole('region', { name: 'Featured projects' })
		expect(within(bento).getByRole('heading', { level: 2 })).toHaveClass('sr-only')
		const names = within(bento).getAllByRole('article').map((a) => within(a).getByRole('heading', { level: 3 }).textContent)
		expect(names).toEqual([...getFeaturedProjects(), ...getSpotlightProjects()].map((p) => p.name))
	})

	it('lists every project as a card in rank order', () => {
		render(<ProjectsPage />)
		expect(cards().map((c) => c.querySelector('.pcard-name').textContent)).toEqual(projects.map((p) => p.name))
		expect(cards()[0]).toHaveTextContent('#01')
	})

	it('filters by kind with counts and keeps the global rank', () => {
		render(<ProjectsPage />)
		const counts = countByKind(projects)
		const game = screen.getByRole('button', { name: new RegExp(`^Game\\s*${counts.Game}$`) })
		fireEvent.click(game)
		expect(game).toHaveAttribute('aria-pressed', 'true')
		expect(cards()).toHaveLength(counts.Game)
		const rank = projects.findIndex((p) => p.kind === 'Game') + 1
		expect(cards()[0]).toHaveTextContent(`#${String(rank).padStart(2, '0')}`)
	})

	it('searches name, tagline, description and tech, combined with the kind filter', () => {
		render(<ProjectsPage />)
		fireEvent.change(search(), { target: { value: 'ffmpeg' } })
		expect(cards().map((c) => c.querySelector('.pcard-name').textContent)).toEqual(projects.filter((p) => p.tech.includes('ffmpeg')).map((p) => p.name))
		fireEvent.click(screen.getByRole('button', { name: /^Library/ }))
		expect(cards()).toHaveLength(0)
		expect(screen.getByText(/No projects match/)).toHaveTextContent('No projects match “ffmpeg” in Library.')
	})

	it('clears the search, and the empty state resets everything', () => {
		render(<ProjectsPage />)
		fireEvent.change(search(), { target: { value: 'zzz-nothing' } })
		fireEvent.click(screen.getByRole('button', { name: 'Show all projects' }))
		expect(search()).toHaveValue('')
		expect(cards()).toHaveLength(projects.length)
		fireEvent.change(search(), { target: { value: 'map' } })
		fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
		expect(search()).toHaveValue('')
	})
})
