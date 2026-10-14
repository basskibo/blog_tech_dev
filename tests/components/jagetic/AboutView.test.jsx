import { fireEvent, render, screen } from '@testing-library/react'
import AboutView from '@/components/jagetic/AboutView'

vi.mock('next/image', async () => (await import('../../helpers/next-mocks')).imageMock)

describe('AboutView', () => {
	it('renders the header, avatar and social links', () => {
		render(<AboutView />)
		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Curriculum Vitae')
		expect(screen.getByAltText('Bojan Jagetić')).toBeInTheDocument()
		for (const label of ['LinkedIn', 'GitHub', 'Dev.to', 'Medium']) {
			const a = screen.getByText(`${label} ↗`)
			expect(a.getAttribute('href')).toMatch(/^https:\/\//)
			expect(a).toHaveAttribute('target', '_blank')
		}
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
		const oblo = screen.getByRole('button', { name: /OBLO Living/ })
		fireEvent.click(oblo)
		expect(screen.getByText(/Cloud IoT platform/)).toBeInTheDocument()
		expect(screen.queryByText(/Smart TV apps on Tizen/)).toBeNull()
		fireEvent.click(oblo)
		expect(screen.queryByText(/Cloud IoT platform/)).toBeNull()
	})

	it('downloads the CV PDF through a temporary anchor', () => {
		const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
			expect(this.getAttribute('href')).toBe('/Bojan_Jagetić.pdf')
			expect(this.download).toBe('Bojan_Jagetić.pdf')
			expect(document.body.contains(this)).toBe(true)
		})
		render(<AboutView />)
		fireEvent.click(screen.getByRole('button', { name: /Download PDF/ }))
		expect(click).toHaveBeenCalledTimes(1)
		expect(document.querySelector('a[download]')).toBeNull()
		click.mockRestore()
	})
})
