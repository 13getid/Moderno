import transporter from '../services/mailer.js'
import dotenv from 'dotenv'
dotenv.config()

// POST /api/contact
export async function sendContact(req, res) {
  const { name, email, subject, message } = req.body

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' })
  }

  try {
    // Email that lands in YOUR inbox (the store owner)
    await transporter.sendMail({
      from:    `"Moderno Contact" <${process.env.MAIL_USER}>`,
      to:      process.env.MAIL_TO,
      replyTo: email,           // so you can reply directly to the customer
      subject: subject || `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <div style="background:#1c1917;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="color:#C4A882;font-size:20px;margin:0">
              New Contact Message — Moderno
            </h2>
          </div>
          <div style="background:#fafaf9;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e7e5e4">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:8px 0;color:#78716c;font-size:13px;width:80px">From</td>
                <td style="padding:8px 0;color:#1c1917;font-size:13px;font-weight:600">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#78716c;font-size:13px">Email</td>
                <td style="padding:8px 0">
                  <a href="mailto:${email}" style="color:#8B6C42;font-size:13px">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#78716c;font-size:13px">Subject</td>
                <td style="padding:8px 0;color:#1c1917;font-size:13px">${subject || '(no subject)'}</td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #e7e5e4;margin:20px 0"/>
            <p style="color:#78716c;font-size:12px;margin:0 0 8px">Message</p>
            <p style="color:#1c1917;font-size:14px;line-height:1.7;white-space:pre-wrap;margin:0">${message}</p>
            <hr style="border:none;border-top:1px solid #e7e5e4;margin:20px 0"/>
            <p style="color:#a8a29e;font-size:11px;margin:0">
              Sent via Moderno contact form · Reply to this email to respond directly to ${name}
            </p>
          </div>
        </div>
      `,
    })

    // Auto-reply to the customer so they know their message arrived
    await transporter.sendMail({
      from:    `"Moderno" <${process.env.MAIL_USER}>`,
      to:      email,
      subject: 'We received your message — Moderno',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <div style="background:#1c1917;padding:24px 32px;border-radius:12px 12px 0 0">
            <h2 style="color:#C4A882;font-size:20px;margin:0">Thank you, ${name}!</h2>
          </div>
          <div style="background:#fafaf9;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e7e5e4">
            <p style="color:#1c1917;font-size:14px;line-height:1.7;margin:0 0 16px">
              We've received your message and will get back to you within 24 hours.
            </p>
            <p style="color:#78716c;font-size:13px;line-height:1.6;margin:0">
              Here's a copy of what you sent:
            </p>
            <blockquote style="border-left:3px solid #C4A882;margin:16px 0;padding:12px 16px;background:#f5f0e8;border-radius:0 8px 8px 0">
              <p style="color:#57534e;font-size:13px;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
            </blockquote>
            <p style="color:#a8a29e;font-size:12px;margin:16px 0 0">
              — The Moderno Team
            </p>
          </div>
        </div>
      `,
    })

    res.json({ success: true, message: 'Message sent successfully' })

  } catch (err) {
    console.error('Mail error:', err.message)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}