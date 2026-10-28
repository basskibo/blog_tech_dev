import React from 'react'
import Hero from './home/Hero'
import Bento from './home/Bento'
import LatestPosts from './home/LatestPosts'
import Contact from './home/Contact'
import allProjects, { getFeaturedProjects, getSpotlightProjects } from '../lib/projects'

const featured = getFeaturedProjects()
const spotlight = getSpotlightProjects()

const Landing = ({ posts = [] }) => (
	<div className="home">
		<div className="wrap">
			<Hero featured={featured} />
		</div>
		<Bento featured={featured} tools={spotlight} total={allProjects.length} />
		<LatestPosts posts={posts} />
		<Contact />
	</div>
)

export default Landing
