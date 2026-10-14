import { getStaticProps } from '../../pages/index'

describe('home getStaticProps', () => {
	it('passes the three newest posts as serialisable props', async () => {
		const { props } = await getStaticProps()
		expect(props.posts).toHaveLength(3)
		const dates = props.posts.map((p) => new Date(p.publishedAt).getTime())
		expect([...dates].sort((a, b) => b - a)).toEqual(dates)
		expect(JSON.parse(JSON.stringify(props))).toEqual(props)
	})
})
