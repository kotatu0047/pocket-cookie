import moment from 'moment'
import { isObject } from './utility'

export const isConvertibleToNumber = (s: string): boolean => {
  if (!s) return false
  const toNumber = Number(s)

  return !Number.isNaN(toNumber)
}

export const isConvertibleToBool = (s: string): boolean => {
  if (!s) return false

  return s === 'true' || s === 'false'
}

export const isConvertibleToDate = (s: string): boolean => {
  if (!s) return false

  return moment(s).isValid()
}

// TODO generic
export const isConvertibleToArray = (s: string): boolean => {
  if (!s) return false

  let toArray: any
  try {
    toArray = JSON.parse(s)
  } catch (e) {
    return false
  }

  return Array.isArray(toArray)
}

// TODO generic
export const isConvertibleToObject = (s: string): boolean => {
  if (!s) return false

  let toObject: any
  try {
    toObject = JSON.parse(s)
  } catch (e) {
    return false
  }

  return isObject(toObject)
}

export const isConvertibleToNull = (s: string): boolean => {
  if (!s) return false

  return s === 'null'
}

export const isConvertibleToUndefined = (s: string): boolean => {
  if (!s) return false

  return s === 'undefined'
}

export const convertToBool = (s: string): boolean => {
  return s === 'true'
}

export const convertToDate = (s: string): Date => {
  return moment(s).toDate()
}

// TODO generic
export const convertToArray = (s: string): Array<any> => {
  return JSON.parse(s) as Array<any>
}

// TODO generic
export const convertToObject = (s: string): object => {
  return JSON.parse(s) as object
}
