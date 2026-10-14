// @vitest-environment node
import handler from '../../pages/api/ping'
import { mockReq, mockRes } from '../helpers/http'

describe('GET /api/ping', () => {
	it('echoes the name query param', () => {
		const res = mockRes()
		handler(mockReq({ query: { name: 'Bojan' } }), res)
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json).toHaveBeenCalledWith({ name: 'Bojan' })
	})

	it('defaults to John Doe', () => {
		const res = mockRes()
		handler(mockReq(), res)
		expect(res.json).toHaveBeenCalledWith({ name: 'John Doe' })
	})

	it('treats an empty name as missing', () => {
		const res = mockRes()
		handler(mockReq({ query: { name: '' } }), res)
		expect(res.json).toHaveBeenCalledWith({ name: 'John Doe' })
	})
})
