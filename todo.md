
## TODO
 - deploy task
 - d.ts
 - auto type cast 
 - public keyValuePairs

  Cookies.set('c', 'v')
  Cookies.set('foo', 'bar')
  assert.deepEqual(
    Cookies.get(),
    { c: 'v', foo: 'bar' },
    'returns object containing all cookies'
