# pocket-cookie

A JavaScript cookie library

 - simple api
 - typescript support
 - esm

## installation

npm

```bash
$ npm install -S pocket-cookie
```

or yarn

```bash
$ yarn add pocket-cookie
```

import your source code

```javascript
import cookie from 'pocket-cookie'
```

## Basic Usage

### get Cookie

```javascript
    import cookie from 'pocket-cookie'

    document.cookie = 'foo=bar'
    cookie.get('foo')  // =>  "bar"

    document.cookie = 'bar=123'
    cookie.get('bar')  // =>  "123"

    document.cookie = 'zero=0'
    cookie.get('zero')  // =>  "0"

    document.cookie = 'null=null'
    cookie.get('null')  // =>  "null"

    document.cookie = 'undefined=undefined'
    cookie.get('undefined')  // =>  "undefined"

    //not exist cookie return null
    cookie.get('notExist')  // =>  null
```

### clearAll Cookie

```javascript
    import cookie from 'pocket-cookie'

    document.cookie = 'foo=bar'
    document.cookie = 'bar=123'
    cookie.clearAll()
    console.log(document.cookie)   // =>  ""
```

cannot clear HttpOnly flag set cookies and path set cookies

```javascript
    import cookie from 'pocket-cookie'

    document.cookie = 'foo=bar; path=/'
    cookie.clearAll()
    console.log(document.cookie)   // =>  "foo=bar"
```