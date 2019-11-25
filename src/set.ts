import { autoCast } from './commonTypes'
import { is } from './utility'

const secondsOfOneDay = 864e2
const millisecondsOfOneDay = 864e5

/**
   Considers RFC 6265 section 5.2:
    ...
    3.  If the remaining unparsed-attributes contains a %x3B (";")
        character:
   Consume the characters of the unparsed-attributes up to,
    not including, the first %x3B (";") character.
    ...
 */
const removeSemicolon = (s: string): string => s.split(';')[0]

export interface CookieAttributes {
  readonly expires?: number | Date
  readonly path?: string
  readonly domain?: string
  readonly secure?: boolean
  readonly maxAge?: number
  readonly samesite?: 'strict' | 'lax'
}

const createStringAttribute = (attributes: CookieAttributes) => {
  let stringAttributes = ''
  let expires = ''
  if (attributes.expires !== undefined) {
    const expiresDate =
      attributes.expires instanceof Date
        ? attributes.expires
        : new Date(Date.now() + attributes.expires * millisecondsOfOneDay)
    expires = expiresDate.toUTCString()
  }
  const path = attributes.path || ''
  const domain = attributes.domain || ''
  const isSecure = attributes.secure || false
  const maxAge =
    attributes.maxAge !== undefined
      ? `${attributes.maxAge * secondsOfOneDay}`
      : ''
  const samesite = attributes.samesite || ''

  stringAttributes +=
    expires || path || domain || isSecure || maxAge || samesite ? '; ' : ''
  stringAttributes += expires
    ? `${nameof<CookieAttributes>(o => o.expires)}=${expires}; `
    : ''
  stringAttributes += path
    ? `${nameof<CookieAttributes>(o => o.path)}=${removeSemicolon(path)}; `
    : ''
  stringAttributes += domain
    ? `${nameof<CookieAttributes>(o => o.domain)}=${removeSemicolon(domain)}; `
    : ''
  stringAttributes += isSecure
    ? `${nameof<CookieAttributes>(o => o.secure)}; `
    : ''
  // cannot naming CookieAttributes.max-age
  stringAttributes += maxAge ? `max-age=${maxAge}; ` : ''
  stringAttributes += samesite
    ? `${nameof<CookieAttributes>(o => o.samesite)}=${samesite}; `
    : ''

  return stringAttributes
}

// TODO percent encode
const set = <T1, T2 extends object>(
  key: string,
  value: autoCast<T1, T2>,
  attributes?: CookieAttributes,
): string => {
  if (typeof document === 'undefined') {
    return ''
  }

  let stringAttributes = ''
  if (attributes !== undefined)
    stringAttributes = createStringAttribute(attributes)

  let cookieValue = ''
  if (is.date(value)) {
    cookieValue = value.toUTCString()
  } else if (is.arr(value) || is.obj(value)) {
    cookieValue = JSON.stringify(value)
  } else {
    cookieValue = `${value}`
  }

  return (document.cookie = `${key}=${cookieValue}${stringAttributes}`)
}

export default set
