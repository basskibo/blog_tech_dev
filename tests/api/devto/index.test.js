// @vitest-environment node
import handler from '../../../pages/api/devto/index'
import { mockReq, mockRes } from '../../helpers/http'

const article = (n, views) => ({
	title: `Post ${n}`,
	page_views_count: views,
	url: `https://dev.to/x/${n}`,
	public_reactions_count: n,
	cover_image: `https://img/${n}.png`,
	body_markdown: 'not exposed'
})

describe('/api/devto', () => {
	let fetchMock

	beforeEach(() => {
		fetchMock = vi.fn()
		vi.stubGlobal('fetch', fetchMock)
		vi.stubEnv('DEVTO_API_KEY', 'test-key')
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	afterEach(() => {
		vi.unstubAllGlobals()
		vi.unstubAllEnvs()
		vi.restoreAllMocks()
	})

	it('returns the top 3 articles by page views, mapped to the public shape', async () => {
		fetchMock.mockResolvedValue({ ok: true, json: async () => [article(1, 5), article(2, 50), article(3, 1), article(4, 20)] })
		const res = mockRes()
		await handler(mockReq(), res)

		expect(fetchMock).toHaveBeenCalledWith('https://dev.to/api/articles/me/published', expect.objectContaining({
			headers: expect.objectContaining({ 'api-key': 'test-key' })
		}))
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json.mock.calls[0][0]).toEqual([
			{ title: 'Post 2', pageViews: 50, url: 'https://dev.to/x/2', publicReactions: 2, img: 'https://img/2.png' },
			{ title: 'Post 4', pageViews: 20, url: 'https://dev.to/x/4', publicReactions: 4, img: 'https://img/4.png' },
			{ title: 'Post 1', pageViews: 5, url: 'https://dev.to/x/1', publicReactions: 1, img: 'https://img/1.png' }
		])
	})

	it('returns fewer than 3 when there are fewer articles', async () => {
		fetchMock.mockResolvedValue({ ok: true, json: async () => [article(1, 1)] })
		const res = mockRes()
		await handler(mockReq(), res)
		expect(res.json.mock.calls[0][0]).toHaveLength(1)
	})

	it('responds 500 when dev.to answers non-2xx', async () => {
		fetchMock.mockResolvedValue({ ok: false, status: 401 })
		const res = mockRes()
		await handler(mockReq(), res)
		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch or process data from Dev.to' })
	})

	it('responds 500 when the network call rejects', async () => {
		fetchMock.mockRejectedValue(new Error('ECONNRESET'))
		const res = mockRes()
		await handler(mockReq(), res)
		expect(res.status).toHaveBeenCalledWith(500)
	})

	it('responds 500 when dev.to returns a non-array body', async () => {
		fetchMock.mockResolvedValue({ ok: true, json: async () => ({ error: 'nope' }) })
		const res = mockRes()
		await handler(mockReq(), res)
		expect(res.status).toHaveBeenCalledWith(500)
	})

	it.each(['POST', 'PUT', 'DELETE'])('rejects %s with 405 without calling dev.to', async (method) => {
		const res = mockRes()
		await handler(mockReq({ method }), res)
		expect(res.status).toHaveBeenCalledWith(405)
		expect(fetchMock).not.toHaveBeenCalled()
	})
})
