import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const postView = async (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
    let result
    try {
      if (!req.query.title) {
        prisma.$disconnect()
        return res.status(404).send('Post Title is missing.')
      }
      console.log(req.query)
      const title = req.query.title
      result = await prisma.PageViews.update(
        {
          data: {
            views: {
              increment: 1
            },
            description: req.query?.description,
            slug: req.query?.slug

          },
          where: {
            name: title
          }
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
              description: req.query?.description,
              slug: req.query?.slug,
              views: 50
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
  }
}

export default postView
