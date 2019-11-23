import api from './main'

test('simple value', () => {
  document.cookie = 'foo=bar'

  expect(api.get('foo')).toBe('bar')
})
