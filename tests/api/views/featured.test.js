// @vitest-environment node
import { mockReq, mockRes } from '../../helpers/http'

const prisma = vi.hoisted(() => ({
	PageViews: { findMany: vi.fn(), update: vi.fn(), create: vi.fn() },
	$disconnect: vi.fn()
}))

vi.mock('@prisma/client', () => ({
	PrismaClient: vi.fn(() => prisma)
}))

const { default: handler } = await import('../../../pages/api/views/featured')

function prismaError (code) {
	return Object.assign(new Error(`prisma ${code}`), { code })
}

describe('/api/views/featured', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.spyOn(console, 'log').mockImplementation(() => {})
		vi.spyOn(console, 'error').mockImplementation(() => {})
	})

	describe('POST (top 3 most viewed)', () => {
		it('returns the 3 most viewed pages', async () => {
			const rows = [{ name: 'a', views: 10 }, { name: 'b', views: 5 }, { name: 'c', views: 1 }]
			prisma.PageViews.findMany.mockResolvedValue(rows)
			const res = mockRes()
			await handler(mockReq({ method: 'POST' }), res)
			expect(prisma.PageViews.findMany).toHaveBeenCalledWith({ orderBy: { views: 'desc' }, take: 3 })
			expect(res.status).toHaveBeenCalledWith(200)
			expect(res.send).toHaveBeenCalledWith(rows)
		})

		// Regression test — fixed bug (pages/api/views/featured.js:30-36): `return err` in catch is overridden
		// by `return res.status(200).send(result)` in finally, so DB failures are
		// reported as 200 with an empty body. Fix: drop the finally-return, respond
		// 500 in catch.
		it('responds 500 when the query fails', async () => {
			prisma.PageViews.findMany.mockRejectedValue(new Error('db down'))
			const res = mockRes()
			await handler(mockReq({ method: 'POST' }), res)
			expect(res.responses.map((r) => r.status)).toEqual([500])
		})
	})

	describe('GET (increment a page view)', () => {
		it('increments the view count for the given title', async () => {
			prisma.PageViews.update.mockResolvedValue({ name: 'post', views: 2 })
			const res = mockRes()
			await handler(mockReq({ method: 'GET', query: { title: 'post' } }), res)
			expect(prisma.PageViews.update).toHaveBeenCalledWith({ data: { views: { increment: 1 } }, where: { name: 'post' } })
			expect(res.send).toHaveBeenCalledWith({ name: 'post', views: 2 })
			expect(res.responses).toHaveLength(1)
		})

		it('creates the row with 1 view when it does not exist yet (P2025)', async () => {
			prisma.PageViews.update.mockRejectedValue(prismaError('P2025'))
			prisma.PageViews.create.mockResolvedValue({ name: 'new', views: 1 })
			const res = mockRes()
			await handler(mockReq({ method: 'GET', query: { title: 'new' } }), res)
			expect(prisma.PageViews.create).toHaveBeenCalledWith({ data: { name: 'new', views: 1 } })
			expect(res.responses.map((r) => r.status)).toEqual([200])
			expect(res.body).toEqual({ name: 'new', views: 1 })
		})

		// Regression test — fixed bug (pages/api/views/featured.js:44-47 + 72-75): the early `return
		// res.status(404).send(...)` runs, then the finally block sends a SECOND
		// response (200, undefined). In Next this throws ERR_HTTP_HEADERS_SENT and
		// the client actually sees 200. It should be a single 400 response.
		it('responds exactly once with 400 when title is missing', async () => {
			const res = mockRes()
			await handler(mockReq({ method: 'GET', query: {} }), res)
			expect(res.responses).toHaveLength(1)
			expect(res.responses[0].status).toBe(400)
			expect(prisma.PageViews.update).not.toHaveBeenCalled()
			expect(prisma.$disconnect).toHaveBeenCalled()
		})

		it('responds 500 on a non-P2025 database error', async () => {
			prisma.PageViews.update.mockRejectedValue(prismaError('P1001'))
			const res = mockRes()
			await handler(mockReq({ method: 'GET', query: { title: 'x' } }), res)
			expect(prisma.PageViews.create).not.toHaveBeenCalled()
			expect(res.responses.map((r) => r.status)).toEqual([500])
		})

		// Regression test — the fallback create() failure used to be swallowed by a
		// return-in-finally and reported as 200 with no body.
		it('responds 500 (once) when the fallback create fails', async () => {
			prisma.PageViews.update.mockRejectedValue(prismaError('P2025'))
			prisma.PageViews.create.mockRejectedValue(new Error('unique violation'))
			const res = mockRes()
			await handler(mockReq({ method: 'GET', query: { title: 'x' } }), res)
			expect(res.responses.map((r) => r.status)).toEqual([500])
			expect(prisma.$disconnect).toHaveBeenCalled()
		})

		// KNOWN, intentionally unchanged (see the NOTE in the handler): GET
		// increments the counter, so crawlers/prefetches inflate views. Swapping
		// methods needs the callers updated too.
		it.fails('does not mutate data on GET (known, intentionally unchanged)', async () => {
			prisma.PageViews.update.mockResolvedValue({})
			await handler(mockReq({ method: 'GET', query: { title: 'x' } }), mockRes())
			expect(prisma.PageViews.update).not.toHaveBeenCalled()
		})
	})

	it('disconnects prisma after each request', async () => {
		prisma.PageViews.findMany.mockResolvedValue([])
		await handler(mockReq({ method: 'POST' }), mockRes())
		expect(prisma.$disconnect).toHaveBeenCalled()
	})
})
