import cookie from 'pocket-cookie'

/*
 *  get api
 */
document.cookie = 'foo=bar'
console.log(cookie.get('foo')) // =>  "bar"
document.cookie = 'bar=123'
console.log(cookie.get('bar')) // =>  "123"
document.cookie = 'zero=0'
console.log(cookie.get('zero')) // =>  "0"
document.cookie = 'null=null'
console.log(cookie.get('null')) // =>  "null"
document.cookie = 'undefined=undefined'
console.log(cookie.get('undefined')) // =>  "undefined"
// not exist cookie return null
console.log(cookie.get('notExist')) // =>  null

cookie.clearAll()

/*
 *  getWithAutoCast api
 */
document.cookie = 'foo=bar'
const foo = cookie.getWithAutoCast('foo')
console.log(foo) // => foo === "bar" and typeof foo === 'string'

document.cookie = 'number=123.45'
const number = cookie.getWithAutoCast('number')
console.log(number) // => number === 123.45 and typeof number === 'number'

document.cookie = 'bool=true'
const bool = cookie.getWithAutoCast('bool')
console.log(bool) // => bool === true and typeof bool === 'boolean'

// parsable date format pattern is moment.js default parsable pattern
// more details => https://momentjs.com/docs/#/parsing/string/
document.cookie = 'date=2013-02-08T09'
const date = cookie.getWithAutoCast('date')
console.log(date.toUTCString()) // => date.toUTCString() === "Fri, 08 Feb 2013 00:00:00 GMT" and (date instanceof Date) === true

document.cookie = 'arr=[{ "str" : "foo" } , { "str" : "bar" }]'
const arr = cookie.getWithAutoCast('arr')
console.log(arr) // => arr === [{ str : "foo" } , { str : "bar" }] and Array.isArray(arr) === true

document.cookie =
  'obj={ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }'
const obj = cookie.getWithAutoCast('obj')
console.log(obj) // => obj === {str:'foo', num:45 , obj:{ bool:true } } and typeof obj === 'object'

document.cookie = 'null=null'
const nullCookie = cookie.getWithAutoCast('null')
console.log(nullCookie) // => nullCookie === null

document.cookie = 'undefined=undefined'
const undefinedCookie = cookie.getWithAutoCast('undefined')
console.log(undefinedCookie) // => undefinedCookie === undefined and typeof undefinedCookie === 'undefined'

// not exist cookie return null
console.log(cookie.getWithAutoCast('notExist')) // =>  null

cookie.clearAll()

/*
 *  getKeyValuePairs api
 */
document.cookie = 'foo=bar'
console.log(cookie.getKeyValuePairs()) // =>  [{ key: 'foo', value: 'bar' }]

cookie.clearAll()

document.cookie = 'foo=bar'
document.cookie = 'baz=qux'
console.log(cookie.getKeyValuePairs()) // =>  [{ key: 'foo', value: 'bar' },{ key: 'baz', value: 'qux' }]

// return empty array on cookie is empty
cookie.clearAll()
console.log(cookie.getKeyValuePairs()) // =>  []

/*
 *  clearAll api
 */
document.cookie = 'foo=bar'
document.cookie = 'bar=123'
cookie.clearAll()
console.log(document.cookie) // =>  ""

// cannot clear HttpOnly flag set cookies and path set cookies
document.cookie = 'foo=bar; path=/'
cookie.clearAll()
console.log(document.cookie) // =>  "foo=bar"
