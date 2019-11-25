import clearAll from './clear'
import set from './set'
import { get } from './get'

describe('set()', () => {
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()
  })

  test('set simple value', () => {
    set('foo', 'bar')

    expect(get('foo')).toBe('bar')
  })

  test('return simple value', () => {
    expect(set('foo', 'bar')).toBe('foo=bar')
  })
})

describe('set() with cookieAttributes', () => {
  // jsDom is can clear Path set cookie
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()
  })

  test('cookieAttributes is {}', () => {
    expect(set('foo', 'bar', {})).toBe('foo=bar')
  })

  test('cookieAttributes is { expires: 200 }', () => {
    const days = 200
    const date = new Date(new Date().valueOf() + days * 24 * 60 * 60 * 1000)
    const expected = `expires=${date.toUTCString()}; `
    expect(set('foo', 'bar', { expires: days })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { expires: Date }', () => {
    const days = 200
    const date = new Date(new Date().valueOf() + days * 24 * 60 * 60 * 1000)
    const expected = `expires=${date.toUTCString()}; `
    expect(set('foo', 'bar', { expires: date })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { path: "/index.html" }', () => {
    const path = '/index.html'
    const expected = `path=${path}; `
    expect(set('foo', 'bar', { path })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { domain: "example.com" }', () => {
    const domain = 'example.com'
    const expected = `domain=${domain}; `
    expect(set('foo', 'bar', { domain })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { secure: true }', () => {
    const expected = 'secure; '
    expect(set('foo', 'bar', { secure: true })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { secure: false }', () => {
    expect(set('foo', 'bar', { secure: false })).toBe('foo=bar')
  })

  test('cookieAttributes is { maxAge: 200 }', () => {
    const days = 200
    const maxAge = days * 24 * 60 * 60
    const expected = `max-age=${maxAge}; `
    expect(set('foo', 'bar', { maxAge: days })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { samesite: "strict" }', () => {
    const samesite = 'strict'
    const expected = `samesite=${samesite}; `
    expect(set('foo', 'bar', { samesite })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { samesite: "lax" }', () => {
    const samesite = 'lax'
    const expected = `samesite=${samesite}; `
    expect(set('foo', 'bar', { samesite })).toBe(`foo=bar; ${expected}`)
  })

  test('all cookieAttributes', () => {
    const expiresDays = 200
    const path = '/index.html'
    const domain = 'example.com'
    const maxAgeDays = 300
    const samesite = 'strict'

    const expiresDate = new Date(
      new Date().valueOf() + expiresDays * 24 * 60 * 60 * 1000,
    )
    const maxAge = maxAgeDays * 24 * 60 * 60

    const expected = `expires=${expiresDate.toUTCString()}; path=${path}; domain=${domain}; secure; max-age=${maxAge}; samesite=${samesite}; `
    expect(
      set('foo', 'bar', {
        expires: expiresDays,
        path,
        domain,
        secure: true,
        maxAge: maxAgeDays,
        samesite,
      }),
    ).toBe(`foo=bar; ${expected}`)
  })
})
