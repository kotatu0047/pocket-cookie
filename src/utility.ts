// TODO testing

export const decode = (s: string): string => {
  return s.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
}

type keyValuePair = {
  key: string
  value: string
}

export const getKeyValuePairsFromCookie = (): keyValuePair[] => {
  const cookies = document.cookie.split('; ')

  return cookies.map(cookie => {
    const parts = cookie.split('=')

    return { key: parts[0], value: parts.slice(1).join('=') }
  })
}
