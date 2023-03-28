import { PrismaClient } from '@prisma/client'
import * as nodemailer from 'nodemailer'

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
    await sendEmail(email)
  } catch (err) {
    console.error('error executing query:', err)
    return err
  } finally {
    prisma.$disconnect()
    console.log(result)
    // eslint-disable-next-line no-unsafe-finally
    return res.status(200).send(result)
  }
}

async function sendEmail (email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const mailerAccount = {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASS
  }
  console.log(mailerAccount)

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mailerAccount.user, // generated ethereal user
      pass: mailerAccount.pass // generated ethereal password
    }
  })

  // send mail with defined transport object
  // const welcomeMail = await transporter.sendMail({
  //   from: '"Yay new subscriber 👻" <foo@example.com>', // sender address
  //   to: 'jagetic.bojan@gmail.com', // list of receivers
  //   subject: email + ' just subscribed ✔', // Subject line
  //   text: 'Hello world?', // plain text body
  //   html: 'New subscriber with email: <b>' + email + '</b> has been subscribed to the newseltter via ' + process.env.BASE_URL // html body
  // })

  const info = await transporter.sendMail({
    from: '"Yay new subscriber 👻" <foo@example.com>', // sender address
    to: 'jagetic.bojan@gmail.com', // list of receivers
    subject: email + ' just subscribed ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: 'New subscriber with email: <b>' + email + '</b> has been subscribed to the newseltter via ' + process.env.BASE_URL // html body
  })

  console.log('Message sent to email: %s', info.messageId)
  // console.log('Message sent to email: %s', welcomeMail.messageId)

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default createSubscriber
