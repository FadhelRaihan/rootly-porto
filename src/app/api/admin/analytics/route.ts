import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const username = process.env.UMAMI_USERNAME
    const password = process.env.UMAMI_PASSWORD
    const websiteId = process.env.UMAMI_WEBSITE_ID

    if (!username || !password || !websiteId) {
      console.warn('Umami credentials not configured in environment.')
      return NextResponse.json({
        success: false,
        error: 'Umami credentials not configured'
      }, { status: 400 })
    }

    // 1. Authenticate to Umami Cloud API
    const loginRes = await fetch('https://cloud.umami.is/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
      cache: 'no-store'
    })

    if (!loginRes.ok) {
      throw new Error('Umami auth login failed')
    }

    const { token } = await loginRes.json()

    // 2. Fetch pageviews for current year (monthly breakdown)
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 1).getTime()
    const endOfYear = now.getTime()

    const monthlyRes = await fetch(
      `https://cloud.umami.is/api/websites/${websiteId}/pageviews?startAt=${startOfYear}&endAt=${endOfYear}&unit=month&timezone=Asia/Jakarta`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
      }
    )

    if (!monthlyRes.ok) {
      throw new Error('Failed to fetch monthly pageviews from Umami')
    }

    const monthlyData = await monthlyRes.json()

    // Map month names robustly
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthly = monthNames.map((name, index) => {
      const pageviewForMonth = monthlyData.pageviews?.find((item: any) => {
        const date = new Date(item.x)
        return date.getMonth() === index
      })
      return {
        label: name,
        value: pageviewForMonth ? pageviewForMonth.y : 0
      }
    })

    // 3. Fetch pageviews for the last 5 years
    const startOf5YearsAgo = new Date(now.getFullYear() - 4, 0, 1).getTime()
    const yearlyRes = await fetch(
      `https://cloud.umami.is/api/websites/${websiteId}/pageviews?startAt=${startOf5YearsAgo}&endAt=${endOfYear}&unit=year&timezone=Asia/Jakarta`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
      }
    )

    let yearly = []
    if (yearlyRes.ok) {
      const yearlyData = await yearlyRes.json()
      const currentYear = now.getFullYear()
      yearly = Array.from({ length: 5 }, (_, i) => {
        const year = currentYear - 4 + i
        const pageviewForYear = yearlyData.pageviews?.find((item: any) => {
          const date = new Date(item.x)
          return date.getFullYear() === year
        })
        return {
          label: String(year),
          value: pageviewForYear ? pageviewForYear.y : 0
        }
      })
    } else {
      // Fallback to empty years if failed
      const currentYear = now.getFullYear()
      yearly = Array.from({ length: 5 }, (_, i) => ({
        label: String(currentYear - 4 + i),
        value: 0
      }))
    }

    return NextResponse.json({
      success: true,
      monthly,
      yearly
    })
  } catch (error) {
    console.error('Error fetching Umami analytics:', error)
    return NextResponse.json({
      success: false,
      error: 'Umami connection failed'
    }, { status: 500 })
  }
}
