// const set = (name: string, value: string): void => {}

const decode = (s: string): string => {
  return s.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
}

const get = (key: string): string | null => {
  if (typeof document === 'undefined' || !key || !document.cookie) {
    return null
  }

  const cookies = document.cookie.split('; ')
  const keyValuePairs = cookies.map(cookie => {
    const parts = cookie.split('=')

    return { key: parts[0], value: parts.slice(1).join('=') }
  })

  let result: string | null = null
  try {
    const find = keyValuePairs.find(
      keyValuePair => decode(keyValuePair.key) === key,
    )
    if (find !== undefined) result = decode(find.value)
  } catch (e) {
    console.warn(`Occur Error On Cookie decodeURIComponent`)
  }

  return result
}

const api = {
  get,
}

export default api
