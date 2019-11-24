import get from './get'
import clearAll from './clear'

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

test('Call to read cookie when there is another unrelated cookie with malformed encoding in the name', () => {
  document.cookie = '%A1=foo'
  document.cookie = 'c=v'
  console.log(document.cookie)

  expect(get('c')).toBe('v')
})
