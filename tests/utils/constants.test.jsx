import { render } from '@testing-library/react'
import utilsConstants from 'utils/constants'
import libConstants from '@/lib/constants'

describe.each([
	['utils/constants', utilsConstants],
	['lib/constants', libConstants]
])('%s', (_name, constants) => {
	it('exposes the tech arrays with a name and a renderable icon', () => {
		for (const key of ['BEtechArray', 'FEtechArray', 'ideOstechArray']) {
			expect(Array.isArray(constants[key]), key).toBe(true)
			expect(constants[key].length, key).toBeGreaterThan(0)
			for (const item of constants[key]) {
				expect(typeof item.name, key).toBe('string')
				expect(typeof item.icon, `${key}:${item.name}`).toBe('function')
			}
		}
	})

	it('has a base64 blur placeholder image', () => {
		expect(constants.imageBlogURI).toMatch(/^data:image\/jpeg;base64,/)
	})

	it.each(['SiReact', 'SiNodedotjs', 'SiDocker', 'SiTypescript', 'SiGnubash'])('generateIcon(%s) renders an svg', (icon) => {
		const { container } = render(constants.generateIcon(icon))
		const span = container.querySelector('span')
		expect(span).toHaveClass('text-xl')
		expect(span.querySelector('svg')).not.toBeNull()
	})

	it('generateIcon renders an empty wrapper for an unknown icon', () => {
		const { container } = render(constants.generateIcon('NotAnIcon'))
		expect(container.querySelector('span')).not.toBeNull()
		expect(container.querySelector('svg')).toBeNull()
	})
})

describe('utils/constants only', () => {
	it('knows the cloudinary cloud name', () => {
		expect(utilsConstants.CLOUDINARY_CLOUD_NAME).toBe('dr1sm5gnj')
	})

	// Regression test — fixed bug (utils/constants.js:24,148): `SiMaterialui` no longer exists in the
	// installed react-icons (renamed to `SiMui`), so FEtechArray contains an entry
	// with `icon: undefined`. Any consumer doing `<tech.icon />` crashes. lib/constants
	// (the copy TechnologyStack actually uses) already dropped it. Fix: use `SiMui`
	// or delete the entry / the duplicated arrays.
	it('every FEtechArray entry has an icon component (SiMaterialui entry removed)', () => {
		for (const item of utilsConstants.FEtechArray) expect(typeof item.icon, item.name).toBe('function')
	})

	it.each(['DiExtjs', 'SiIos', 'SiAndroid', 'SiSpring'])('generateIcon(%s) renders an svg', (icon) => {
		const { container } = render(utilsConstants.generateIcon(icon))
		expect(container.querySelector('svg')).not.toBeNull()
	})
})
