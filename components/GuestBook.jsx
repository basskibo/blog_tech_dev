import Giscus from '@giscus/react'
import React from 'react'

const GuestBook = () => {
	return (
		<div className="wrap">
			<header className="page-head bj-in">
				<h1 className="t-display">Guest <span className="t-serif t-grad">book</span></h1>
				<p className="t-lead">Leave a message, a question or a suggestion. You sign in with GitHub to comment.</p>
			</header>
			<div className="guestbook">
				<Giscus
					id="giscus-comments"
					repo="basskibo/blog_tech_dev"
					repoId="R_kgDOGqrOnQ"
					categoryId="DIC_kwDOGqrOnc4COCwF"
					mapping="pathname"
					strict="0"
					reactionsEnabled="1"
					emitMetadata="0"
					inputPosition="bottom"
					theme="transparent_dark"
					lang="en"
					loading="lazy"
				/>
			</div>
		</div>
	)
}

export default GuestBook
