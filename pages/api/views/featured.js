import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// NOTE: GET increments a page's view counter and POST reads the top 3. A GET
// that mutates state is counted by crawlers and link prefetches; consider
// swapping the methods (callers would need updating).
const postView = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const result = await prisma.PageViews.findMany(
				{
					orderBy: {
						views: 'desc'
					},
					take: 3
				}
			)
			return res.status(200).send(result)
		} catch (err) {
			console.error('error executing query:', err)
			return res.status(500).send({ error: 'Failed to load featured views' })
		} finally {
			prisma.$disconnect()
		}
	}

	if (!req.query.title) {
		prisma.$disconnect()
		return res.status(400).send('Post Title is missing.')
	}

	const title = req.query.title
	try {
		const result = await prisma.PageViews.update(
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
		return res.status(200).send(result)
	} catch (err) {
		if (err.code !== 'P2025') {
			console.error('error executing query:', err)
			return res.status(500).send({ error: 'Failed to update views' })
		}
		// Record does not exist yet: create it with its first view.
		try {
			const result = await prisma.PageViews.create(
				{
					data: {
						name: title,
						views: 1
					}
				}
			)
			return res.status(200).send(result)
		} catch (createErr) {
			console.error('error creating page views:', createErr)
			return res.status(500).send({ error: 'Failed to update views' })
		}
	} finally {
		prisma.$disconnect()
	}
}

export default postView
