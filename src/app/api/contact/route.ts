import { sendContactEmail } from '@/lib/resend'
import { contactSchema } from '@/lib/validations/contact'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten() },
        { status: 400 }
      )
    }

    await sendContactEmail(parsed.data)
    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending contact email:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}