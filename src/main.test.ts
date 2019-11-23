import say from './main'

test('say test', () => {
  expect(say('Cookie')).toBe('helloCookie')
})
