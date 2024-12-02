
const postView = async (req, res) => {
		// Process a POST request
		console.log('Request arrived !!! ', req.headers)
		return res.status(200).send({status: 'ok'})
	
}

export default postView
