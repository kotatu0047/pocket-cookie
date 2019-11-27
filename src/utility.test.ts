import { decode, getKeyValuePairsFromCookie, is } from './utility'
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

const allTypes: any[] = [
  'str',
  123.45,
  true,
  new Date(),
  [],
  {},
  null,
  undefined,
]

describe('is.obj()', () => {
  allTypes.forEach(value => {
    if (
      value !== null &&
      typeof value === 'object' &&
      !is.date(value) &&
      !is.arr(value)
    ) {
      test('is.obj return true on pass {}', () => {
        expect(is.obj(value)).toBe(true)
      })
    } else {
      test('is.obj return false on pass not {}', () => {
        expect(is.obj(value)).toBe(false)
      })
    }
  })
})

describe('is.date()', () => {
  allTypes.forEach(value => {
    if (value instanceof Date) {
      test('is.date return true on pass Date', () => {
        console.log(value)
        expect(is.date(value)).toBe(true)
      })
    } else {
      test('is.date return false on pass not Date', () => {
        expect(is.date(value)).toBe(false)
      })
    }
  })
})

describe('is.arr()', () => {
  allTypes.forEach(value => {
    if (Array.isArray(value)) {
      test('is.arr return true on pass array', () => {
        expect(is.arr(value)).toBe(true)
      })
    } else {
      test('is.arr return false on pass not array', () => {
        expect(is.arr(value)).toBe(false)
      })
    }
  })
})
