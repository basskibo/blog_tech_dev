import { render, screen, within } from '@testing-library/react'
import LibrariesView from '@/components/jagetic/LibrariesView'

vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)

const lib = (slug, publishedAt, extra = {}) => ({ props: { data: { slug, title: `Lib ${slug}`, excerpt: `About ${slug}`, publishedAt, ...extra } } })

const links = () => screen.queryAllByRole('link').filter((a) => a.getAttribute('href').startsWith('/libary/')).map((a) => a.getAttribute('href'))

describe('LibrariesView', () => {
	it('renders the heading and a lead that mentions the count', () => {
		render(<LibrariesView posts={[lib('a', '2020-01-01'), lib('b', '2023-01-01')]} />)
		const h1 = screen.getByRole('heading', { level: 1, name: 'Open source' })
		expect(h1.querySelector('span')).toHaveTextContent('source')
		expect(screen.getByText(/2 write-ups/)).toBeInTheDocument()
	})

	it('lists libraries newest first as rows linking to their page', () => {
		render(<LibrariesView posts={[lib('a', '2020-01-01'), lib('b', '2023-01-01'), lib('c', '2021-06-01')]} />)
		expect(links()).toEqual(['/libary/b', '/libary/c', '/libary/a'])
		const rows = within(screen.getByRole('list')).getAllByRole('listitem')
		expect(rows).toHaveLength(3)
		expect(within(rows[0]).getByText('Lib b')).toBeInTheDocument()
		expect(within(rows[0]).getByText('About b')).toBeInTheDocument()
	})

	it('accepts the raw `data` shape and plain objects too', () => {
		render(<LibrariesView posts={[{ data: { slug: 'x', title: 'X', publishedAt: '2020-01-01' } }, { slug: 'y', title: 'Y', publishedAt: '2022-01-01' }]} />)
		expect(links()).toEqual(['/libary/y', '/libary/x'])
	})

	it('shows the first technology without the Si prefix, else "Project"', () => {
		render(<LibrariesView posts={[lib('a', '2020-01-01', { technologies: ['SiReact', 'SiNodedotjs'] }), lib('b', '2019-01-01')]} />)
		expect(screen.getByText('React')).toBeInTheDocument()
		expect(screen.getByText('Project')).toBeInTheDocument()
	})

	it('handles missing/empty posts', () => {
		render(<LibrariesView posts={undefined} />)
		expect(screen.getByText(/0 write-ups/)).toBeInTheDocument()
		expect(links()).toEqual([])
	})

	it('links to GitHub in a new tab', () => {
		render(<LibrariesView posts={[]} />)
		const gh = screen.getByRole('link', { name: /everything on github/i })
		expect(gh).toHaveAttribute('href', 'https://github.com/basskibo')
		expect(gh).toHaveAttribute('target', '_blank')
		expect(gh).toHaveAttribute('rel', 'noreferrer')
	})

	it('hides inPreparation drafts and does not count them', () => {
		render(<LibrariesView posts={[lib('live', '2020-01-01'), lib('draft', '2021-01-01', { inPreparation: true })]} />)
		expect(links()).toEqual(['/libary/live'])
		expect(screen.queryByText('Lib draft')).toBeNull()
		expect(screen.getByText(/1 write-ups/)).toBeInTheDocument()
	})
})
