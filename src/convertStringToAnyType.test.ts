import {
  isConvertibleToArray,
  isConvertibleToBool,
  isConvertibleToDate,
  isConvertibleToNull,
  isConvertibleToNumber,
  isConvertibleToObject,
  isConvertibleToUndefined,
} from './convertStringToAnyType'

describe('isConvertibleToNumber()', () => {
  test('isConvertibleToNumber return true on pass number string', () => {
    expect(isConvertibleToNumber('45.1987')).toBe(true)
  })

  test('isConvertibleToNumber return true on pass "0"', () => {
    expect(isConvertibleToNumber('0')).toBe(true)
  })

  test('isConvertibleToNumber return true on pass minus number string', () => {
    expect(isConvertibleToNumber('-45.789')).toBe(true)
  })

  test('isConvertibleToNumber return false on not number string', () => {
    expect(isConvertibleToNumber('foo')).toBe(false)
  })

  test('isConvertibleToNumber return false on pass empty string', () => {
    expect(isConvertibleToNumber('')).toBe(false)
  })
})

describe('isConvertibleToBool()', () => {
  test('isConvertibleToBool return true on pass "true"', () => {
    expect(isConvertibleToBool('true')).toBe(true)
  })

  test('isConvertibleToBool return true on pass "false"', () => {
    expect(isConvertibleToBool('false')).toBe(true)
  })

  test('isConvertibleToBool return false on pass not bool string', () => {
    expect(isConvertibleToBool('foo')).toBe(false)
  })

  test('isConvertibleToBool return false on pass empty string', () => {
    expect(isConvertibleToBool('')).toBe(false)
  })
})

const momentConvertiblePatterns: string[] = [
  '2014-01-01T24:00:00.000', // iso format 24hrs
  '2000-01-01T00:00:00.000+01:00', // string with timezone
  '1995-12-25',

  // An ISO 8601 string requires a date part.
  '2013-02-08',
  '2013-W06-5',
  '2013-039',
  '20130208',
  '2013W065',
  '2013W06',
  '2013050',

  // A time part can also be included, separated from the date part by a space or an uppercase T.
  '2013-02-08T09',
  '2013-02-08 09',
  '2013-02-08 09:30',
  '2013-02-08 09:30:26',
  '2013-02-08 09:30:26.123',
  '2013-02-08 24:00:00.000',
  '20130208T080910,123',
  '20130208T080910.123',
  '20130208T080910',
  '20130208T0809',
  '20130208T08',

  '2013-02-08 09',
  '2013-W06-5 09',
  '2013-039 09',
  '2013-02-08 09+07:00',
  '2013-02-08 09-0100',
  '2013-02-08 09Z',
  '2013-02-08 09:30:26.123+07:00',
  '2013-02-08 09:30:26.123+07',

  // RFC 2822
  'Tue, 01 Nov 2016 01:23:45 UT',
  'Sun, 12 Apr 2015 05:06:07 GMT',
  'Tue, 01 Nov 2016 01:23:45 +0000',
  'Tue, 01 Nov 16 04:23:45 Z',
  '01 Nov 2016 05:23:45 z',
  '(Init Comment) Tue,\n 1 Nov              2016 (Split\n Comment)  07:23:45 +0000 (GMT)',
  'Mon, 02 Jan 2017 06:00:00 -0800',
  'Mon, 02 Jan 2017 06:00:00 +0800',
  'Mon, 02 Jan 2017 06:00:00 +0330',
  'Mon, 02 Jan 2017 06:00:00 -0330',
  'Mon, 02 Jan 2017 06:00:00 PST',
  'Mon, 02 Jan 2017 06:00:00 PDT',
  'Mon, 02 Jan 2017 06:00:00 MST',
  'Mon, 02 Jan 2017 06:00:00 MDT',
  'Mon, 02 Jan 2017 06:00:00 CST',
  'Mon, 02 Jan 2017 06:00:00 CDT',
  'Mon, 02 Jan 2017 06:00:00 EST',
  'Mon, 02 Jan 2017 06:00:00 EDT',
]

describe('isConvertibleToDate()', () => {
  momentConvertiblePatterns.forEach(pattern => {
    test(`isConvertibleToDate return true on pass "${pattern}"`, () => {
      expect(isConvertibleToDate(pattern)).toBe(true)
    })
  })

  test('isConvertibleToDate return false on pass not datetime string', () => {
    expect(isConvertibleToDate('foo')).toBe(false)
  })

  test('isConvertibleToDate return false on pass empty string', () => {
    expect(isConvertibleToDate('')).toBe(false)
  })
})

describe('isConvertibleToArray()', () => {
  test('isConvertibleToArray return true on pass "[ 123 , "foo" , true , null]"', () => {
    expect(isConvertibleToArray('[ 123 , "foo" , true , null]')).toBe(true)
  })

  test('isConvertibleToArray return true on pass "[{ "str" : "foo" } , { "str" : "bar" }]"', () => {
    expect(
      isConvertibleToArray('[{ "str" : "foo" } , { "str" : "bar" }]'),
    ).toBe(true)
  })

  test('isConvertibleToArray return true on pass "{ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }"', () => {
    expect(
      isConvertibleToArray(
        '{ "str" : "foo", "num" : 45, "obj" : { "bool" : true } }',
      ),
    ).toBe(false)
  })

  test('isConvertibleToArray return false on pass not array string', () => {
    expect(isConvertibleToArray('foo')).toBe(false)
  })

  test('isConvertibleToArray return false on pass empty string', () => {
    expect(isConvertibleToArray('')).toBe(false)
  })
})

describe('isConvertibleToObject()', () => {
  test('isConvertibleToObject return true on pass "{ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }"', () => {
    expect(
      isConvertibleToObject(
        '{ "str" : "foo", "num" : 45, "obj" : { "bool" : true } }',
      ),
    ).toBe(true)
  })

  test('isConvertibleToObject return false on pass "[{ "str" : "foo" } , { "str" : "bar" }]"', () => {
    expect(
      isConvertibleToObject('[{ "str" : "foo" } , { "str" : "bar" }]'),
    ).toBe(false)
  })

  test('isConvertibleToObject return false on pass "[ 123 , "foo" , true , null]"', () => {
    expect(isConvertibleToObject('[ 123 , "foo" , true , null]')).toBe(false)
  })

  test('isConvertibleToObject return false on pass not object string', () => {
    expect(isConvertibleToObject('foo')).toBe(false)
  })

  test('isConvertibleToObject return false on pass empty string', () => {
    expect(isConvertibleToObject('')).toBe(false)
  })
})

describe('isConvertibleToNull()', () => {
  test('isConvertibleToNull return true on pass "null"', () => {
    expect(isConvertibleToNull('null')).toBe(true)
  })

  test('isConvertibleToNull return false on pass not null string', () => {
    expect(isConvertibleToNull('foo')).toBe(false)
  })

  test('isConvertibleToNull return false on pass empty string', () => {
    expect(isConvertibleToNull('')).toBe(false)
  })
})

describe('isConvertibleToUndefined()', () => {
  test('isConvertibleToUndefined return true on pass "undefined"', () => {
    expect(isConvertibleToUndefined('undefined')).toBe(true)
  })

  test('isConvertibleToUndefined return false on pass not undefined string', () => {
    expect(isConvertibleToUndefined('foo')).toBe(false)
  })

  test('isConvertibleToUndefined return false on pass empty string', () => {
    expect(isConvertibleToUndefined('')).toBe(false)
  })
})
