import { sendContactEmail } from '@/lib/resend'
import { contactSchema } from '@/lib/validations/contact'
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { leads } from '@/db/schema'

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

    // Save submission to database
    await db.insert(leads).values({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      projectType: parsed.data.projectType,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
    })

    await sendContactEmail(parsed.data)
    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending contact email:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}