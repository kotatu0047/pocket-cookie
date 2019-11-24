// const set = (name: string, value: string): void => {}

import { get, getWithAutoCast } from './get'
import clearAll from './clear'
import { getKeyValuePairsFromCookie } from './utility'

const api = {
  get,
  getWithAutoCast,
  clearAll,
  getKeyValuePairs: getKeyValuePairsFromCookie,
}

export default api
