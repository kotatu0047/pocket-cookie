import { getKeyValuePairsFromCookie } from './getKeyValuePairsFromCookie'

/**
 * cannot clear HttpOnly flag set cookies and path set cookies
 */
const clearAll = (): void => {
  const keyValuePairs = getKeyValuePairsFromCookie(true)
  const dt = new Date('1999-12-31T23:59:59Z') // past dateTime

  keyValuePairs.forEach(({ key }) => {
    document.cookie = `${key}=; expires=${dt.toUTCString()}`
  })
}

export default clearAll
