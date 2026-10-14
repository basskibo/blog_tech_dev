import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from './home/Hero'
import Marquee from './home/Marquee'
import Bento from './home/Bento'
import LatestPosts from './home/LatestPosts'
import Contact from './home/Contact'
import ProjectIndex from './projects/ProjectIndex'
import allProjects, { getFeaturedProjects, getSpotlightProjects } from '../lib/projects'

const featured = getFeaturedProjects()
const spotlight = getSpotlightProjects()
const shown = new Set([...featured, ...spotlight].map((project) => project.slug))
const more = allProjects.filter((project) => !shown.has(project.slug)).slice(0, 5)
const rankOf = (project) => allProjects.indexOf(project) + 1

const Landing = ({ posts = [] }) => (
	<div className="home">
		<div className="wrap">
			<Hero featured={featured} />
		</div>
		<Marquee />
		<Bento featured={featured} tools={spotlight} total={allProjects.length} />
		<section className="sec" aria-labelledby="more-title">
			<div className="wrap">
				<div className="sec-head">
					<h2 id="more-title" className="t-h2">More <span className="t-serif" style={{ color: 'var(--pink)' }}>projects</span></h2>
					<p className="t-mut" style={{ margin: 0 }}>Ranked by how much fun they were to build.</p>
				</div>
				<ProjectIndex projects={more} rankOf={rankOf} />
				<Link href="/routes/projects" className="more-link" data-umami-event="landing-all-projects-list">All {allProjects.length} projects <ArrowRight aria-hidden="true" /></Link>
			</div>
		</section>
		<LatestPosts posts={posts} />
		<Contact />
	</div>
)

export default Landing
