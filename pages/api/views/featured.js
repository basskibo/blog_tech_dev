import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const postView = async (req, res) => {
	let result
	console.log('Getting views >>>')
	if (req.method === 'POST') {
		// Process a POST request
		try {
			result = await prisma.PageViews.findMany(
				{
					orderBy: {
						views: 'desc'
					},
					take: 3
				}
			)
		} catch (err) {
			console.error('error executing query:', err)
			console.log(err.code)
			if (err.code === 'P2025') {
				result = await prisma.PageViews.create(
					{
						data: {
							name: req.query.title,
							views: 1
						}
					}
				)
			}
			return err
		} finally {
			prisma.$disconnect()
			// eslint-disable-next-line no-unsafe-finally
			return res.status(200).send(result)
		}
	} else {
		// Handle any other HTTP method
		try {
			if (!req.query.title) {
				prisma.$disconnect()
				return res.status(404).send('Post Title is missing.')
			}
			const title = req.query.title
			result = await prisma.PageViews.update(
				{
					data: {
						views: {
							increment: 1
						}
					},
					where: {
						name: title
					}
				}
			)
		} catch (err) {
			console.error('error executing query:', err)
			console.error(err.code)
			if (err.code === 'P2025') {
				result = await prisma.PageViews.create(
					{
						data: {
							name: req.query.title,
							views: 1
						}
					}
				)
			}
			return err
		} finally {
			prisma.$disconnect()
			// eslint-disable-next-line no-unsafe-finally
			return res.status(200).send(result)
		}
	}
}

export default postView
