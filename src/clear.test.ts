import clearAll from './clear'
import { getKeyValuePairsFromCookie } from './getKeyValuePairsFromCookie'

describe('clearAll()', () => {
  test('clear simple cookie', () => {
    document.cookie = 'foo=bar'
    clearAll()

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([])
  })

  test('clear multiple cookies', () => {
    document.cookie = 'foo=bar'
    document.cookie = 'c=v'
    clearAll()

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([])
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
