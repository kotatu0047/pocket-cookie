export const decode = (s: string): string => {
  return s.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
}

type keyValuePair = {
  key: string
  value: string
}

export const getKeyValuePairsFromCookie = (): keyValuePair[] => {
  if (typeof document === 'undefined' || !document.cookie) return []

  const cookies = document.cookie.split('; ')
  if (cookies.length === 1 && cookies[0] === '') return []

  return cookies.map(cookie => {
    const parts = cookie.split('=')

    return { key: parts[0], value: parts.slice(1).join('=') }
  })
}
