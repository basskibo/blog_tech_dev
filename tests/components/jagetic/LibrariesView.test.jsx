import { render, screen } from '@testing-library/react'
import LibrariesView from '@/components/jagetic/LibrariesView'

vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)

const lib = (slug, publishedAt, extra = {}) => ({ props: { data: { slug, title: `Lib ${slug}`, excerpt: `About ${slug}`, publishedAt, ...extra } } })

const links = () => screen.getAllByRole('link').filter((a) => a.getAttribute('href').startsWith('/libary/')).map((a) => a.getAttribute('href'))

describe('LibrariesView', () => {
	it('lists libraries newest first with a count', () => {
		render(<LibrariesView posts={[lib('a', '2020-01-01'), lib('b', '2023-01-01'), lib('c', '2021-06-01')]} />)
		expect(links()).toEqual(['/libary/b', '/libary/c', '/libary/a'])
		expect(screen.getByText('3')).toBeInTheDocument()
		expect(screen.getByText('01')).toBeInTheDocument()
	})

	it('shows the first technology without the Si prefix, else "Project"', () => {
		render(<LibrariesView posts={[lib('a', '2020-01-01', { technologies: ['SiReact', 'SiNodedotjs'] }), lib('b', '2019-01-01')]} />)
		expect(screen.getByText('React')).toBeInTheDocument()
		expect(screen.getByText('Project')).toBeInTheDocument()
	})

	it('handles missing/empty posts', () => {
		render(<LibrariesView posts={undefined} />)
		expect(screen.getByText('0')).toBeInTheDocument()
		expect(links()).toEqual([])
	})

	it('links to GitHub in a new tab', () => {
		render(<LibrariesView posts={[]} />)
		const gh = screen.getByText('All on GitHub ↗')
		expect(gh).toHaveAttribute('href', 'https://github.com/basskibo')
		expect(gh).toHaveAttribute('target', '_blank')
		expect(gh).toHaveAttribute('rel', 'noreferrer')
	})

	// Regression test — fixed bug (components/jagetic/LibrariesView.jsx:6): unlike BlogView, drafts
	// (`inPreparation: true`) are not filtered, so 4 unfinished library posts are
	// listed as normal clickable cards and counted in "REPOS & PACKAGES". The
	// previous LibaryCard/Masonary UI blurred & disabled them. Fix: add
	// `.filter((p) => !p.inPreparation)` (or render them disabled).
	it('hides inPreparation drafts', () => {
		render(<LibrariesView posts={[lib('live', '2020-01-01'), lib('draft', '2021-01-01', { inPreparation: true })]} />)
		expect(links()).toEqual(['/libary/live'])
	})
})
