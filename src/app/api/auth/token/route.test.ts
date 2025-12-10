import { describe, it, expect, vi } from 'vitest'
import { GET } from './route'

vi.mock('@auth/core/jwt', () => {
  return {
    getToken: vi.fn(async (opts: any) => {
      if (opts.raw) return 'raw.jwt.token'
      return {
        sub: 'user-123',
        email: 'user@example.com',
        name: 'Test User',
      }
    }),
  }
})

describe('auth token GET', () => {
  it('returns json with jwt and user when authorized', async () => {
    const req = new Request('https://example.com/api/auth/token')
    const res = await GET(req)
    expect(res.headers.get('content-type')).toContain('application/json')
    const json = await res.json()
    expect(json.jwt).toBe('raw.jwt.token')
    expect(json.user).toEqual({ id: 'user-123', email: 'user@example.com', name: 'Test User' })
  })
})