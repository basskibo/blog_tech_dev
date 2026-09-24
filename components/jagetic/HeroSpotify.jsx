import React, { useEffect, useState } from 'react'

const FALLBACK = 'https://open.spotify.com/user/4g1ztvqi3z5mf0uqx87bz9exk'

export default function HeroSpotify () {
	const [track, setTrack] = useState(null)
	const [paused, setPaused] = useState(false)

	useEffect(() => {
		let stop = false
		const load = () => {
			fetch('/api/spotify')
				.then((res) => (res.ok ? res.json() : null))
				.then((data) => { if (!stop) setTrack(data) })
				.catch(() => { if (!stop) setTrack({ isPlaying: false }) })
		}
		load()
		const timer = setInterval(load, 30000)
		return () => { stop = true; clearInterval(timer) }
	}, [])

	const playing = Boolean(track?.isPlaying) && !paused
	const title = track?.title || 'Not playing'
	const artist = track?.artist || 'Spotify'
	const image = track?.albumImageUrl
	const href = track?.songUrl || FALLBACK

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 460, width: '100%', justifySelf: 'end' }}>
			<p style={{ font: "italic 400 clamp(22px, 2vw, 28px)/1.25 'Instrument Serif', serif", margin: 0 }}>
				“Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.”
			</p>
			<div style={{ padding: 14, borderRadius: 26, background: 'var(--glass)', backdropFilter: 'blur(22px) saturate(1.6)', border: '1px solid var(--line)', boxShadow: '0 30px 60px -30px rgba(0,0,0,.6)' }}>
				<div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
					<a href={href} target="_blank" rel="noreferrer" style={{ width: 60, height: 60, flex: 'none', borderRadius: 16, overflow: 'hidden', background: 'linear-gradient(135deg, oklch(0.7 0.09 262), oklch(0.7 0.09 205))', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "500 8px 'JetBrains Mono', monospace", color: 'rgba(255,255,255,.85)' }}>
						{image ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'ALBUM'}
					</a>
					<div style={{ flex: 1, minWidth: 0 }}>
						<div style={{ font: "600 10px 'JetBrains Mono', monospace", letterSpacing: '.12em', color: 'var(--accT)' }}>{playing ? 'NOW PLAYING · SPOTIFY' : 'SPOTIFY'}</div>
						<div style={{ font: "600 17px/1.2 'Bricolage Grotesque', sans-serif", marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
						<div style={{ font: "400 13px 'Bricolage Grotesque', sans-serif", color: 'var(--mut)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{artist}</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 22, flex: 'none' }}>
						{[0, 1, 2, 3].map((bar) => (
							<span key={bar} style={{ width: 3, height: 18, borderRadius: 2, background: 'var(--acc)', transformOrigin: 'bottom', animation: playing ? `bjEq 0.9s ${bar * 0.12}s ease-in-out infinite` : 'none', transform: playing ? undefined : 'scaleY(0.3)' }} />
						))}
					</div>
					<button type="button" aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPaused((value) => !value)} style={{ width: 46, height: 46, flex: 'none', borderRadius: '50%', border: 'none', background: 'var(--inv)', color: 'var(--invInk)', fontWeight: 700 }}>
						{playing ? '❚❚' : '▶'}
					</button>
				</div>
				<div style={{ height: 3, borderRadius: 3, background: 'var(--line)', marginTop: 12, overflow: 'hidden' }}>
					<div style={{ height: '100%', width: playing ? '68%' : '0%', background: 'var(--acc)', transition: 'width 1s linear' }} />
				</div>
			</div>
		</div>
	)
}
