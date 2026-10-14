import { act, fireEvent, render } from '@testing-library/react'
import Cursor from '@/components/jagetic/Cursor'

function setPointer (fine) {
	window.matchMedia = vi.fn((query) => ({
		matches: query === '(pointer: fine)' ? fine : false,
		media: query,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		addListener: vi.fn(),
		removeListener: vi.fn()
	}))
}

const originalMatchMedia = window.matchMedia

describe('Cursor', () => {
	let raf
	let caf

	beforeEach(() => {
		raf = vi.fn(() => 42)
		caf = vi.fn()
		vi.stubGlobal('requestAnimationFrame', raf)
		vi.stubGlobal('cancelAnimationFrame', caf)
	})

	afterEach(() => {
		window.matchMedia = originalMatchMedia
		vi.restoreAllMocks()
		vi.unstubAllGlobals()
		document.documentElement.classList.remove('bj-cursor')
	})

	it('on a coarse pointer (touch) it does not hijack the cursor or start an animation loop', () => {
		setPointer(false)
		const add = vi.spyOn(window, 'addEventListener')
		render(<Cursor />)
		expect(document.documentElement).not.toHaveClass('bj-cursor')
		expect(add).not.toHaveBeenCalledWith('mousemove', expect.anything(), expect.anything())
		expect(add.mock.calls.some(([type]) => type === 'mousemove')).toBe(false)
		fireEvent.mouseMove(window, { clientX: 5, clientY: 5 })
		expect(raf).not.toHaveBeenCalled()
		// The ring/dot are portaled but stay invisible (opacity is only set on mousemove).
		expect(document.querySelector('.bj-cursor-dot').style.opacity).toBe('')
	})

	// Runs queued animation frames until the loop stops re-scheduling itself.
	function flushFrames (max = 500) {
		let n = 0
		while (raf.mock.calls.length > n && n < max) {
			const cb = raf.mock.calls[n][0]
			n++
			act(() => { cb() })
		}
		return n
	}

	it('on a fine pointer it hides the native cursor and follows the mouse', () => {
		setPointer(true)
		render(<Cursor />)
		expect(document.documentElement).toHaveClass('bj-cursor')
		const dot = document.body.querySelector(':scope > .bj-cursor-dot')
		const ring = document.body.querySelector(':scope > .bj-cursor-ring')
		expect(dot).not.toBeNull()
		expect(ring).not.toBeNull()

		fireEvent.mouseMove(window, { clientX: 120, clientY: 80 })
		expect(dot.style.opacity).toBe('1')
		expect(ring.style.opacity).toBe('1')
		expect(raf).toHaveBeenCalled()
		act(() => { raf.mock.calls[0][0]() })
		expect(dot.style.transform).toBe('translate(120px, 80px) translate(-50%, -50%)')
	})

	it('the ring eases toward the pointer and the loop eventually settles', () => {
		setPointer(true)
		render(<Cursor />)
		const ring = document.querySelector('.bj-cursor-ring')
		fireEvent.mouseMove(window, { clientX: 300, clientY: 200 })
		const frames = flushFrames()
		expect(frames).toBeGreaterThan(1)
		expect(frames).toBeLessThan(500)
		const [, rx, ry] = ring.style.transform.match(/^translate\((-?[\d.]+)px, (-?[\d.]+)px\)/)
		expect(Number(rx)).toBeCloseTo(300, 0)
		expect(Number(ry)).toBeCloseTo(200, 0)
	})

	it('marks the ring hot over interactive elements', () => {
		setPointer(true)
		const { container } = render(<div><button type="button">b</button><p>text</p><Cursor /></div>)
		const ring = document.querySelector('.bj-cursor-ring')
		fireEvent.mouseOver(container.querySelector('button'))
		expect(ring).toHaveClass('is-hot')
		fireEvent.mouseOver(container.querySelector('p'))
		expect(ring).not.toHaveClass('is-hot')
	})

	it('cleans up listeners, the frame and the html class on unmount', () => {
		setPointer(true)
		const removeWin = vi.spyOn(window, 'removeEventListener')
		const removeDoc = vi.spyOn(document, 'removeEventListener')
		const { unmount } = render(<Cursor />)
		fireEvent.mouseMove(window, { clientX: 10, clientY: 10 })
		unmount()
		expect(caf).toHaveBeenCalledWith(42)
		expect(removeWin).toHaveBeenCalledWith('mousemove', expect.any(Function))
		expect(removeDoc).toHaveBeenCalledWith('mouseover', expect.any(Function))
		expect(document.documentElement).not.toHaveClass('bj-cursor')
		expect(document.querySelector('.bj-cursor-dot')).toBeNull()
	})
})
