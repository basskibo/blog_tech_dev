import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createSubscriber = async (req, res) => {
  let result
  try {
    if (!req.body.email) {
      prisma.$disconnect()
      return res.status(404).send('Subscriber email is missing.')
    }
    const email = req.body.email
    result = await prisma.Subscribers.create(
      {
        data: {
          email
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

export default createSubscriber
