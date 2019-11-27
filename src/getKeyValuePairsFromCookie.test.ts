import {
  decode,
  getKeyValuePairsFromCookie,
} from './getKeyValuePairsFromCookie'
import clearAll from './clear'

describe('decode()', () => {
  test('decode on value in include percent', () => {
    const value = 'foobarbaz%d0%96'

    expect(decode(value)).toBe('foobarbazЖ')
  })

  test('not decode on value in not include percent', () => {
    const value = 'foobarbaz'

    expect(decode(value)).toBe(value)
  })

  test('throw URIError on unencoded percent character in value mixed with encoded values not permitted', () => {
    const value = 'foo%bar%22baz%qux'

    expect(() => decode(value)).toThrowError(URIError)
  })
})

describe('getKeyValuePairsFromCookie()', () => {
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()
  })

  test('get simple value', () => {
    document.cookie = 'foo=bar'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'foo', value: 'bar' },
    ])
  })

  test('get empty value', () => {
    document.cookie = 'foo='

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'foo', value: '' },
    ])
  })

  test('get empty array', () => {
    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([])
  })

  test('get equality sign in cookie value', () => {
    document.cookie = 'foo=bar=baz'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'foo', value: 'bar=baz' },
    ])
  })

  test('Call to read cookie when multiple cookies', () => {
    document.cookie = 'foo=bar'
    document.cookie = 'c=v'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'foo', value: 'bar' },
      { key: 'c', value: 'v' },
    ])
  })
})
