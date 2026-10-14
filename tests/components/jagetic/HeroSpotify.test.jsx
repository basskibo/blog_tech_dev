import { act, fireEvent, render, screen } from '@testing-library/react'
import HeroSpotify from '@/components/jagetic/HeroSpotify'

const CHILLHOP = 'https://streams.fluxfm.de/Chillhop/mp3-128/'
const LOFI = 'https://stream.laut.fm/lofi'

let play
let pause
let load

function domError (name) {
	return Object.assign(new Error(name), { name })
}

beforeEach(() => {
	play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
	pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
	load = vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {})
})

afterEach(() => {
	vi.restoreAllMocks()
	vi.useRealTimers()
})

async function mount () {
	const utils = render(<HeroSpotify />)
	// flush the autoplay promise
	await act(async () => {})
	return { ...utils, audio: utils.container.querySelector('audio') }
}

describe('HeroSpotify playback', () => {
	it('autoplays the first station', async () => {
		const { audio } = await mount()
		expect(play).toHaveBeenCalledTimes(1)
		expect(audio.src).toBe(CHILLHOP)
		expect(audio.volume).toBe(0.8)
		expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
		expect(screen.getByText('Playing now')).toBeInTheDocument()
	})

	it('stays idle (not failed) when the browser blocks autoplay', async () => {
		play.mockRejectedValueOnce(domError('NotAllowedError'))
		await mount()
		expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
		expect(screen.getByText('Music for reading')).toBeInTheDocument()
		expect(screen.queryByText('Stream unavailable')).toBeNull()
		expect(screen.getAllByText('Chillhop').length).toBeGreaterThan(0)
	})

	it('shows "Stream unavailable" when autoplay fails for another reason', async () => {
		play.mockRejectedValueOnce(domError('NotSupportedError'))
		await mount()
		expect(screen.getByText('Stream unavailable')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
	})

	it('pause stops the stream, drops the src and does not report the resulting error', async () => {
		const { audio } = await mount()
		fireEvent.click(screen.getByRole('button', { name: 'Pause' }))
		expect(pause).toHaveBeenCalled()
		expect(load).toHaveBeenCalled()
		expect(audio.hasAttribute('src')).toBe(false)
		// Browsers fire `error` after load() with no src; that must be ignored once.
		fireEvent.error(audio)
		expect(screen.queryByText('Stream unavailable')).toBeNull()
		expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
	})

	it('play resumes the selected station', async () => {
		play.mockRejectedValueOnce(domError('NotAllowedError'))
		const { audio } = await mount()
		await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Play' })) })
		expect(play).toHaveBeenCalledTimes(2)
		expect(audio.src).toBe(CHILLHOP)
		expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument()
	})

	it('a manual play that fails shows the failed state', async () => {
		play.mockRejectedValueOnce(domError('NotAllowedError'))
		await mount()
		play.mockRejectedValueOnce(domError('NetworkError'))
		await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Play' })) })
		expect(screen.getByText('Stream unavailable')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
	})

	it('a stream error while playing switches to the failed state', async () => {
		const { audio } = await mount()
		fireEvent.error(audio)
		expect(screen.getByText('Stream unavailable')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
	})

	// Regression test — fixed bug (components/jagetic/HeroSpotify.jsx toggle/playStation): `stopping` is
	// only reset inside onError. Chrome/Firefox do NOT fire `error` for
	// removeAttribute('src') + load() (the resource selection algorithm just
	// aborts with NETWORK_EMPTY), so the flag stays true and the NEXT real stream
	// error after pause → play is swallowed: the UI keeps showing "LIVE" over
	// silence. Fix: set `stopping.current = false` at the start of playStation().
	it('reports a real stream error after a pause/play cycle', async () => {
		const { audio } = await mount()
		fireEvent.click(screen.getByRole('button', { name: 'Pause' }))
		// (no synthetic error here — real browsers don't emit one)
		await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Play' })) })
		fireEvent.error(audio)
		expect(screen.getByText('Stream unavailable')).toBeInTheDocument()
	})
})

describe('HeroSpotify station menu', () => {
	it('opens a listbox with all stations, current one selected', async () => {
		await mount()
		const trigger = screen.getByRole('button', { expanded: false, name: /Chillhop/ })
		fireEvent.click(trigger)
		expect(trigger).toHaveAttribute('aria-expanded', 'true')
		const options = screen.getAllByRole('option')
		expect(options.map((o) => o.textContent)).toEqual(['ChillhopLofi livestream', 'LofiLofi radio', 'ChilloutDowntempo'])
		expect(options[0]).toHaveAttribute('aria-selected', 'true')
	})

	it('picking a station while playing switches the stream and closes the menu', async () => {
		const { audio } = await mount()
		fireEvent.click(screen.getByRole('button', { name: /Chillhop/, expanded: false }))
		await act(async () => { fireEvent.click(screen.getByRole('option', { name: /Lofi radio/ })) })
		expect(screen.queryByRole('listbox')).toBeNull()
		expect(audio.src).toBe(LOFI)
		expect(play).toHaveBeenCalledTimes(2)
		expect(screen.getByText('Lofi radio')).toBeInTheDocument()
	})

	it('picking a station while stopped does not start playback', async () => {
		play.mockRejectedValueOnce(domError('NotAllowedError'))
		await mount()
		fireEvent.click(screen.getByRole('button', { name: /Chillhop/, expanded: false }))
		fireEvent.click(screen.getByRole('option', { name: /Downtempo/ }))
		expect(play).toHaveBeenCalledTimes(1)
		expect(screen.getByText('Downtempo')).toBeInTheDocument()
	})

	it('picking a station clears a previous failure', async () => {
		play.mockRejectedValueOnce(domError('NotSupportedError'))
		await mount()
		expect(screen.getByText('Stream unavailable')).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: /Chillhop/, expanded: false }))
		fireEvent.click(screen.getByRole('option', { name: /Lofi radio/ }))
		expect(screen.queryByText('Stream unavailable')).toBeNull()
	})

	it('closes on an outside pointerdown but not on an inside one', async () => {
		await mount()
		fireEvent.click(screen.getByRole('button', { name: /Chillhop/, expanded: false }))
		fireEvent.pointerDown(screen.getByRole('listbox'))
		expect(screen.getByRole('listbox')).toBeInTheDocument()
		fireEvent.pointerDown(document.body)
		expect(screen.queryByRole('listbox')).toBeNull()
	})
})

describe('HeroSpotify volume', () => {
	it('toggles the slider and applies the volume to the audio element', async () => {
		const { audio, container } = await mount()
		const toggle = screen.getByRole('button', { name: 'Volume' })
		expect(toggle).toHaveAttribute('aria-pressed', 'false')
		fireEvent.click(toggle)
		expect(toggle).toHaveAttribute('aria-pressed', 'true')
		const slider = screen.getByRole('slider', { name: 'Volume' })
		expect(slider).toHaveAttribute('tabindex', '0')
		fireEvent.change(slider, { target: { value: '0.25' } })
		expect(audio.volume).toBe(0.25)
		// unmuted icon has two "sound wave" arcs; muted draws an X
		expect(container.querySelector('button[aria-label="Volume"] path[d^="M16 9.2"]')).not.toBeNull()
		fireEvent.change(slider, { target: { value: '0' } })
		expect(audio.volume).toBe(0)
		expect(container.querySelector('button[aria-label="Volume"] path[d^="M16 9.5"]')).not.toBeNull()
	})

	it('a station switch keeps the chosen volume', async () => {
		const { audio } = await mount()
		fireEvent.click(screen.getByRole('button', { name: 'Volume' }))
		fireEvent.change(screen.getByRole('slider', { name: 'Volume' }), { target: { value: '0.4' } })
		fireEvent.click(screen.getByRole('button', { name: /Chillhop/, expanded: false }))
		await act(async () => { fireEvent.click(screen.getByRole('option', { name: /Lofi radio/ })) })
		expect(audio.volume).toBe(0.4)
	})
})

describe('HeroSpotify cover art by hour', () => {
	const at = (hour, minute = 0) => new Date(2024, 4, 10, hour, minute)

	async function coverAt (hour) {
		vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] })
		vi.setSystemTime(at(hour))
		const utils = await mount()
		const link = utils.container.querySelector('a[aria-label]')
		const result = { label: link.getAttribute('aria-label'), src: link.querySelector('img').getAttribute('src') }
		utils.unmount()
		vi.useRealTimers()
		return result
	}

	it.each([
		[0, 'Night', '/images/lofi/rain.jpg'],
		[4, 'Night', '/images/lofi/rain.jpg'],
		[5, 'Morning', '/images/lofi/morning.jpg'],
		[8, 'Morning', '/images/lofi/morning.jpg'],
		[9, 'Day', '/images/lofi/day.jpg'],
		[12, 'Day', '/images/lofi/day.jpg'],
		[13, 'Afternoon', '/images/lofi/afternoon.jpg'],
		[17, 'Evening', '/images/lofi/evening.jpg'],
		[20, 'Evening', '/images/lofi/evening.jpg'],
		[21, 'Night', '/images/lofi/rain.jpg'],
		[23, 'Night', '/images/lofi/rain.jpg']
	])('at %i:00 shows the %s cover', async (hour, label, src) => {
		expect(await coverAt(hour)).toEqual({ label, src })
	})

	it('updates the cover when the clock crosses a boundary (checked every minute)', async () => {
		vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] })
		vi.setSystemTime(at(8, 59))
		const { container } = await mount()
		const label = () => container.querySelector('a[aria-label]').getAttribute('aria-label')
		expect(label()).toBe('Morning')
		vi.setSystemTime(at(9, 0))
		act(() => { vi.advanceTimersByTime(60 * 1000) })
		expect(label()).toBe('Day')
	})

	it('clears the interval on unmount', async () => {
		vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] })
		const { unmount } = await mount()
		expect(vi.getTimerCount()).toBe(1)
		unmount()
		expect(vi.getTimerCount()).toBe(0)
	})

	it('cover link opens the current station site in a new tab', async () => {
		await mount()
		const link = document.querySelector('a[aria-label]')
		expect(link).toHaveAttribute('href', 'https://chillhop.com')
		expect(link).toHaveAttribute('target', '_blank')
	})
})
