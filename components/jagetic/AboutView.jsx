import React, { useState } from 'react'
import Image from 'next/image'
import cvImage from '../../public/images/cv.jpg'

const TECH = {
	SiNodedotjs: 'Node.js', SiExpress: 'Express', SiReact: 'React', SiTypescript: 'TypeScript',
	SiDocker: 'Docker', SiJenkins: 'Jenkins', SiMongodb: 'MongoDB', SiRedis: 'Redis',
	SiRabbitmq: 'RabbitMQ', SiAngularjs: 'AngularJS', SiAmazonaws: 'AWS', SiPostgresql: 'Postgres',
	SiSocketdotio: 'Socket.io', SiHeroku: 'Heroku', SiIonic: 'Ionic', SiSencha: 'Sencha'
}

const JOBS = [
	{ period: 'October 2022 ~ Present', company: 'CodeMeUp / ext. Truedigital', role: 'Web developer', tech: ['SiNodedotjs', 'SiReact', 'SiTypescript', 'SiDocker'], desc: ['Smart TV apps on Tizen and webOS, plus a hospitality platform with Node.js and React.', 'CI/CD, Docker packaging, and AWS services for the SDK workflow.'] },
	{ period: 'March 2017 ~ October 2022', company: 'OBLO Living / RT-RK', role: 'Full stack developer, DevOps', tech: ['SiNodedotjs', 'SiMongodb', 'SiRedis', 'SiDocker', 'SiAmazonaws'], desc: ['Cloud IoT platform for Zigbee, Z-Wave and Wise devices, scaled toward a million MQTT clients.', 'EMQX, RabbitMQ, Redis, MongoDB replication, NGINX and Jenkins.'] },
	{ period: 'March 2016 ~ October 2017', company: 'Iguana Development', role: 'CEO, Full stack developer', tech: ['SiNodedotjs', 'SiMongodb', 'SiAngularjs'], desc: ['Realtime audience platform for sports arenas.', 'Architecture for high websocket load on AWS.'] },
	{ period: 'June 2016 ~ March 2017', company: 'Ploush GmbH', role: 'Full stack developer', tech: ['SiNodedotjs', 'SiMongodb', 'SiSocketdotio', 'SiAmazonaws'], desc: ['Same arena product: Node, Sails, MongoDB, Socket.io and AngularJS.'] },
	{ period: 'April 2015 ~ June 2016', company: 'Greensoft Ltd', role: 'Full stack, hybrid mobile', tech: ['SiNodedotjs', 'SiPostgresql', 'SiIonic'], desc: ['Agriculture production software and mobile tools for agronomists.', 'GIS data, unit tests, docs and AWS deploys.'] }
]

export default function AboutView () {
	const [open, setOpen] = useState(0)
	return (
		<div className="wrap">
			<div className="about page-head">
				<div className="about-side">
					<div className="about-photo">
						<Image src={cvImage} alt="Bojan Jagetić" fill sizes="180px" style={{ objectFit: 'cover' }} priority />
					</div>
					<h1 className="t-display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', marginTop: 32 }}>About</h1>
					<p className="t-lead">Full-stack engineer since 2015. I like products I can own from the database to the last pixel, and I keep a few of my own running at all times.</p>
					<div style={{ marginTop: 24 }}>
						<a className="btn btn-solid" href="/Bojan_Jagetić.pdf" download>
							<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
							Download CV
						</a>
					</div>
					<div className="about-links">
						{[['LinkedIn', 'https://linkedin.com/in/bojan-jagetic'], ['GitHub', 'https://github.com/basskibo'], ['Dev.to', 'https://dev.to/basskibo'], ['Medium', 'https://medium.com/@jagetic.bojan']].map(([label, href]) => (
							<a key={label} href={href} target="_blank" rel="noreferrer" className="chip">{label}</a>
						))}
					</div>
				</div>
				<section aria-labelledby="work-history">
					<h2 id="work-history" className="t-h2" style={{ marginBottom: 24 }}>Work</h2>
					<ol className="jobs">
						{JOBS.map((job, i) => {
							const isOpen = open === i
							return (
								<li key={job.company} className={`job${isOpen ? ' is-open' : ''}`}>
									<button type="button" className="job-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
										<span className="job-period">{job.period.replace(' ~ ', ' to ')}</span>
										<span className="job-company">{job.company}</span>
										<span className="job-role">{job.role}</span>
										<span className="row-plus" aria-hidden="true">
											<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
										</span>
									</button>
									{isOpen && (
										<div className="job-body bj-in">
											<ul>{job.desc.map((line) => <li key={line}>{line}</li>)}</ul>
											<div className="stack">
												{job.tech.map((id) => <span key={id}>{TECH[id] || id}</span>)}
											</div>
										</div>
									)}
								</li>
							)
						})}
					</ol>
				</section>
			</div>
		</div>
	)
}
