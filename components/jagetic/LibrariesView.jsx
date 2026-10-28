import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { sortByDate } from './format'

export default function LibrariesView ({ posts }) {
	const items = sortByDate((posts || []).map((p) => p.data || p.props?.data || p).filter((p) => p && !p.inPreparation))
	return (
		<div className="wrap">
			<header className="page-head bj-in">
				<h1 className="t-display">Open <span className="t-serif t-grad">source</span></h1>
				<p className="t-lead">npm modules, boilerplates, scripts and agent skills I published as open source. {items.length} write-ups, each one used in my own projects first, covering what it does and how to use it.</p>
				<a className="btn btn-ghost" style={{ marginTop: 24 }} href="https://github.com/basskibo" target="_blank" rel="noreferrer">
					Everything on GitHub <ArrowUpRight aria-hidden="true" />
				</a>
			</header>
			<ol className="guide" style={{ marginTop: 48 }}>
				{items.map((item) => (
					<li key={item.slug} className="guide-row">
						<Link href={`/libary/${item.slug}`} className="guide-link">
							<span className="guide-date"><span>{item.technologies?.[0]?.replace?.(/^Si/, '') || 'Project'}</span></span>
							<span className="guide-main">
								<span className="guide-title">{item.title}</span>
								{item.excerpt && <span className="guide-excerpt">{item.excerpt}</span>}
							</span>
							<span className="guide-meta" />
						</Link>
					</li>
				))}
			</ol>
		</div>
	)
}
