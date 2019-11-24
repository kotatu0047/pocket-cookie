import { decode, getKeyValuePairsFromCookie } from './utility'

const get = (key: string): string | null => {
  if (typeof document === 'undefined' || !key || !document.cookie) {
    return null
  }

  const keyValuePairs = getKeyValuePairsFromCookie()
  let result: string | null = null
  const find = keyValuePairs.find(keyValuePair => {
    let name = ''

    try {
      name = decode(keyValuePair.key)
    } catch (e) {
      return false
    }

    return name === key
  })

  try {
    if (find !== undefined) {
      result = decode(find.value)
      result = result.charAt(0) === '"' ? result.slice(1, -1) : result
    }
  } catch (e) {
    console.warn(`Occur Error On Cookie decodeURIComponent`)
  }

  return result
}

export default get
