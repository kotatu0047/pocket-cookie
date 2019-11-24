import get from './get'
import clearAll from './clear'

describe('get()', () => {
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()
  })

  test('get simple value', () => {
    document.cookie = 'foo=bar'

    expect(get('foo')).toBe('bar')
  })

  test('get empty value', () => {
    document.cookie = 'foo='

    expect(get('foo')).toBe('')
  })

  test('get null on not existing', () => {
    document.cookie = 'bar=foo'

    expect(get('foo')).toBeNull()
  })

  test('get null on key is empty', () => {
    document.cookie = 'foo=bar'

    expect(get('')).toBeNull()
  })

  test('get equality sign in cookie value', () => {
    document.cookie = 'foo=bar=baz'

    expect(get('foo')).toBe('bar=baz')
  })

  test('percent character in cookie value', () => {
    document.cookie = 'foo=bar%'

    expect(get('foo')).toBe('bar%')
  })

  test('unencoded percent character in cookie value mixed with encoded values not permitted', () => {
    document.cookie = 'bad=foo%bar%22baz%qux'

    expect(get('bad')).toBeNull()
  })

  test('lowercase percent character in cookie value', () => {
    document.cookie = 'c=%d0%96'

    expect(get('c')).toBe('Ж')
  })

  test('RFC 6265 - reading cookie-octet enclosed in DQUOTE', () => {
    document.cookie = 'c="v"'

    expect(get('c')).toBe('v')
  })

  test('Call to read cookie when there is another cookie', () => {
    document.cookie = 'foo=bar'
    document.cookie = 'c=v'

    expect(get('c')).toBe('v')
  })

  test('Call to read cookie when there is another unrelated cookie with malformed encoding in the name', () => {
    document.cookie = '%A1=foo'
    document.cookie = 'c=v'

    expect(get('c')).toBe('v')
  })

  test('Call to read cookie when there is another unrelated cookie with malformed encoding in the value', () => {
    document.cookie = 'invalid=%A1'
    document.cookie = 'c=v'

    expect(get('c')).toBe('v')
  })

  test('value "[object Object]"', () => {
    document.cookie = 'value=[object Object]'

    expect(get('value')).toBe('[object Object]')
  })

  test('value "0"', () => {
    document.cookie = 'value=0'

    expect(get('value')).toBe('0')
  })

  test('value "null"', () => {
    document.cookie = 'value=null'

    expect(get('value')).toBe('null')
  })

  test('value "undefined"', () => {
    document.cookie = 'value=undefined'

    expect(get('value')).toBe('undefined')
  })
})
