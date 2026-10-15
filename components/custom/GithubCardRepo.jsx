import React, { useEffect, useState } from 'react'
import { SiGithub } from 'react-icons/si'
import { ArrowUpRight, GitFork, Star } from 'lucide-react'

const LANGUAGE_COLORS = {
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	Shell: '#89e051',
	HTML: '#e34c26',
	CSS: '#563d7c',
	Java: '#b07219',
	Python: '#3572a5'
}

// A repository card for MDX: `<GithubCardRepository>owner/repo</GithubCardRepository>`.
// If the GitHub API is unavailable (rate limits), it still links to the repo.
export default function GithubCardRepository ({ children }) {
	const slug = String(children).trim()
	const [repo, setRepo] = useState(null)
	const [state, setState] = useState('loading')

	useEffect(() => {
		let gone = false
		fetch(`https://api.github.com/repos/${slug}`)
			.then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
			.then((data) => { if (!gone) { setRepo(data); setState('ready') } })
			.catch(() => { if (!gone) setState('failed') })
		return () => { gone = true }
	}, [slug])

	const [owner, name] = slug.split('/')
	const href = repo?.html_url || `https://github.com/${slug}`

	return (
		<a className="gh-card" href={href} target="_blank" rel="noopener noreferrer" aria-busy={state === 'loading'}>
			<span className="gh-top">
				<span className="gh-icon" aria-hidden="true"><SiGithub /></span>
				<span className="gh-title">
					<span className="gh-owner">{owner} /</span>
					<span className="gh-name">{repo?.name || name}</span>
				</span>
				<span className="gh-go" aria-hidden="true"><ArrowUpRight /></span>
			</span>
			{state === 'loading' && <span className="gh-skeleton" aria-hidden="true"><i /><i /></span>}
			{repo?.description && <span className="gh-desc">{repo.description}</span>}
			{state === 'failed' && <span className="gh-desc">View the source code on GitHub.</span>}
			{repo && (
				<span className="gh-meta">
					{repo.language && (
						<span><i className="gh-lang" style={{ background: LANGUAGE_COLORS[repo.language] || '#9292a2' }} />{repo.language}</span>
					)}
					<span><Star aria-hidden="true" />{repo.stargazers_count}<span className="sr-only"> stars</span></span>
					<span><GitFork aria-hidden="true" />{repo.forks_count}<span className="sr-only"> forks</span></span>
				</span>
			)}
		</a>
	)
}
