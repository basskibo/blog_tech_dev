import { render } from '@testing-library/react'
import * as page from '../../pages/category/[slug].js'

// The category page is a stub (its data functions are commented out).
describe('pages/category/[slug]', () => {
	it('renders an empty placeholder and has no data functions', () => {
		const { container } = render(<page.default />)
		expect(container.innerHTML).toBe('<div></div>')
		expect(page.getStaticProps).toBeUndefined()
		expect(page.getStaticPaths).toBeUndefined()
	})
})
