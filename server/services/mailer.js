import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

// Create one transporter using IPv4 and port 587 (STARTTLS)
// We reuse this across the whole app
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  family: 4, // ← Forces IPv4 to prevent ENETUNREACH on Render
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