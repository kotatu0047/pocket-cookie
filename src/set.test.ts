import clearAll from './clear'
import set from './set'
import { get } from './get'

describe('getKeyValuePairsFromCookie()', () => {
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

  test('set simple value with cookieAttributes is { expires: 365 }', () => {
    set('foo', 'bar', { expires: 365 })

    expect(get('foo')).toBe('bar')
  })
})
