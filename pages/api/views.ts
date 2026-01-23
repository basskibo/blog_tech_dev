import type { NextApiRequest, NextApiResponse } from 'next'

interface ViewsResponse {
	status?: string
	views?: number
	[key: string]: any
}

const postView = async (
	req: NextApiRequest,
	res: NextApiResponse<ViewsResponse>
) => {
	// Process a POST request
	console.log('Request arrived !!! ', req.headers)
	return res.status(200).send({status: 'ok'})
}

export default postView

