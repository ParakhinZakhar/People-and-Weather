import { NextResponse } from 'next/server'
import type { User } from '@/app/types/user'

export async function GET() {
  try {
    const res = await fetch('https://randomuser.me/api/')
    if (!res.ok) throw new Error('Failed to fetch random user')

    const data = await res.json()
    const user: User = data.results[0]

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}
