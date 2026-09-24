import React from 'react'
import Link from 'next/link'
import { sortByDate } from './format'

export default function LibrariesView ({ posts }) {
	const items = sortByDate((posts || []).map((p) => p.data || p.props?.data || p).filter(Boolean))
	return (
		<div className="bj-screen bj-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 56, alignItems: 'start' }}>
			<div style={{ position: 'sticky', top: 120 }}>
				<div className="bj-kicker">Projects & libraries</div>
				<h1 className="bj-display">Things I <span className="bj-serif">ship.</span></h1>
				<p style={{ color: 'var(--mut)', fontSize: 17, lineHeight: 1.6, maxWidth: 420 }}>npm modules, boilerplates and scripts. Open source, and used in my own projects first.</p>
				<div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 32 }}>
					<span style={{ font: "800 88px/1 'Bricolage Grotesque',sans-serif", letterSpacing: '-.06em' }}>{items.length}</span>
					<span className="bj-mono" style={{ fontSize: 12, color: 'var(--mut)' }}>REPOS & PACKAGES</span>
				</div>
				<a href="https://github.com/basskibo" target="_blank" rel="noreferrer" style={{ marginTop: 24, height: 50, padding: '0 22px', borderRadius: 99, border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', fontWeight: 600 }}>All on GitHub ↗</a>
			</div>
			<div>
				{items.map((item, i) => (
					<Link key={item.slug} href={`/libary/${item.slug}`} style={{ position: 'sticky', top: 110 + i * 14, minHeight: 280, marginBottom: 24, borderRadius: 32, overflow: 'hidden', background: 'var(--bg2)', border: '1px solid var(--line)', boxShadow: '0 -24px 50px -24px rgba(0,0,0,.55)', display: 'block' }}>
						{item.featuredImage && <div style={{ height: 160, background: `center/cover url(${item.featuredImage})` }} />}
						<div style={{ padding: 28 }}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<span className="bj-mono" style={{ fontSize: 11, fontWeight: 600, padding: '7px 11px', borderRadius: 99, background: 'var(--acc)', color: '#0b0c10' }}>{item.technologies?.[0]?.replace?.(/^Si/, '') || 'Project'}</span>
								<span style={{ font: "800 56px/1 'Bricolage Grotesque',sans-serif", opacity: 0.14 }}>{String(i + 1).padStart(2, '0')}</span>
							</div>
							<div style={{ font: "700 26px/1.08 'Bricolage Grotesque',sans-serif", letterSpacing: '-.03em', marginTop: 12 }}>{item.title}</div>
							<div style={{ color: 'var(--mut)', marginTop: 8, lineHeight: 1.5 }}>{item.excerpt}</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
