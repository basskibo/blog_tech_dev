
const postView = async (req, res) => {
	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST')
		return res.status(405).send({ error: 'Method not allowed' })
	}
	return res.status(200).send({ status: 'ok' })
}

export default postView
