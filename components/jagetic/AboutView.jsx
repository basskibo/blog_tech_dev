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
	const download = () => {
		const link = document.createElement('a')
		link.href = '/Bojan_Jagetić.pdf'
		link.download = 'Bojan_Jagetić.pdf'
		document.body.appendChild(link)
		link.click()
		link.remove()
	}
	return (
		<div className="bj-screen bj-in">
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 56, alignItems: 'start' }}>
				<div style={{ position: 'sticky', top: 120 }}>
					<div style={{ width: 220, height: 220, borderRadius: '50%', padding: 7, background: 'conic-gradient(var(--acc), var(--line), var(--acc))' }}>
						<div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '5px solid var(--bg)', position: 'relative' }}>
							<Image src={cvImage} alt="Bojan Jagetić" fill style={{ objectFit: 'cover' }} />
						</div>
					</div>
					<h1 className="bj-display" style={{ fontSize: 'clamp(48px, 5.6vw, 80px)' }}>Curriculum <span className="bj-serif">Vitae</span></h1>
					<p style={{ color: 'var(--mut)', fontSize: 17, lineHeight: 1.6, maxWidth: 440 }}>I&apos;m passionate about coding and constantly pushing myself to improve. Working with a wide range of technologies keeps me inspired and eager to take on the next big idea.</p>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
						<button type="button" onClick={download} style={{ height: 52, padding: '0 24px', borderRadius: 99, border: 'none', background: 'var(--acc)', color: '#0b0c10', fontWeight: 700 }}>↓ Download PDF</button>
					</div>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
						{[['LinkedIn', 'https://linkedin.com/in/bojan-jagetic'], ['GitHub', 'https://github.com/basskibo'], ['Dev.to', 'https://dev.to/basskibo'], ['Medium', 'https://medium.com/@jagetic.bojan']].map(([label, href]) => (
							<a key={label} href={href} target="_blank" rel="noreferrer" className="bj-mono" style={{ fontSize: 12, color: 'var(--mut)', padding: '8px 12px', borderRadius: 99, border: '1px solid var(--line)' }}>{label} ↗</a>
						))}
					</div>
				</div>
				<div style={{ position: 'relative', paddingLeft: 28 }}>
					<div style={{ position: 'absolute', left: 6, top: 10, bottom: 10, width: 2, background: 'linear-gradient(var(--acc), var(--line))' }} />
					{JOBS.map((job, i) => {
						const isOpen = open === i
						return (
							<div key={job.company} style={{ position: 'relative', marginBottom: 14 }}>
								<div style={{ position: 'absolute', left: -29, top: 28, width: 12, height: 12, borderRadius: '50%', background: isOpen ? 'var(--acc)' : 'var(--line)', border: '3px solid var(--bg)' }} />
								<button type="button" onClick={() => setOpen(isOpen ? -1 : i)} style={{ width: '100%', textAlign: 'left', padding: 24, borderRadius: 26, border: '1px solid var(--line)', background: isOpen ? 'var(--bg2)' : 'transparent', color: 'var(--ink)' }}>
									<span className="bj-mono" style={{ fontSize: 12, color: 'var(--mut)' }}>{job.period}</span>
									<span style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 8 }}>
										<span style={{ font: "700 24px/1.15 'Bricolage Grotesque',sans-serif" }}>{job.company}</span>
										<span style={{ fontSize: 22, color: 'var(--mut)', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}>+</span>
									</span>
									<span style={{ display: 'block', marginTop: 8, color: 'var(--accT)', fontWeight: 500 }}>{job.role}</span>
									{isOpen && (
										<span style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14, animation: 'bjIn .4s both' }}>
											{job.desc.map((line) => <span key={line} style={{ color: 'var(--mut)', lineHeight: 1.55 }}>— {line}</span>)}
											<span style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
												{job.tech.map((id) => <span key={id} className="bj-mono" style={{ fontSize: 11, padding: '5px 9px', borderRadius: 99, border: '1px solid var(--line)' }}>{TECH[id] || id}</span>)}
											</span>
										</span>
									)}
								</button>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
