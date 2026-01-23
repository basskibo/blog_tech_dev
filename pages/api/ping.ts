import type { NextApiRequest, NextApiResponse } from 'next'

interface PingResponse {
	name: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<PingResponse>
) {
	const name = req.query.name ? String(req.query.name) : 'John Doe'
	res.status(200).json({ name })
}

