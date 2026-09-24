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
	const [cover, setCover] = useState(() => coverForHour(new Date().getHours()))

	useEffect(() => {
		const tick = () => setCover(coverForHour(new Date().getHours()))
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
		<div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 460, width: '100%', justifySelf: 'end' }}>
			<p style={{ font: "italic 400 clamp(22px, 2vw, 28px)/1.25 'Instrument Serif', serif", margin: 0 }}>
				“Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.”
			</p>
			<div style={{ padding: 14, borderRadius: 26, background: 'var(--glass)', backdropFilter: 'blur(22px) saturate(1.6)', border: '1px solid var(--line)', boxShadow: '0 30px 60px -30px rgba(0,0,0,.6)' }}>
				<audio ref={audioRef} preload="none" onError={() => { if (stopping.current) { stopping.current = false; return } setPlaying(false); setFailed(true) }} />
				<div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
					<a href={station.href} target="_blank" rel="noreferrer" aria-label={cover.label} style={{ width: 60, height: 60, flex: 'none', borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(135deg, oklch(0.7 0.09 262), oklch(0.7 0.09 205))' }}>
						<img src={cover.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
					</a>
					<div style={{ flex: 1, minWidth: 0 }}>
						<div style={{ font: "600 10px 'JetBrains Mono', monospace", letterSpacing: '.12em', color: 'var(--accT)' }}>{playing ? 'LIVE · LOFI' : 'LOFI'}</div>
						<div style={{ font: "600 17px/1.2 'Bricolage Grotesque', sans-serif", marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{failed ? 'Stream unavailable' : station.name}</div>
						<div style={{ font: "400 13px 'Bricolage Grotesque', sans-serif", color: 'var(--mut)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{station.detail}</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 22, flex: 'none' }}>
						{[0, 1, 2, 3].map((bar) => (
							<span key={bar} style={{ width: 3, height: 18, borderRadius: 2, background: 'var(--acc)', transformOrigin: 'bottom', animation: playing ? `bjEq 0.9s ${bar * 0.12}s ease-in-out infinite` : 'none', transform: playing ? undefined : 'scaleY(0.3)' }} />
						))}
					</div>
					<button type="button" aria-label={playing ? 'Pause' : 'Play'} onClick={toggle} style={{ width: 46, height: 46, flex: 'none', borderRadius: '50%', border: 'none', background: 'var(--inv)', color: 'var(--invInk)', fontWeight: 700 }}>
						{playing ? '❚❚' : '▶'}
					</button>
				</div>
				<div style={{ height: 3, borderRadius: 3, background: 'var(--line)', marginTop: 12, overflow: 'hidden' }}>
					<div style={{ height: '100%', width: '28%', background: 'var(--acc)', animation: playing ? 'bjLive 1.6s linear infinite' : 'none', transform: playing ? undefined : 'translateX(-100%)' }} />
				</div>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 12 }}>
					<div ref={menuRef} style={{ position: 'relative' }}>
						<button type="button" aria-expanded={menu} aria-haspopup="listbox" onClick={() => setMenu((open) => !open)} style={{ height: 32, padding: '0 12px', borderRadius: 99, border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8, font: "600 12px 'Bricolage Grotesque', sans-serif" }}>
							{station.name}
							<span style={{ fontSize: 9, opacity: 0.7, transform: menu ? 'rotate(180deg)' : 'none', transition: 'transform .25s' }}>▼</span>
						</button>
						{menu && (
							<div role="listbox" style={{ position: 'absolute', left: 0, bottom: 'calc(100% + 8px)', minWidth: 168, padding: 6, borderRadius: 18, background: 'var(--bg2)', border: '1px solid var(--line)', boxShadow: '0 18px 40px -18px rgba(0,0,0,.65)', animation: 'bjDrop .28s cubic-bezier(.2,.9,.3,1.2) both', zIndex: 4 }}>
								{STATIONS.map((item) => {
									const on = item.id === station.id
									return (
										<button key={item.id} type="button" role="option" aria-selected={on} onClick={() => pickStation(item)} style={{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 12, border: 'none', background: on ? 'var(--card)' : 'transparent', color: 'var(--ink)' }}>
											<div style={{ font: "600 13px 'Bricolage Grotesque', sans-serif" }}>{item.name}</div>
											<div style={{ font: "500 10px 'JetBrains Mono', monospace", color: 'var(--mut)', marginTop: 2 }}>{item.detail}</div>
										</button>
									)
								})}
							</div>
						)}
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
						<div style={{ width: volOpen ? 84 : 0, opacity: volOpen ? 1 : 0, overflow: 'hidden', transition: 'width .32s cubic-bezier(.2,.8,.2,1), opacity .22s' }}>
							<input
								aria-label="Volume"
								type="range"
								min="0"
								max="1"
								step="0.05"
								value={volume}
								tabIndex={volOpen ? 0 : -1}
								onChange={(event) => setVolume(Number(event.target.value))}
								style={{ width: 76, accentColor: 'var(--acc)', cursor: 'pointer' }}
							/>
						</div>
						<button type="button" aria-label="Volume" aria-pressed={volOpen} onClick={() => setVolOpen((open) => !open)} style={{ width: 32, height: 32, flex: 'none', borderRadius: '50%', border: '1px solid var(--line)', background: volOpen ? 'var(--inv)' : 'var(--card)', color: volOpen ? 'var(--invInk)' : 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<SpeakerIcon muted={volume === 0} />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
