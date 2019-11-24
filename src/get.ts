import { decode, getKeyValuePairsFromCookie } from './utility'
import {
  convertToArray,
  convertToBool,
  convertToDate,
  convertToObject,
  isConvertibleToArray,
  isConvertibleToBool,
  isConvertibleToDate,
  isConvertibleToNull,
  isConvertibleToNumber,
  isConvertibleToObject,
  isConvertibleToUndefined,
} from './convertStringToAnyType'

export const get = (key: string): string | null => {
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

type getWithAutoCastResult<T1, T2 extends object> =
  | string
  | number
  | boolean
  | Date
  | Array<T1>
  | T2
  | null
  | undefined

/**
 * priority to date over number
 */
export const getWithAutoCast = <T1, T2 extends object>(
  key: string,
): getWithAutoCastResult<T1, T2> => {
  const value = get(key)
  if (value === null) return null

  if (isConvertibleToNull(value)) return null
  if (isConvertibleToUndefined(value)) return undefined
  if (isConvertibleToNumber(value)) return Number(value)
  if (isConvertibleToBool(value)) return convertToBool(value)
  if (isConvertibleToDate(value)) return convertToDate(value)
  if (isConvertibleToArray(value)) return convertToArray<T1>(value)
  if (isConvertibleToObject(value)) return convertToObject<T2>(value)

  return value
}
