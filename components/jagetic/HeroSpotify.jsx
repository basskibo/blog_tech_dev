import React, { useEffect, useRef, useState } from 'react'

const STATIONS = [
	{ id: 'chillhop', name: 'Chillhop', detail: 'Lofi livestream', src: 'https://streams.fluxfm.de/Chillhop/mp3-128/', href: 'https://chillhop.com' },
	{ id: 'lofi', name: 'Lofi', detail: 'Lofi radio', src: 'https://stream.laut.fm/lofi', href: 'https://laut.fm/lofi' },
	{ id: 'chillout', name: 'Chillout', detail: 'Downtempo', src: 'https://streams.fluxfm.de/chillout/mp3-128/', href: 'https://www.fluxfm.de/' }
]

const COVERS = [
	{ from: 5, src: '/images/lofi/morning.jpg', label: 'Morning' },
	{ from: 9, src: '/images/lofi/day.jpg', label: 'Day' },
	{ from: 13, src: '/images/lofi/afternoon.jpg', label: 'Afternoon' },
	{ from: 17, src: '/images/lofi/evening.jpg', label: 'Evening' },
	{ from: 21, src: '/images/lofi/rain.jpg', label: 'Night' }
]

function coverForHour (hour) {
	return [...COVERS].reverse().find((cover) => hour >= cover.from) || COVERS[COVERS.length - 1]
}

function SpeakerIcon ({ muted }) {
	return (
		<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M4 10v4h3.2L12 18V6L7.2 10H4z" fill="currentColor" />
			{muted ? (
				<path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			) : (
				<path d="M16 9.2a3.4 3.4 0 010 5.6M18.4 7a6.2 6.2 0 010 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
			)}
		</svg>
	)
}

export default function HeroSpotify () {
	const audioRef = useRef(null)
	const menuRef = useRef(null)
	const stopping = useRef(false)
	const [playing, setPlaying] = useState(false)
	const [failed, setFailed] = useState(false)
	const [station, setStation] = useState(STATIONS[0])
	const [volume, setVolume] = useState(0.8)
	const [menu, setMenu] = useState(false)
	const [volOpen, setVolOpen] = useState(false)
	const [cover, setCover] = useState(COVERS[2])

	useEffect(() => {
		const tick = () => setCover(coverForHour(new Date().getHours()))
		tick()
		const timer = setInterval(tick, 60 * 1000)
		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return undefined
		audio.src = STATIONS[0].src
		audio.volume = 0.8
		let gone = false
		audio.play().then(() => {
			if (!gone) setPlaying(true)
		}).catch((error) => {
			if (!gone && error?.name !== 'NotAllowedError') setFailed(true)
		})
		return () => { gone = true }
	}, [])

	useEffect(() => {
		if (audioRef.current) audioRef.current.volume = volume
	}, [volume])

	useEffect(() => {
		if (!menu) return undefined
		const close = (event) => {
			if (!menuRef.current?.contains(event.target)) setMenu(false)
		}
		window.addEventListener('pointerdown', close)
		return () => window.removeEventListener('pointerdown', close)
	}, [menu])

	const playStation = (next) => {
		const audio = audioRef.current
		if (!audio) return
		// Browsers don't always fire `error` after the stop in toggle(), so clear the
		// flag here or the next real stream error would be ignored.
		stopping.current = false
		setFailed(false)
		audio.src = next.src
		audio.volume = volume
		audio.play().then(() => setPlaying(true)).catch(() => {
			setPlaying(false)
			setFailed(true)
		})
	}

	const toggle = () => {
		const audio = audioRef.current
		if (!audio) return
		if (playing) {
			stopping.current = true
			audio.pause()
			audio.removeAttribute('src')
			audio.load()
			setPlaying(false)
			return
		}
		playStation(station)
	}

	const pickStation = (next) => {
		setStation(next)
		setMenu(false)
		setFailed(false)
		if (playing) playStation(next)
	}

	return (
		<div className="onair">
			<audio ref={audioRef} preload="none" onError={() => { if (stopping.current) { stopping.current = false; return } setPlaying(false); setFailed(true) }} />
			<div className="onair-row">
				<a href={station.href} target="_blank" rel="noreferrer" aria-label={cover.label} className="onair-cover">
					<img src={cover.src} alt="" />
				</a>
				<div className="onair-text">
					<div className="onair-state">{playing ? 'Playing now' : 'Music for reading'}</div>
					<div className="onair-name">{failed ? 'Stream unavailable' : station.name}</div>
					<div className="onair-detail">{station.detail}</div>
				</div>
				<div className={`onair-eq${playing ? ' is-on' : ''}`} aria-hidden="true">
					{[0, 1, 2, 3].map((bar) => <span key={bar} style={{ animationDelay: `${bar * 0.12}s` }} />)}
				</div>
				<button type="button" className="onair-play" aria-label={playing ? 'Pause' : 'Play'} onClick={toggle}>
					{playing
						? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" /><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" /></svg>
						: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>}
				</button>
			</div>
			<div className="onair-foot">
				<div ref={menuRef} style={{ position: 'relative' }}>
					<button type="button" className="onair-pick" aria-expanded={menu} aria-haspopup="listbox" onClick={() => setMenu((open) => !open)}>
						{station.name}
						<svg viewBox="0 0 24 24" aria-hidden="true" style={{ transform: menu ? 'rotate(180deg)' : 'none' }}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
					</button>
					{menu && (
						<div role="listbox" className="onair-menu">
							{STATIONS.map((item) => {
								const on = item.id === station.id
								return (
									<button key={item.id} type="button" role="option" aria-selected={on} className="onair-option" onClick={() => pickStation(item)}>
										<b>{item.name}</b>
										<span>{item.detail}</span>
									</button>
								)
							})}
						</div>
					)}
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
					<div className="onair-vol" style={{ width: volOpen ? 84 : 0, opacity: volOpen ? 1 : 0 }}>
						<input
							aria-label="Volume"
							type="range"
							min="0"
							max="1"
							step="0.05"
							value={volume}
							tabIndex={volOpen ? 0 : -1}
							onChange={(event) => setVolume(Number(event.target.value))}
						/>
					</div>
					<button type="button" className="icon-btn" style={{ width: 34, height: 34 }} aria-label="Volume" aria-pressed={volOpen} onClick={() => setVolOpen((open) => !open)}>
						<SpeakerIcon muted={volume === 0} />
					</button>
				</div>
			</div>
		</div>
	)
}
