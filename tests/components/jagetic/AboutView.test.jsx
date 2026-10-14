import { fireEvent, render, screen, within } from '@testing-library/react'
import AboutView from '@/components/jagetic/AboutView'

vi.mock('next/image', async () => (await import('../../helpers/next-mocks')).imageMock)

const job = (name) => screen.getByRole('button', { name })

describe('AboutView', () => {
	it('renders the header, avatar and social links', () => {
		render(<AboutView />)
		const h1 = screen.getByRole('heading', { level: 1, name: 'About me' })
		expect(h1.querySelector('span')).toHaveTextContent('me')
		expect(screen.getByRole('heading', { level: 2, name: 'Where I worked' })).toBeInTheDocument()
		const photo = screen.getByAltText('Bojan Jagetić')
		expect(photo.parentElement.tagName).toBe('SPAN')
		expect(photo.closest('.about-photo')).not.toBeNull()
		for (const label of ['LinkedIn', 'GitHub', 'Dev.to', 'Medium']) {
			const a = screen.getByRole('link', { name: label })
			expect(a.getAttribute('href')).toMatch(/^https:\/\//)
			expect(a).toHaveAttribute('target', '_blank')
			expect(a).toHaveAttribute('rel', 'noreferrer')
		}
	})

	it('offers the CV as a plain download link', () => {
		render(<AboutView />)
		const cv = screen.getByRole('link', { name: /download cv/i })
		expect(cv).toHaveAttribute('href', '/Bojan_Jagetić.pdf')
		expect(cv).toHaveAttribute('download')
	})

	it('lists every job as a button, with only the first expanded', () => {
		render(<AboutView />)
		const buttons = within(screen.getByRole('region', { name: 'Where I worked' })).getAllByRole('button')
		expect(buttons).toHaveLength(5)
		expect(buttons.map((b) => b.getAttribute('aria-expanded'))).toEqual(['true', 'false', 'false', 'false', 'false'])
		expect(buttons[0]).toHaveTextContent('October 2022 to Present')
	})

	it('opens the first job by default and shows its tech with friendly names', () => {
		render(<AboutView />)
		expect(screen.getByText(/Smart TV apps on Tizen/)).toBeInTheDocument()
		expect(screen.getByText('Node.js')).toBeInTheDocument()
		expect(screen.getByText('TypeScript')).toBeInTheDocument()
		expect(screen.queryByText(/Cloud IoT platform/)).toBeNull()
	})

	it('accordion: opening another job closes the first; clicking again collapses it', () => {
		render(<AboutView />)
		fireEvent.click(job(/OBLO Living/))
		expect(job(/OBLO Living/)).toHaveAttribute('aria-expanded', 'true')
		expect(job(/CodeMeUp/)).toHaveAttribute('aria-expanded', 'false')
		expect(screen.getByText(/Cloud IoT platform/)).toBeInTheDocument()
		expect(screen.queryByText(/Smart TV apps on Tizen/)).toBeNull()
		fireEvent.click(job(/OBLO Living/))
		expect(job(/OBLO Living/)).toHaveAttribute('aria-expanded', 'false')
		expect(screen.queryByText(/Cloud IoT platform/)).toBeNull()
		expect(screen.queryByText(/Smart TV apps on Tizen/)).toBeNull()
	})
})
