import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

interface PageView {
	name: string
	views: number
	[key: string]: any
}

interface ViewsResponse {
	views?: number
	[key: string]: any
}

const postView = async (
	req: NextApiRequest,
	res: NextApiResponse<ViewsResponse | PageView[]>
) => {
	let result: PageView | PageView[] | undefined
	console.log('Getting views >>>')
	if (req.method === 'POST') {
		// Process a POST request
		try {
			result = await prisma.pageViews.findMany(
				{
					orderBy: {
						views: 'desc'
					},
					take: 3
				}
			)
		} catch (err: any) {
			console.error('error executing query:', err)
			console.log(err.code)
			if (err.code === 'P2025') {
				result = await prisma.pageViews.create(
					{
						data: {
							name: String(req.query.title),
							views: 1,
							description: String(req.query.description || ''),
							slug: String(req.query.slug || '')
						}
					}
				)
			}
			return err
		} finally {
			prisma.$disconnect()
			// eslint-disable-next-line no-unsafe-finally
			return res.status(200).send(result as PageView[])
		}
	} else {
		// Handle any other HTTP method
		try {
			if (!req.query.title) {
				prisma.$disconnect()
				return res.status(404).send('Post Title is missing.' as any)
			}
			const title = String(req.query.title)
			result = await prisma.pageViews.update(
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
		} catch (err: any) {
			console.error('error executing query:', err)
			console.error(err.code)
			if (err.code === 'P2025') {
				result = await prisma.pageViews.create(
					{
						data: {
							name: String(req.query.title),
							views: 1,
							description: String(req.query.description || ''),
							slug: String(req.query.slug || '')
						}
					}
				)
			}
			return err
		} finally {
			prisma.$disconnect()
			// eslint-disable-next-line no-unsafe-finally
			return res.status(200).send(result as ViewsResponse)
		}
	}
}

export default postView

