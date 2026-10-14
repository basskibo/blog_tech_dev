import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { dailyItems } from './data/daily_use'

export default function DailyUses () {
	return (
		<div className="wrap">
			<header className="page-head">
				<h1 className="t-display">Uses</h1>
				<p className="t-lead">The hardware and software I work with every day.</p>
			</header>
			{dailyItems.map((section) => (
				<section key={section.category} className="uses-sec" aria-labelledby={`uses-${section.category}`}>
					<h2 id={`uses-${section.category}`} className="t-h3">{section.category}</h2>
					<ul className="uses-list">
						{section.entries.map((entry) => (
							<li key={entry.title} className="uses-item">
								<div>
									<h3 className="uses-name">{entry.title}</h3>
									<p className="t-mut">{entry.description}</p>
								</div>
								{entry.link && (
									<a className="icon-btn" href={entry.link} target="_blank" rel="noopener noreferrer" aria-label={`${entry.title} website`}>
										<ArrowUpRight aria-hidden="true" />
									</a>
								)}
							</li>
						))}
					</ul>
				</section>
			))}
		</div>
	)
}
