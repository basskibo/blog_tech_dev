// @vitest-environment node
import handler from '../../pages/api/views'
import { mockReq, mockRes } from '../helpers/http'

describe('/api/views', () => {
	beforeEach(() => {
		vi.spyOn(console, 'log').mockImplementation(() => {})
	})
	afterEach(() => vi.restoreAllMocks())

	it('acknowledges a POST with { status: "ok" }', async () => {
		const res = mockRes()
		await handler(mockReq({ method: 'POST' }), res)
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.send).toHaveBeenCalledWith({ status: 'ok' })
		expect(res.responses).toHaveLength(1)
	})

	// Regression test — fixed bug (pages/api/views.js:4): logs full req.headers — PII/secret leakage into logs.
	it('does not log request headers', async () => {
		await handler(mockReq({ method: 'POST', headers: { cookie: 'session=secret' } }), mockRes())
		const logged = console.log.mock.calls.flat().map((a) => JSON.stringify(a) ?? String(a)).join(' ')
		expect(logged).not.toContain('session=secret')
	})

	// Regression test — fixed bug (pages/api/views.js): no method check — GET/DELETE are answered 200.
	it('rejects non-POST methods with 405', async () => {
		const res = mockRes()
		await handler(mockReq({ method: 'DELETE' }), res)
		expect(res.status).toHaveBeenCalledWith(405)
		expect(res.setHeader).toHaveBeenCalledWith('Allow', 'POST')
		expect(res.responses).toHaveLength(1)
	})
})
