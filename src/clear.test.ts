import clearAll from './clear'
import { getKeyValuePairsFromCookie } from './getKeyValuePairsFromCookie'

describe('clearAll()', () => {
  afterEach(() => {
    clearAll()

    //  can not clearAll() is clear a unrelated cookie with malformed encoding in the name
    const dt = new Date('1999-12-31T23:59:59Z')
    document.cookie = `%A1=; expires=${dt.toUTCString()}`
  })

  test('clear simple cookie', () => {
    document.cookie = 'foo=bar'
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('clear multiple cookies', () => {
    document.cookie = 'foo=bar'
    document.cookie = 'c=v'
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('clear cookie of unencoded percent character in cookie value mixed with encoded values not permitted', () => {
    document.cookie = 'bad=foo%bar%22baz%qux'
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('cannot clear cookie of malformed encoding in the name', () => {
    document.cookie = '%A1=invalid'
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([
      { key: '', value: '' },
    ])
  })

  test('can clear cookie of malformed encoding in the value', () => {
    document.cookie = 'invalid=%A1'
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  // jsDom is can clear Path set cookie
  // test('cannot clear Path set cookie', () => {
  //   document.cookie = 'foo=bar; path=/'
  //   clearAll()
  //
  //   expect(getKeyValuePairsFromCookie()).toStrictEqual([
  //     { key: 'foo', value: 'bar' },
  //   ])
  // })
})
