import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from './home/Hero'
import FeaturedWork from './home/FeaturedWork'
import Spotlight from './home/Spotlight'
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
	<div style={{ overflowX: 'clip' }}>
		<Hero featured={featured} />
		<FeaturedWork projects={featured} />
		<Spotlight projects={spotlight} />
		<section className="sec" aria-labelledby="more-title">
			<div className="wrap">
				<div className="sec-head">
					<h2 id="more-title" className="sec-title">And more</h2>
					<p className="sec-sub">{allProjects.length} projects in total, ranked by how much fun they were.</p>
				</div>
				<ProjectIndex projects={more} rankOf={rankOf} />
				<Link href="/routes/projects" className="more-link" data-umami-event="landing-all-projects">All {allProjects.length} projects <ArrowRight aria-hidden="true" /></Link>
			</div>
		</section>
		<LatestPosts posts={posts} />
		<Contact />
	</div>
)

export default Landing
