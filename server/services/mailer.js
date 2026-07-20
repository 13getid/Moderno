import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

// Create one transporter (our Gmail connection)
// We reuse this across the whole app
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

// Verify connection on server start — helpful for debugging
transporter.verify((error) => {
  if (error) {
    console.error('❌ Mailer error:', error.message)
  } else {
    console.log('✅ Mailer ready — connected to Gmail')
  }
})

export default transporter