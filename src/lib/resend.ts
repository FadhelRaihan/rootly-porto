import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface ContactEmailData {
  name: string
  email: string
  company?: string
  projectType: string
  budget?: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  if (!resend) {
    console.log('Email would be sent:', data)
    return
  }
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.RESEND_TO_EMAIL!,
    replyTo: data.email,
    subject: `New inquiry from ${data.name} — ${data.projectType}`,
    html: `
      <h2>New Project Inquiry</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      <p><strong>Project Type:</strong> ${data.projectType}</p>
      ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
      
      <h3>Message:</h3>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  })
}