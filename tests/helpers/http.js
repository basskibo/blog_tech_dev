// Minimal Next.js API req/res doubles. `res` records every response so tests
// can catch handlers that answer twice (which throws ERR_HTTP_HEADERS_SENT in Next).
export function mockReq ({ method = 'GET', query = {}, body = {}, headers = {} } = {}) {
	return { method, query, body, headers }
}

export function mockRes () {
	const res = {
		statusCode: 200,
		body: undefined,
		headers: {},
		responses: []
	}
	res.status = vi.fn((code) => {
		res.statusCode = code
		return res
	})
	const finish = (kind) => vi.fn((payload) => {
		res.body = payload
		res.responses.push({ status: res.statusCode, kind, body: payload })
		return res
	})
	res.json = finish('json')
	res.send = finish('send')
	res.end = finish('end')
	res.setHeader = vi.fn((k, v) => {
		res.headers[k.toLowerCase()] = v
		return res
	})
	return res
}
