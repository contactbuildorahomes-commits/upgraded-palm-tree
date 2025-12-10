import { describe, it, expect, vi, beforeEach } from 'vitest'
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

describe('expo-web-success GET', () => {
  beforeEach(() => {
    // @ts-expect-error
    global.process = { ...process, env: { ...process.env, AUTH_URL: 'https://example.com' } }
  })

  it('returns html that posts AUTH_SUCCESS to configured origin', async () => {
    const req = new Request('https://example.com/api/auth/expo-web-success')
    const res = await GET(req)
    expect(res.headers.get('content-type')).toContain('text/html')
    const text = await res.text()
    expect(text).toContain('"type":"AUTH_SUCCESS"')
    expect(text).toContain('window.parent.postMessage')
    expect(text).toContain("'*'")
  })
})