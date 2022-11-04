import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const postView = async (req, res) => {
  let result
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
    return err
  } finally {
    prisma.$disconnect()
    // eslint-disable-next-line no-unsafe-finally
    return res.status(200).send(result)
  }
}

export default postView
