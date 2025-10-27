import { GET } from '@/app/api/user/route'
import { NextResponse } from 'next/server'

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, opts) => ({ data, status: opts?.status || 200 })),
  },
}))

describe('GET /api/user', () => {
  const originalConsoleError = console.error
  
  beforeEach(() => {
    jest.clearAllMocks()
  })
  beforeAll(() => {
    console.error = jest.fn()
  })

  it('returns a random user when fetch is successful', async () => {
    const mockUser = {
      gender: 'male',
      name: { title: 'Mr', first: 'John', last: 'Doe' },
      location: {
        street: { number: 1, name: 'Main St' },
        city: 'City',
        state: 'State',
        country: 'Country',
        postcode: 12345,
        coordinates: { latitude: '0', longitude: '0' },
        timezone: { offset: '+0:00', description: 'UTC' },
      },
      email: 'john@example.com',
      login: {
        uuid: '123',
        username: 'john123',
        password: 'pass',
        salt: 'salt',
        md5: 'md5',
        sha1: 'sha1',
        sha256: 'sha256',
      },
      dob: { date: '2000-01-01', age: 23 },
      registered: { date: '2020-01-01', age: 3 },
      phone: '123',
      cell: '456',
      id: { name: null, value: null },
      picture: { large: '', medium: '', thumbnail: '' },
      nat: 'US',
    }

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [mockUser] }),
    })

    const response = await GET()

    expect(fetch).toHaveBeenCalledWith('https://randomuser.me/api/')
    expect(NextResponse.json).toHaveBeenCalledWith(mockUser)
    expect(response.status).toBe(200)
  })

  it('returns error when fetch fails', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
    })

    const response = await GET()

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
    expect(response.status).toBe(500)
  })

  it('returns error when fetch throws', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'))

    const response = await GET()

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
    expect(response.status).toBe(500)
  })

  afterAll(() => {
    console.error = originalConsoleError
  })
})
